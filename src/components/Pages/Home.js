import { useAuth } from "../../contexts/AuthContext";
import Videos from "../Videos";

function Home() {
  const data = useAuth();

  return (
    <div>
      <Videos />
    </div>
  );
}
export default Home;
