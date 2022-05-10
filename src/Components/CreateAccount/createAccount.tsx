import { Alert, TextField } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAddAlt';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./createAccount.module.scss";

export function CreateAccount() {
    const [anErrorHasOccurred, setAnErrorHasOccurred] = useState(false);
    const [name, setName] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    function createAccount() {
        console.log({userName, password})
    }

    return (
        <div className={styles.container}>
            {anErrorHasOccurred ? (<Alert severity="error">{errorMessage}</Alert>) : null}
            <div className={styles.icon_container}>
            <PersonIcon className={styles.top_icon}/>
            <span className={styles.label}>Sign Up</span>
            </div>
            <div className={styles.form_group}>
                <TextField label="Name" value={name} onChange={(input) => setName(input.target.value)} className={styles.input_text} error={anErrorHasOccurred} variant="standard" name="username" id="username" />
            </div>
            <div className={styles.form_group}>
                <TextField label="Username" value={userName} onChange={(input) => setUserName(input.target.value)} className={styles.input_text} error={anErrorHasOccurred} variant="standard" name="username" id="username" />
            </div>
            <div className={styles.form_group}>
                <TextField label="Password" value={password} onChange={(input) => setPassword(input.target.value)} className={styles.input_text} error={anErrorHasOccurred} variant="standard"  name="password" id="password" />
            </div>
            <div className={styles.form_group}>
                <TextField label="Confirm Password" value={confirmPassword} onChange={(input) => setConfirmPassword(input.target.value)} className={styles.input_text} error={anErrorHasOccurred} variant="standard"  name="password" id="password" />
            </div>
            <button type="button" className={styles.primary_button} onClick={createAccount}><PersonAddIcon className={styles.button_icon} /> Create Account</button>
            <button type="button" className={styles.secondary_button} onClick={() => navigate("/login")}><LoginIcon className={styles.button_icon} /> I already have an account</button>
        </div>
    );
}