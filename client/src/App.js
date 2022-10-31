import './App.css';
import UserLogin from './user/userLogin';
import UserRegister from "./user/userRegistration"
import UserCreateComment from "./user/userComment"
import ConsumerRegistration from "./consumer/consumerRegistration"
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/api/consumer/register" element={<ConsumerRegistration/>}></Route>
      </Routes>
      <Routes>
        <Route path="/api/user/register" element={<UserRegister/>}></Route>
        <Route path="/api/user/login" element={<UserLogin/>}></Route>
        <Route path="/api/comment/create" element={<UserCreateComment/>}></Route>
      </Routes>

    </BrowserRouter>
  )
}

export default App;
