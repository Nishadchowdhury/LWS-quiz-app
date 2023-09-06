import _ from "lodash";
import { useLocation, useParams } from "react-router-dom";
import useAnswersList from "../../hooks/useAnswers";
import Analysis from "../Analysis";
import Summary from "../Summary";

function Result() {
  const location = useLocation();
  const { videoId } = useParams();
  const { pathname, state } = location;
  const { noq } = state;
  const [answers, loading, error] = useAnswersList(videoId);

  function calculateScore() {
    let score = 0;
    //                     []           0
    answers.forEach((questions, index_1) => {
      let correctIndexes = [],
        checkedIndexes = [];

      questions.options.forEach((option, index_2) => {
        if (option.correct) correctIndexes.push(index_2);
        if (noq[index_1].options[index_2].checked) {
          checkedIndexes.push(index_2);
          option.checked = true;
        }
      });

      if (_.isEqual(correctIndexes, checkedIndexes)) {
        score = +5;
      }
    });

    return score;
  }
  console.log(answers);
  console.log(noq);

  const userScore = calculateScore();

  return (
    <>
      {loading && <div> Loading...</div>}
      {error && <div> Loading...</div>}
      {answers && answers.length > 0 && (
        <>
          <Summary score={userScore} noq={noq} />
          <Analysis answers={answers} />
        </>
      )}
    </>
  );
}
export default Result;

// answers.forEach((q, i) => {
//   let correctIndexes = [],
//     checkedIndexes = [];

//   q.options.forEach((option, i_2) => {
//     if (option.correct) correctIndexes.push(i_2);
//     if (noq[i].options[i_2].checked) {
//       checkedIndexes.push(i_2);
//       option.checked = true;
//     }
//   });

//   if (_.isEqual(correctIndexes, checkedIndexes)) {
//     score = score + 5;
//   }
// });
