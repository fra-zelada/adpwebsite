import {
    Alert,
    Avatar,
    Box,
    Button,
    Checkbox,
    Container,
    FormControlLabel,
    Grid,
    Link,
    Snackbar,
    TextField,
    Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Copyright } from "@mui/icons-material";
import { FC, useEffect, useState } from "react";
import { BuiltInProviderType } from "next-auth/providers";
import { ClientSafeProvider, LiteralUnion, signIn } from "next-auth/react";
import GoogleIcon from "@mui/icons-material/Google";
import { ObjectType } from "typescript";
interface Props {
    providers: Record<
        LiteralUnion<BuiltInProviderType, string>,
        ClientSafeProvider
    > | null;
    csrfToken: string | undefined;
    error: string;
}

const Login: FC<Props> = ({ providers, csrfToken, error: errorCode = "" }) => {
    const handleSubmit = () => {};

    const [loginForm, setLoginForm] = useState({
        csrfToken,
        username: `${process.env.NEXT_PUBLIC_TEST_USER}`,
        password: `${process.env.NEXT_PUBLIC_TEST_PASS}`,
    });
    const { username, password } = loginForm;

    const errorList = {
        AccessDenied: "Acceso Denegado",
        CredentialsSignin: "Error en las credenciales",
    };

    const [showError, setShowError] = useState(!!errorCode);

    useEffect(() => {
        setShowError(!!errorCode);
        if (errorCode)
            setTimeout(() => {
                setShowError(false);
            }, 5000);
    }, [errorCode]);

    return (
        <form
            method="post"
            action="/api/auth/callback/credentials"
            noValidate
            // style={{ border: "solid 1px blue" }}
        >
            <Container
                component="main"
                maxWidth="xs"
                // style={{ border: "solid 1px blue" }}
            >
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    {errorCode && (
                        <Snackbar
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "center",
                            }}
                            open={showError}
                            autoHideDuration={6000}
                            sx={{ mt: 10 }}
                            // onClose={handleClose}
                        >
                            <Alert severity="error">
                                {errorList[errorCode as keyof typeof errorList]}
                            </Alert>
                        </Snackbar>
                    )}
                    <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box
                        // component="form"
                        // onSubmit={handleSubmit}
                        // noValidate
                        sx={{ mt: 1 }}
                    >
                        <input
                            name="csrfToken"
                            type="hidden"
                            defaultValue={csrfToken}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            value={username}
                            onChange={({ target }) => {
                                setLoginForm((prev) => ({
                                    ...prev!!,
                                    [target.name]: [target.value],
                                }));
                            }}
                            name="username"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            value={password}
                            onChange={({ target }) => {
                                setLoginForm((prev) => ({
                                    ...prev!!,
                                    [target.name]: [target.value],
                                }));
                            }}
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        {/* <FormControlLabel
                            control={
                                <Checkbox value="remember" color="primary" />
                            }
                            label="Remember me"
                        /> */}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            {Object.values(providers!!).map((provider) => {
                                if (provider.type !== "credentials")
                                    return (
                                        <Grid item xs={12} key={provider.name}>
                                            <Button
                                                fullWidth
                                                color="primary"
                                                variant="contained"
                                                sx={{ mt: 1 }}
                                                onClick={() =>
                                                    signIn(provider.id)
                                                }
                                            >
                                                {`Sign in with ${provider.name}`}
                                                {provider.name === "Google" && (
                                                    <GoogleIcon
                                                        sx={{ ml: 1 }}
                                                    />
                                                )}
                                            </Button>
                                        </Grid>
                                    );
                            })}
                        </Grid>
                        {/* <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    {`Forgot password?`}
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid> */}
                    </Box>
                </Box>
            </Container>
        </form>
    );
};

export default Login;
