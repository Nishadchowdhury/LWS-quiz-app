import classes from "../styles/Summary.module.css";
import successImage from "../assets/images/success.png";
import useFetch from "../hooks/useFetch";
import { useMemo } from "react";

function Summary({ score, noq }) {
  //use useMemo to prevent unwanted re renders/ optimized
  const getKeyword = useMemo(() => {
    if ((score / (noq.length * 5)) * 100 < 50) {
      return "failed";
    } else if ((score / (noq.length * 5)) * 100 < 75) {
      return "good";
    } else if ((score / (noq.length * 5)) * 100 < 100) {
      return "very good";
    } else {
      return "excellent";
    }
  }, [score, noq]);

  const imageUrl = `https://api.pexels.com/v1/search?query=${getKeyword}&per_page=1`;
  // without useMemo const imageUrl = `https://api.pexels.com/v1/search?query=${getKeyword()}&per_page=1`;

  const [loading, error, result] = useFetch(imageUrl, "get", {
    Authorization: process.env.REACT_APP_PEXELS_API_KEY,
  });

  const image = result ? result.photos[0].src.medium : successImage;

  return (
    <div className={classes.summary}>
      <div className={classes.point}>
        <p className={classes.score}>
          Your score is <br />
          {score} out of {noq.length * 5}
        </p>
      </div>

      {loading && (
        <div className={classes.badge}> Loading your badge... </div>
      )}

      {error && (
        <div className={classes.badge}> An error occurred! </div>
      )}

      {!loading && !error && (
        <div className={classes.badge}>
          <img src={image} alt="Success" />
        </div>
      )}
    </div>
  );
}
export default Summary;
