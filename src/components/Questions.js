import classes from "../styles/Question.module.css";
import Answers from "./Answers";

function Questions({ answers = [] }) {
  return (
    <>
      {answers.map((answer, i) => (
        <div className={classes.question} key={i}>
          <div className={classes.qtitle}>
            <span className="material-icons-outlined">
              help_outline
            </span>
            {answer?.title}
          </div>

          <Answers options={answer.options} input={false} />
        </div>
      ))}
    </>
  );
}
export default Questions;
