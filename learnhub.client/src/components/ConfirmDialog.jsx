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
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';


const ConfirmDialog = ({ onClose, open }) => {

  const handleClose = () => {
    onClose(false);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Unsaved Changes</DialogTitle>
      <Typography varient="h6">Are you sure you want to leave without saving?</Typography>
      <Button variant="contained" onClick={() => onClose(true)}>Ok</Button>
      <Button variant="contained" onClick={() => onClose(false)}>Cancel</Button>
    </Dialog>
  );
}

export default ConfirmDialog;