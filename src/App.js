import "./App.css";
import Header from "./Components/Header";
import SignUp from "./Containers/SignUp";
import Login from "./Containers/Login";
import Games from "./Containers/Games";
import Game from "./Containers/Game";
import Favourites from "./Containers/Favourites";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { useState } from "react";
import Cookies from "js-cookie";

function App() {
  const [token, setToken] = useState(Cookies.get("token") || null);
  const [username, setUsername] = useState(Cookies.get("username") || "");

  const [title, setTitle] = useState("");

  const onLogin = (token, username) => {
    setToken(token);
    setUsername(username);
    Cookies.set("token", token);
    Cookies.set("username", username);
  };

  const onLogout = (token, username) => {
    setToken(null);
    setUsername("");
    Cookies.remove("token");
    Cookies.remove("username");
  };

  return (
    <Router>
      <Header username={username} token={token} onLogout={onLogout} />
      <Routes>
        <Route
          path={"/"}
          element={<Games title={title} setTitle={setTitle} />}
        />
        <Route path={"/signup"} element={<SignUp onLogin={onLogin} />} />
        <Route path={"/login"} element={<Login onLogin={onLogin} />} />
        <Route
          path={"/games/:GameId"}
          element={<Game onLogin={onLogin} token={token} />}
        />
        <Route
          path={"/favourites"}
          element={
            <Favourites onLogin={onLogin} username={username} token={token} />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
