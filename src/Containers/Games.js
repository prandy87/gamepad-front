import logo from "../Assets/bigologo.png";
import { useState, useEffect } from "react";

import axios from "axios";
import { Link } from "react-router-dom";

const Games = ({ title, setTitle }) => {
  const [data, setData] = useState();
  const [data2, setData2] = useState();
  const [data3, setData3] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [platforms, setPlatforms] = useState("");
  const [genres, setGenres] = useState("");

  const handleNextPage = () => {
    return setPage(page + 1);
  };

  const handlePrevPage = () => {
    return setPage(page - 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!platforms && !genres) {
        try {
          const response = await axios.get(
            `http://localhost:4000/games?page=${page}&search=${search}`
          );

          setData(response.data);
          setIsLoading(false);
        } catch (error) {
          console.log(error.message);
        }
      } else if (platforms || genres || search) {
        try {
          const response = await axios.get(
            `http://localhost:4000/games?page=${page}&search=${search}&platforms=${platforms}&genres=${genres}`
          );
          setData(response.data);
          setIsLoading(false);
        } catch (error) {
          console.log(error.message);
        }
      }

      try {
        const response2 = await axios.get(`http://localhost:4000/platforms`);
        setData2(response2.data);
      } catch (error) {
        console.log(error.message);
      }
      try {
        const response3 = await axios.get("http://localhost:4000/genres");
        setData3(response3.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [page, search, platforms, genres]);
  console.log(genres);

  return isLoading ? (
    <div>LOADING...</div>
  ) : (
    <>
      <div className="games">
        <div className="container">
          <div className="games-top">
            <img src={logo} alt={"GamePad"} />
            <input
              className="search-bar"
              placeholder="Search for a game..."
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            ></input>
            <span className="gamenbrs">Search {data.count} games</span>
            <span></span>
          </div>

          <div className="searchoptions">
            <span>Choose a platform: </span>
            <select onChange={(e) => setPlatforms(e.target.value)}>
              <option value="">All</option>
              {data2 &&
                data2.results.map((plat) => {
                  return (
                    <>
                      <option value={plat.id}>{plat.name}</option>
                    </>
                  );
                })}
            </select>
            <span> Sort by genre: </span>
            <select onChange={(e) => setGenres(e.target.value)}>
              <option value="">All</option>
              {data3 &&
                data3.results.map((genres) => {
                  return (
                    <>
                      <option value={genres.id}>{genres.name}</option>
                    </>
                  );
                })}
            </select>
          </div>
          <div className="gamelist">
            <h2>Most Relevant Games</h2>
          </div>
          <div className="gamelist">
            {data.results.map((games) => {
              return (
                <div className="gamecard" key={games.id}>
                  <Link to={`/games/${games.id}`}>
                    <img src={games.background_image} alt={games.name} />
                    <h3>{games.name}</h3>
                  </Link>
                </div>
              );
            })}
            <div className="pagination">
              <span>
                {page === 1 ? (
                  <span></span>
                ) : (
                  <button
                    onClick={() => {
                      handlePrevPage();
                    }}
                  >
                    Previous
                  </button>
                )}

                {data.count > 20 && (
                  <button
                    onClick={() => {
                      handleNextPage();
                    }}
                  >
                    Next
                  </button>
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Games;
