import { Avatar } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import styles from "./avatarContainer.module.scss";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../../Services/authService";

interface IAvatarContentProps {
  loggedUserName: string;
}

export function AvatarContainer({ loggedUserName }: IAvatarContentProps) {
  const navigate = useNavigate();
  const authService = new AuthService();

  function stringToColor(string: string | "") {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
  }

  function stringAvatar(name: string | "") {
    if (name !== undefined) {
      let nameArray = name.split(" ");
      return {
        sx: {
          bgcolor: stringToColor(name),
        },
        children: `${nameArray[0][0]}${nameArray[1] ? nameArray[1][0] : ""}`,
      };
    }
  }

  function logout() {
    authService.logout();
    navigate("/login");
  }

  return (
    <div className={styles.avatar_container}>
      <Avatar className={styles.avatar} {...stringAvatar(loggedUserName)} />
      <span>{loggedUserName}</span>
      <button onClick={() => logout()}>
        <LogoutIcon className={styles.logout_icon} />
      </button>
    </div>
  );
}
