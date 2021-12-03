import React,{ useState} from 'react';
import { MDBCol } from "mdbreact"
import FavoritesItem from '../../components/Favorites/favoriteItem';
import Carousel from "react-elastic-carousel";
import './favorites.css';
import Playlist from '../../components/Playlist/playlist';


const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 5 },
  ];


function Favorites() {


    return (

        <div>


        <div style={{ 
    background: 'linear-gradient(to right, #2C5364, #203A43, #0F2027)' /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
            }}>
        <React.Fragment>

         .<center>
              
           <MDBCol md="6" className="searchbar">
               <input className="form-control" 
                      type="text"
                      placeholder="Search playlists"
                      aria-label="Search"
                       />
           </MDBCol>

           
          </center> 

        <div className="MenuContainer" >

         
            <div className="headingWrapper">
            <div>
        <h1 className="fHeading">Favorites</h1>
        </div>
        
        <button className="newPlaylist">Create New playlist</button>
        
        
        </div>

    

      <div className="carousel">
        <Carousel breakPoints={breakPoints}>
          <FavoritesItem>One</FavoritesItem>
          <FavoritesItem>Two</FavoritesItem>
          <FavoritesItem>Three</FavoritesItem>
          <FavoritesItem>Four</FavoritesItem>
          <FavoritesItem>Five</FavoritesItem>
          <FavoritesItem>Six</FavoritesItem>
          <FavoritesItem>Seven</FavoritesItem>
          <FavoritesItem>Eight</FavoritesItem>
        </Carousel>
      </div>
      </div>

      <Playlist/>
      <Playlist/>
    
            
        </React.Fragment>
        </div>

   </div>

    )
}

export default Favorites
