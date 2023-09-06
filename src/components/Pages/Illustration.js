import classes from "../../styles/Illustration.module.css";
import SignupImage from "../../assets/images/signup.svg";
function Illustration() {
  return (
    <div className={classes.illustration}>
      <img src={SignupImage} alt="Signup" />
    </div>
  );
}

export default Illustration;
