import { Box, Grid, Typography } from "@mui/material";
import MainLayout from "../../src/components/Layout/MainLayout";
import EventDateCard from "../../src/components/EventDateCard";
import { GetServerSideProps, NextPage } from "next";
import ScheduledEvent from "../../src/models/scheduledEvent";
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

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const eventList = await ScheduledEvent.find()
        .sort({ date: "desc" })
        .populate("event");

    return {
        props: {
            eventList: JSON.parse(JSON.stringify(eventList)),
        },
    };
};
