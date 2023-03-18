import YouTube from 'react-youtube';
import {useEffect, useState} from "react";

function youtube_parser(url: string) {
    var str = `${url}`;
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = str.match(regExp);
    return (match && match[7].length == 11) ? match[7] : '';
}

let videoNumber: number = 0;

let defaultData = ['BnkhBwzBqlQ', "_YnwnxSE2UA", "fbJiRfIp_cU"];

function YoutubeBackground({
                               onReady,
                               onStateChanged,
                               videos
                           }: { onReady: Function, onStateChanged: Function, videos: any[] }) {
    const [videoIds, setVideoIds] = useState(defaultData);
    const videoId = videoIds[0];
    const [paused, setPaused] = useState(false);
    const [seeks, setSeeks] = useState([0, 0, 0]);

    useEffect(() => {
        const ids = videos.map((video) => youtube_parser(video.url));
        const seeks = videos.map((video) => video.seekto);
        if (ids.length > 0) {
            setVideoIds(ids);
            setSeeks(seeks);
        }
    }, [videos]);

    const opts = {
        height: '100%',
        width: '100%',
        playerVars: {
            autoplay: 1,
            mute: 0,
            controls: 0,
            showinfo: 0,
            modestbranding: 1,
            disablekb: 1,
            fs: 0,
        }
    };

    const onEnd = (event: any) => {
        nextVideo(event.target);
    }

    const nextVideo = (player: any) => {
        videoNumber += 1;
        if (videoIds.length === videoNumber) {
            videoNumber = 0;
        }
        player.loadVideoById(videoIds[videoNumber]);
        player.seekTo(seeks[videoNumber]);
    }

    const onStateChange = (event: any) => {
        onStateChanged(event);
        if (event.data === 1) {
            setPaused(false);
        } else {
            setPaused(true);
        }
    }

    const onReadya = (event: any) => {
        onReady(event);

        if (document.body.classList.contains('loaded')) {
            event.target.playVideo();
        }
    }

    const onError = (event: any) => {
        nextVideo(event.target);
    }

    return (
        <div className="absolute top-0 left-0 w-full h-full z-0">
            <YouTube videoId={videoId} opts={opts}
                     className="absolute top-0 left-0 w-full h-screen z-0 aspect-[4/3]"
                     onEnd={(event) => onEnd(event)} onReady={(event) => onReadya(event)}
                     onError={(event) => onError(event)}
                     onStateChange={(event) => onStateChange(event)}/>
            <div
                className={`absolute top-0 left-0 w-full h-screen z-0 bg-black ${paused ? "opacity-100" : "opacity-0"}`}/>
            <div className="absolute top-0 left-0 w-full h-full z-0 bg-black opacity-75"/>
        </div>
    )
}

export default YoutubeBackground;
