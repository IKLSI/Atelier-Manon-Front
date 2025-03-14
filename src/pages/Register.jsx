import React, { useState } from "react";
import { TextField, InputLabel, InputAdornment, IconButton, Button, Box, Typography, Container, OutlinedInput, FormControl, Snackbar, Alert, CircularProgress } from "@mui/material";
import VisibilityOn from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from "react-router";
import { useAuth } from "../utils/AuthContext";

function Register() {

    const {register} = useAuth();
    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState("");
    const [isErrorDisplayed, setIsErrorDisplayed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [lastname, setLastname] = useState("");
    const [firstname, setFirstname] = useState("");

    const [isSamePassword, setIsSamePassword] = useState(password === confirmPassword);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // user address
    const [addressNumber, setAddressNumber] = useState(""); // string : can be "1 bis"
    const [addressStreet, setAddressStreet] = useState("");
    const [addressCity, setAddressCity] = useState("");
    const [addressPostalCode, setAddressPostalCode] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            setErrorMessage("Les mots de passes doivent correspondre.");
            setIsSamePassword(false);
            setIsErrorDisplayed(true);
            return;
        }
        if (password.length >= 8) setIsSamePassword(true);
        else {
            setErrorMessage("Votre mot de passe doit faire au moins 8 caractères de long.");
            setIsSamePassword(false);
            setIsErrorDisplayed(true);
            return;
        }

        if (!firstname || !lastname) {
            setErrorMessage("Veuillez renseigner votre nom et prénom.");
            setIsErrorDisplayed(true);
            return;
        }

        if (!addressStreet || !addressCity || !addressPostalCode) {
            setErrorMessage("Veuillez renseigner une adresse.");
            setIsErrorDisplayed(true);
            return;
        }

        setIsLoading(true);
        register(firstname, lastname, email, password, [addressNumber, addressStreet, addressCity, addressPostalCode])
            .then((res) => {
                if (res) navigate("/email-sent");
                setIsLoading(false);
            }).catch(err => {setErrorMessage(err.response.data); setIsErrorDisplayed(true); setIsLoading(false)})
    };

    const placeholderStyle = {
        "& input::placeholder": {
            color: "blue",
            fontWeight: "bold",
        }
    }

    return (

        <Container maxWidth="100%" sx={{display:"flex", justifyContent:'center'}} >
            <Snackbar
                open={isErrorDisplayed}
                autoHideDuration={3000}
                onClose={()=>setIsErrorDisplayed(false)}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <Alert onClose={()=>setIsErrorDisplayed(false)} severity="error" sx={{ width: "100%" }}>
                    {errorMessage}
                </Alert>
            </Snackbar>
            { !isLoading && <Box
            maxWidth="sm"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography color="customYellow" fontWeight="700" component="h1" variant="h4" >
                    Inscription
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{ mt: 1 }}
                >
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Adresse e-mail"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        sx={placeholderStyle}
                    />
                    <FormControl margin="normal" fullWidth variant="outlined" >
                        <InputLabel color="black" htmlFor="password">Mot de passe *</InputLabel>
                        <OutlinedInput
                            required
                            id="password"
                            label="Mot de passe"
                            autoComplete="password"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            error={!isSamePassword}
                            sx={placeholderStyle}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={e => setShowPassword(!showPassword)}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOn /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <FormControl margin="normal" fullWidth variant="outlined" >
                        <InputLabel color="black" htmlFor="confirmPassword" fullWidth >Confirmation du mot de passe *</InputLabel>
                        <OutlinedInput
                            required
                            id="confirmPassword"
                            label="Confirmation du mot de passe"
                            autoComplete="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            error={!isSamePassword}
                            sx={placeholderStyle}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={e => setShowConfirmPassword(!showConfirmPassword)}
                                        edge="end"
                                    >
                                        {showConfirmPassword ? <VisibilityOn /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Prénom"
                        type="text"
                        id="firstname"
                        autoComplete="firstname"
                        value={firstname}
                        onChange={e => setFirstname(e.target.value)}
                        sx={placeholderStyle}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Nom"
                        type="text"
                        id="lastname"
                        autoComplete="lastname"
                        value={lastname}
                        onChange={e => setLastname(e.target.value)}
                        sx={placeholderStyle}
                    />
                    <Box display="flex" gap="1rem" >
                        <TextField
                            aria-colspan={2}
                            margin="normal"
                            label="N°"
                            type="text"
                            id="addressNumber"
                            autoComplete="addressNumber"
                            value={addressNumber}
                            onChange={e => setAddressNumber(e.target.value)}
                            sx={{ ...placeholderStyle, flex: '0 0 5rem' }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Rue / Voie / Lieu-Dit"
                            type="text"
                            id="addressStreet"
                            autoComplete="addressStreet"
                            value={addressStreet}
                            onChange={e => setAddressStreet(e.target.value)}
                            sx={placeholderStyle}
                        />

                    </Box>
                    <Box display="flex" gap="1rem" >
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Ville"
                            type="text"
                            id="addressCity"
                            autoComplete="addressCity"
                            value={addressCity}
                            onChange={e => setAddressCity(e.target.value)}
                            sx={placeholderStyle}
                        />
                        <TextField
                            margin="normal"
                            required
                            label="Code Postal"
                            type="number"
                            id="addressPostalCode"
                            autoComplete="addressPostalCode"
                            value={addressPostalCode}
                            onChange={e => setAddressPostalCode(e.target.value)}
                            sx={{ ...placeholderStyle, flex: '0 0 8rem' }}
                        />
                    </Box>

                    <Button
                        type="submit"
                        fullWidth
                        variant="yellowButton"
                        sx={{ mt: 2, mb: 2 }}
                    >S'inscrire</Button>
                    <Box display="flex" gap={1} justifySelf='center' >
                        <Typography sx={{ fontSize: '12px' }} >Vous avez déjà un compte ?</Typography>
                        <Typography onClick={e => navigate('/login')} sx={{ textDecoration: 'underline', fontSize: '12px', cursor: 'pointer' }}
                        >Se connecter</Typography>
                    </Box>
                </Box>
            </Box>}
            {isLoading && <CircularProgress size={60} thickness={5} color="" sx={{mt:5}} />}
        </Container>

    );
}

export default Register;