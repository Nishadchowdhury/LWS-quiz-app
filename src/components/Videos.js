import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import useVideoList from "../hooks/useVideoList";
import classes from "../styles/Videos.module.css";
import Video from "./Video";

function Videos() {
  const [page, setPage] = useState(1);

  const [videos, loading, error, hasMore] = useVideoList(page);

  // console.log([videos, loading, error]);

  return (
    <div>
      <InfiniteScroll
        className={classes.videos}
        dataLength={videos?.length}
        hasMore={hasMore}
        next={() => setPage(page + 8)}
      >
        {videos.length > 0 &&
          videos?.map(video =>
            video?.noq > 0 ? (
              <Link
                to={"/quiz/" + video?.youtubeID}
                key={video?.youtubeID}
              >
                <Video
                  title={video?.title}
                  id={video?.youtubeID}
                  noq={video?.noq}
                />
              </Link>
            ) : (
              <Video
                title={video?.title}
                id={video?.youtubeID}
                noq={video?.noq}
                key={video?.youtubeID}
                style={{ cursor: "default" }}
              />
            )
          )}
      </InfiniteScroll>

      <div style={{ textAlign: "center", fontSize: "16px" }}>
        <h1>{!hasMore && "No more videos left!"}</h1>
      </div>

      {!loading && videos.length === 0 && (
        <div className=""> No data found! </div>
      )}

      {error && <div className=""> An error occurred! </div>}
      {loading && <div> Loading...</div>}
    </div>
  );
}

export default Videos;
