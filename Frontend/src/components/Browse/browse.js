import React,{ useEffect} from 'react';
import Aos from 'aos';
import "aos/dist/aos.css";
import {Link} from 'react-router-dom';

   
function BrowseItem(props){

        
      useEffect(()=>{
      Aos.init({duration: 2000 }); 
      },[])


  return(
  <div>
    <head>
    <link rel="stylesheet" href="./favorites.css" ></link>
</head>

      
       <div className='wrapper' data-aos="fade-up">
        
         
      
        <Link to={`/movie/${props.id}`}><img  className="mimg" src={props.img} alt=''/></Link>
                                        <p className="movieTitle">{props.title}  - {props.year}</p>
  


           
           </div>
           

        </div>
        
  );
             
    
}      
  
    


export default BrowseItem