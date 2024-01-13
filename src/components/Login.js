import { React, useState } from "react";
import styles from "./Login.module.css";
import InputControl from "./InputControl/InputControl.js";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Login = ({ user }) => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    pass: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const handleSubmission = () => {
    if (!values.email || !values.pass) {
      setErrorMsg("Fill all fields");
      return;
    }
    if ((values.email == "admin@gmail.com") & (values.pass == "admin@123")) {
      navigate("/getAll");
    }
    setErrorMsg("");
    setSubmitButtonDisabled(true);
    // this function is return promise(.then)
    signInWithEmailAndPassword(auth, values.email, values.pass)
      .then(async (res) => {
        setSubmitButtonDisabled(false);

        navigate("/rooms");
        console.log(res);
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        setErrorMsg(err.message);
        console.log("Error-", err.message);
      });
  };

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <form onSubmit={handleSubmission}>
      <div className={styles.container}>
        <div className={styles.innerBox}>
          <h1 className={styles.heading}>Login</h1>
          <InputControl
            label="Email"
            placeholder="Enter email adderss"
            onChange={(event) => {
              setValues((prev) => ({ ...prev, email: event.target.value }));
            }}
          />
          <InputControl
            label="Password"
            placeholder="Enter Password"
            type="password"
            onChange={(event) => {
              setValues((prev) => ({ ...prev, pass: event.target.value }));
            }}
          />

          <div className={styles.footer}>
            <b className={styles.error}> {errorMsg}</b>
            <button disabled={submitButtonDisabled} onClick={handleSubmission}>
              Login
            </button>
            <p>
              Already have an account?{""}
              <span>
                <Link to="/signup">Sign up</Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Login;
