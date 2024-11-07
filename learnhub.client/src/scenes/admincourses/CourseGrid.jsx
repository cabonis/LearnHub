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

const CourseGrid = () => {
	
    const navigate = useNavigate();

    const [rows, setRows] = useState(mockCourseData);
    
      const handleEditClick = (id) => () => {
        navigate(`/admin/course/${id}`); 
        //setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
      };
    
      const handleDeleteClick = (id) => () => {
        // Do delete
        setRows(rows.filter((row) => row.id !== id));
      };

	const columns = [
	  {
      field: "title",
      headerName: "Title",
      minWidth: 150
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
        minWidth: 100,
        getActions: ({ id }) => {      
          return [
            <GridActionsCellItem
              icon={<EditIcon />}
              label="Edit"
              className="textPrimary"
              onClick={handleEditClick(id)}
              color="inherit"
              sx={buttonHoverStyle}
            />,
            <GridActionsCellItem
              icon={<DeleteIcon />}
              label="Delete"
              onClick={handleDeleteClick(id)}
              color="inherit"
              sx={buttonHoverStyle}
            />,
          ];
        },
      },
      {
        field: '\u2800',
        sortable: false,
        flex: 1
      },
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
            disableColumnMenu 
            slots={{
              toolbar: DataGridAddButton,
            }}
            slotProps={{
              toolbar: { navigate, text: "Add Course" },
            }}
        />
        
      </Box>
    </Box>
	);
};

export default CourseGrid;