import classes from "../styles/Video.module.css";
function Video({ title, id, noq, ...rest }) {
  return (
    <div className={classes.video} {...rest}>
      <img
        src={`http://img.youtube.com/vi/${id}/maxresdefault.jpg`}
        alt="Video title here"
      />
      <p>
        {title?.length > 50 ? title?.slice(0, 50) + "..." : title}
      </p>
      <div className={classes.qmeta}>
        <p>{noq} Questions</p>
        <p>Total points : {noq * 5}</p>
      </div>
    </div>
  );
}
export default Video;
