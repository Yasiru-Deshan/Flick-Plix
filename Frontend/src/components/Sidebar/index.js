import React, { useContext } from "react";
import {
       SidebarContainer,
       Icon,
       CloseIcon,
       SideBtnWrap,
       SidebarMenu,
       SidebarRoute,
       SidebarWrapper,
       SidebarLink,
} from './SidebarElements'
import { AuthContext } from "../../context/AuthContext";
import { Redirect } from "react-router-dom";



const Sidebar = ({isOpen, toggle}) => {

      const auth = useContext(AuthContext);

      const signOut = () => {
        auth.logout();
        <Redirect to={"/login"} />;
      };

    return (
      <SidebarContainer isOpen={isOpen} onClick={toggle}>
        <Icon onClick={toggle}>
          <CloseIcon />
        </Icon>
        <SidebarWrapper>
          <SidebarMenu>
            {auth.isLoggedIn && auth.token != null && (
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item dropdown">
                  <div
                    className="nav-link dropdown"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{ color: "white" }}
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
                </li>
              </ul>
            )}
            <SidebarLink to="/" onClick={toggle}>
              Home
            </SidebarLink>
            {auth.role === "user" && (
              <SidebarLink to="/browse" onClick={toggle}>
                Browse
              </SidebarLink>
            )}
            {auth.role === "user" && (
              <SidebarLink to="/favorites" onClick={toggle}>
                Favorites
              </SidebarLink>
            )}
            {auth.role === "admin" && (
              <SidebarLink to="/events" onClick={toggle}>
                Inventory
              </SidebarLink>
            )}
          </SidebarMenu>
          {!auth.isLoggedIn && (
            <SideBtnWrap>
              <SidebarRoute to="/login">Sign In</SidebarRoute>
            </SideBtnWrap>
          )}
          {auth.isLoggedIn && auth.token != null && (
            <SideBtnWrap>
              <SidebarRoute
                className="btn btn-outline-danger m-2"
                onClick={signOut}
              >
                Logout
              </SidebarRoute>
            </SideBtnWrap>
          )}
        </SidebarWrapper>
      </SidebarContainer>
    );
}

export default Sidebar
