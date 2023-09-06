import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import Form from "./Form";
import TextInput from "./TextInput";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";

function LoginFrom() {
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async e => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);

      await signIn(email, password);

      navigate("/");
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError("Failed to Login!");
    }
  };

  return (
    <>
      <Form style={{ height: "330px" }} onSubmit={handleLogin}>
        <TextInput
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
          icon={"alternate_email"}
          type="text"
          placeholder="Enter email"
        />

        <TextInput
          required
          value={password}
          onChange={e => setPassword(e.target.value)}
          icon={"lock"}
          type="password"
          placeholder="Enter password"
        />

        <Button disabled={loading} type="submit">
          <span>Log in now</span>
        </Button>

        {error && <p className="error">{error}</p>}

        <div class="info">
          Don't have an account? <Link to={"/singup"}>Sign up</Link>{" "}
          instead.
        </div>
      </Form>
    </>
  );
}
export default LoginFrom;
