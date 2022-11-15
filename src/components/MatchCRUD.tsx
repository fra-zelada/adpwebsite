import {
    Box,
    Button,
    Checkbox,
    Chip,
    FormControlLabel,
    Grid,
    TextField,
    Typography,
} from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { IMatch } from "../interfaces/match";

const MatchCRUD = () => {
    const [oponentsTags, setOponentsTags] = useState([]);
    const [form, setForm] = useState({
        event: "",
        title: "",
        subtitle: "",
        img: "",
        oponents: "",
        votes: 0,
        eventCode: "wwe",
    });
    const { event, img, oponents, subtitle, title } = form;
    const addOponent = (
        event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
    ) => {
        const oponent = event.target.value.trim();
        if (oponent.length > 0)
            setOponentsTags((oldArray) => [...oldArray, oponent]);
        setForm((prev) => ({ ...prev, oponents: "" }));
    };
    const onDeleteOponentTag = (event: string) => {
        let oponentsTemp = oponentsTags;
        oponentsTemp = oponentsTags.filter((oponent) => oponent !== event);
        setOponentsTags(oponentsTemp);
    };

    const onSubmit = async () => {
        const oponentsArrayObject = [];

        oponentsTags.forEach((element, i) => {
            oponentsArrayObject.push({ name: element, votes: 0 });
        });

        const newMatch: IMatch = {
            eventCode: "wwe22",
            subtitle: "asdsad",
            img,
            oponents: oponentsArrayObject,
            title,

            votes: 0,
        };
        console.log(newMatch);
        await axios.post("/api/match", newMatch);
    };

    return (
        <Box style={{ padding: 10, maxWidth: "80vw", minWidth: "80vw" }}>
            <React.Fragment>
                <Typography variant="h6" gutterBottom>
                    Nueva Lucha
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            required
                            id="event"
                            name="event"
                            label="evento"
                            fullWidth
                            variant="standard"
                            value={event}
                            onChange={({ target }) => {
                                setForm((prev) => ({
                                    ...prev,
                                    [target.name]: target.value,
                                }));
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="title"
                            name="title"
                            label="Título"
                            fullWidth
                            variant="standard"
                            value={title}
                            onChange={({ target }) => {
                                setForm((prev) => ({
                                    ...prev,
                                    [target.name]: target.value,
                                }));
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="subtitle"
                            name="subtitle"
                            label="Subtítulo"
                            fullWidth
                            variant="standard"
                            value={subtitle}
                            onChange={({ target }) => {
                                setForm((prev) => ({
                                    ...prev,
                                    [target.name]: target.value,
                                }));
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            id="img"
                            name="img"
                            label="Imagen"
                            fullWidth
                            variant="standard"
                            value={img}
                            onChange={({ target }) => {
                                setForm((prev) => ({
                                    ...prev,
                                    [target.name]: target.value,
                                }));
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="oponent"
                            name="oponent"
                            label="Oponente"
                            fullWidth
                            value={oponents}
                            onChange={({ target }) => {
                                setForm((prev) => ({
                                    ...prev,
                                    oponents: target.value,
                                }));
                            }}
                            variant="standard"
                            onBlur={addOponent}
                            onKeyUp={(event) =>
                                event.code === "Enter"
                                    ? addOponent(event)
                                    : undefined
                            }
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        {oponentsTags.map((oponent, i) => (
                            <Chip
                                key={i}
                                label={oponent}
                                variant="outlined"
                                onClick={() => {}}
                                onDelete={() => onDeleteOponentTag(oponent)}
                            />
                        ))}
                    </Grid>
                    <Grid xs={12} mt={5}>
                        <Button
                            fullWidth
                            variant="contained"
                            onClick={onSubmit}
                        >
                            Enviar
                        </Button>
                    </Grid>
                </Grid>
            </React.Fragment>
        </Box>
    );
};

export default MatchCRUD;
