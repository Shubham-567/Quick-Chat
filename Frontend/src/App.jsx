import { Navigate, Route, Routes } from "react-router-dom";
import Chat from "./pages/Chat/Chat";
import ProfileUpdate from "./pages/ProfileUpdate/ProfileUpdate";
import { AuthContext } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
import { useContext } from "react";
import Auth from "./pages/Auth/Auth";

const App = () => {
  const { authUser } = useContext(AuthContext);

  return (
    <>
      <Toaster />
      <Routes>
        <Route
          path='/'
          element={authUser ? <Chat /> : <Navigate to='/Auth' />}
        />
        <Route
          path='/Auth'
          element={!authUser ? <Auth /> : <Navigate to='/' />}
        />
        <Route
          path='/profile'
          element={authUser ? <ProfileUpdate /> : <Navigate to='/Auth' />}
        />
        <Route path='*' element={<p>Not Found 404</p>} />
      </Routes>
    </>
  );
};

export default App;
