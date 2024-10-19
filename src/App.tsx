import { Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Gender from "./pages/Gender";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/gender" element={<Gender />} />
    </Routes>
  );
}

export default App;
