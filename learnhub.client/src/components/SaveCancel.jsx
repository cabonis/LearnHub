import { Box } from "@mui/material";
import Fab from '@mui/material/Fab';
import ZoomArea from "./ZoomArea";
import Tooltip from '@mui/material/Tooltip';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';

const SaveCancel = ({ isSaveShown, isCancelShown, saveClicked, cancelClicked, sx }) => {

    return (
        <Box m="30px" display="flex" justifyContent="right" sx={sx}>
            <ZoomArea isShown={isSaveShown}>
                <Tooltip title="Save">
                    <Fab color="secondary" aria-label="save" sx={{ m: 1, p: 4 }} onClick={() => saveClicked()}>
                        <CheckOutlinedIcon />
                    </Fab>
                </Tooltip>
            </ZoomArea>
            <ZoomArea isShown={isCancelShown}>
                <Tooltip title="Undo Changes">
                    <Fab color="neutral" aria-label="cancel" sx={{ m: 1, p: 4 }} onClick={() => cancelClicked()}>
                        <ClearOutlinedIcon />
                    </Fab>
                </Tooltip>
            </ZoomArea>
        </Box>
    );
};

export default SaveCancel;