import { Link } from "react-router-dom";
import classes from "../styles/Account.module.css";
import { useAuth } from "../contexts/AuthContext";

function Account() {
  const { user, signOut } = useAuth();

  const { displayName: name } = user || {};

  return (
    <div className={classes.account}>
      {name ? (
        <>
          <span className="material-icons-outlined" title="Account">
            account_circle
          </span>

          <span>{name}</span>

          <span
            onClick={signOut}
            className="material-icons-outlined"
            title="Logout"
          >
            logout
          </span>
        </>
      ) : (
        <>
          <Link to={"/signup"} href="signup.html">
            Signup
          </Link>

          <Link to={"/login"} href="signup.html">
            Log in
          </Link>
        </>
      )}
    </div>
  );
}
export default Account;
