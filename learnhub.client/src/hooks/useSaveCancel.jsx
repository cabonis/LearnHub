
import { useState } from 'react';
import SaveCancel from '../components/SaveCancel';

const useSaveCancel = () => {

    const [isShown, setShown] = useState(false);

    const SaveCancelButtons = ({ handleSaveClicked, handleCancelClicked }) => {
        return (
            <SaveCancel
                isSaveShown={isShown}
                isCancelShown={isShown}
                saveClicked={handleSaveClicked}
                cancelClicked={handleCancelClicked}
                sx={{ position: 'absolute', right: 15, bottom: 15 }}
            />
        )
    }

    return { SaveCancelButtons, setShown };
};

export default useSaveCancel;