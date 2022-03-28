import axios from "axios";
import cross from "../Assets/cross.png";
import user from "../Assets/user-regular.svg";
import list from "../Assets/list-ol-solid.svg";
import comm from "../Assets/comment-alt-regular.svg";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useState } from "react";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email.length === 0 || password.length === 0) {
      alert("Please fill in requested fields.");
    } else {
      try {
        const response = await axios.post("http://localhost:4000/login", {
          email: email,
          password: password,
        });
        console.log(response.data);
        onLogin(response.data.token, response.data.account.username);
        alert(
          `Succesfully logged in, ${response.data.account.username}. Welcome.`
        );
        navigate("/");
      } catch (error) {
        console.log({ message: error.message });
        if (error.message.includes("401")) {
          alert("Invalid password");
        } else if (error.message.includes("400")) {
          alert("Invalid email");
        }
      }
    }
  };
  return (
    <>
      <div className="games">
        <div className="container">
          <div className="modal">
            <div className="leftbox">
              <img src={cross} alt={"GamePad"} />
              <h2>How it works ? </h2>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginTop: "10%",
                  marginLeft: "5%",
                }}
              >
                <img src={user} alt="user" />
                {"  "}
                <span>
                  Log into your free account to be able to get all features from
                  Gamepad.
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginTop: "10%",
                  marginLeft: "5%",
                }}
              >
                <img src={list} alt="favouritegames" />
                {"  "}
                <span>Add a game to your collection.</span>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginTop: "10%",
                  marginLeft: "5%",
                }}
              >
                <img src={comm} alt="review" />
                {"  "}
                <span>Leave a review for a game.</span>
              </div>
            </div>
            <form className="rightbox" onSubmit={handleSubmit}>
              <h2>LogIn</h2>

              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              ></input>

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />

              <input type="submit" className="subbtn"></input>
              <Link to={"/signup"}>
                {" "}
                <span>Don't have an account? Sign up now!</span>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
