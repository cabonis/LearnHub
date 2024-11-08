import { useTheme } from "@mui/material";
import Zoom from '@mui/material/Zoom';

const ZoomArea = ({ isShown, children }) => {

    const theme = useTheme();

    const transitionDuration = {
        enter: theme.transitions.duration.enteringScreen,
        exit: theme.transitions.duration.leavingScreen,
      };
     
  return (    
    <Zoom        
        in={isShown}
        timeout={transitionDuration}
        style={{
        transitionDelay: `${isShown ? transitionDuration.exit : 0}ms`,
        }}
        unmountOnExit
    >
        {children}
    </Zoom>
  );
};

export default ZoomArea;