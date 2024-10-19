import { Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import GenderSelect from "./pages/GenderSelect";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/gender" element={<GenderSelect />} />
    </Routes>
  );
}

export default App;
