import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import Chat from "./pages/Chat/Chat";
import ProfileUpdate from "./pages/ProfileUpdate/ProfileUpdate";
import { AuthContext } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
import { useContext } from "react";

const App = () => {
  const { authUser } = useContext(AuthContext);

  return (
    <>
      <Toaster />
      <Routes>
        <Route
          path='/'
          element={authUser ? <Chat /> : <Navigate to='/login' />}
        />
        <Route
          path='/login'
          element={!authUser ? <Login /> : <Navigate to='/' />}
        />
        <Route
          path='/profile'
          element={authUser ? <ProfileUpdate /> : <Navigate to='/login' />}
        />
        <Route path='*' element={<p>Not Found 404</p>} />
      </Routes>
    </>
  );
};

export default App;
