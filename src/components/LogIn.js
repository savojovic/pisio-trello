import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { apiVersion, baseURL, tokenEndPoint } from '../constants/Constants';
import crypto from 'crypto';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { InviteContext, SessionContext } from './SessionContext';

const theme = createTheme();

export default function SignIn() {

    const history = useHistory();
    const { isLogged, setIsLogged } = React.useContext(SessionContext)
    const { isBoardOpen, setIsBoardOpen } = React.useContext(InviteContext);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        var username = data.get('username')
        var password = data.get('password')

        // eslint-disable-next-line no-console
        if (!(username && password)) {
            window.alert("Enter username anad password");
            return;
        }
        var passHash = crypto.createHash('sha256').update(password).digest('hex');
        console.log(passHash);
        var url = baseURL + apiVersion + tokenEndPoint;
        var query = `?username=${username}&password=${passHash}`;
        console.log(url + query)
        axios.post(url + query)
            .then(res => {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('username', username);
                setIsLogged(true);
            })
            .then(() => history.push('/'))
            .catch(err => window.alert(err))
    };

    return (
        <ThemeProvider theme={theme}>
            {setIsBoardOpen(false)}
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}