import { ListItemButton, ListItemIcon, useTheme } from "@mui/material";
//import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

const SidebarItem = ({ item, isChild }) => {
  //const { appState } = useSelector((state) => state.appState);
  const appState = 'room.create'
  const theme = useTheme()
  return (
    item.sidebarProps && item.path ? (
      <ListItemButton
        component={Link}
        to={item.path}
        sx={{
          fontSize: '16px',
          "&: hover": {
            backgroundColor: theme.palette.sub_background_color
          },
          backgroundColor: appState === item.state ? theme.palette.sub_background_color : "unset",
        //   paddingY: "12px",
        //   paddingX: isChild === false ? "20px" : '36px',
          padding: `12px 0px 12px ${isChild === false ? "20px" : '36px'}`
        }}
      >
        <ListItemIcon sx={{
          color: theme.palette.text_color1,
          fontSize: '20px'
        }}>
          {item.sidebarProps.icon}
        </ListItemIcon>
        {item.sidebarProps.displayText}
      </ListItemButton>
    ) : null
  );
};

SidebarItem.propTypes = {
    item : PropTypes.object,
    isChild: PropTypes.bool
  };
  

export default SidebarItem;