import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import AdminPage from "./pages/AdminPage";
import About from "./pages/About";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import AdminRoute from "./components/AdminRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sign-in/*" element={<SignInPage />} />
      <Route path="/sign-up/*" element={<SignUpPage />} />
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute>
            <AdminRoute>
              <AdminPage />
            </AdminRoute>
          </ProtectedRoute>
        }
      />
      <Route path="/about/*" element={<About />} />
      <Route path="/login/*" element={<Login />} />
    </Routes>
  );
}

export default App;
