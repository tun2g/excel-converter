import styled from 'styled-components';
import { themeSettings } from "../theme";

const Footer = () => {
  const mode = 'light' 
  const theme = themeSettings(mode)
  return (
    <Container theme={theme}>
      <h4>©Kiến trúc phần mềm - 20-3</h4>
      <span>Khoa Công nghệ Thông tin, trường ĐH KHTN, ĐHQG TPHCM</span>
    </Container>
  )
}

const Container = styled.div`
  height: 80px;
  background-color: ${({theme}) => theme.palette.primary};
  color: #fff;
  box-shadow: 1px 0 2px rgba(0,0,0,0.2); 
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 24px;

  h4{
    margin: 0 0 4px;
  }
`
export default Footer
