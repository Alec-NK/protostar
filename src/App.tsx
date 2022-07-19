import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "styled-components";
import { ChakraProvider } from "@chakra-ui/react";

import IndexRoutes from "./routes";

import Layout from "./pages/_layouts";
import { AuthProvider } from "./contexts/AuthContext";

import "react-toastify/dist/ReactToastify.css";
import { defaultTheme } from "./styles/theme";
import GlobalStyle from "./styles/global";

function App() {
    return (
        <ChakraProvider>
            <ThemeProvider theme={defaultTheme}>
                <AuthProvider>
                    <BrowserRouter>
                        <Layout>
                            <IndexRoutes />
                        </Layout>
                        <GlobalStyle />
                    </BrowserRouter>
                    <ToastContainer
                        position="top-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="colored"
                    />
                </AuthProvider>
            </ThemeProvider>
        </ChakraProvider>
    );
}

export default App;
