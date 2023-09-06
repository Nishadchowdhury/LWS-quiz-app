import { useEffect, useState } from "react";
import {
  get,
  getDatabase,
  orderByKey,
  query,
  ref,
} from "firebase/database";
import app from "../firebase";

function useAnswersList(videoId) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    // database related works
    async function fetchQuestions() {
      const db = getDatabase(app);
      const answersQuery = query(
        ref(db, `answers/${videoId}/questions`),
        orderByKey()
      );

      try {
        setLoading(true);
        setError(false);
        await get(answersQuery).then(snapshot => {
          setLoading(false);
          if (snapshot.exists()) {
            const questionList = Object.values(snapshot.val());

            setLoading(false);
            setError(false);
            setAnswers(questionList);
          } else {
            setLoading(false);
            setError(false);
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
  }, [videoId]);

  return [answers, loading, error];
}
export default useAnswersList;
