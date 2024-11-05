import { useState } from 'react';
import { Box, useTheme } from "@mui/material";
import { GridRowModes, DataGrid, GridToolbarContainer, GridActionsCellItem, GridRowEditStopReasons, } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { tokens } from "../../theme";
import { useNavigate } from 'react-router-dom';

const CourseGrid = ({ gridData }) => {
	
    const theme = useTheme();
	  const colors = tokens(theme.palette.mode);

    const navigate = useNavigate();

    const [rowModesModel, setRowModesModel] = useState({});

    const handleRowEditStop = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
          event.defaultMuiPrevented = true;
        }
      };
    
      const handleEditClick = (id) => () => {
        navigate(`/admin/course/${id}`); 
        //setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
      };
    
      const handleSaveClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
      };
    
      const handleDeleteClick = (id) => () => {
        //setRows(rows.filter((row) => row.id !== id));
      };
    
      const handleCancelClick = (id) => () => {
        setRowModesModel({
          ...rowModesModel, [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });
      };

      const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
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
          
          const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
  
          if (isInEditMode) {
            return [
              <GridActionsCellItem
                icon={<SaveIcon />}
                label="Save"
                sx={{
                  color: 'primary.main',
                }}
                onClick={handleSaveClick(id)}
              />,
              <GridActionsCellItem
                icon={<CancelIcon />}
                label="Cancel"
                className="textPrimary"
                onClick={handleCancelClick(id)}
                color="inherit"
              />,
            ];
          }
  
          return [
            <GridActionsCellItem
              icon={<EditIcon />}
              label="Edit"
              className="textPrimary"
              onClick={handleEditClick(id)}
              color="inherit"
            />,
            <GridActionsCellItem
              icon={<DeleteIcon />}
              label="Delete"
              onClick={handleDeleteClick(id)}
              color="inherit"
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
        <Box
            m="40px 0 0 0"
            p="0 0 20px 0"
            height="75vh"
            sx={{
            "& .MuiDataGrid-root": {
                border: "none",
            },
            "& .MuiDataGrid-cell": {
                borderBottom: "none",
            },
            "& .MuiDataGrid-cell:focus": {
                outline: "none !important",
                },
            "& .MuiDataGrid-columnHeader":{
                backgroundColor: colors.grey[400],
            },
            "& .MuiDataGrid-virtualScroller": {
                backgroundColor: colors.primary[400],
            },
            "& .MuiDataGrid-footerContainer": {
                borderTop: "none",
                backgroundColor: colors.grey[400],
            },
            "& .MuiCheckbox-root": {
                color: `${colors.greenAccent[200]} !important`,
            },
            }}
        >
            <DataGrid 
                rows={gridData} 
                columns={columns}
                //editMode="row"
                //rowModesModel={rowModesModel}
                //onRowModesModelChange={handleRowModesModelChange}
                //onRowEditStop={handleRowEditStop}
                disableColumnMenu 
            />
        </Box>
	);
  };

export default CourseGrid;