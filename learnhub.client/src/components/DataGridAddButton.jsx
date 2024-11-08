import { GridToolbarContainer } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';

const DataGridAddButton = ({ text, onClick }) => {
  return (
    <GridToolbarContainer>
      <Button color="secondary" startIcon={<AddIcon />} onClick={onClick}>
        {text}
      </Button>
    </GridToolbarContainer>
  );
}

export default DataGridAddButton;