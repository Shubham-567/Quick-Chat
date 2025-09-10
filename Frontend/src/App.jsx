import { Route, Routes } from "react-router-dom";
import Chat from "./pages/Chat/Chat";
import { AuthContext } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
import { useContext } from "react";
import Auth from "./pages/Auth/Auth";

const App = () => {
  const { authStatus } = useContext(AuthContext);

  if (authStatus === "loading") {
    return (
      <p className='flex justify-center items-center h-screen text-2xl text-muted text-center animate-pulse'>
        Loading, Please wait...
      </p>
    );
  }

  // todo: add sidebar loading it's not working right now

  return (
    <>
      <Toaster />
      <Routes>
        <Route
          path='/'
          element={authStatus === "unauthenticated" ? <Auth /> : <Chat />}
        />
        <Route path='*' element={<p>Not Found 404</p>} />
      </Routes>
    </>
  );
};

export default App;
