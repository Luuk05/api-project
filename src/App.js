import { Routes, Route, Navigate } from "react-router-dom";
import "./styles.css";
import { Page } from "./pages/Page";
import { BrowserRouter } from "react-router-dom";

let App = () => {
  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Navigate to="/1" />} />
            <Route path="/:page" element={<Page />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
