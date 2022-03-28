import axios from "axios";
import cross from "../Assets/cross.png";
import user from "../Assets/user-regular.svg";
import list from "../Assets/list-ol-solid.svg";
import comm from "../Assets/comment-alt-regular.svg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useState } from "react";

const SignUp = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      username.length === 0 ||
      email.length === 0 ||
      password2.length === 0 ||
      password.length === 0
    ) {
      alert("Please fill in all requested fields");
    } else if (password !== password2) {
      alert("Passwords do not match!");
    } else {
      //requete axios.

      try {
        const response = await axios.post("http://localhost:4000/signup", {
          username: username,
          email: email,
          password: password,
        });
        console.log(response.data);
        onLogin(response.data.token, response.data.account.username);
        alert("Succesfully registered. Welcome.");
        //recup du token dc signin
      } catch (error) {
        console.log(error.message);
        if (error.message.includes("400")) {
          alert(
            `Your signUp cannot be processed, it is likely that ${email} is already registered.`
          );
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
              <h2>Sign Up</h2>

              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              ></input>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              ></input>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                ></input>
                <input
                  type="password"
                  placeholder="Confirm password"
                  value={password2}
                  onChange={(e) => {
                    setPassword2(e.target.value);
                  }}
                ></input>
              </div>
              <input type="file" className="filebtn" />
              <input type="submit" className="subbtn"></input>
              <Link to={"/login"}>
                {" "}
                <span>Already have an account? Sign in!</span>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
