import Answers from "../Answers";
import ProgressBar from "../ProgressBar";
import MiniPlayer from "../MiniPlayer";
import { useParams } from "react-router-dom";
import useQuestionsList from "../../hooks/useQuestion";
import { useReducer, useState } from "react";

function Quiz() {
  const { videoId } = useParams();
  const [currentQuestion, setCurrentQuestion] = useState(0);

  // const [questions, loading, error] = useQuestionsList(videoId);

  // const reducer = (state, action) => {

  //   switch (action.type) {
  //     case value:
  //       break;

  //     default:
  //       break;
  //   }
  // };

  // const [qna, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <h1>Pick three of your favorite Star Wars Flims</h1>
      <h4>Question can have multiple answers</h4>
      <Answers />
      <ProgressBar />
      <MiniPlayer />
    </>
  );
}
export default Quiz;
