import { Box } from "@mui/material";
import Fab from '@mui/material/Fab';
import ZoomArea from "./ZoomArea";
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';

const SaveCancel = ({ isSaveShown, isCancelShown, saveClicked, cancelClicked, sx }) => {
     
  return (
    <Box m="30px" display="flex" justifyContent="right" sx={sx}>
        <ZoomArea isShown={isSaveShown}>
            <Fab color="secondary" aria-label="save" sx={{m: 1, p: 4}} onClick={() => saveClicked()}>
                <CheckOutlinedIcon />
            </Fab>
        </ZoomArea>
        <ZoomArea isShown={isCancelShown}>
            <Fab color="neutral" aria-label="cancel" sx={{m: 1, p: 4}} onClick={() => cancelClicked()}>
                <ClearOutlinedIcon />
            </Fab>
        </ZoomArea>
    </Box>
  );
};

export default SaveCancel;