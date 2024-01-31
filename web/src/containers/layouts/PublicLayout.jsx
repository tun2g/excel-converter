import styled from 'styled-components';
import { themeSettings } from "../../theme";
import PropTypes from 'prop-types';

const PublicLayout = ({children}) => {
  const mode = 'light';
  const theme = themeSettings(mode)
  return (
    <Container theme={theme}>
        <Content>
            {children}
        </Content>
    </Container>
  )
}

const Container = styled.div`
  background: ${({theme}) => theme.palette.white};
  height: 100vh;
`

const Content = styled.div`
  height: calc(100vh - 140px);
  display: flex;
`

PublicLayout.propTypes = {
  children: PropTypes.node // Prop validation for children
};

export default PublicLayout
