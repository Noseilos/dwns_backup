import Button from "../components/Button";
import PageNav from "../components/PageNav";
import { useAuth } from "../contexts/AuthContext";
import styles from "./styles/Login.module.css";
import { Fragment, useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { authenticate, getUser } from "../utils/helpers";
import Divider from '@mui/material/Divider';


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  let location = useLocation();
  const redirect = location.search
    ? new URLSearchParams(location.search).get("redirect")
    : "";

  const login = async (email, password) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `http://localhost:3000/api/v1/user/login`,
        { email, password },
        config
      );

      authenticate(data, () => {
        // notify("Login successful");
        navigate(`/${redirect}`);
        setTimeout(() => {
          window.location.reload();
        }, 100);
      });
    } catch (error) {
      // toast.error("Invalid email or password", {
      //   position: toast.POSITION.BOTTOM_RIGHT,
      // });
    }
  };
  const submitHandler = (e) => {
    e.preventDefault();

    // Validation checks
    if (!email.trim() || !password.trim()) {
      // notify("Please enter both email and password");
      return;
    }

    login(email, password);
  };
  useEffect(() => {
    if (getUser() && redirect === "/") {
      navigate(`${redirect}`);
    }
  }, []);
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <main className={styles.login}>
          <PageNav />
          <form className={styles.form} onSubmit={submitHandler}>
            <div className={styles.row}>
            <Divider>LOGIN</Divider>
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder="email@example.com"
              />
            </div>

            <div className={styles.row}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder="••••••••"
              />
            </div>

              <Button type="primary">Login</Button>
            <div className={styles.lnk}>
              <label ><Link className={styles.link}>Forgot Password?</Link></label>
              <label ><Link className={styles.link} to="/register">Don't have an account?</Link></label>

              </div>

          </form>
        </main>
      )}
    </Fragment>
  );
};
export default Login;
