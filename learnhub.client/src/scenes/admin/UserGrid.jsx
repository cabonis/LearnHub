import { useState } from 'react';
import { Box } from "@mui/material";
import { GridRowModes, DataGrid,  GridActionsCellItem, GridRowEditStopReasons, } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import Header from "../../components/Header";
import { mockDataUsers } from "../../data/mockData";
import { gridStyle, buttonHoverStyle } from "../global/ComponentStyles"

const UserGrid = () => {
	
    const [rowModesModel, setRowModesModel] = useState({});
    const [rows, setRows] = useState(mockDataUsers);

    const handleRowEditStop = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
          event.defaultMuiPrevented = true;
        }
      };
    
      const handleEditClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
      };
    
      const handleSaveClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
      };
    
      const handleDeleteClick = (id) => () => {
        // Do delete
        setRows(rows.filter((row) => row.id !== id));
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
                  <GridActionsCellItem
                    icon={<SaveIcon />}
                    label="Save"
                    color= 'secondary'
                    onClick={handleSaveClick(id)}
                  />,
                  <GridActionsCellItem
                    icon={<CancelIcon />}
                    label="Cancel"
                    className="textPrimary"
                    onClick={handleCancelClick(id)}
                    color="inherit"
                    sx={buttonHoverStyle}
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
    </Box>
	);
};

export default UserGrid;