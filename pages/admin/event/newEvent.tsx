import MainLayout from "../../../src/components/Layout/MainLayout";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { styled, lighten, darken } from "@mui/system";
import axios from "axios";
import { GetServerSideProps } from "next";
import Event from "../../../src/models/event";
import { IEvent } from "../../../src/interfaces/event";
import { FC, SetStateAction, useEffect, useState } from "react";
import { DateTimePicker, MobileDateTimePicker } from "@mui/x-date-pickers";
import moment, { Moment } from "moment";
import { Box, Button, Grid, Stack } from "@mui/material";
import { IScheduledEvent } from "../../../src/interfaces/scheduledEvent";
// import { DateTimePicker, KeyboardDateTimePicker } from "@material-ui/pickers";
import ScheduledEvent from "../../../src/models/scheduledEvent";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import NextLink from "next/link";
import AutocompleteEvent from "../../../src/components/utils/AutocompleteEvent";
interface Props {
    eventList: IEvent[];
    scheduledEvents: IScheduledEvent[];
}

const GroupHeader = styled("div")(({ theme }) => ({
    position: "sticky",
    top: "-8px",
    padding: "4px 10px",
    // color: theme.palette.primary.main,
    // backgroundColor:
    // theme.palette.mode === "light"
    // ? lighten(theme.palette.primary.light, 0.85)
    // : darken(theme.palette.primary.main, 0.8),
}));

const GroupItems = styled("ul")({
    padding: 0,
});

const NewEvent: FC<Props> = ({ eventList, scheduledEvents }) => {
    const [scheduledEvenstList, setScheduledEvenstList] =
        useState(scheduledEvents);

    const handleOnChange = (value: IEvent) => {
        setEventSelected(value);
    };
    const [eventSelected, setEventSelected] = useState<IEvent | undefined>(
        undefined
    );

    const [dateTime, setDateTime] = useState<moment.Moment>(moment());

    const handleDateChange = (selectedDate: any | null) => {
        setDateTime(moment(selectedDate)!);
    };

    const [scheduledEventForUpdate, setScheduledEventForUpdate] =
        useState<IScheduledEvent | null>(null);

    const handleSubmit = async () => {
        if (scheduledEventForUpdate) {
            const newScheduledEvent: IScheduledEvent = {
                _id: scheduledEventForUpdate._id,
                date: dateTime.toString(),
                event: eventSelected,
                slug: `${eventSelected!!.key!!.toLowerCase()}_${dateTime.year()}`,
            };
            try {
                const { data } = await axios.put(
                    "/api/event",
                    newScheduledEvent
                );
                setScheduledEvenstList(
                    scheduledEvenstList.filter(
                        (ev) => ev !== scheduledEventForUpdate
                    )
                );
                setScheduledEvenstList((prev) => [data, ...prev]);

                setScheduledEventForUpdate(null);
            } catch (error) {
                alert(error);
                setScheduledEventForUpdate(null);
            }
        } else {
            const newScheduledEvent: IScheduledEvent = {
                date: dateTime.toString(),
                event: eventSelected,
                slug: `${eventSelected!!.key!!.toLowerCase()}_${dateTime.year()}`,
            };
            try {
                const { data } = await axios.post(
                    "/api/event",
                    newScheduledEvent
                );
                setScheduledEvenstList((prev) => [data, ...prev]);
                alert("guardado");
            } catch (error) {
                alert(error);
            }
        }
    };

    const columns: GridColDef[] = [
        { field: "name", headerName: "Event", width: 200 },
        {
            field: "fecha",
            headerName: "Fecha",
            type: "dateTime",
            width: 250,
        },
        { field: "slug", headerName: "Slug", width: 230 },
        { field: "company", headerName: "Company", width: 280 },
        {
            field: "edit",
            headerName: "Editar evento y Fecha",
            description: "This column has a value getter and is not sortable.",
            sortable: false,
            width: 260,
            renderCell: ({ row }) => {
                return (
                    <Button
                        onClick={() =>
                            handleUpdate(row.idEvent, row.date, row.id)
                        }
                    >
                        Editar
                    </Button>
                );
            },
        },
        {
            field: "matchCard",
            headerName: "Cartelera",
            description: "This column has a value getter and is not sortable.",
            sortable: false,
            width: 260,
            renderCell: ({ row }) => {
                return (
                    <NextLink href={`/admin/event/${row.slug}`}>Ver</NextLink>
                );
            },
        },
    ];

    const handleUpdate = (idEvent: any, date: any, idScheduledEvent: any) => {
        eventList.map((ev) => {
            if (ev._id === idEvent) setEventSelected(ev);
        });
        setDateTime(moment(date));
        scheduledEvenstList.map((ev) => {
            if (ev._id === idScheduledEvent) setScheduledEventForUpdate(ev);
        });
    };

    const [rows, setRows] = useState<any>({ rows: [] });

    useEffect(() => {
        setRows({ rows: [] });
        scheduledEvenstList.map((event) => {
            const row = {
                id: event._id,
                company: event.event?.company,
                name: event.event?.value,
                slug: event.slug,
                date: event.date,
                fecha: moment(event.date).format("YYYY-MM-DD HH:mm a"),
                idEvent: event.event?._id,
            };

            setRows((prev: any) => ({ ...prev, rows: [...prev.rows, row] }));
        });
    }, [scheduledEvenstList]);

    return (
        <MainLayout>
            <Box sx={{ width: "90%" }}>
                <Stack>
                    <Grid container>
                        <Grid item xs={6} sx={{ padding: 2 }}>
                            <AutocompleteEvent
                                eventList={eventList}
                                eventSelected={eventSelected}
                                setEventSelected={setEventSelected}
                            />
                        </Grid>
                        <Grid item xs={6} sx={{ padding: 2 }}>
                            <Box
                                sx={{
                                    visibility: !!eventSelected
                                        ? "visible"
                                        : "hidden",
                                }}
                            >
                                <MobileDateTimePicker
                                    label="Fecha Evento"
                                    value={dateTime}
                                    onChange={(value) =>
                                        handleDateChange(value)
                                    }
                                    renderInput={(params) => (
                                        <TextField {...params} />
                                    )}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                fullWidth
                                variant="contained"
                                onClick={handleSubmit}
                            >
                                {" "}
                                Guardar{" "}
                            </Button>
                        </Grid>
                    </Grid>
                </Stack>
                <div style={{ height: "50vh", width: "100%", marginTop: 10 }}>
                    <DataGrid
                        rows={rows.rows}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                    />
                </div>
            </Box>
        </MainLayout>
    );
};
// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top

export default NewEvent;

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    // const newEvent = new Event({
    // company: "WWE",
    // key: "wwe_royal_rumble",
    // value: "Royal Rumble",
    // });
    // await newEvent.save();
    const events = await Event.find();
    const scheduledEvents = await ScheduledEvent.find().populate("event");

    return {
        props: {
            eventList: JSON.parse(JSON.stringify(events)),
            scheduledEvents: JSON.parse(JSON.stringify(scheduledEvents)),
        },
    };
};
