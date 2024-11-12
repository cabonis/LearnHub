import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

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

const ConfirmDialog = ({ title, message, open, handleConfirm, handleCancel }) => {

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} display="flex" flexDirection="column" justifyContent="space-between">

        <Box sx={{ borderBottom: 1, borderColor: "black" }}>
          <Typography color="black" id="modal-modal-title" variant="h4" component="h2">
            {title}
          </Typography>
        </Box>
        <Typography color="black" id="modal-modal-description" sx={{ mt: 2, p: 1 }}>
          {message}
        </Typography>

        <Box sx={{ mt: 2 }} display="flex" justifyContent="right">
          <Button sx={buttonStyle} color="secondary" variant="contained" onClick={() => handleConfirm()}>Ok</Button>
          <Button sx={buttonStyle} color="neutral" variant="contained" onClick={() => handleCancel()}>Cancel</Button>
        </Box>

      </Box>
    </Modal>
  );
}

export default ConfirmDialog;