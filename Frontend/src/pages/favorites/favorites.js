import React, { useEffect, useState, useRef, useContext } from "react";
import { MDBCol } from "mdbreact";
import FavoritesItem from "../../components/Favorites/favoriteItem";
import Carousel from "react-elastic-carousel";
import "./favorites.css";
import Playlist from "../../components/Playlist/playlist";
import axios from "axios";
import Modal from "react-modal";
import { Form } from "react-bootstrap";
import CloseButton from "react-bootstrap/CloseButton";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { AuthContext } from "../../context/AuthContext";

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 6 },
];

function Favorites() {
  const auth = useContext(AuthContext);
  const name = useRef();
  const desc = useRef();
  let [plist, setPlaylist] = useState([]);
  let [favs, setFavs] = useState([]);
  const [mdal, setModal] = useState(false);
  let [search, setSearch] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    let newPlay;

    const newPlaylist = {
      userId: "611b74dd16f8353848675308",
      name: name.current.value,
      desc: desc.current.value,
    };

    try {    
      const config = {
      headers: {
      "x-auth-token": `${auth.token}`,
      "Content-Type": "application/json",
    },
  },
      newPlay = await axios.post(
        `http://localhost:8070/api/auth/${auth.userId}/newplaylist`,
        newPlaylist,
        config
      );

      if (newPlay) {
        window.alert("New Play list has been created");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {            
    const config = {
    headers: {
      "x-auth-token": `${auth.token}`,
      "Content-Type": "application/json",
    },
  };
    const getFavs = () => {
      axios.get(`http://localhost:8070/api/auth/${auth.userId}/favorites`,config).then((res) => {
        setFavs(res.data);
      });
    };

    getFavs();
  }, []);

  useEffect(() => {     
     const config = {
      headers: {
      "x-auth-token": `${auth.token}`,
      "Content-Type": "application/json",
    },
  };
    const getPlayLists = () => {
      axios.get(`http://localhost:8070/api/auth/${auth.userId}/playlists`, config)
        .then((res) => {
          setPlaylist(res.data);
        });
    };

    getPlayLists();
  }, []);

  const PlaylistAll = () => {
    return plist.map((pName) => {
      return (
        <Playlist
          key={pName.id}
          id={pName._id}
          name={pName.name}
          desc={pName.desc}
        />
      );
    });
  };

  //search filter
  if (search.length > 0) {
    plist = plist.filter((i) => {
      return i.name.toLowerCase().match(search.toLowerCase());
    });
  }

  //Generate Playlist Report
  // const pdf1 = () => {
  //   const loading = document.getElementById("loading");
  //   loading.style.display = ""; //display loading icon
  //   const dwnIcon = document.getElementById("dwn-icon");
  //   dwnIcon.style.display = "none"; //hide download icn

  //   setTimeout(() => {
  //     loading.style.display = "none";
  //     dwnIcon.style.display = "";
  //   }, 1300); //display loading icon for 2 seconds

  //   let bodyData = [];
  //   for (let i = 0; plist.length > i; i++) {
  //     bodyData.push([plist[i].name, plist[i].desc]);
  //   } //save json data to bodydata in order to print in the pdf table

  //   const doc = new jsPDF({ orientation: "portrait" });
  //   var time = new Date().toLocaleString();
  //   doc.setFontSize(20);
  //   doc.text(`My Playlists Report`, 105, 13, null, null, "center");
  //   doc.setFontSize(10);
  //   doc.text(`(Generated on ${time})`, 105, 17, null, null, "center");
  //   doc.setFontSize(12);
  //   doc.text(
  //     "FlickPlix © 2021 All rights reserved.",
  //     105,
  //     22,
  //     null,
  //     null,
  //     "center"
  //   );

  //   doc.autoTable({
  //     theme: "grid",
  //     styles: { halign: "center" },
  //     headStyles: { fillColor: [71, 201, 76] },
  //     startY: 27,
  //     head: [["PlayList Name", "Title"]],
  //     body: bodyData,
  //   });
  //   doc.save("MyPlayLists.pdf");
  // };

  //Generate Favorites Movie Report
  const pdf2 = () => {
    const loading = document.getElementById("loading");
    loading.style.display = ""; //display loading icon
    const dwnIcon = document.getElementById("dwn-icon");
    dwnIcon.style.display = "none"; //hide download icn

    setTimeout(() => {
      loading.style.display = "none";
      dwnIcon.style.display = "";
    }, 1300); //display loading icon for 2 seconds

    let bodyData = [];
    for (let j = 0; favs.length > j; j++) {
      bodyData.push([favs[j].title, favs[j].year, favs[j].type]);
    } //save json data to bodydata in order to print in the pdf table

    const doc = new jsPDF({ orientation: "portrait" });
    var time = new Date().toLocaleString();
    doc.setFontSize(20);
    doc.text(`Favorite Movies Collection`, 105, 13, null, null, "center");
    doc.setFontSize(10);
    doc.text(`(Generated on ${time})`, 105, 17, null, null, "center");
    doc.setFontSize(12);
    doc.text(
      "FlickPlix © 2021 All rights reserved.",
      105,
      22,
      null,
      null,
      "center"
    );

    doc.autoTable({
      theme: "grid",
      styles: { halign: "center" },
      headStyles: { fillColor: [71, 201, 76] },
      startY: 27,
      head: [["Movie Title", "Year", "Genre"]],
      body: bodyData,
    });
    doc.save("Favorites-Collection.pdf");
  };

  return (
    <div>
      <Modal
        isOpen={mdal}
        onRequestClose={() => setModal(false)}
        style={{
          overlay: {
            backgroundColor: "rgba(49, 49, 49, 0.8)",
            width: "100%",
            height: "100%",
          },

          content: {
            width: "calc(200px + 15vw)",
            height: "400px",
            borderRadius: "5px",
            color: "black",
            background: "white",
            margin: "0 auto",
            marginTop: "100px",
          },
        }}
      >
        <CloseButton onClick={() => setModal(false)} variant="white">
          Close
        </CloseButton>
        <h1>Create a New Playlist</h1>

        <Form onSubmit={submitHandler}>
          <Form.Label style={{ color: "blue" }}>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter playlist name"
            ref={name}
          />

          <Form.Label style={{ color: "blue" }}>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter playlist description"
            ref={desc}
          />

          <button
            type="submit"
            style={{
              fontSize: "calc(0.2vw + 12px)",
              borderRadius: "3px",
              padding: "calc(15px + 1vw)",
              color: "#fff",
              backgroundColor: "#01bf71",
              border: "none",
              width: "100%",
              marginTop: "10px",
            }}
          >
            Create
          </button>
        </Form>
      </Modal>

      <div
        style={{
          paddingTop: "50px",
          background:
            "#101522" /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */,
        }}
      >
        <React.Fragment>
          <center>
            <MDBCol md="6" className="searchbar">
              <input
                className="form-control"
                type="text"
                placeholder="Search playlists"
                aria-label="Search"
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                value={search}
              />
            </MDBCol>
          </center>
          <div className="FavMenuContainer">
            <div className="headingWrapper">
              <center>
                <h1 className="mHeading">Favorites</h1>
                <hr style={{ backgroundColor: "white" }}></hr>
              </center>
            </div>

            <div className="carousel">
              {favs.length===0 ?(
                <div style={{ display: "flex", margin: "auto" }}>
                  <p className="playDesc">No items to show</p>
                </div>
               ) :(
                <Carousel
                  breakPoints={breakPoints}
                  itemsToShow={3}
                  pagination={true}
                  isRTL={false}
                  disableArrowsOnEnd={false}
                  enableSwipe={true}
                  easing="ease"
                >
                  {favs.map((mName) => {
                    return (
                      <FavoritesItem
                        key={mName.id}
                        id={mName.movieId}
                        title={mName.title}
                        img={mName.img}
                        year={mName.year}
                        type={mName.genre}
                      />
                    );
                  })}
                </Carousel>
              )} </div>
            <div
              className="buttonArea"
              style={{
                width: "100%",
                display: "flex",
              }}
            >
              <div className="buttonDiv">
                <button
                  className="newButton"
                  style={{
                    fontSize: "calc(0.2vw + 12px)",
                    borderRadius: "3px",
                    padding: "calc(15px + 1vw)",
                    color: "#fff",
                    backgroundColor: "#01bf71",
                    border: "none",
                  }}
                  onClick={() => setModal(true)}
                >
                  Create New playlist
                </button>
                {favs.length === 0 ? null : (
                  <button
                    className="newButton"
                    style={{
                      fontSize: "calc(0.2vw + 12px)",
                      borderRadius: "3px",
                      padding: "calc(15px + 1vw)",
                      color: "#fff",
                      backgroundColor: "#01bf71",
                      border: "none",
                      marginLeft: "20px",
                    }}
                    onClick={pdf2}
                  >
                    <svg
                      id="dwn-icon"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-cloud-arrow-down-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 2a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 6.095 0 7.555 0 9.318 0 11.366 1.708 13 3.781 13h8.906C14.502 13 16 11.57 16 9.773c0-1.636-1.242-2.969-2.834-3.194C12.923 3.999 10.69 2 8 2zm2.354 6.854l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L7.5 9.293V5.5a.5.5 0 0 1 1 0v3.793l1.146-1.147a.5.5 0 0 1 .708.708z" />
                    </svg>
                    <span
                      className="spinner-border spinner-border-sm"
                      id="loading"
                      role="status"
                      aria-hidden="true"
                      style={{ display: "none" }}
                    ></span>{" "}
                    Download Favorites
                  </button>
                )}
              </div>
            </div>
          </div>
          <div style={{ paddingBottom: "20px" }}>
            <PlaylistAll />
          </div>
          {/* <button onClick={pdf1} className="downloadPlaylist">
            <svg
              id="dwn-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-cloud-arrow-down-fill"
              viewBox="0 0 16 16"
            >
              <path d="M8 2a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 6.095 0 7.555 0 9.318 0 11.366 1.708 13 3.781 13h8.906C14.502 13 16 11.57 16 9.773c0-1.636-1.242-2.969-2.834-3.194C12.923 3.999 10.69 2 8 2zm2.354 6.854l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L7.5 9.293V5.5a.5.5 0 0 1 1 0v3.793l1.146-1.147a.5.5 0 0 1 .708.708z" />
            </svg>
            <span
              className="spinner-border spinner-border-sm"
              id="loading"
              role="status"
              aria-hidden="true"
              style={{ display: "none" }}
            ></span>{" "}
            Download playlists
          </button> */}
        </React.Fragment>
      </div>
    </div>
  );
}

export default Favorites;
