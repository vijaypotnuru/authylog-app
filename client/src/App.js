import "./App.css";
import { Route, Routes } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import Profile from "./pages/Profile";
import RecoveryPage from "./pages/RecoveryPage";
import Reset from "./pages/Reset";
import PageNotFound from "./pages/PageNotFound";


function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/profile/:username" element={<Profile />} />
      <Route path="/recovery" element={<RecoveryPage />} />
      <Route path="/reset/:email" element={<Reset />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
