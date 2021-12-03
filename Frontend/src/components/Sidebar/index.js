import React from 'react'
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

const Sidebar = ({isOpen, toggle}) => {
    return (
        <SidebarContainer isOpen={isOpen} onClick={toggle}>
           <Icon onClick={toggle}>
              <CloseIcon/>
           </Icon>
           <SidebarWrapper>
               <SidebarMenu>
                   <SidebarLink to="/" onClick={toggle}>
                      Home
                   </SidebarLink>
                   <SidebarLink to="/browse" onClick={toggle}>
                       Browse
                   </SidebarLink>
                   <SidebarLink to="/favorites" onClick={toggle}>
                       Favorites
                   </SidebarLink>
                   <SidebarLink to="/events" onClick={toggle}>
                       Events
                   </SidebarLink>
                     <SidebarLink to="/contact" onClick={toggle}>
                       Contact Us
                   </SidebarLink>
               </SidebarMenu>

               <SideBtnWrap>
                   <SidebarRoute to="/signin">Sign In</SidebarRoute>
               </SideBtnWrap>
           </SidebarWrapper>
        </SidebarContainer>
    )
}

export default Sidebar
