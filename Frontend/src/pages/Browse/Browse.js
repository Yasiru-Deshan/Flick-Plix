import React, { useEffect, useState } from "react";
import { MDBCol } from "mdbreact";
import BrowseItem from "../../components/Browse/browse";
import Carousel from "react-elastic-carousel";
import "./Browse.css";
import axios from "axios";

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 6 },
];

function Browse() {
  let [movieList, setMovieList] = useState([]);
  // let [thrillerMovieList, setThrillerMovieList] = useState([]);
  let [actionMovieList, setActionMovieList] = useState([]);
  let [horrorMovieList, setHorrorMovieList] = useState([]);
  // let [comedyMovieList, setComedyMovieList] = useState([]);
  let [romanceMovieList, setRomanceMovieList] = useState([]);
  let [search, setSearch] = useState("");

  useEffect(() => {
    const getMovies = () => {
      axios.get("http://localhost:8070/api/movies/").then((res) => {
        setMovieList(res.data);
      });
    };

    getMovies();
  }, []);

  // useEffect(() => {
  //   const getMovies = () => {
  //     axios
  //       .get("http://localhost:8070/api/movies/movie/Thriller")
  //       .then((res) => {
  //         setThrillerMovieList(res.data);
  //       });
  //   };

  //   getMovies();
  // }, []);

  // const AllThrillerMovies = () => {
  //   return thrillerMovieList.map((pName) => {
  //     return (
  //       <BrowseItem
  //         key={pName.id}
  //         id={pName._id}
  //         img={pName.img}
  //         title={pName.title}
  //         desc={pName.desc}
  //         year={pName.year}
  //       />
  //     );
  //   });
  // };

  useEffect(() => {
    const getActionMovies = () => {
      axios.get("http://localhost:8070/api/movies/movie/Action").then((res) => {
        setActionMovieList(res.data);
      });
    };

    getActionMovies();
  }, []);

  // const AllActionMovies = () => {
  //   return actionMovieList.map((aName) => {
  //     return (
  //       <BrowseItem
  //         key={aName.id}
  //         id={aName._id}
  //         img={aName.img}
  //         title={aName.title}
  //         desc={aName.desc}
  //         year={aName.year}
  //       />
  //     );
  //   });
  // };

  useEffect(() => {
    const getHorrorMovies = () => {
      axios.get("http://localhost:8070/api/movies/movie/Horror").then((res) => {
        setHorrorMovieList(res.data);
      });
    };

    getHorrorMovies();
  }, []);

  

  // useEffect(() => {
  //   const getComedyMovies = () => {
  //     axios.get("http://localhost:8070/api/movies/movie/Comedy").then((res) => {
  //       setComedyMovieList(res.data);
  //     });
  //   };

  //   getComedyMovies();
  // }, []);

  // const AllComedyMovies = () => {
  //   return comedyMovieList.map((aName) => {
  //     return (
  //       <BrowseItem
  //         key={aName.id}
  //         id={aName._id}
  //         img={aName.img}
  //         title={aName.title}
  //         desc={aName.desc}
  //         year={aName.year}
  //       />
  //     );
  //   });
  // };

  useEffect(() => {
    const getMovies = () => {
      axios
        .get("http://localhost:8070/api/movies/movie/Romance")
        .then((res) => {
          setRomanceMovieList(res.data);
        });
    };

    getMovies();
  }, []);

  

  //search filter
  if (search.length > 0) {
    movieList.filter((i) => {
      return i.title.toLowerCase().match(search.toLowerCase());
    });
    // thrillerMovieList = thrillerMovieList.filter((i) => {
    //   return i.title.toLowerCase().match(search.toLowerCase());
    // });

    actionMovieList = actionMovieList.filter((i) => {
      return i.title.toLowerCase().match(search.toLowerCase());
    });
    horrorMovieList = horrorMovieList.filter((i) => {
      return i.title.toLowerCase().match(search.toLowerCase());
    });
    // comedyMovieList = comedyMovieList.filter((i) => {
    //   return i.title.toLowerCase().match(search.toLowerCase());
    // });
    romanceMovieList = romanceMovieList.filter((i) => {
      return i.title.toLowerCase().match(search.toLowerCase());
    });
  }

  return (
    <div>
      <div
        style={{
          backgroundColor: "#101522",
          paddingTop: "50px"
          // background: 'linear-gradient(to right, #2C5364, #203A43, #0F2027)' /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        }}
      >
        
        <center>
          <MDBCol md="6" className="searchbar">
            <input
              className="form-control"
              type="text"
              placeholder="Search Movies"
              aria-label="Search"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              value={search}
            />
          </MDBCol>
        </center>
        <div className="MenuContainer">
          <div className="headingWrapper">
            <center>
              <h1 className="mHeading">Popular</h1>
              <hr style={{ backgroundColor: "white" }}></hr>
            </center>
          </div>

          <div className="carousel">
            <Carousel breakPoints={breakPoints}>
              {actionMovieList.map((aName) => {
                return (
                  <BrowseItem
                    key={aName.id}
                    id={aName._id}
                    img={aName.img}
                    title={aName.title}
                    desc={aName.desc}
                    year={aName.year}
                  />
                );
              })}
            </Carousel>
          </div>
        </div>
        <div className="MenuContainer">
          <div className="headingWrapper">
            <center>
              <h1 className="mHeading">Latest</h1>
              <hr style={{ backgroundColor: "white" }}></hr>
            </center>
          </div>

          <div className="carousel">
            <Carousel breakPoints={breakPoints}>
              {horrorMovieList.map((aName) => {
                return (
                  <BrowseItem
                    key={aName.id}
                    id={aName._id}
                    img={aName.img}
                    title={aName.title}
                    desc={aName.desc}
                    year={aName.year}
                  />
                );
              })}
            </Carousel>
          </div>
        </div>
        <div className="MenuContainer">
          <div className="headingWrapper">
            <center>
              <h1 className="mHeading">Upcoming</h1>
              <hr style={{ backgroundColor: "white" }}></hr>
            </center>
          </div>

          <div className="carousel">
            <Carousel breakPoints={breakPoints}>
              {romanceMovieList.map((pName) => {
                return (
                  <BrowseItem
                    key={pName.id}
                    id={pName._id}
                    img={pName.img}
                    title={pName.title}
                    desc={pName.desc}
                    year={pName.year}
                  />
                );
              })}
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Browse;
