import {useState, useEffect} from "react";
import YouTubeBackground from "./components/YoutubeBackground";
import {LoadingScreen} from "./components/LoadingScreen";
import {YouTubePlayer} from "react-youtube";
import {Content} from "./components/Content";
import internal from "stream";

const api = 'https://api.themanusia.me/anime-web';

function App() {
    const [loading, setLoading] = useState(true);
    const [ytLoading, setYtLoading] = useState(true);
    const [player, setPlayer] = useState<YouTubePlayer>();
    const [title, setTitle] = useState('');
    const [currentTime, setCurrentTime] = useState(1);
    const [duration, setDuration] = useState(1);
    const [videos, setVideos] = useState([]);
    const [socmeds, setSocmeds] = useState([]);

    useEffect(() => {
        return () => {
            fetchData()
        };
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(player.getCurrentTime());
        }, 1000);

        return () => clearInterval(interval);
    }, [player]);

    const onReady = (event: any) => {
        setYtLoading(true);
        setPlayer(event.target);
        event.target.pauseVideo();
        setYtLoading(false);
    }

    const fetchData = () => {
        Promise.all([
            fetch(`${api}/video`),
            fetch(`${api}/socmed`),
        ]).then(([video, socmed]) => {
            video.json().then((data) => {
                setVideos(data);
            });
            socmed.json().then((data) => {
                setSocmeds(data);
            })
            setLoading(false);
        });
    }

    const onLoad = () => {
        if (player != null) {
            player?.playVideo();
        }
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
            <LoadingScreen loading={(ytLoading && loading)} onLoad={onLoad}/>
            <YouTubeBackground videos={videos}
                               onStateChanged={() => onStateChanged()}
                               onReady={(event: any) => onReady(event)}/>
            <Content socmeds={socmeds}
                     onPause={onPause} title={title}
                     currentTime={currentTime} duration={duration}/>
        </div>
    );
}

export default App;
