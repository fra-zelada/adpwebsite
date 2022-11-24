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
import React, { FC, useEffect, useState } from "react";
import axios from "axios";
import { IMatch, IOponent } from "../interfaces/match";
import { useRouter } from "next/router";
import { IEvent } from "../interfaces/event";
import AutocompleteEvent from "./utils/AutocompleteEvent";
import { IScheduledEvent } from "../interfaces/scheduledEvent";
import moment from "moment";

interface Props {
    match?: IMatch;
    eventList: IEvent[];
    scheduledEvent: IScheduledEvent;
}

const MatchCRUD: FC<Props> = ({ match, eventList = [], scheduledEvent }) => {
    const { event } = scheduledEvent;
    const INITIAL_STATE: IMatch = match
        ? match
        : {
              title: "",
              subtitle: "",
              img: "",
              oponents: [],
              eventCode: "",
              votes: 0,
              event: scheduledEvent,
          };
    const [pathEvent, setPathEvent] = useState("");
    const [form, setForm] = useState<IMatch>(INITIAL_STATE);
    const { img, oponents, subtitle, title, eventCode } = form;
    const [oponentInput, setOponentInput] = useState("");
    const addOponent = (
        event:
            | React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
            | any
    ) => {
        let name: string = event.target.value.trim();

        if (name.length > 0) {
            setForm((prev) => ({
                ...prev,
                oponents: [...prev.oponents, { name, votes: 0 }],
            }));
        }
        setOponentInput("");
    };
    const onDeleteOponentTag = (oponentName: string) => {
        let oponentsTemp = [...oponents];
        oponentsTemp = oponentsTemp.filter(({ name }) => name !== oponentName);
        setForm((prev) => ({
            ...prev,
            oponents: [...oponentsTemp],
        }));
    };

    const router = useRouter();

    const onSubmit = async () => {
        if (form._id) {
            try {
                await axios.put("/api/match", form);
                setPathEvent(scheduledEvent.slug);
            } catch (error) {
                alert(`updating error: ${error}`);
            }
        } else {
            try {
                await axios.post("/api/match", form);
                setPathEvent(scheduledEvent.slug);
            } catch (error) {
                alert(error);
            }
        }
    };

    const [eventSelected, setEventSelected] = useState<IEvent | undefined>(
        undefined
    );

    return (
        <Box style={{ padding: 10, maxWidth: "80vw", minWidth: "80vw" }}>
            <React.Fragment>
                <Typography variant="h4" gutterBottom>
                    {`Evento: ${event?.company} ${event?.value}`}
                </Typography>
                <Typography variant="h5" gutterBottom>
                    {`Fecha: ${moment(scheduledEvent.date).format(
                        "DD-MM-YYYY HH:mm"
                    )}`}
                </Typography>
                <Grid container spacing={3}>
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
                            value={oponentInput}
                            onChange={({ target }) => {
                                setOponentInput(target.value);
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
                        {oponents.map(({ name }, i) => (
                            <Chip
                                key={i}
                                label={name}
                                variant="outlined"
                                onClick={() => {}}
                                onDelete={() => onDeleteOponentTag(name)}
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
