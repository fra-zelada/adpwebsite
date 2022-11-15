import {
    Box,
    Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    Radio,
    RadioGroup,
    Snackbar,
    Stack,
    Typography,
} from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { styled } from "@mui/material/styles";
import CircularProgress, {
    circularProgressClasses,
    CircularProgressProps,
} from "@mui/material/CircularProgress";
import LinearProgress, {
    linearProgressClasses,
} from "@mui/material/LinearProgress";
import VotesProgress from "./VotesProgress";
import { IMatch } from "../interfaces/match";
import Axios from "axios";
import { calcPercentage } from "../utils/pollPercentage";
import randomColor from "randomcolor";
// Inspired by
interface Props {
    match: IMatch;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Match: FC<Props> = ({ match }) => {
    const [matchData, setMatch] = useState(match);
    const { img, oponents, title, eventCode, subtitle, _id } = matchData;
    const oponentsList = oponents.map(({ name }) => name);
    const [open, setOpen] = useState(false);
    const [vote, setVote] = useState<any>(undefined);
    const [sendingVote, setSendingVote] = useState(false);

    const [colorList, setColorList] = useState<any>([]);

    useEffect(() => {
        let colors = [];

        colors = Array(oponents.length).fill("");
        oponents.forEach((_, i) => {
            colors[i] = randomColor();
        });
        setColorList(colors);
    }, []);

    let oponentsPercentage = calcPercentage(oponents);
    useEffect(() => {
        oponentsPercentage = calcPercentage(oponents);
    }, [matchData]);

    const handleClick = async () => {
        setSendingVote(true);
        setOpen(true);
        setVote(undefined);
        const postVote = {
            idMatch: _id,
            oponentId: vote,
        };
        const resp = await Axios.post("/api/poll", postVote);

        setMatch((prev) => ({
            ...prev,
            oponents: prev.oponents.map((oponent) => {
                if (oponent._id === vote) {
                    return { ...oponent, votes: oponent.votes + 1 };
                } else return oponent;
            }),
        }));
        setTimeout(() => {
            setSendingVote(false);
        }, 250);
    };

    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };

    return (
        <Grid
            container
            spacing={0}
            style={{
                marginTop: 10,
                padding: 10,
                maxWidth: 600,
                WebkitBoxShadow: "6px 5px 34px 2px rgba(123,132,1321,132)",
                boxShadow:
                    "box-shadow: 6px 5px 34px 2px rgba(123,132,1321,132)",
            }}
        >
            <Grid item xs={12}>
                <picture>
                    <img src={img} alt={title} style={{ maxWidth: "100%" }} />
                </picture>
            </Grid>

            <Grid item xs={12}>
                <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">
                        {new Intl.ListFormat("es-CL", {
                            style: "long",
                            type: "conjunction",
                            localeMatcher: "best fit",
                        })
                            .format(oponentsList)
                            .replaceAll(" y ", " vs. ")}
                    </FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        value={vote || ""}
                        defaultValue={vote || ""}
                        onChange={(event) => {
                            setVote(event.target.value as string);
                        }}
                    >
                        {oponents.map(({ name, _id }) => (
                            <FormControlLabel
                                key={name}
                                value={_id}
                                control={<Radio />}
                                label={name}
                            />
                        ))}
                    </RadioGroup>
                </FormControl>
            </Grid>

            <Grid item xs={12} marginBottom={1}>
                <Button
                    variant="contained"
                    fullWidth
                    onClick={handleClick}
                    disabled={!!vote ? false : true}
                >
                    Votar
                </Button>
            </Grid>
            <Grid item xs={12}>
                <Box
                    style={{
                        display: sendingVote ? "flex" : "none",
                        justifyContent: "center",
                    }}
                >
                    <CircularProgress />
                </Box>

                <Box
                    style={{
                        transition: "visibility 0.5s, opacity 0.5s",
                        visibility: !sendingVote ? "visible" : "hidden",
                        opacity: !sendingVote ? 1 : 0,
                    }}
                >
                    {oponentsPercentage.map(
                        ({ name, percentage, votes }, i) => (
                            <VotesProgress
                                key={name}
                                oponent={name}
                                percentage={percentage}
                                votes={votes}
                                colorBar={colorList[i]}
                            />
                        )
                    )}
                </Box>
            </Grid>

            <Grid item xs={12}>
                {/* <Stack spacing={2} sx={{ width: "100%" }}> */}
                <Snackbar
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                    open={open}
                    autoHideDuration={2000}
                    onClose={handleClose}
                >
                    <Alert
                        onClose={handleClose}
                        severity="success"
                        sx={{ width: "100%", top: 0 }}
                    >
                        Voto enviado!
                    </Alert>
                </Snackbar>
                {/* </Stack> */}
            </Grid>
        </Grid>
    );
};

export default Match;
