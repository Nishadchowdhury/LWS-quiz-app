import { useEffect, useState } from "react";
import {
  get,
  getDatabase,
  orderByKey,
  query,
  ref,
} from "firebase/database";
import app from "../firebase";

function useQuestionsList(videoId) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    // database related works
    async function fetchQuestions() {
      const db = getDatabase(app);
      const questionQuery = query(
        ref(db, `quiz/${videoId}/questions`),
        orderByKey()
      );

      try {
        await get(questionQuery).then(snapshot => {
          if (snapshot.exists()) {
            const questionList = Object.values(snapshot.val());

            if (
              JSON.stringify(questions) !==
              JSON.stringify(questionList)
            ) {
              setQuestions(prev => {
                return [...prev, ...questionList];
              });
            } else {
              setQuestions(prev => {
                return [...prev];
              });
            }
          } else {
            setLoading(false);
            setError(false);
            console.log("end videos");
          }
        });
      } catch (error) {
        setLoading(false);
        setError(false);
        console.log(error);
      }
    }

    setLoading(true);
    fetchQuestions();
  }, [questions, videoId]);

  return [questions, loading, error];
}
export default useQuestionsList;
