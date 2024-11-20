import { useState, useEffect, useRef } from 'react';
import { Box } from "@mui/material";
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import Tooltip from '@mui/material/Tooltip';
import { GridRowModes, DataGrid, GridActionsCellItem, GridRowEditStopReasons, } from '@mui/x-data-grid';
import { useOutletContext } from 'react-router-dom';
import { gridStyle, buttonHoverStyle } from "../../../../styles"
import DataGridAddButton from '../../../../components/DataGridAddButton';
import useConfirm from "../../../../hooks/useConfirm";
import useAlertSnack from "../../../../hooks/useAlertSnack";
import {
    useFetchAdminModuleLectures,
    useAddAdminLecture,
    useUpdateAdminLecture,
    useDeleteAdminLecture
} from "../../../../hooks/LectureHooks";

const ModuleLectures = () => {

    const { course, module } = useOutletContext();
    const { data: lectures } = useFetchAdminModuleLectures(module.id);

    const addLecture = useAddAdminLecture();
    const updateLecture = useUpdateAdminLecture();
    const deleteLecture = useDeleteAdminLecture();

    const [rows, setRows] = useState([]);
    const [rowModesModel, setRowModesModel] = useState({});
    const [isAdding, setIsAdding] = useState(false);
    const [ConfirmDeleteDialog, confirmDelete] = useConfirm();
    const [AlertSnack, showAlert] = useAlertSnack();

    useEffect(() => {
        setRows(lectures);
    }, [lectures]);

    useEffect(() => {
        setIsAdding(rows?.some(r => r.isNew === true));
    }, [rows]);

    const handleEditClick = (id) => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id) => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    const handleCancelClick = (id) => {
        setRowModesModel({
            ...rowModesModel, [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = rows.find((row) => row.id === id);
        if (editedRow.isNew) {
            setRows(rows.filter((row) => row.id !== id));
        }
    };

    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const handleRowEditStop = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleAddClick = () => {
        const id = 0;
        setRows((oldRows) => [
            ...oldRows,
            { id, title: '', videoLink: '', isNew: true },
        ]);
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [id]: { mode: GridRowModes.Edit, fieldToFocus: 'title' },
        }));
    }

    const handleDeleteClick = async (id) => {
        if (await confirmDelete("Confirm", "Are you sure you wish to delete this lecture?")) {
            deleteLecture.mutate(id, module.id, {
                onError: () => {
                    setRows([
                        ...rows
                    ]);
                }
            });
            setRows(rows.filter((row) => row.id !== id));
        }
    }

    const processRowAdd = async (row) => {
        await addLecture.mutate({
            moduleId: module.id,
            title: row.title,
            videoLink: row.videoLink
        }, {
            onSuccess: ({ data: lecture }) => {
                setRows(rows => rows.map(r =>
                    r.id === row.id ? {
                        ...row,
                        id: lecture.id,
                        isNew: false
                    } : r)
                );
            },
            onError: () => {
                setRows(rows.filter((row) => row.id !== newRow.id));
            }
        });
    }

    const processRowEdit = async (row, oldRow) => {
        await updateLecture.mutate({
            id: row.id,
            moduleId: module.id,
            title: row.title,
            videoLink: row.videoLink
        }, {
            onError: () => {
                setRows(rows => rows.map(r =>
                    r.id === row.id ? oldRow : r)
                );
            }
        });
    }

    const processRowUpdate = (row, oldRow) => {

        if (!row.title) {
            showAlert("You must provide a title!");
            return;
        }

        if (!row.videoLink) {
            showAlert("You must provide a video link!");
            return;
        }

        if (row.isNew) {
            processRowAdd(row);
        }
        else {
            processRowEdit(row, oldRow);
        }

        return row;
    }

    const columns = [
        {
            field: "title",
            headerName: "Title",
            editable: true,
            minWidth: 250
        },
        {
            field: "videoLink",
            headerName: "Video Link",
            editable: true,
            minWidth: 350
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            cellClassName: 'actions',
            headerAlign: 'left',
            align: 'left',
            flex: 1,
            minWidth: 100,
            getActions: ({ id }) => {

                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <Tooltip title="Save">
                            <GridActionsCellItem
                                icon={<SaveIcon />}
                                label="Save"
                                color='secondary'
                                onClick={() => handleSaveClick(id)}
                            />
                        </Tooltip>,
                        <Tooltip title="Cancel">
                            <GridActionsCellItem
                                icon={<CancelIcon />}
                                label="Cancel"
                                className="textPrimary"
                                onClick={() => handleCancelClick(id)}
                                color="inherit"
                                sx={buttonHoverStyle}
                            />
                        </Tooltip>,
                    ];
                }

                return [
                    <Tooltip title="Edit">
                        <GridActionsCellItem
                            icon={<EditIcon />}
                            label="Edit"
                            className="textPrimary"
                            onClick={() => handleEditClick(id)}
                            color="inherit"
                            sx={buttonHoverStyle}
                        />
                    </Tooltip>,
                    <Tooltip title="Delete">
                        <GridActionsCellItem
                            icon={<DeleteIcon />}
                            label="Delete"
                            onClick={() => handleDeleteClick(id)}
                            color="inherit"
                            sx={buttonHoverStyle}
                        />
                    </Tooltip>
                ];
            },
        }
    ];

    return (
        <Box sx={gridStyle}
            height="100%"
        >
            <DataGrid
                rows={rows}
                columns={columns}
                editMode="row"
                rowHeight={40}
                processRowUpdate={processRowUpdate}
                experimentalFeatures={{ newEditingApi: true }}
                rowModesModel={rowModesModel}
                onRowModesModelChange={handleRowModesModelChange}
                onRowEditStop={handleRowEditStop}
                slots={{
                    toolbar: DataGridAddButton,
                }}
                slotProps={{
                    toolbar: { text: "Add Lecture", onClick: handleAddClick, disabled: isAdding },
                }}
            />
            <ConfirmDeleteDialog />
            <AlertSnack />
        </Box>
    );
};

export default ModuleLectures;