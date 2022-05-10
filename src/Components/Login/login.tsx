import { Alert, TextField } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAddAlt';
import { useState } from "react";
import styles from "./login.module.scss";
import { useNavigate } from "react-router-dom";

export function Login() {
    const [anErrorHasOccurred, setAnErrorHasOccurred] = useState(false);
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    function login() {
        console.log({userName, password})
    }

    return (
        <div className={styles.container}>
            {anErrorHasOccurred ? (<Alert severity="error">{errorMessage}</Alert>) : null}
            <div className={styles.icon_container}>
            <PersonIcon className={styles.top_icon}/>
            <span className={styles.label}>Sign In</span>
            </div>
            <div className={styles.form_group}>
                <TextField label="UserName" value={userName} onChange={(input) => setUserName(input.target.value)} className={styles.input_text} error={anErrorHasOccurred} variant="standard" name="username" id="username" />
            </div>
            <div className={styles.form_group}>
                <TextField label="Password" value={password} onChange={(input) => setPassword(input.target.value)} className={styles.input_text} error={anErrorHasOccurred} variant="standard"  name="password" id="password" />
            </div>
            <button type="button" className={styles.primary_button} onClick={login}><LoginIcon className={styles.button_icon} />Login</button>
            <button type="button" className={styles.secondary_button} onClick={() => navigate("/create-account")}><PersonAddIcon className={styles.button_icon} />Create Account</button>
        </div>
    );
}