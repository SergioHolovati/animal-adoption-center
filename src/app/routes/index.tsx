import { BrowserRouter , Route, Routes } from "react-router-dom"
import { Dashboard, Edit, Profile } from "../pages";
import { Form } from "../pages/form/Form";

export const AppRoutes = () => {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" Component={Dashboard}/>
          <Route path="/" Component={Dashboard}/>
          <Route path="/profile/:idPet" Component={Profile}/>
          <Route path="/new-pet" Component={Form}/>
          <Route path="/edit/:idPet" Component={Edit}/>
        </Routes>
      </BrowserRouter>
    );
  };