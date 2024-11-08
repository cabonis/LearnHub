import { useState } from 'react';
import { Box } from "@mui/material";
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import Header from "../../components/Header";
import { mockCourseData } from "../../data/mockData";
import { useNavigate } from 'react-router-dom';
import { gridStyle, buttonHoverStyle } from "../global/ComponentStyles"
import DataGridAddButton from '../../components/DataGridAddButton';
import Tooltip from '@mui/material/Tooltip';
import useConfirm from "../../hooks/useConfirm";

const CourseGrid = () => {

  const navigate = useNavigate();

  const [rows, setRows] = useState(mockCourseData);
  const [ConfirmDeleteDialog, confirmDelete] = useConfirm();

  const handleEditClick = (id) => {
    navigate(`/admin/course/${id}`);
  };

  const handleDeleteClick = async (id) => {
    if (await confirmDelete("Confirm", "Are you sure you wish to delete this course?")) {
      // Do delete
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const columns = [
    {
      field: "title",
      headerName: "Title",
      minWidth: 200, flex: 0
    },
    {
      field: "instructor",
      headerName: "Instructor",
      minWidth: 200,
      renderCell: ({ row: { instructor } }) => {
        return `${instructor.firstName} ${instructor.lastName}`;
      },
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
    <Box m="10px">
      <Box display="flex" justifyContent="space-between">
        <Header title="Course Catalog" subtitle="Manage course catalog" />
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
          slots={{
            toolbar: DataGridAddButton,
          }}
          slotProps={{
            toolbar: { text: "Add Course", onClick: () => navigate(`/admin/course/`) },
          }}
        />

      </Box>
      <ConfirmDeleteDialog />
    </Box>
  );
};

export default CourseGrid;