import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitch, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from 'react-router-dom';
import './BottomNav';

export const BottomNav = () => {
    return (
        <BottomNavigation showLabels sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>
            <BottomNavigationAction
                label="Stream" 
                icon={<FontAwesomeIcon icon={faTwitch}/>}
                component={NavLink}
                to="/"
            />
            <BottomNavigationAction 
                label="Socials" 
                icon={<FontAwesomeIcon icon={faTwitter}/>}
                component={NavLink}
                to="/socials"
            />
            <BottomNavigationAction 
                label="Options" 
                icon={<FontAwesomeIcon icon={faCog}/>}
                component={NavLink}
                to="/options"
            />
        </BottomNavigation>
    )
}