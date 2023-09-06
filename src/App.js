import "../src/styles/App.css";
import Layout from "./components/Layout";
import Home from "./components/Pages/Home";
import LogIn from "./components/Pages/LogIn";
import Quiz from "./components/Pages/Quiz";
import Result from "./components/Pages/Result";
import SignUp from "./components/Pages/SignUp";
import {
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";

// https://www.themoviedb.org/ to create site about movie portal

function App() {
  return (
    <Router>
      <AuthProvider>
        <Layout>
          {/*  */}
          <Routes>
            <Route path="/" Component={Home} />
            <Route
              path="/signUp"
              element={
                <PublicRoute>
                  <LogIn />
                </PublicRoute>
              }
            />
            <Route
              path="/logIn"
              element={
                <PublicRoute>
                  <SignUp />
                </PublicRoute>
              }
            />

            <Route
              path="/quiz/:videoId"
              element={
                <PrivateRoute>
                  <Quiz />
                </PrivateRoute>
              }
            />
            <Route
              path="/result"
              element={
                <PrivateRoute>
                  <Result />
                </PrivateRoute>
              }
            />
          </Routes>
          {/*  */}
        </Layout>
      </AuthProvider>
    </Router>
  );
}

export default App;
