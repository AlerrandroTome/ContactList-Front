import {
  Alert,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAddAlt";
import { useState } from "react";
import styles from "./login.module.scss";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export function Login() {
  const [anErrorHasOccurred, setAnErrorHasOccurred] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [canSeePassword, setCanSeePassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  function login() {
    console.log({ userName, password });
  }

  return (
    <div className={styles.container}>
      {anErrorHasOccurred ? (
        <Alert severity="error">{errorMessage}</Alert>
      ) : null}
      <div className={styles.icon_container}>
        <PersonIcon className={styles.top_icon} />
        <span className={styles.label}>Sign In</span>
      </div>
      <div className={styles.form_group}>
        <TextField
          label="UserName"
          value={userName}
          onChange={(input) => setUserName(input.target.value)}
          className={styles.input_text}
          error={anErrorHasOccurred}
          variant="standard"
          name="username"
          id="username"
        />
      </div>
      <FormControl className={styles.form_group} variant="standard">
        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
        <Input
          id="standard-adornment-password"
          type={canSeePassword ? "text" : "password"}
          value={password}
          className={styles.input_text}
          onChange={(input) => setPassword(input.target.value)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                type="submit"
                onClick={() => setCanSeePassword(canSeePassword ? false : true)}
                edge="end"
              >
                {canSeePassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      <button type="button" className={styles.primary_button} onClick={login}>
        <LoginIcon className={styles.button_icon} />
        Login
      </button>
      <button
        type="button"
        className={styles.secondary_button}
        onClick={() => navigate("/create-account")}
      >
        <PersonAddIcon className={styles.button_icon} />
        Create Account
      </button>
    </div>
  );
}
