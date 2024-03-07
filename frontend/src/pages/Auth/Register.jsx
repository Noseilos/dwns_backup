import { Link, useNavigate, useLocation } from "react-router-dom";
import Button from "../../components/Button";
// import { useAuth } from "../contexts/AuthContext";
import styles from "../styles/Register.module.css";
import { Fragment, useEffect, useState } from "react";
import PageNav from "../../components/PageNav";
import Spinner from "../../components/Spinner";
import axios from "axios";
import Divider from '@mui/material/Divider';

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;

  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(
    "/assets/img/default_avatar.jpg"
  );
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  let navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
    if (error) {
      console.log(error);
    }
  }, [error, isAuthenticated]);

  const onChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const register = async (userData) => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post(
        "http://localhost:3000/api/v1/register",
        userData,
        config
      );

      setIsAuthenticated(true);
      setLoading(false);
      setUser(data.user);
      navigate("/");

      // Display success notification
      //   notify("Registration successful", "success");
    } catch (error) {
      setIsAuthenticated(false);
      setLoading(false);
      setUser(null);
      setError(error);
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Validation checks
    if (!name || !email || !password || password.length < 6) {
      //   notify(
      //     "Please fill in all fields and ensure the password is at least 6 characters long"
      //   );
      return;
    }

    // Check if the email is already taken
    try {
      const { data } = await axios.get(
        `http://localhost:3000/api/v1/check-email?email=${email}`
      );

      if (data.exists) {
        // notify("Email is already taken", "error");
        return;
      }
    } catch (error) {
      console.error("Error checking email:", error);
    }

    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    formData.set("password", password);
    formData.set("avatar", avatar);

    register(formData);
  };

  return (
    <Fragment>
      <main className={styles.register}>
        <PageNav />
        
        <form
          className={styles.form}
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <div className={styles.row}>
            <Divider>REGISTER</Divider>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={onChange}
              name="name"
            />
          </div>
          <div className={styles.row}>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={onChange}
              name="email"
            />
          </div>
          <div className={styles.row}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={onChange}
              name="password"
            />
          </div>

          <div className={styles.row}>
            <label htmlFor="avatar_upload">Avatar</label>
            <div className={styles.avatarContainer}>
              <figure className={styles.avatar}>
                <img src={avatarPreview} alt="Avatar Preview" />
              </figure>
              <label htmlFor="customFile" className={styles.customFileLabel}>
                Choose Avatar
              </label>
              <input
                type="file"
                name="avatar"
                className={styles.customFileInput}
                id="customFile"
                accept="images/*"
                onChange={onChange}
              />
            </div>
          </div>

            <Button type="primary">Register</Button>
              <label ><Link className={styles.link}>Already have an account?</Link></label>
        </form>
      </main>
    </Fragment>
  );
};

export default Register;
