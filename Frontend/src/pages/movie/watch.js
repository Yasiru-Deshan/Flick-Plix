import React, { useEffect,  useState} from 'react';
import ReactPlayer from 'react-player';
import "./movie.css";
import axios from 'axios';
import { useParams} from "react-router";

function Watch() {

    const id = useParams()._id;
    const [video, setVideo] = useState("");

      useEffect(() => {
        async function fetchData() {
            const response = (
              await axios.get(
                `${process.env.REACT_APP_BASE_URL}/api/movies/find/${id}`
              )
            ).data;
         
            setVideo(response.video);
            
        }
        fetchData();
    }, [id])

    return (
      <div
        className="playercontainer"
        style={{ backgroundColor: "#000", margin: "0 auto" }}
      >
        <div style={{ marginTop: "50px" }}>
          <ReactPlayer width="100%" height="720px" controls url={video} />
        </div>
      </div>
    );
}

export default Watch








