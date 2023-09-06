import { useEffect, useState } from "react";
import {
  get,
  getDatabase,
  limitToFirst,
  orderByKey,
  query,
  ref,
  startAt,
} from "firebase/database";
import app from "../firebase";

function useVideoList(page) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [videos, setVideos] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    // database related works
    async function fetchVideos() {
      const db = getDatabase(app);
      const videoQuery = query(
        ref(db, "videos"),
        orderByKey(),
        limitToFirst(8),
        startAt(page + "")
      );

      await get(videoQuery)
        .then(snapshot => {
          if (snapshot.exists()) {
            const videoList = Object.values(snapshot.val());

            setVideos(prev => {
              if (
                JSON.stringify(prev) !== JSON.stringify(videoList)
              ) {
                return [...prev, ...videoList];
              } else {
                return [...prev];
              }
            });
          } else {
            setLoading(false);
            setError(false);
            setHasMore(false);
            console.log("end videos");
          }
        })
        .catch(error => {
          console.error(error);
        });
    }

    setLoading(true);

    if (page !== 1) {
      setTimeout(() => {
        fetchVideos();
      }, 500);
    } else {
      fetchVideos();
    }
  }, [page]);

  return [videos, loading, error, hasMore];
}
export default useVideoList;
