import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import axios from 'axios'




function DropdownMenu(props) {

    
  const submitHandler = async (e)=>{
       e.preventDefault()
       let newM;

       const newMovie = {
                 movieId: props.movieId,
                 title: props.title,
                 img: props.img,
                 year: props.year,
                 genre: props.genre
       }

       try{
           newM = await axios.put(`http://localhost:8070/api/playlists/${props.id}/addtoPlaylist`,newMovie)
           if(newM){
               window.alert("Movie has been added to playlist")
           }
       }catch(err){
           console.log(err)
       }
   }


    return (
        <div>
             <Dropdown.Item href="#/action-1" onClick={submitHandler}>{props.name}</Dropdown.Item>
        </div>
    )
}

export default DropdownMenu
