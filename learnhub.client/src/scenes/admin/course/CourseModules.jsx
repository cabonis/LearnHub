import { useState } from 'react';
import { Box } from "@mui/material";
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { useNavigate } from 'react-router-dom';
import { gridStyle, buttonHoverStyle } from "../../global/ComponentStyles"
import DataGridAddButton from '../../../components/DataGridAddButton';
import Tooltip from '@mui/material/Tooltip';
import { useOutletContext } from 'react-router-dom';
import useConfirm from "../../../hooks/useConfirm";

const CourseModules = () => {

	const navigate = useNavigate();
	const { course } = useOutletContext();
	const [rows, setRows] = useState(course.modules);
	const [ConfirmDeleteDialog, confirmDelete] = useConfirm();

	const handleEditClick = (moduleId) => {
		navigate(`/admin/course/${course.id}/${moduleId}`);
	};

	const handleDeleteClick = async (id) => {
		if (await confirmDelete("Confirm", "Are you sure you wish to delete this module?")) {
			// Do delete
			setRows(rows.filter((row) => row.id !== id));
		}
	};

	const columns = [
		{
			field: "title",
			headerName: "Title",
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
		<Box m="0">
			<Box
				p="0 0 20px 0"
				height="72vh"
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
						toolbar: { text: "Add Module", onClick: () => navigate(`/admin/course/${course.id}/add`) },
					}}
				/>

			</Box>
			<ConfirmDeleteDialog />
		</Box>
	);
};

export default CourseModules;