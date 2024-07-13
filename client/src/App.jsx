import Login from "./auth/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./auth/Signup";
import Home from "./pages/Home";

const App = () => {
  const isAuthenticated = localStorage.getItem("token") ? true : false;
  return (
    <div className=" flex justify-center items-center w-screen h-screen ">
      <Router>
        {isAuthenticated ? (
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        )}
      </Router>
    </div>
  );
};

export default App;
