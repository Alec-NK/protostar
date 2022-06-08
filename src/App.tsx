import { BrowserRouter } from "react-router-dom";
import DefaultLayout from "./pages/_layouts/default";
import IndexRoutes from "./routes";

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
    </>
  );
}

export default App;
