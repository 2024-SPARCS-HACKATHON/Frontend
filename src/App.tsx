import { Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Gender from "./pages/Gender";
import Age from "./pages/Age";
import Voice from "./pages/Voice";
import Result from "./pages/Result";
import Analysis from "./pages/Analysis";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/gender" element={<Gender />} />
      <Route path="/age" element={<Age />} />
      <Route path="/voice" element={<Voice />} />
      <Route path="/result" element={<Result />} />
      <Route path="/analysis" element={<Analysis />} />
    </Routes>
  );
}

export default App;
