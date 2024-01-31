import Header from '../../components/Header';
import Footer from '../../components/Footer';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Sidebar from '../../components/sidebar/Sidebar'
import { themeSettings } from "../../theme";

const AdminLayout = ({children}) => {
  const mode = 'light' 
  const theme = themeSettings(mode)

  return (
    <Container theme={theme}>
      <Header theme={theme} />
      <Content theme={theme}>
        <Sidebar />
        {children}
      </Content>
      <Footer theme={theme} />
    </Container>
  )
}

const Container = styled.div`
  background: ${({theme}) => theme.palette.white};
  height: 100vh;
`

const Content = styled.div`
  min-height: calc(100vh - 114px);
  display: flex;
  background: ${({theme}) => theme.palette.white};
`

AdminLayout.propTypes = {
  children: PropTypes.node // Prop validation for children
};

export default AdminLayout
