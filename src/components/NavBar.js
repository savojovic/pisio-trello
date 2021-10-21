import React from 'react';
import { useHistory } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { InviteContext, SessionContext } from './SessionContext';
import { useContext } from 'react';
import axios from 'axios';
import { apiVersion, baseURL, boardsPoint, membersEndPoint } from '../constants/Constants';

export default function NavBar() {
    let history = useHistory();
    const { isLogged, setIsLogged } = useContext(SessionContext)
    const { isBoardOpen, setIsBoardOpen } = useContext(InviteContext);

    const loadHomePage = () => {
        history.push('/')
    }
    const inviteNewMember = () => {
        var username = prompt("Enter users name.");
        console.log(baseURL + apiVersion + boardsPoint + localStorage.getItem('boardId') + '/' + membersEndPoint +
            `?username=${username}`)
        axios.put(baseURL + apiVersion + boardsPoint + localStorage.getItem('boardId') + '/' + membersEndPoint +
            `?username=${username}`)
            .then(res => console.log(res.data))
    }
    return (
        <Box style={{ paddingBottom: 30 }} sx={{ flexGrow: 1 }}>
            <AppBar style={{ backgroundColor: "#0079bf" }} position="static">
                <Toolbar >
                    <Typography onClick={loadHomePage} style={isBoardOpen ? styles.boardOpen : styles.boardClosed} variant="h6" component="div" >
                        <div >
                            Trello
                        </div>
                    </Typography>
                    {isBoardOpen ?
                        <Typography
                            sx={{ marginLeft: 2, marginRight: '85%', cursor: "pointer" }}
                            onClick={inviteNewMember}
                            variant='h6'
                        >
                            Invite
                        </Typography> : ""}

                    {isLogged ?
                        <Button onClick={() => history.push('/logout')} color="inherit">Sign Out</Button> :
                        <Button color="inherit" onClick={() => history.push('/login')}>Sign In</Button>}
                </Toolbar>
            </AppBar>
        </Box >
    );
}
const styles = {
    boardOpen: {
        cursor: "pointer"
    },
    boardClosed: {
        cursor: "pointer",
        marginRight: '90%'
    }
}