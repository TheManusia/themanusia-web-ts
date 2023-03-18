import {useState} from "react";
import YouTubeBackground from "./components/YoutubeBackground";
import {LoadingScreen} from "./components/LoadingScreen";
import {YouTubePlayer} from "react-youtube";

function App() {
  const [loading, setLoading] = useState(true);
  const [player, setPlayer] = useState<YouTubePlayer>();

  const onReady = (event: any) => {
    console.log("onReady");
    setPlayer(event.target);
    event.target.pauseVideo();
    setLoading(false);
  }

  const onLoad = () => {
    player.playVideo();
  }

  return (
      <div className="App">
        <LoadingScreen loaded={loading} onLoad={onLoad}/>
        <YouTubeBackground onReady={(event: any) => onReady(event)}/>
        <div className="relative z-10 text-white">
            <h1>Ambatunat</h1>
        </div>
      </div>
  );
}

export default App;
