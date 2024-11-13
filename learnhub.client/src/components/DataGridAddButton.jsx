import { GridToolbarContainer } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';

const DataGridAddButton = ({ text, onClick, disabled }) => {
  return (
    <GridToolbarContainer>
      <Button
        color="secondary"
        startIcon={<AddIcon />}
        onClick={onClick}
        disabled={disabled}
      >
        {text}
      </Button>
    </GridToolbarContainer>
  );
}

export default DataGridAddButton;