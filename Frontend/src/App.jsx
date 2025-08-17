import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import Chat from "./pages/Chat/Chat";
import ProfileUpdate from "./pages/ProfileUpdate/ProfileUpdate";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Toaster />
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/chat' element={<Chat />} />
            <Route path='/profile' element={<ProfileUpdate />} />
            <Route path='*' element={<p>Not Found 404</p>} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
