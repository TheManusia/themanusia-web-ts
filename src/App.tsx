import {useState} from "react";
import YouTubeBackground from "./components/YoutubeBackground";
import {LoadingScreen} from "./components/LoadingScreen";
import {YouTubePlayer} from "react-youtube";
import {Content} from "./components/Content";

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

  const onPause = () => {
      if (player.getPlayerState() === 1) {
          player.pauseVideo();
      } else {
          player.playVideo();
      }

      return player.getPlayerState() === 1;
  }

  return (
      <div className="App">
        <LoadingScreen loaded={loading} onLoad={onLoad}/>
        <YouTubeBackground onReady={(event: any) => onReady(event)}/>
        <Content onPause={onPause} />
      </div>
  );
}

export default App;
