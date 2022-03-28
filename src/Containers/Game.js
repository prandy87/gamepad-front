import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import list from "../Assets/list-ol-solid.svg";
import comm from "../Assets/comment-alt-regular.svg";

const Game = ({ onLogin, token }) => {
  const { GameId } = useParams();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/games/${GameId}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log({ message: error.message });
      }
    };
    fetchData();
  }, [GameId]);

  const addFav = async (id, token) => {
    const response = await axios.post("http://localhost:4000/favourites", {
      token: token,
      GameID: id,
    });
    console.log(response.data);
    alert(response.data);
  };

  return isLoading ? (
    <span>Loading...</span>
  ) : (
    <div className="game">
      <div className="container">
        <h1>{data.name}</h1>
        <div className="gamepage">
          <img src={data.background_image} alt={data.name} />
          <div className="gameinfo">
            <div className="gameactions">
              <button
                onClick={(e) => {
                  token
                    ? addFav(GameId, token)
                    : alert(
                        "You must be registered to add a favourite to your collection"
                      );
                }}
              >
                Save to collection
                <img src={list} alt="collection" />
              </button>
              <button>
                Add a review
                <img src={comm} alt="review" />
              </button>
            </div>
            <div className="details">
              <div className="par">
                <h4>Plateforms</h4>
                <p>
                  {data.platforms.map((platform) => {
                    return <>{platform.platform.name}, </>;
                  })}
                </p>
              </div>
              <div className="par">
                <h4>Genre</h4>
                <p>
                  {data.genres.map((genres) => {
                    return <>{genres.name}, </>;
                  })}
                </p>
              </div>
            </div>
            <div className="details">
              <div className="par">
                <h4>Release Date</h4>
                <p>{data.released}</p>
              </div>
              <div className="par">
                <h4>Developpers</h4>
                <p>
                  {data.developers.map((dev) => {
                    return <>{dev.name}, </>;
                  })}
                </p>
              </div>
            </div>
            <div className="details">
              <div className="par">
                <h4>Publisher/s</h4>
                <p>
                  {data.publishers.map((pub) => {
                    return <>{pub.name} </>;
                  })}
                </p>
              </div>
              <div className="par">
                <h4>Age Rating</h4>
                {data.esrb_rating && (
                  <p>
                    {data.esrb_rating.id}, {data.esrb_rating.name}
                  </p>
                )}
              </div>
            </div>
            <div className="details">
              <div className="about">
                <h4>About</h4>
                <p>{data.description}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="game">
          <h2>Games like {data.name}</h2>
          <div className="similargames">
            {data.tags.map((game) => {
              return (
                <div>
                  <Link to={`/games/${game.id}`}>
                    <img src={game.image_background} alt="id" key={game.id} />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Game;
