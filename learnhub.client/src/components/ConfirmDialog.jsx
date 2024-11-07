import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Modal from '@mui/material/Modal';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { blue } from '@mui/material/colors';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'neutral.light',
  border: '2px solid #000',
  borderRadius: "10px",
  boxShadow: 24,
  p: 2,
};

const buttonStyle = {
  width: 100,
  height: 35,
  margin: .5
}

const ConfirmDialog = ({ onClose, open, text }) => {

  const handleClose = (event, reason) => {
    if (reason && reason === "backdropClick") 
        return;
    myCloseModal();
}

  return (
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} display="flex" flexDirection="column" justifyContent="space-between">
          
            <Box sx={{borderBottom: 1, borderColor: "black"}}>
            <Typography color="black" id="modal-modal-title" variant="h4" component="h2">
              Confirm
            </Typography>
            </Box>
            <Typography color="black" id="modal-modal-description" sx={{ mt: 2, p: 1 }}>
              {text}            
            </Typography>

          <Box sx={{mt: 2}} display="flex" justifyContent="right">
            <Button sx={buttonStyle} color="secondary" variant="contained" onClick={() => onClose(true)}>Ok</Button>
            <Button sx={buttonStyle} color="neutral" variant="contained" onClick={() => onClose(false)}>Cancel</Button>
          </Box>

        </Box>
      </Modal>
  );
}

export default ConfirmDialog;