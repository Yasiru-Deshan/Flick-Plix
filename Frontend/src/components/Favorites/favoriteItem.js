import React,{ useEffect, useState} from 'react';
import Aos from 'aos';
import "aos/dist/aos.css";
import {Link} from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown'
import axios from 'axios';
import DropdownMenu from '../../pages/favorites/dropdown';

   
function FavoritesItem(props){


      let [plist, setPlaylist] = useState([]);
      

  
  
      useEffect(()=>{
      Aos.init({duration: 2000 }); 
      },[])


     useEffect(()=>{

      const getPlayLists = () =>{
        axios.get('http://localhost:8070/api/playlists').then((res)=>{
          setPlaylist(res.data);
        })
      }

      getPlayLists();
    },[])

    const PlaylistAll = ()=>{
      return plist.map((pName)=>{

        return(
          <DropdownMenu
               key = {pName.id}
               id  =   {pName._id}
               name = {pName.name}
               desc = {pName.desc} 
               title = {props.title}
               year = {props.year}
               img = {props.img}
               movieId ={props.id}  
               genre = {props.genre}
               />
        )
      })
    }





  return(
  <div>
    <head>
    <link rel="stylesheet" href="./favorites.css" ></link>
</head>

      
       <div className='wrapper' data-aos="fade-up">
        
         
      
        <Link to={`/movie/${props.id}`}><img  className="mimg" src={props.img} alt=''/></Link>
                                        <p className="movieTitle">{props.title}  - {props.year}</p>
  
        
<Dropdown>
  <Dropdown.Toggle variant="success" id="dropdown-basic">
  Add to a PlayList
  </Dropdown.Toggle>
  
  <Dropdown.Menu>
    <PlaylistAll/>
  </Dropdown.Menu>
</Dropdown>

           
           </div>
           

        </div>
        
  );
             
    
}      
  
    


export default FavoritesItem