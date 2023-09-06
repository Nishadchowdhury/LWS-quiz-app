import { getDatabase, ref, set } from "firebase/database";
import _ from "lodash";
import { useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import useQuestionsList from "../../hooks/useQuestion";
import Answers from "../Answers";
import MiniPlayer from "../MiniPlayer";
import ProgressBar from "../ProgressBar";

const initialState = null;

const reducer = (state, action) => {
  switch (action.type) {
    case "questions":
      action.value.forEach(question => {
        question.options.forEach(option => {
          option.checked = false;
        });
      });

      return action.value;

    //handle answers here
    case "answer":
      const questions = _.cloneDeep(state);
      questions[action.questionId].options[
        action.optionIndex
      ].checked = action.value;

      return questions;

    default:
      return state;
  }
};

function Quiz() {
  const { videoId } = useParams();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questions, loading, error] = useQuestionsList(videoId);

  const [noq, dispatch] = useReducer(reducer, initialState);

  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      dispatch({
        type: "questions",
        value: questions,
      });
    }
  }, [loading, questions]);

  function handleAnswerChange(e, index) {
    dispatch({
      type: "answer",
      questionId: currentQuestion,
      optionIndex: index,
      value: e.target.checked,
    });
  }

  //handle when user clicks the next btn to jump into the next Q.
  function nextQuestion() {
    if (currentQuestion <= questions.length) {
      setCurrentQuestion(prev => prev + 1);
    }
  }

  //handle when user clicks the previous btn to jump into the next Q.
  function prevQuestion() {
    if (currentQuestion > 0 && currentQuestion <= questions.length) {
      setCurrentQuestion(prev => prev - 1);
    }
  }

  //calculate the percentages of progressBar
  const percentage =
    questions.length > 0
      ? ((currentQuestion + 1) / questions.length) * 100
      : 0;

  //submit user's performance
  const { user } = useAuth();

  const submitUserAnswers = async () => {
    const { uid } = user;

    const db = getDatabase();

    const resultRef = ref(db, `result/${uid}`);

    await set(resultRef, {
      [videoId]: noq,
    });

    // we are not using directly link to navigate, instead we are sending an obj that contains the questions to compare in result page.
    // otherwise we have to make another request to get questions on result page that not a good option.
    navigate(`/result/${videoId}`, { state: { noq } });
  };

  return (
    <>
      {loading && <div> Loading... </div>}
      {error && <div> There was an error! </div>}

      {!loading && !error && noq && noq.length > 0 && (
        <>
          <h1>{noq[currentQuestion]?.title}</h1>
          <h4>Question can have multiple answers</h4>
          <Answers
            options={noq[currentQuestion].options}
            handleChange={handleAnswerChange}
            input={true}
          />
          <ProgressBar
            prevQuestion={prevQuestion}
            nextQuestion={nextQuestion}
            percentage={percentage}
            submit={submitUserAnswers}
          />
          <MiniPlayer />
        </>
      )}
    </>
  );
}
export default Quiz;
