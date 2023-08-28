import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Landing, Home, Dashboard, Analytics, Admin } from "./pages";
import { useState } from "react";
import { ProtectedRoute } from "./components/ProtectedRoute";
function App() {
  const [user, setUser] = useState(null);

  const login = () => {
    // Request Done
    setUser({
      id: 1,
      name: "John",
      Permissions: ["analize"],
      roles: ["admin"],
    });
  };

  const logout = () => setUser(null);
  return (
    <BrowserRouter>
      <Navigation />
      {user ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <button onClick={login}>Login</button>
      )}
      <Routes>
        <Route index element={<Landing />}></Route>
        <Route path="/landing" element={<Landing />} />
        <Route element={<ProtectedRoute isAllowed={!!user} />}>
          <Route path="/home" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route
          path="/analytics"
          element={
            <ProtectedRoute
              isAllowed={!!user && user.Permissions.includes("analize")}
              redirectTo="/home"
            >
              <Analytics />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute
              isAllowed={!!user && user.roles.includes("admin")}
              redirectTo="/home"
            >
              <Admin />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

function Navigation() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/landing">Landing</Link>
        </li>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/analytics">Analytics</Link>
        </li>
        <li>
          <Link to="/admin">
            <Admin></Admin>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default App;
