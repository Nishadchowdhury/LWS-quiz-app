import { Link } from "react-router-dom";
import classes from "../styles/ProgressBar.module.css";
import Button from "./Button";

function ProgressBar({
  prevQuestion,
  nextQuestion,
  percentage,
  submit,
}) {
  return (
    <div className={classes.progressBar}>
      <div className={classes.backButton} onClick={prevQuestion}>
        <span className="material-icons-outlined"> arrow_back </span>
      </div>
      <div className={classes.rangeArea}>
        <div className={classes.tooltip}>{percentage}% Complete!</div>
        <div className={classes.rangeBody}>
          <div
            className={classes.progress}
            style={{ width: percentage + "%" }}
          ></div>
        </div>
      </div>

      {percentage !== 100 ? (
        <Button className={classes.next} onClick={nextQuestion}>
          <span>Next Question</span>
          <span className="material-icons-outlined">
            arrow_forward
          </span>
        </Button>
      ) : (
        <Button className={classes.next} onClick={submit}>
          <span>Submit Quiz</span>
          <span className="material-icons-outlined">
            arrow_forward
          </span>
        </Button>
      )}
    </div>
  );
}
export default ProgressBar;
