import { Alert, Box, TextField } from "@mui/material";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import SearchIcon from "@mui/icons-material/Search";
import Edit from "@mui/icons-material/Edit";
import Remove from "@mui/icons-material/Delete";
import Create from "@mui/icons-material/Add";
import styles from "./grid.module.scss";
import { useEffect, useState } from "react";
import { AvatarContainer } from "../AvatarContainer/avatarContainer";
import { api } from "../../apiSettings";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../../Services/authService";

interface IUSer {
  name: string;
  id: string;
}

interface IRows {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  whatsappNumber: string;
}

export function Grid() {
  const [anErrorHasOccurred, setAnErrorHasOccurred] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loggedUser, setLoggedUser] = useState({} as IUSer);
  const navigate = useNavigate();
  const authService = new AuthService();

  const [search, setSearch] = useState("");
  const [rows, setRows] = useState<IRows[]>([]);

  const columns = [
    { field: "name", headerName: "Name" },
    { field: "email", headerName: "Email" },
    { field: "phoneNumber", headerName: "Phone Number" },
    { field: "whatsappNumber", headerName: "Whatsapp Number" },
  ];

  async function GetTableContent() {
    await api
      .get(
        `/manageContact?$filter=contains(name, '${search}') 
      or contains(email, '${search}') 
      or contains(phoneNumber, '${search}') 
      or contains(whatsappNumber, '${search}') 
      and userId eq ${loggedUser.id}`
      )
      .then(({ data }) => {
        setRows(data);
      });
  }

  async function RemoveAContact(id: string) {
    await api
      .delete(`/manageContact?id=${id}`)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        setAnErrorHasOccurred(true);
        setErrorMessage(error.response.data.errorMessage);
      });
  }

  useEffect(() => {
    if (!authService.isUserLogged()) {
      navigate("/login");
    } else {
      let user = authService.getCurrentUser();
      setLoggedUser({ id: user.id, name: user.name });
    }
  }, []);

  useEffect(() => {
    if (loggedUser.id !== undefined) {
      GetTableContent();
    }
  }, [search, loggedUser.id]);

  return (
    <>
      <AvatarContainer loggedUserName={loggedUser.name} />
      <div className={styles.container}>
        {anErrorHasOccurred ? (
          <Alert severity="error">{errorMessage}</Alert>
        ) : null}
        <div className={styles.top}>
          <PermContactCalendarIcon className={styles.contact_icon} />
          <h1>Contacts</h1>
        </div>
        <div className={styles.search_container}>
          <Box
            sx={{ display: "flex", alignItems: "flex-end" }}
            className={styles.box_search}
            width={"20rem"}
          >
            <SearchIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              id="input-with-sx"
              label="Search"
              variant="standard"
              className={styles.text_search}
              value={search}
              onChange={(input) => setSearch(input.target.value)}
              fullWidth={true}
            />
          </Box>
          <div className={styles.createNewBtn_container}>
            <button
              className={styles.createNewBtn}
              onClick={() => navigate("/create")}
            >
              <Create className={styles.create_icon} /> Create
            </button>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.tableContainer}>
            <table>
              <thead className={styles.tableHeadContainer}>
                <tr>
                  {columns.map((columns, i) => (
                    <th key={i} className={styles.TableHeaderCell}>
                      {columns.headerName}
                    </th>
                  ))}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className={styles.tableDataContainer}>
                {rows.map((row, i) => (
                  <tr key={i}>
                    <td className={styles.TableDataCell}>{row.name}</td>
                    <td className={styles.TableDataCell}>{row.email}</td>
                    <td className={styles.TableDataCell}>{row.phoneNumber}</td>
                    <td className={styles.TableDataCell}>
                      {row.whatsappNumber}
                    </td>
                    <td className={styles.TableDataActionsCell}>
                      <button
                        className={styles.btn_action}
                        onClick={() => navigate(`/edit/${row.id}`)}
                      >
                        <Edit className={styles.edit_icon} />
                      </button>
                      <button
                        className={styles.btn_action}
                        onClick={() => RemoveAContact(row.id)}
                      >
                        <Remove className={styles.remove_icon} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
