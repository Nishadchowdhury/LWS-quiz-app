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
        setLoading(true);
        setError(false);
        await get(questionQuery).then(snapshot => {
          setLoading(false);
          if (snapshot.exists()) {
            const questionList = Object.values(snapshot.val());

            setLoading(false);
            setError(false);
            setQuestions(questionList);
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

  return [questions, loading, error];
}
export default useQuestionsList;
