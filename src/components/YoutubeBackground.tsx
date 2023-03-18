import YouTube from 'react-youtube';
import {useState} from "react";

function YoutubeBackground({onReady}: { onReady: Function }) {
    const videoIds = ['BnkhBwzBqlQ', "_YnwnxSE2UA", "fbJiRfIp_cU"];
    const videoId = videoIds[0];
    const [paused, setPaused] = useState(false);
    let videoNumber = 0;

    const opts = {
        height: '100%',
        width: '100%',
        playerVars: {
            autoplay: 1,
            mute: 1,
            loop: 1,
            controls: 0,
            showinfo: 0,
            modestbranding: 1,
            disablekb: 1,
            fs: 0,
        }
    };

    const onEnd = (event: any) => {
        videoNumber += 1;
        if (videoIds.length === videoNumber) {
            videoNumber = 0;
        }
        event.target.loadVideoById(videoIds[videoNumber]);
    }

    const onStateChanged = (event: any) => {
        if (event.data === 1) {
            setPaused(false);
        } else {
            setPaused(true);
        }
    }

    return (
        <div className="absolute top-0 left-0 w-full h-full z-0">
            <YouTube videoId={videoId} opts={opts}
                     className="absolute top-0 left-0 w-full h-screen z-0 aspect-[4/3]"
                     onEnd={onEnd} onReady={(event) => onReady(event)}
                     onStateChange={(event) => onStateChanged(event)}/>
            <div
                className={`absolute top-0 left-0 w-full h-screen z-0 bg-black ${paused ? "opacity-100" : "opacity-0"}`}/>
            <div className="absolute top-0 left-0 w-full h-full z-0 bg-black opacity-75"/>
        </div>
    )
}

export default YoutubeBackground;
