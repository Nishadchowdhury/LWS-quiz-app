import Illustration from "../Pages/Illustration";
import SignUpForm from "../SignUpForm";

function SignUp() {
  return (
    <>
      <h1>Create an account</h1>
      <div className="column">
        <Illustration />

        <SignUpForm />
      </div>
    </>
  );
}
export default SignUp;
