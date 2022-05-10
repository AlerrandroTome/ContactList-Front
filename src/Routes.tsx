import { Route, Routes } from "react-router-dom";
import { CreateAccount } from "./Components/CreateAccount/createAccount";
import { Grid } from "./Components/Grid/grid";
import { Login } from "./Components/Login/login";

export const AppRoutes = () => {
    return(    
            <Routes>
                <Route index element={<Grid />} />
                <Route path="/login" element={<Login />} />
                <Route path="/create-account" element={<CreateAccount />} />
            </Routes>
    );
}