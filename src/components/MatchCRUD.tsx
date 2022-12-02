import {
    Box,
    Button,
    Checkbox,
    Chip,
    FormControlLabel,
    FormHelperText,
    Grid,
    Input,
    TextField,
    Typography,
} from "@mui/material";
import axios from "axios";
import { IMatch, IOponent } from "../interfaces/match";
import { useRouter } from "next/router";
import { IEvent } from "../interfaces/event";
import AutocompleteEvent from "./utils/AutocompleteEvent";
import { IScheduledEvent } from "../interfaces/scheduledEvent";
import moment from "moment";
import * as yup from "yup";

import {
    ChangeEvent,
    ChangeEventHandler,
    FC,
    useEffect,
    useRef,
    useState,
} from "react";

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

    const formSchema = yup.object().shape({
        title: yup.string().required("Ingrese título"),
        subtitle: yup.string().required("Ingrese subtítulo"),
        oponents: yup
            .array()
            .min(2, "ingrese listado de oponentes")
            .required("Ingrese Oponentes"),
        // img: yup
        //     .string()
        //     .matches(
        //         /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
        //         "Enter correct url!"
        //     )
        //     .required("Please enter website"),
    });

    const addOponent = () => {
        let name: string = oponentInput.trim();

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

    useEffect(() => {
        if (pathEvent !== "")
            router.replace(`/admin/event/${scheduledEvent.slug}`);
    }, [pathEvent, router, scheduledEvent.slug]);

    const [file, setFile] = useState<File>();

    const handleFileChange = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const target = event.target as HTMLInputElement;
        if (target.files) {
            setFile(target.files[0]);
        }
        setMatchImagePreview(URL.createObjectURL(target.files!![0]));
    };

    const uploadImage = async () => {
        try {
            const formDataFile = new FormData();
            formDataFile.append("file", file!!, file?.name!!);
            const { data } = await axios.post(
                "/api/admin/upload",
                formDataFile
            );
            return data.url;
        } catch (error) {
            throw new Error("Error al subir imagen");
        }
    };

    const [formErrors, setFormErrors] = useState<any>({
        title: "",
        subtitle: "",
        oponents: "",
        img: "",
    });
    const [haveErrors, sethaveErrors] = useState(false);

    const onSubmit = async () => {
        setFormErrors({});
        sethaveErrors(false);
        formSchema.validate(form).catch((err) => {
            setFormErrors({ [err.path]: err.message });
            sethaveErrors(true);
        });

        if (!file && !img) {
            setFormErrors({ img: "Agregue imagen del combate" });
            sethaveErrors(true);
            return;
        }
        if (!(await formSchema.isValid(form))) {
            return;
        }
        if (form._id) {
            try {
                if (img !== matchImagePreview) {
                    const newUrlImage = await uploadImage();
                    // setForm((prev) => ({ ...prev, img: newUrlImage }));
                    await axios.put("/api/match", {
                        ...form,
                        img: newUrlImage,
                    });
                } else {
                    await axios.put("/api/match", form);
                }
                setPathEvent(scheduledEvent.slug);
            } catch (error) {
                alert(`updating error: ${error}`);
            }
        } else {
            try {
                const newUrlImage = await uploadImage();

                await axios.post("/api/match", { ...form, img: newUrlImage });
                setPathEvent(scheduledEvent.slug);
            } catch (error) {
                alert(error);
            }
        }
    };

    const [eventSelected, setEventSelected] = useState<IEvent | undefined>(
        undefined
    );

    const [matchImagePreview, setMatchImagePreview] = useState(
        process.env.NEXT_PUBLIC_PREVIEW_IMAGE_MATCH || ""
    );

    useEffect(() => {
        if (img) setMatchImagePreview(img);
    }, []);

    return (
        <Box style={{ padding: 10, maxWidth: "80vw", minWidth: "80vw" }}>
            <>
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
                            inputProps={{ maxLength: 120 }}
                            error={!!formErrors.title}
                            helperText={formErrors.title}
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
                            inputProps={{ maxLength: 120 }}
                            value={subtitle}
                            error={!!formErrors.subtitle}
                            helperText={formErrors.subtitle}
                            onChange={({ target }) => {
                                setForm((prev) => ({
                                    ...prev,
                                    [target.name]: target.value,
                                }));
                            }}
                        />
                    </Grid>

                    <Grid item xs={6} sm={6}>
                        <TextField
                            required
                            id="oponent"
                            name="oponent"
                            label="Oponente"
                            error={!!formErrors.oponents}
                            helperText={formErrors.oponents}
                            inputProps={{ maxLength: 80 }}
                            fullWidth
                            value={oponentInput}
                            onChange={({ target }) => {
                                setOponentInput(target.value);
                            }}
                            variant="standard"
                            InputProps={{
                                endAdornment: (
                                    <Button onClick={() => addOponent()}>
                                        Agregar
                                    </Button>
                                ),
                            }}
                            onKeyUp={(event) => {
                                event.code === "Enter" ||
                                event.code === "NumpadEnter"
                                    ? addOponent()
                                    : undefined;
                            }}
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
                    <Grid
                        item
                        xs={12}
                        md={6}
                        mt={5}
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <Grid container>
                            <Grid item>
                                <Button variant="contained" component="label">
                                    Imagen del encuentro...
                                    <input
                                        type="file"
                                        hidden
                                        accept="image/png, image/gif, image/jpeg"
                                        onChange={(event) =>
                                            handleFileChange(event)
                                        }
                                    />
                                </Button>
                            </Grid>
                            <Grid item>
                                <picture>
                                    <img
                                        src={matchImagePreview}
                                        alt=""
                                        style={{ maxHeight: 120 }}
                                    />
                                </picture>
                            </Grid>
                        </Grid>

                        <FormHelperText style={{ color: "red" }}>
                            {!!formErrors.img && formErrors.img}
                        </FormHelperText>
                    </Grid>
                    <Grid item xs={12} mt={5}>
                        <Button
                            fullWidth
                            variant="contained"
                            onClick={onSubmit}
                            style={{ height: 120 }}
                        >
                            Enviar
                        </Button>
                    </Grid>
                </Grid>
            </>
        </Box>
    );
};

export default MatchCRUD;
