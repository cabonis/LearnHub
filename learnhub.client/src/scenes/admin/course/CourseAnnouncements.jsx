import { Box } from "@mui/material";
import { useState, useEffect } from 'react';
import { GridRowModes, DataGrid, GridActionsCellItem, GridRowEditStopReasons, } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import dayjs from "dayjs";
import { useOutletContext } from 'react-router-dom';
import { gridStyle, buttonHoverStyle } from "../../global/ComponentStyles"
import DataGridAddButton from '../../../components/DataGridAddButton';
import Tooltip from '@mui/material/Tooltip';
import useConfirm from "../../../hooks/useConfirm";

const CourseAnnouncements = () => {

	const { course, setDirty, setSaveCancel } = useOutletContext();
	const [rows, setRows] = useState(course.announcements);
	const [rowModesModel, setRowModesModel] = useState({});
	const [ConfirmDeleteDialog, confirmDelete] = useConfirm();

	setSaveCancel(false);

	useEffect(() => {
		setDirty(Object.values(rowModesModel).some((row) => row.mode === GridRowModes.Edit));
	}, [rowModesModel]);


	const handleDeleteClick = async (id) => {
		if (await confirmDelete("Confirm", "Are you sure you wish to delete this announcement?")) {
			// Do delete
			setRows(rows.filter((row) => row.id !== id));
		}
	};

	const handleAddClick = () => {
		const id = 0;

		setRows((oldRows) => [
			...oldRows,
			{ id, text: '', priority: 'Low', datetime: '', isNew: true },
		]);
		setRowModesModel((oldModel) => ({
			...oldModel,
			[id]: { mode: GridRowModes.Edit, fieldToFocus: 'text' },
		}));
	};

	const handleEditClick = (id) => {
		setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
	};

	const handleSaveClick = (id) => {
		// DO SAVE!!
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

	const columns = [
		{
			field: "text",
			headerName: "Announcement",
			editable: true,
			minWidth: 500,
		},
		{
			field: "priority",
			headerName: "Priority",
			editable: true,
			type: 'singleSelect',
			valueOptions: ['Low', 'High'],
			minWidth: 100,
		},
		{
			field: "datetime",
			headerName: "Time Stamp",
			minWidth: 200,
			renderCell: (params) => (
				<Box>
					{params.row.datetime ?
						dayjs(params.row.datetime).format("MMM D, YYYY h:mm A") :
						""}
				</Box>
			),
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
				];
			},
		}
	];



	return (
		<Box>
			<Box
				p="0 0 20px 0"
				height="72vh"
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
					slots={{
						toolbar: DataGridAddButton,
					}}
					slotProps={{
						toolbar: { text: "Add Announcement", onClick: handleAddClick },
					}}
				/>

			</Box>
			<ConfirmDeleteDialog />
		</Box>
	)
}

export default CourseAnnouncements;