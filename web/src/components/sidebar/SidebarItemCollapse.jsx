import { Collapse, List, ListItemButton, ListItemIcon, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { MdOutlineExpandLess, MdOutlineExpandMore } from "react-icons/md";
import SidebarItem from "./SidebarItem";
//import { useSelector } from "react-redux";
import PropTypes from 'prop-types';

const SidebarItemCollapse = ({ item }) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  //const { appState } = useSelector((state) => state.appState);
  const appState = 'room.create'

  useEffect(() => {
    if (appState.includes(item.state)) {
      setOpen(true);
    }
  }, [appState, item]);

  return (
    item.sidebarProps ? (
      <>
        <ListItemButton
          onClick={() => setOpen(!open)}
          sx={{
            fontSize: '16px',
            "&: hover": {
              backgroundColor: theme.palette.sub_background_color
            },
            padding: '12px 12px 12px 20px'
          }}
        >
          <ListItemIcon sx={{
          color: theme.palette.text_color,
          fontSize: '20px'
        }}>
            {item.sidebarProps.icon && item.sidebarProps.icon}
          </ListItemIcon >
          {item.sidebarProps.displayText}
          {open ? <MdOutlineExpandLess style={{marginLeft: 'auto', fontSize:'20px'}}/> : <MdOutlineExpandMore style={{marginLeft: 'auto', fontSize:'20px'}}/>}
        </ListItemButton>
        <Collapse in={open} timeout="auto">
          <List>
            {item.child?.map((route, index) => (
              route.sidebarProps ? (
                  <SidebarItem item={route} key={index} isChild = {true}/>
              ) : null
            ))}
          </List>
        </Collapse>
      </>
    ) : null
  );
};

SidebarItemCollapse.propTypes = {
    item : PropTypes.object,
  };

export default SidebarItemCollapse;