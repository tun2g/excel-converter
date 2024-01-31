import styled from 'styled-components'
import {IoNotificationsOutline, IoSunny} from 'react-icons/io5'
import {WiMoonWaxing6} from 'react-icons/wi'
import { useNavigate } from 'react-router-dom';
import {IoMdLogIn} from 'react-icons/io';
import { themeSettings } from "../theme";

const Header = () => {
  const navigate = useNavigate();
  const mode = 'light' 
  const theme = themeSettings(mode)
  return (
    <Container theme={theme}>
        <Logo onClick={() => navigate('/')}>
            <img src="./images/logo.png" alt=""></img>
            <Title theme={theme}>
              <h4>Convert file</h4>
            </Title>
        </Logo>
        <Box theme={theme}>
              {mode === 'dark'? 
                <WiMoonWaxing6 className='right-icon'/> 
                : <IoSunny className='right-icon'/>}
              <IoNotificationsOutline className='right-icon'/>
              <IoMdLogIn onClick={() => navigate('/login')} className='right-icon'/> 
        </Box>

    </Container>
  )
}

const Container = styled.div`
  height: 80px;
  background-color: ${({theme}) => theme.palette.primary};
  color: #fff;
  box-shadow: 1px 1px 2px rgba(0,0,0,0.2); 
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;  
  padding: 0 24px;
`

const Logo = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    width: 50%;
    img{
      height: 40px;
      border-radius: 50%;
      margin-right: 8px;
    }
`

const Title = styled.div`
  display: flex;
  flex-direction: column;
  justify-content:  flex-start;
  color: ${({theme}) => theme.palette.text_color};
  margin: 0px;
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
  line-height: 1.5;
  text-align: left;
  font-size: 16px;
  font-weight: 500;
  
  h4{
    margin: 0;
    line-height: 1.5;
    font-size: 20px;
    font-weight: 700;
    font-family: "Bungee Inline", monospace;
  }
`

const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  color: ${({theme}) => theme.palette.text_color};

  .right-icon{
    color: ${({theme}) => theme.palette.text};
    font-weight: bold;
    font-size: 20px;
    margin-right: 12px;
    transition: all 0.5s ease;
    cursor: pointer;

    &:hover{
      transform: scale(1.2);
    }
  }
`

export default Header
