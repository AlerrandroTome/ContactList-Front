import { Route, Routes } from "react-router-dom";
import { CreateAccount } from "./Components/CreateAccount/createAccount";
import { ContactForm } from "./Components/ContactForm/contactForm";
import { Grid } from "./Components/Grid/grid";
import { Login } from "./Components/Login/login";

export const AppRoutes = () => {
    return(    
            <Routes>
                <Route index element={<ContactForm />} />
                <Route path="/login" element={<Login />} />
                <Route path="/create-account" element={<CreateAccount />} />
                <Route path="/grid" element={<Grid />} />
            </Routes>
    );
}