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
import { useEffect, useState } from "react";
import styles from "./login.module.scss";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { api } from "../../apiSettings";
import { AuthService } from "../../Services/authService";

export function Login() {
  const [anErrorHasOccurred, setAnErrorHasOccurred] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [canSeePassword, setCanSeePassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const authService = new AuthService();

  async function Login() {
    let login = { userName, password };

    var post = JSON.stringify(login);

    await api
      .post("/manageLogin/login", post)
      .then(({ data }) => {
        authService.saveUserIntoLocalStorage({
          id: data.data.id,
          token: data.data.token,
          name: data.data.name,
        });
        navigate("/");
      })
      .catch((error) => {
        setAnErrorHasOccurred(true);
        setErrorMessage(error.errorMessage);
      });
  }

  useEffect(() => {
    if (authService.isUserLogged()) {
      navigate("/");
    }
  }, []);

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
          required
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
          required
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
      <button type="button" className={styles.primary_button} onClick={Login}>
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
