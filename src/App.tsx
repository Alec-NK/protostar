import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import DefaultLayout from "./pages/_layouts/default";
import IndexRoutes from "./routes";

import "react-toastify/dist/ReactToastify.css";
import GlobalStyle from "./styles/global";

function App() {
    return (
        <>
            <BrowserRouter>
                <DefaultLayout>
                    <IndexRoutes />
                </DefaultLayout>
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
        </>
    );
}

export default App;
