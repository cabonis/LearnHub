import { useTheme } from "@mui/material";
import Zoom from '@mui/material/Zoom';
import { animationDuration } from "../styles";

const ZoomArea = ({ isShown, children, duration = animationDuration }) => {

  const transitionDuration = {
    enter: duration,
    exit: duration,
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