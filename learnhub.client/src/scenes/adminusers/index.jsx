import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataUsers } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";

const AdminUsers = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const columns = [
	  {
		field: "firstName",
		headerName: "First Name",
		flex: 1,
	  },
	  {
		field: "lastName",
		headerName: "Last Name",
		flex: 1,
	  },
	  {
		field: "userName",
		headerName: "Username",
		flex: 1,
	  },
	  {
		field: "role",
		headerName: "Role",
		flex: 1,
		renderCell: ({ row: { role } }) => {
		  return (
			<Box
			  width="auto"
			  p="5px"
			  display="flex"
			  justifyContent="center"
			  alignItems="center"
			  backgroundColor={
				role === "Admin"
				  ? colors.greenAccent[600]
				  : role === "Instructor"
				  ? colors.greenAccent[700]
				  : colors.greenAccent[800]
			  }
			  borderRadius="4px"
			>
			  {role === "Admin" && <AdminPanelSettingsOutlinedIcon />}
			  {role === "Instructor" && <SecurityOutlinedIcon />}
			  {role === "User" && <LockOpenOutlinedIcon />}
			  <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
				{role}
			  </Typography>
			</Box>
		  );
		},
	  },
	];
  
	return (
	  <Box m="20px">
		<Header title="Users" subtitle="Manage system users" />
		<Box
		  m="40px 0 0 0"
		  height="75vh"
		  width="75vw"
		  sx={{
			"& .MuiDataGrid-root": {
			  border: "none",
			},
			"& .MuiDataGrid-cell": {
			  borderBottom: "none",
			},
			"& .MuiDataGrid-cell:focus": {
				outline: "none",
			  },
			"& .MuiDataGrid-columnHeader":{
				backgroundColor: colors.grey[400],
				fontSize: "18px"
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
		  <DataGrid checkboxSelection rows={mockDataUsers} columns={columns} />
		</Box>
	  </Box>
	);
  };

export default AdminUsers;