import { Avatar, Box, TextField } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import styles from "./grid.module.scss";
import { useState } from "react";


export function Grid() {
    const [loggedUserName, setLoggedUserName] = useState("Alerrandro Tomé");

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID' },
        { field: 'firstName', headerName: 'First name' },
        { field: 'lastName', headerName: 'Last name' },
        {
          field: 'age',
          headerName: 'Age',
          type: 'number',
        },
        {
          field: 'fullName',
          headerName: 'Full name',
          description: 'This column has a value getter and is not sortable.',
          sortable: false,
          valueGetter: (params: GridValueGetterParams) =>
            `${params.row.firstName || ''} ${params.row.lastName || ''}`,
        },
      ];
      
      const rows = [
        { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
        { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
        { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
        { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
        { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
        { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
        { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
        { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
        { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
      ];
    
      function stringToColor(string: string) {
        let hash = 0;
        let i;
      
        for (i = 0; i < string.length; i += 1) {
          hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }
      
        let color = '#';
      
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
          children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
      }

    return (
        <div className={styles.container}>
            <div className={styles.avatar_container}>
                <Avatar {...stringAvatar(loggedUserName)} /> 
                <span>{loggedUserName}</span>
                <LogoutIcon className={styles.logout_icon}/>
            </div>
            <div className={styles.top}>
            <PermContactCalendarIcon className={styles.contact_icon}/><h1>Contacts</h1>
            </div>
            <div className={styles.search_container}>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }} className={styles.box_search} width={'20rem'}>
                    <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField id="input-with-sx" label="Search" variant="standard" className={styles.text_search} fullWidth={true} />
                </Box>
            </div>
            <div className={styles.content}>
            <DataGrid
                rows={rows}
                columns={columns}
                autoHeight={true}
                disableColumnFilter
                disableColumnMenu
                disableColumnSelector
                disableSelectionOnClick
                rowCount={41}
                pageSize={5}
                rowsPerPageOptions={[5]}
                className={styles.table_content}
            />
            </div>
        </div>
    );
}