import React, { useState } from "react";
import { TextField, Button, Box, Typography, Container, useTheme, Alert, Snackbar } from "@mui/material";
import { useNavigate } from "react-router";
import { forgotPassword } from "../../services/ConnectionService";

function ForgotPassword() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [isErrorDisplayed, setIsErrorDisplayed] = useState(false);
    const [errorMessage, setErrorMessage] = useState("Erreur survenue");

    const theme = useTheme();

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!email) {
            setErrorMessage("Veuillez renseigner une adresse email valide.");
            setIsErrorDisplayed(true);
            return;
        }
        const exec = async () => {
            const data = await forgotPassword(email);
            if (!data) return;
            if (data.status === 404) {
                setErrorMessage("L'adresse renseignée n'est associée à aucun compte.");
                setIsErrorDisplayed(true);
                return;
            }
            changeRoute('/email-sent');
        }
        exec();
    };

    const changeRoute = (route) => {
        navigate(route);
    };

    const handleClose = () => setIsErrorDisplayed(false);

    const fieldStyle = {
        "& .MuiOutlinedInput-root": {
            color: theme.palette.customYellow.main, // Couleur par défaut
            "&.Mui-focused fieldset": {
                borderColor: theme.palette.customYellow.main,
            },
        },
        "& .MuiInputLabel-root.Mui-focused": {
            color: theme.palette.customYellow.main, // Couleur quand focus
        }
    }

    return (

        <Container maxWidth="xs" >
            <Box
                sx={{
                    mt: 7,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Snackbar
                    open={isErrorDisplayed}
                    autoHideDuration={3000}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                >
                    <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
                        {errorMessage}
                    </Alert>
                </Snackbar>
                <Typography color="customYellow" fontWeight="700" component="h1" variant="h5" >
                    Réinitialisation de mot de passe
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{ mt: 1, width: '100%' }}
                >
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Adresse e-mail"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        sx={fieldStyle}
                    />
                    <Box display="flex" gap={1} justifySelf='end' >
                        <Typography sx={{ fontSize: '12px' }} >Pas encore inscrit ?</Typography>
                        <Typography onClick={e => changeRoute('/register')} sx={{ textDecoration: 'underline', fontSize: '12px', cursor: 'pointer' }} >
                            Inscrivez-vous</Typography>
                    </Box>
                    <Button
                        type="submit"
                        fullWidth
                        variant="yellowButton"
                        sx={{ mt: 3, mb: 2 }}
                    >Valider</Button>
                    <Typography onClick={e => changeRoute('/login')} sx={{ justifySelf: 'center', fontSize: '12px', textDecoration: 'underline', cursor: 'pointer' }} >
                        Annuler</Typography>
                </Box>
            </Box>
        </Container>

    );

}


export default ForgotPassword;
