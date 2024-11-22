import { useState } from 'react';
import VideoPlayer from '../components/VideoPlayer';

const useVideoPlayer = () => {

    const [promise, setPromise] = useState(null);
    const [url, setUrl] = useState("");

    const show = (url) => new Promise((resolve, reject) => {
        setUrl(url);
        setPromise({ resolve });
    });

    const handleCancel = () => {
        promise?.resolve(false);
        setPromise(null);
    };

    const Video = () => {
        return (
            <VideoPlayer
                url={url}
                open={promise !== null}
                handleClose={handleCancel}
            />
        )
    }

    return [Video, show];
};

export default useVideoPlayer;