import ReactPlayer from 'react-player/youtube';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import LearnHubLogo from "./LearnHubLogo";
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'primary.light',
    border: '0px solid #000',
    borderRadius: "10px",
    boxShadow: 24,
    p: 1
};

const VideoPlayer = ({ url, open, handleClose }) => {
    return (
        <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box
                sx={style}
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
            >
                <Box
                    m="5px"
                    display="flex"
                    justifyContent="space-between"
                >
                    <LearnHubLogo fontSize="small" />
                    <IconButton onClick={handleClose}>
                        <ClearOutlinedIcon />
                    </IconButton>
                </Box>
                <Box
                    m="25px"
                >
                    <ReactPlayer
                        url={url}
                        controls={true}
                        height={450}
                        width={800}
                    />
                </Box>

            </Box>
        </Modal >
    );
}

export default VideoPlayer;