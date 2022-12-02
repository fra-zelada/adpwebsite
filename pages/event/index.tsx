import { Box, Grid, Typography, Button } from "@mui/material";
import MainLayout from "../../src/components/Layout/MainLayout";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EventDateCard from "../../src/components/EventDateCard";
import { GetServerSideProps, GetStaticProps, NextPage } from "next";
import Event from "../../src/models/event";
import ScheduledEvent from "../../src/models/scheduledEvent";
import { eventList } from "../../src/database/eventList";
import { IScheduledEvent } from "../../src/interfaces/scheduledEvent";

interface Props {
    eventList: IScheduledEvent[];
}

const eventPage: NextPage<Props> = ({ eventList }) => {
    return (
        <MainLayout>
            <Typography variant="h2">Calendario eventos</Typography>
            <Box style={{ width: "80%", minHeight: "100vh" }}>
                <Grid container>
                    {eventList.map((event, i) => (
                        <Grid
                            key={`${i}`}
                            item
                            xs={12}
                            md={4}
                            style={{
                                margin: 0,
                                minHeight: 250,
                                display: "flex",
                                alignContent: "center",
                                justifyContent: "center",
                            }}
                        >
                            <EventDateCard scheduledEvent={event} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </MainLayout>
    );
};

export default eventPage;

export const getStaticProps: GetStaticProps = async (ctx) => {
    const eventList = await ScheduledEvent.find()
        .sort({ date: "desc" })
        .populate("event");

    return {
        props: {
            eventList: JSON.parse(JSON.stringify(eventList)),
        },
        revalidate: 60 * 60 * 6,
    };
};
