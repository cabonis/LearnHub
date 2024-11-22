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
    useFetchContent,
    useAddAdminContent,
    useUpdateAdminContent,
    useDeleteAdminContent,
    useFetchAdminModuleContent
} from "../../../../hooks/ContentHooks";

const ModuleContent = () => {

    const { course, module } = useOutletContext();
    const { data: content } = useFetchAdminModuleContent(module.id);

    const addContent = useAddAdminContent();
    const updateContent = useUpdateAdminContent();
    const fetchContent = useFetchContent();
    const deleteContent = useDeleteAdminContent();

    const fileInputRef = useRef();
    const [rows, setRows] = useState([]);
    const [rowModesModel, setRowModesModel] = useState({});
    const [isAdding, setIsAdding] = useState(false);
    const [ConfirmDeleteDialog, confirmDelete] = useConfirm();
    const [AlertSnack, showAlert] = useAlertSnack();

    useEffect(() => {
        setRows(content);
    }, [content]);

    useEffect(() => {
        setIsAdding(rows?.some(r => r.isNew === true));
    }, [rows]);

    const handleFileInputChange = (e) => {
        if (e.target.files.length > 0) {
            const id = 0;
            setRows((oldRows) => [
                ...oldRows,
                { id, title: '', originalFileName: e.target.files[0].name, isNew: true },
            ]);
            setRowModesModel((oldModel) => ({
                ...oldModel,
                [id]: { mode: GridRowModes.Edit, fieldToFocus: 'text' },
            }));
        }
    }

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
        fileInputRef.current.click();
    }

    const handleDownloadClick = (id) => {
        fetchContent(id);
    }

    const handleDeleteClick = async (id) => {
        if (await confirmDelete("Confirm", "Are you sure you wish to delete this content?")) {
            deleteContent.mutate(id, {
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
        var formData = new FormData();
        formData.append("moduleId", module.id);
        formData.append("title", row.title);
        formData.append("dataFile", fileInputRef.current.files[0]);
        await addContent.mutate(formData, {
            onSuccess: ({ data: content }) => {
                setRows(rows => rows.map(r =>
                    r.id === row.id ? {
                        ...row,
                        id: content.id,
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
        await updateContent.mutate({
            id: row.id,
            moduleId: module.id,
            title: row.title
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
            headerName: "Content Title",
            editable: true,
            minWidth: 250
        },
        {
            field: "originalFileName",
            headerName: "File Name",
            minWidth: 250
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
                    </Tooltip>,
                    <Tooltip title="Download">
                        <GridActionsCellItem
                            icon={<FileDownloadOutlinedIcon />}
                            label="Download"
                            className="textPrimary"
                            onClick={() => handleDownloadClick(id)}
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
                    toolbar: { text: "Add Content", onClick: handleAddClick, disabled: isAdding },
                }}
            />
            <ConfirmDeleteDialog />
            <AlertSnack />
            <input ref={fileInputRef}
                id="fileInput"
                type="file"
                style={{ display: "none" }}
                onChange={handleFileInputChange} />
        </Box>
    );
};

export default ModuleContent;