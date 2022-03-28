import logo from "../Assets/logo.png";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ token, username, onLogout }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="header">
        <span className="logo-container">
          <Link to={"/"}>
            <img src={logo} alt="GamePad" />
          </Link>
        </span>

        <span className="menu">
          {token !== null && (
            <Link to={"/favourites"}>
              <span>My Collection</span>
            </Link>
          )}{" "}
          {"  "}
          {token !== null && username !== null ? (
            <>
              <div className="useravatar">
                <Link to={"/"}>
                  <p>{username}</p>
                </Link>
              </div>
              <button
                onClick={() => {
                  onLogout();
                }}
              >
                Log Out
              </button>
            </>
          ) : (
            <Link to={"/signup"}>
              <button>Sign Up</button>
            </Link>
          )}
        </span>
      </div>
    </>
  );
};

export default Header;
