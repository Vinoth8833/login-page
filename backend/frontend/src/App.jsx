import Registration from "./Registration";
import Login from "./Login";
import Home from "./Home";
import { createContext, useState } from "react";
import { Routes, Route } from "react-router-dom";

export const userlogin = createContext();

const App = () => {
  const [data, setdata1] = useState("");

  console.log(data);

  return (
    <userlogin.Provider value={{ data, setdata1 }}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/home" element={ data === "ok" ? <Home /> :<Login />} />
      </Routes>
    </userlogin.Provider>
  );
};

export default App;
