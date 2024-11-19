import { useState, useEffect } from 'react';
import { Box } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import Header from "../../../components/Header";
import Scene from '../../global/Scene';
import Tooltip from '@mui/material/Tooltip';
import useConfirm from "../../../hooks/useConfirm";
import { useAuthenticatedUser } from "../../../hooks/useAuthorization";
import { gridStyle, buttonHoverStyle } from "../../../styles";
import { useFetchUsers, useUpdateUserRole, useDeleteUser } from '../../../hooks/UserHooks';
import { GridRowModes, DataGrid, GridActionsCellItem, GridRowEditStopReasons, } from '@mui/x-data-grid';

const UserGrid = () => {

	const { data, isLoading } = useFetchUsers();
	const updateUserRole = useUpdateUserRole();
	const deleteUser = useDeleteUser();
	const user = useAuthenticatedUser();

	const [rowModesModel, setRowModesModel] = useState({});
	const [rows, setRows] = useState([]);
	const [ConfirmDeleteDialog, confirmDelete] = useConfirm();

	useEffect(() => {
		setRows(data);
	}, [data]);

	const updateRowModel = (rowModel) => {
		setRowModesModel(rowModel);
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
			deleteUser.mutate(id, {
				onError: () => {
					setRows([
						...rows
					]);
				}
			});
			setRows(rows.filter((row) => row.id !== id));
		}
	};

	const processRowUpdate = (newRow, oldrow, { rowId }) => {
		updateUserRole.mutate(newRow, {
			onError: () => {
				setRows(rows => rows.map(row =>
					row.id === rowId ? oldrow : row)
				);
			}
		});
		return newRow;
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
			minWidth: 150
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
			getActions: (props) => {
				const { id, row } = props;
				const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

				const isDisabled = row.userName === user.userName;

				if (isInEditMode) {
					return [
						<GridActionsCellItem
							icon={<Tooltip title="Save"><SaveIcon /></Tooltip>}
							disabled={isDisabled}
							label="Save"
							color='secondary'
							onClick={() => handleSaveClick(id)}
						/>,
						<GridActionsCellItem
							icon={<Tooltip title="Cancel"><CancelIcon /></Tooltip>}
							label="Cancel"
							className="textPrimary"
							onClick={() => handleCancelClick(id)}
							color="inherit"
							sx={buttonHoverStyle}
						/>
					];
				}

				return [

					<GridActionsCellItem
						icon={<Tooltip title="Edit"><EditIcon /></Tooltip>}
						disabled={isDisabled}
						label="Edit"
						className="textPrimary"
						onClick={() => handleEditClick(id)}
						color="inherit"
						sx={buttonHoverStyle}
					/>,
					<GridActionsCellItem
						icon={<Tooltip title="Delete"><DeleteIcon /></Tooltip>}
						disabled={isDisabled}
						label="Delete"
						onClick={() => handleDeleteClick(id)}
						color="inherit"
						sx={buttonHoverStyle}
					/>
				];
			},
		}
	];

	return (
		<Scene
			title="User Registry"
			subtitle="Manage users"
		>
			<Box
				height="100%"
				sx={gridStyle}
			>
				<DataGrid
					rows={rows}
					columns={columns}
					rowHeight={40}
					editMode="row"
					loading={isLoading}
					processRowUpdate={processRowUpdate}
					experimentalFeatures={{ newEditingApi: true }}
					rowModesModel={rowModesModel}
					onRowModesModelChange={handleRowModesModelChange}
					onRowEditStop={handleRowEditStop}
					isCellEditable={(params) => params.row.userName !== user.userName}
				/>
			</Box>
			<ConfirmDeleteDialog />
		</Scene>
	);
};

export default UserGrid;