import { useState, useEffect } from 'react';
import dayjs from "dayjs";
import axios from "axios";
import { Box } from "@mui/material";
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import Tooltip from '@mui/material/Tooltip';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { gridStyle, buttonHoverStyle } from "../../../../styles"
import DataGridAddButton from '../../../../components/DataGridAddButton';
import useConfirm from "../../../../hooks/useConfirm";
import { useFetchContent, useDeleteContent, useFetchModuleContent } from "../../../../hooks/ContentHooks";

const ModuleContent = () => {

    const navigate = useNavigate();
    const { course, module } = useOutletContext();
    const { data: content } = useFetchModuleContent(module.id);
    const fetchContent = useFetchContent();
    const deleteContent = useDeleteContent();

    const [rows, setRows] = useState();
    const [ConfirmDeleteDialog, confirmDelete] = useConfirm();

    useEffect(() => {
        setRows(content);
    }, [content]);

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

    const columns = [
        {
            field: "title",
            headerName: "Content Title",
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
                return [
                    <Tooltip title="Download">
                        <GridActionsCellItem
                            icon={<FileDownloadOutlinedIcon />}
                            label="Download"
                            className="textPrimary"
                            onClick={() => handleDownloadClick(id)}
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
                ];
            },
        }
    ];

    return (
        <Box m="0">
            <Box
                p="0 0 20px 0"
                height="70vh"
                sx={gridStyle}
            >
                <DataGrid
                    rows={rows}
                    columns={columns}
                    rowHeight={40}
                    slots={{
                        toolbar: DataGridAddButton,
                    }}
                    slotProps={{
                        toolbar: { text: "Add Content", onClick: () => { } },
                    }}
                />

            </Box>
            <ConfirmDeleteDialog />
        </Box>
    );
};

export default ModuleContent;