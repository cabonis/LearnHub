import { useState } from 'react';
import { Box } from "@mui/material";
import { useOutletContext } from 'react-router-dom';
import { GridRowModes, DataGrid, GridActionsCellItem, GridRowEditStopReasons, } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import Header from "../../components/Header";
import Tooltip from '@mui/material/Tooltip';
import { mockDataUsers } from "../../data/mockData";
import { gridStyle, buttonHoverStyle } from "../global/ComponentStyles"
import useConfirm from "../../hooks/useConfirm";

const UserGrid = () => {

	const [rowModesModel, setRowModesModel] = useState({});
	const [rows, setRows] = useState(mockDataUsers);
	const { setDirty } = useOutletContext();
	const [ConfirmDeleteDialog, confirmDelete] = useConfirm();

	const updateRowModel = (rowModel) => {
		setRowModesModel(rowModel);
		setDirty(Object.values(rowModel).some((row) => row.mode === GridRowModes.Edit));
	}

	const handleEditClick = (id) => {
		updateRowModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
	};

	const handleSaveClick = (id) => {
		updateRowModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
	};

	const handleCancelClick = (id) => {
		updateRowModel({
			...rowModesModel, [id]: { mode: GridRowModes.View, ignoreModifications: true },
		});
	};

	const handleRowModesModelChange = (newRowModesModel) => {
		updateRowModel(newRowModesModel);
	};

	const handleRowEditStop = (params, event) => {
		if (params.reason === GridRowEditStopReasons.rowFocusOut) {
			event.defaultMuiPrevented = true;
		}
	};

	const handleDeleteClick = async (id) => {
		if (await confirmDelete("Confirm", "Are you sure you wish to delete this user?")) {
			// Do delete
			setRows(rows.filter((row) => row.id !== id));
		}
	};

	const columns = [
		{
			field: "firstName",
			headerName: "First Name",
			minWidth: 200
		},
		{
			field: "lastName",
			headerName: "Last Name",
			minWidth: 200
		},
		{
			field: "userName",
			headerName: "Username",
			minWidth: 150
		},
		{
			field: "role",
			headerName: "Role",
			editable: true,
			type: 'singleSelect',
			valueOptions: ['Admin', 'Instructor', 'User'],
			minWidth: 150,
		},
		{
			field: 'actions',
			type: 'actions',
			headerName: 'Actions',
			cellClassName: 'actions',
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
				];
			},
		},
		{
			field: '\u2800',
			sortable: false,
			flex: 1
		}
	];

	return (
		<Box m="10px">
			<Box display="flex" justifyContent="space-between">
				<Header title="User Registry" subtitle="Manage users" />
			</Box>
			<Box
				m="40px 0 0 0"
				p="0 0 20px 0"
				height="75vh"
				sx={gridStyle}
			>
				<DataGrid
					rows={rows}
					columns={columns}
					rowHeight={40}
					editMode="row"
					rowModesModel={rowModesModel}
					onRowModesModelChange={handleRowModesModelChange}
					onRowEditStop={handleRowEditStop}
					disableColumnMenu
				/>
			</Box>
			<ConfirmDeleteDialog />
		</Box>
	);
};

export default UserGrid;