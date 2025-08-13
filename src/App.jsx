import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import Chat from "./pages/Chat/Chat";
import ProfileUpdate from "./pages/ProfileUpdate/ProfileUpdate";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/chat' element={<Chat />} />
          <Route path='/profile' element={<ProfileUpdate />} />
          <Route path='*' element={<p>Not Found 404</p>} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
