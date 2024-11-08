import { useState, useRef, useEffect  } from 'react';
import { useBlocker, Outlet } from 'react-router-dom';
import useConfirm from "../../hooks/useConfirm";

const Admin = () => {

    const [isDirty, setDirty] = useState(false);
    const blocker = useBlocker(isDirty);  
    const [ConfirmNavigateDialog, confirmNavigate] = useConfirm();

    useEffect(() => {
        if(blocker.state === "blocked")
          (async () => {
            if(await confirmNavigate("Confirm", "You have unsaved changes. Are you sure you want to leave?")) {
                setDirty(false);
                blocker.proceed();
            }
            else 
                blocker.reset();
          })();
      }, [blocker]);

	return (		
        <>
            <Outlet context={{
                isDirty: isDirty,
                setDirty: setDirty,    
            }} />

            <ConfirmNavigateDialog />
        </>
	)
}

export default Admin;