import { useState, useEffect } from 'react';
import dayjs from "dayjs";
import { Box } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import Tooltip from '@mui/material/Tooltip';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { gridStyle, buttonHoverStyle } from "../../../styles"
import DataGridAddButton from '../../../components/DataGridAddButton';
import useConfirm from "../../../hooks/useConfirm";
import { useFetchCourseModules, useDeleteModule } from "../../../hooks/ModuleHooks";

const CourseModules = () => {

	const navigate = useNavigate();
	const { course } = useOutletContext();
	const { data: modules, isLoading } = useFetchCourseModules(course.id);
	const deleteModule = useDeleteModule();

	const [rows, setRows] = useState([]);
	const [ConfirmDeleteDialog, confirmDelete] = useConfirm();

	useEffect(() => {
		setRows(modules);
	}, [modules]);

	const handleEditClick = (moduleId) => {
		navigate(`/admin/course/${course.id}/${moduleId}`);
	};

	const handleDeleteClick = async (id) => {
		if (await confirmDelete("Confirm", "Are you sure you wish to delete this module?")) {
			deleteModule.mutate({ id: id, courseId: course.id }, {
				onError: () => {
					setRows([
						...rows
					]);
				}
			});
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
			field: "startDate",
			headerName: "Start Date",
			minWidth: 150,
			renderCell: (params) => (
				<Box>
					{params.row.startDate ?
						dayjs(params.row.startDate).format("MMM D, YYYY") :
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
				height="70vh"
				sx={gridStyle}
			>
				<DataGrid
					rows={rows}
					columns={columns}
					rowHeight={40}
					loading={isLoading}
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