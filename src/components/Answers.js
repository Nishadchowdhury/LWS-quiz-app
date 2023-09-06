import { Fragment } from "react";
import classes from "../styles/Answers.module.css";
import CheckBox from "./CheckBox";

function Answers({ options = [], handleChange, input }) {
  return (
    <div className={classes.answers}>
      {options.map((option, i) => (
        <Fragment key={i}>
          {input ? (
            <CheckBox
              className={classes.answer}
              text={option?.title}
              value={i}
              checked={option?.checked}
              onChange={e => handleChange(e, i)}
            />
          ) : (
            <CheckBox
              className={`${classes.answer} ${
                option.correct
                  ? classes.correct
                  : option.checked
                  ? classes.wrong
                  : null
              }`}
              text={option?.title}
              value={i}
              defaultChecked={option?.checked}
              disabled
            />
          )}
        </Fragment>
      ))}
    </div>
  );
}
export default Answers;
