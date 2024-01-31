import { List } from "@mui/material";
import SidebarItem from "./SidebarItem";
import SidebarItemCollapse from "./SidebarItemCollapse";
import styled from 'styled-components'
import { AiOutlineHome } from "react-icons/ai";
import { themeSettings } from "../../theme";
import { MdModelTraining } from "react-icons/md";
const Sidebar = () => {
  const mode = 'light' 
  const theme = themeSettings(mode)
    const appRoutes = [
        {
          path: "/",
          state: "home",
          sidebarProps: {
            displayText: "Trang chủ",
            icon: <AiOutlineHome />
          }
        },
        {
          path: "/convert",
          state: "home",
          sidebarProps: {
            displayText: "Convert file",
            icon: <MdModelTraining />
          }
        }
      ];
  return (
    <Container theme = {theme}>
        <List disablePadding sx={{
        }}>
            {appRoutes.map((route, index) => (
            route.sidebarProps ? (
                route.child ? (
                <SidebarItemCollapse item={route} key={index} />
                ) : (
                <SidebarItem item={route} key={index} isChild = {false} />
                )
            ) : null
            ))}
        </List>
    </Container>
  )
}

const Container = styled.div`
    width: 260px;
    font-size: 14px;
    background: ${({theme}) => theme.palette.rgba_primary[1]};
    color: ${({theme}) => theme.palette.text_color1};
    padding: 12px 0;
`

export default Sidebar