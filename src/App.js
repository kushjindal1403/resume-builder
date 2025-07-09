import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ResumeForm from "./components/resumeForm";
import PreviewPage from "./components/previewPage";
import Navbar from "./components/navBar";
import AtsChecker from "./components/atsChecker";
//import Templates from "./components/Templates";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="p-4 bg-gray-100 min-h-screen">
        <Routes>
          <Route path="/" element={<Navigate to="/form" />} />
          <Route path="/form" element={<ResumeForm />} />
          <Route path="/ats-checker" element={<AtsChecker />} />
          <Route path="/preview" element={<PreviewPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
