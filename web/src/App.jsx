import {AdminRouters, PublicRouters} from './routes';
import { themeSettings } from './theme';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute";
import styled from 'styled-components';
function App() {
    const ROLES = {
        User: "User",
        Admin: "Admin",
    };

    const mode = 'light' 
    const theme = themeSettings(mode)

  return (
        <Router>
            <Container className="App">
                <Routes>
                    {PublicRouters.map((route, index) => {
                        const Page = route.component;
                        const Layout = route.layout;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout >
                                        <Page theme={theme}/>
                                    </Layout>
                                }
                            />
                        );
                    })}

                    <Route element={<PrivateRoute allowedRoles={[ROLES.Admin]} />}>
                        {AdminRouters.map((route, index) => {
                            const Page = route.component;
                            const Layout = route.layout;
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                />
                            );
                        })}
                    </Route>
                </Routes>
            </Container>
        </Router>
  );
}

const Container = styled.div`
    margin: 0; 
    font-size: 16px;
    font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji" !important;
`

export default App
