export const gridStyle = {
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
        backgroundColor: "primary.light",
        fontSize: "16px"
    },
    "& .MuiDataGrid-virtualScroller": {
        backgroundColor: "primary",
    },
    "& .MuiDataGrid-footerContainer": {
        borderTop: "1",
        backgroundColor: "primary.light",
    },
    "& .MuiCheckbox-root": {
        color: `secondary !important`,
    },
  };

export const buttonHoverStyle =  {'&:hover': {
    backgroundColor: 'secondary.main'
}}