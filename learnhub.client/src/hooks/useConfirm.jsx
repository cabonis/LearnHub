
  import { useState } from 'react';
  import ConfirmDialog from '../components/ConfirmDialog';

  const useConfirm = () => {

    const [promise, setPromise] = useState(null);
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
  
    const confirm = (title, message) => new Promise((resolve, reject) => {
        setTitle(title);
        setMessage(message);
        setPromise({ resolve });
    });
  
    const handleClose = () => {
      setPromise(null);
    };
  
    const handleConfirm = () => {
      promise?.resolve(true);
      handleClose();
    };
  
    const handleCancel = () => {
      promise?.resolve(false);
      handleClose();
    };

    const ConfirmationDialog = () => {
      return (
        <ConfirmDialog
            title={title}
            message={message}
            open={promise !== null}
            handleConfirm={handleConfirm}
            handleCancel={handleCancel}
        />
      )
    }
    
    return [ConfirmationDialog, confirm];
  };
  
  export default useConfirm;