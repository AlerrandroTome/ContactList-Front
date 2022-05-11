import {
  Alert,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAddAlt";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./createAccount.module.scss";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export function CreateAccount() {
  const [anErrorHasOccurred, setAnErrorHasOccurred] = useState(false);
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [canSeePassword, setCanSeePassword] = useState(false);
  const [canSeeConfirmPassword, setCanSeeConfirmPassword] = useState(false);
  const navigate = useNavigate();

  function createAccount() {
    console.log({ userName, password });
  }

  return (
    <div className={styles.container}>
      {anErrorHasOccurred ? (
        <Alert severity="error">{errorMessage}</Alert>
      ) : null}
      <div className={styles.icon_container}>
        <PersonIcon className={styles.top_icon} />
        <span className={styles.label}>Sign Up</span>
      </div>
      <div className={styles.form_group}>
        <TextField
          label="Name"
          value={name}
          onChange={(input) => setName(input.target.value)}
          className={styles.input_text}
          error={anErrorHasOccurred}
          variant="standard"
          name="username"
          id="username"
        />
      </div>
      <div className={styles.form_group}>
        <TextField
          label="Username"
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
      <FormControl className={styles.form_group} variant="standard">
        <InputLabel htmlFor="standard-adornment-confirm-password">
          Confirm Password
        </InputLabel>
        <Input
          id="standard-adornment-confirm-password"
          type={canSeeConfirmPassword ? "text" : "password"}
          value={confirmPassword}
          className={styles.input_text}
          onChange={(input) => setConfirmPassword(input.target.value)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                type="submit"
                onClick={() =>
                  setCanSeeConfirmPassword(canSeeConfirmPassword ? false : true)
                }
                edge="end"
              >
                {canSeeConfirmPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      <button
        type="button"
        className={styles.primary_button}
        onClick={createAccount}
      >
        <PersonAddIcon className={styles.button_icon} /> Create Account
      </button>
      <button
        type="button"
        className={styles.secondary_button}
        onClick={() => navigate("/login")}
      >
        <LoginIcon className={styles.button_icon} /> I already have an account
      </button>
    </div>
  );
}
