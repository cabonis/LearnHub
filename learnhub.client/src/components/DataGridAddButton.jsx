import { GridToolbarContainer } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';

const DataGridAddButton = ({ text, navigate }) => {    
    return (
      <GridToolbarContainer>
        <Button color="secondary" startIcon={<AddIcon />} onClick={() => navigate(`/admin/course/`)}>
          {text}
        </Button>
      </GridToolbarContainer>
    );
  }

  export default DataGridAddButton;