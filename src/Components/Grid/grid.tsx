import { Box, TextField } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import SearchIcon from "@mui/icons-material/Search";
import Edit from "@mui/icons-material/Edit";
import styles from "./grid.module.scss";
import { forwardRef, useEffect, useState } from "react";
import { AvatarContainer } from "../AvatarContainer/avatarContainer";
import { api } from "../../apiSettings";

export function Grid() {
  const [loggedUserName, setLoggedUserName] = useState("Alerrandro Tomé");
  const [search, setSearch] = useState("");
  const [rows, setRows] = useState([]);
  const userId = "f3f99866-f743-494b-8dea-bd14c2a9b0e6";

  const columns: GridColDef[] = [
    { field: "id", hide: true },
    { field: "name", headerName: "Name", width: 200 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "phoneNumber", headerName: "Phone Number", width: 200 },
    { field: "whatsappNumber", headerName: "Whatsapp Number", width: 200 },
  ];

  async function getTableContent() {
    const { data } = await api.get(
      `/api/manageContact?$filter=contains(name, '${search}') or contains(email, '${search}') or contains(phoneNumber, '${search}') or contains(whatsappNumber, '${search}') and userId eq ${userId}`
    );
    setRows(data);
  }

  useEffect(() => {
    getTableContent();
  }, [search]);

  return (
    <>
      <AvatarContainer loggedUserName={loggedUserName} />
      <div className={styles.container}>
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
        </div>
        <div className={styles.content}>
          <DataGrid
            rows={rows}
            columns={columns}
            autoHeight={true}
            disableColumnFilter
            disableColumnMenu
            className={styles.table_content}
          />
        </div>
      </div>
    </>
  );
}
