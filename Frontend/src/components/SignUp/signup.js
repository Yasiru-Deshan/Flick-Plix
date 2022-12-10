import React,{useRef} from "react";
import Card from "react-bootstrap/Card" ;
import {Link} from "react-router-dom";
import axios from 'axios';
import { Redirect } from 'react-router-dom';

const Signup = ()=>{

     const fname = useRef();
     const lname = useRef();
     const password = useRef();
     const email = useRef();
     const age = useRef();
     const mobile = useRef();
     const address = useRef();
     const gender = useRef();

      const submitHandler = async (e)=>{
       e.preventDefault()
       let newStaff;

       const newMember = {
           firstName: fname.current.value,
           lastName: lname.current.value,
           password: password.current.value,
           email: email.current.value,
           gender: gender.current.value,
           mobile: mobile.current.value,
           address: address.current.value,
           age: age.current.value,
           role: 'user'
          
       }

       try{
           newStaff = await axios.post(
             `${process.env.REACT_APP_BASE_URL}/api/auth/`,
             newMember
           );
           if(newStaff){
               <Redirect to="/" />;
				return <Redirect to="/" />;
           }
       }catch(err){
           console.log(err)
       }
   }

    return (
      <div
        style={{
          backgroundColor: "#101522", /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        }}
      >
        <div className="row justify-content-center">
          <div
            className="text-center"
            style={{
              backgroundColor: "white",
              width: "calc(200px + 34vw)",
              marginTop: "10rem",
              marginBottom: "5rem",
              boxShadow: "5px 8px 35px ",
              borderRadius: "20px",
              padding: "30px",
            }}
          >
            <Card.Body>
              <Card.Title style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
                Sign Up
              </Card.Title>

              <form onSubmit={submitHandler}>
                <div className="mb-3">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    id="email"
                    //value={email}
                    ref={email}
                    required
                    placeholder="john@gmail.com"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="fname">First Name</label>
                  <input
                    name="password"
                    className="form-control"
                    id="password"
                    //value={password}
                    ref={fname}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="lname">Last Name</label>
                  <input
                    name="password"
                    className="form-control"
                    id="password"
                    //value={password}
                    ref={lname}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    id="password"
                    //value={password}
                    ref={password}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password">Age</label>
                  <input
                    type="number"
                    name="age"
                    className="form-control"
                    id="age"
                    //value={password}
                    ref={age}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="gender">Gender</label>
                  <select className="form-control" ref={gender}>
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="address">Address</label>
                  <input
                    type="string"
                    name="address"
                    className="form-control"
                    id="address"
                    //value={password}
                    ref={address}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="mobile">Mobile</label>
                  <input
                    type="string"
                    name="mobile"
                    className="form-control"
                    id="mobile"
                    //value={password}
                    ref={mobile}
                    required
                  />
                </div>
                <div className="mb-3">
                  <button className="btn btn-primary w-100">Sign Up</button>
                </div>
              </form>
            </Card.Body>

            <Card.Footer>
              Already have an account?<Link to="/login">Sign In</Link>
            </Card.Footer>
          </div>
        </div>
      </div>
    );
}

export default Signup