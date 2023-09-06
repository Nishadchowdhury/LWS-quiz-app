import TextInput from "./TextInput";
import CheckBox from "./CheckBox";
import Button from "./Button";
import Form from "./Form";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

function SignUpForm() {
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setError("Password don't match");
    }

    try {
      setError("");
      setLoading(true);

      await signUp(username, email, password);

      navigate("/");
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError("Failed to create an account!");
    }
  }

  return (
    <>
      <Form style={{ height: "500px" }} onSubmit={handleSubmit}>
        <TextInput
          required
          type="text"
          placeholder="Enter name"
          icon="person"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />

        <TextInput
          required
          type="email"
          placeholder="Enter email"
          icon="alternate_email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <TextInput
          required
          type="password"
          placeholder="Enter password"
          icon="lock"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <TextInput
          required
          type="password"
          placeholder="Conform password"
          icon="lock_clock"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
        />

        <CheckBox
          required
          onChange={e => setAgree(e.target.checked)}
          checked={agree}
          text={"I agree to the Terms & Conditions"}
        />

        <Button disabled={loading} type="submit">
          <span>Submit now</span>
        </Button>

        {error && <p className="error"> {error} </p>}

        <div className="info">
          Already have an account? <Link to={"/login"}>Login</Link>{" "}
          instead.
        </div>
      </Form>
    </>
  );
}
export default SignUpForm;
