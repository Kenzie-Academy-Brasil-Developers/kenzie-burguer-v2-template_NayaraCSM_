import Router from "./routes";
import { GlobalStyles } from "./styles/global";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => (
  <>
    <ToastContainer />
    <GlobalStyles />
    <Router />
  </>
);

export default App;
