import React, { useEffect, useRef, useState} from 'react';
import './movie.css';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AddBoxIcon from '@material-ui/icons/AddBox';
import Aos from 'aos';
import "aos/dist/aos.css";
import Comments from '../../components/CommentSection/comments';
import ReactPlayer from 'react-player';
import { Link } from 'react-router-dom';
import axios from 'axios'; 
import { useParams } from "react-router";
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownMenu from '../../pages/favorites/dropdown';


const Movie = () =>{
  
   const desc = useRef();
   const id = useParams().id;
   const [title, setTitle] = useState("");
   const [year, setYear] = useState("");
   const [genre,setGenre] = useState("");
   const [description, setDesc] = useState("");
   const [trailer, setTrailer] = useState("");
   const [video, setVideo] = useState("");
   const [image,setImage] = useState("");
   let [plist, setPlaylist] = useState([]);
   const [like,setLike] = useState();
   const [isLiked,setIsLiked] = useState(false);

       useEffect(()=>{
        Aos.init({duration: 2000 });
    },[])
   
    useEffect(() => {
        async function fetchData() {
            const response = (await axios.get(`http://localhost:8070/api/movies/find/${id}`)).data;
            setTitle(response.title);
            setYear(response.year);
            setGenre(response.genre);
            setDesc(response.desc);
            setTrailer(response.trailer);
            setVideo(response.video);
            setImage(response.img);
            setLike(response.likes.length)
        
        }
        fetchData();
    }, [id])

 
 
    const likehandler=()=>{

        try{
            axios.put(`http://localhost:8070/api/movies/${id}/like`)
        }catch(err){}

        setLike(isLiked ? like-1 : like+1);
        setIsLiked(!isLiked);
    }
  


    
   const submitFavsHandler = async (e)=>{
       e.preventDefault()
       let newF;

       const newFavorite = {
           
           movieId: id,
           title: title,
           img: image,
           year: year,
           genre: genre
           //movieId:'6145eb2e19467e39980d27e7',
        
       }

       try{
           newF = await axios.post("http://localhost:8070/api/favorites/addto",newFavorite)
           if(newF){
               window.alert("Movie has been added to favorites")
           }
       }catch(err){
           console.log(err)
       }
   }



   const submitHandler = async (e)=>{
       e.preventDefault()
       let newc;

       const newComment = {
           userId: '611b74dd16f8353848675308',
           uname:'Liam Livingstone',
           movieId: id,
           //movieId:'6145eb2e19467e39980d27e7',
           desc: desc.current.value,
       }

       try{
           newc = await axios.post("http://localhost:8070/api/comments",newComment)
           if(newc){
               window.alert("Comment has been posted")
           }
       }catch(err){
           console.log(err)
       }
   }



    const [allComments,setAllComments] = useState([]);

    useEffect(()=>{

        const getComments = () =>{
        axios.get(`http://localhost:8070/api/comments/movie/${id}`).then((res)=>{
            setAllComments(res.data);
        })
    }
       getComments();
    },[id])


    const CommentList = ()=>{
        return allComments.map((comment)=>{

            return(
                <Comments
                   key={comment.id}
                   id={comment._id}
                   userid = {comment.userId}
                   author={comment.uname}
                   desc={comment.desc}/>

              
            )
            
        })
        
    }
    


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
               title = {title}
               year = {year}
               img = {image}
               movieId ={id}  
               genre = {genre}
               video={video}
               />
        )
      })
    }









    return (


        <div>
            <div className="MovieContainer">

                <div className="MovieWrapper">
                     <div className="MovieRow">
                     <div className="Column1">
                             <div className="ImgWrap">

                              <img data-aos="fade-right" className="Img" src={image} alt=''/>
                            
                            
                             </div>
                          
                          
                          </div>
                          <div className="Column2">
                             <div className="TextWrapper">

                                 <h1 className="Heading">
                                  {title}

                                 </h1>

                                 <p className="Year">{year}</p>
                                 <p className="Genre">
                                    {genre}
                                 </p>

                               

                                 <div className="icons">
                                    <FavoriteIcon className="fi" onClick={likehandler}/>
                                    <p className="likesCount">{like}</p>
                                    <AddBoxIcon className="bi" onClick={submitFavsHandler}/>
                                     <p className="likesCount">Add to Favorites</p>
                                 </div>

                                    <Dropdown>
                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    Add to a PlayList
                                          </Dropdown.Toggle>
  
                                            <Dropdown.Menu>
                                              <PlaylistAll/>
                                                </Dropdown.Menu>
                                    </Dropdown>

                                 <Link to={`/watch/${id}`}>
                                 <button className="tbutton">Watch Now</button></Link>
                                 <div>
                          {/*     <img className="profileuserimg"
                                  src={img2}
    alt=''/>*/}
                         </div>
                               
                             </div>
                            
                          
                          
                          </div>

                          <div className="Column3">
                          <p className="Syno">
                                     Synopsis
                                 </p>
                          <p className="Description">
                            
                                  {description}
                          </p>
                        

                          </div>

                         
                      </div>
                   </div>
                </div>

                <div className="commentcontainer">
                <div className="commenttrailerWrapper">
                     <div className="commentRow">
                     <div className="commentSection">
                     <h1 className="commenttitle">Comments</h1>

                   
             <CommentList/>

             

                <div>

                <div className="comments">
                <div className="commentwrapper">



                   

                   <form className="commenting" onSubmit={submitHandler}>
                    <input placeholder="Leave a comment here..."
                           type="text"
                           required
                           className="commentinput"
                           ref={desc}    
                           />
                       
                    <button className="commentbutton" type="submit">Send</button>
                    </form>





                </div>
           
                </div>
                </div>
                      </div>

                    <div className="trailer">
                         <ReactPlayer className="player"
                            width="440px"
                            height="240px"
                            controls
                            url={trailer}/>
</div>

            </div>
       
           
            </div>
</div>


        </div>
    )
}

export default Movie
