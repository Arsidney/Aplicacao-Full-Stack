import React from "react";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Aplicação Full Stack</h1>
      <Register />
      <hr />
      <Login />
    </div>
  );
}

export default App;
