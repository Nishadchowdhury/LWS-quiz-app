import classes from "../styles/MiniPlayer.module.css";
import { useRef, useState } from "react";
import ReactPlayer from "react-player/youtube";

function MiniPlayer({ videoId, title }) {
  const buttonRef = useRef();
  const [status, setStatus] = useState(false);

  function toggleMiniPlayer() {
    if (!status) {
      buttonRef.current.classList.remove(classes.floatingBtn);
      setStatus(true);
    } else {
      buttonRef.current.classList.add(classes.floatingBtn);
      setStatus(false);
    }
  }

  return (
    <div
      className={`${classes.miniPlayer} ${classes.floatingBtn}`}
      ref={buttonRef}
      onClick={toggleMiniPlayer}
    >
      <span className={`material-icons-outlined ${classes.open} `}>
        play_circle_filled
      </span>
      <span
        className={`material-icons-outlined ${classes.close} `}
        onClick={toggleMiniPlayer}
      >
        close
      </span>
      <ReactPlayer
        // controls
        width="300px"
        height="168px"
        playing={status}
        className={classes.player}
        url={`https://www.youtube.com/watch?v=${videoId}`}
      />
      <p>{title}</p>
    </div>
  );
}
export default MiniPlayer;
