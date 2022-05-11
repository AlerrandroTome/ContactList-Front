import { Avatar } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import styles from "./avatarContainer.module.scss";

interface IAvatarContentProps {
  loggedUserName: string;
}

export function AvatarContainer({ loggedUserName }: IAvatarContentProps) {
  function stringToColor(string: string) {
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

  function stringAvatar(name: string) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }

  return (
    <div className={styles.avatar_container}>
      <Avatar className={styles.avatar} {...stringAvatar(loggedUserName)} />
      <span>{loggedUserName}</span>
      <LogoutIcon className={styles.logout_icon} />
    </div>
  );
}
