import React, { useState, useEffect, useContext } from "react";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons/lib";
import { animateScroll as scroll } from "react-scroll";
import {
  Nav,
  NavbarContainer,
  NavLogo,
  MobileIcon,
  NavMenu,
  NavItem,
  NavLinks,
  NavBtn,
  NavBtnLink,
} from "./NavbarElements";
import { AuthContext } from "../../context/AuthContext";
import { Redirect } from "react-router-dom";

const Navbar = ({ toggle }) => {
  const [scrollNav, setScrollNav] = useState(false);

  const changeNav = () => {
    if (window.scrollY >= 80) {
      setScrollNav(true);
    } else {
      setScrollNav(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeNav);
  }, []);

  const toggleHome = () => {
    scroll.scrollToTop();
  };
  const auth = useContext(AuthContext);

  const signOut = () => {
    auth.logout();
    <Redirect to={"/login"} />;
  };

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <Nav scrollNav={scrollNav}>
          <NavbarContainer>
            <NavLogo to="/" onClick={toggleHome}>
              FlickPlix
            </NavLogo>

            <MobileIcon onClick={toggle}>
              <FaBars />
            </MobileIcon>

            <NavMenu>
              <NavItem>
                <NavLinks
                  to="/"
                  smooth={true}
                  duration={500}
                  spy={true}
                  exact="true"
                  offset={-80}
                >
                  Home
                </NavLinks>
              </NavItem>

              {auth.role === "user" && (
                <NavItem>
                  <NavLinks
                    to="/browse"
                    smooth={true}
                    duration={500}
                    spy={true}
                    exact="true"
                    offset={-80}
                  >
                    Browse
                  </NavLinks>
                </NavItem>
              )}
              {auth.role === "user" && (
                <NavItem>
                  <NavLinks
                    to="/favorites"
                    smooth={true}
                    duration={500}
                    spy={true}
                    exact="true"
                    offset={-80}
                  >
                    Favorites
                  </NavLinks>
                </NavItem>
              )}

              {auth.role === "admin" && (
                <NavItem>
                  <NavLinks
                    to="/contact"
                    smooth={true}
                    duration={500}
                    spy={true}
                    exact="true"
                    offset={-80}
                  >
                    Inventory
                  </NavLinks>
                </NavItem>
              )}
              {!auth.isLoggedIn && (
                <NavBtn>
                  <NavBtnLink to="/login">Sign In</NavBtnLink>
                </NavBtn>
              )}
              {auth.isLoggedIn && auth.token != null && (
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item dropdown">
                    <div
                      className="nav-link dropdown-toggle"
                      id="navbarDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      style={{ color: "white", marginTop:'5px'}}
                    >
                      <img
                        src={
                          auth.user
                            ? auth.user.image.replace(/\s+/g, "%20")
                            : "https://lh3.googleusercontent.com/proxy/hZZ-VMxK16FXsVbvPxckcMuoQq0Ip8fK8q6y0VpzUMzrK13OjohEZBRJRZIqPB-p1M7XuAsBadS1_7zsgE2bsIGXd-iU2BJ8I31LpTcbp6yANoDNwntqvU0iMTnsDlL1EF9IZivuDhS1ZToSEyYA6OWT"
                        }
                        alt=""
                        className="avatar-image-small mr-2"
                      />
                      {auth.fullName}
                    </div>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdown"
                    >
                      <li>
                        <Link
                          className="dropdown-item"
                          to={{
                            pathname: "/customer-profile",
                            state: {
                              customer: auth.user,
                            },
                          }}
                        >
                          My Profile
                        </Link>
                      </li>

                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <NavBtnLink
                          className="btn btn-outline-danger m-2"
                          onClick={signOut}
                        >
                          Logout
                        </NavBtnLink>
                      </li>
                    </ul>
                  </li>
                </ul>
                // <ul className='navbar-nav ms-auto mb-2 mb-lg-0'>
                // 	<li className='nav-item'>
                // 		<span className='text-dark nav-link'>
                // 			{auth.fullName}
                // 		</span>
                // 	</li>
                // 	<button
                // 		className='btn btn-outline-danger m-2'
                // 		onClick={signOut}>
                // 		Logout
                // 	</button>
                // </ul>
              )}
              {auth.isLoggedIn && auth.token != null && (
                <NavBtnLink
                  
                  className="btn btn-outline-danger m-4"
                  onClick={signOut}
                >
                  Logout
                </NavBtnLink>
              )}
            </NavMenu>
            {/* <NavBtn>
                <NavBtnLink to="/login">Sign In</NavBtnLink>
              </NavBtn> */}
          </NavbarContainer>
        </Nav>
      </IconContext.Provider>
    </>
  );
};

export default Navbar;
