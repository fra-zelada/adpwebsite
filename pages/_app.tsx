import "../styles/globals.css";
import type { AppProps } from "next/app";
import CssBaseline from "@mui/material/CssBaseline";
import { SessionProvider } from "next-auth/react";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <SessionProvider>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                    <CssBaseline />
                    <Component {...pageProps} />
                </LocalizationProvider>
            </SessionProvider>
        </>
    );
}
