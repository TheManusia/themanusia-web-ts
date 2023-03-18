import {useState, useEffect} from "react";
import YouTubeBackground from "./components/YoutubeBackground";
import {LoadingScreen} from "./components/LoadingScreen";
import {YouTubePlayer} from "react-youtube";
import {Content} from "./components/Content";


function App() {
    const [loading, setLoading] = useState(true);
    const [player, setPlayer] = useState<YouTubePlayer>();
    const [title, setTitle] = useState('');
    const [currentTime, setCurrentTime] = useState(1);
    const [duration, setDuration] = useState(1);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(player?.getCurrentTime() ?? 0);
        }, 1000);

        return () => clearInterval(interval);
    }, [player]);

    const onReady = (event: any) => {
        setPlayer(event.target);
        event.target.pauseVideo();
        setLoading(false);
    }

    const onLoad = () => {
        player.playVideo();
    }

    const onPause = () => {
        if (player.getPlayerState() === 1) {
            player.pauseVideo();
        } else {
            player.playVideo();
        }

        return player.getPlayerState() === 1;
    }

    const onStateChanged = () => {
        setTitle(player.getVideoData().title);
        setDuration(player.getDuration());
    }

    return (
        <div className="App">
            <LoadingScreen loaded={loading} onLoad={onLoad}/>
            <YouTubeBackground onStateChanged={() => onStateChanged()}
                               onReady={(event: any) => onReady(event)}/>
            <Content onPause={onPause} title={title} currentTime={currentTime} duration={duration}/>
        </div>
    );
}

export default App;
