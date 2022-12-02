import { Box, Button, Typography } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { IScheduledEvent } from "../interfaces/scheduledEvent";
import { FC } from "react";
import moment from "moment";

interface Props {
    scheduledEvent: IScheduledEvent;
}
const EventDateCard: FC<Props> = ({ scheduledEvent }) => {
    const { event, date, slug } = scheduledEvent;
    const { company, value: eventName } = event!!;

    return (
        <Box
            style={{
                width: " 190px",
                height: " 170px",
                borderRadius: " 30px",
                background: " #e0e0e0",
                boxShadow: "15px 15px 30px #bebebe, -15px -15px 30px #ffffff",
                padding: 10,
                display: "flex",
                flexDirection: "column",
                marginTop: 15,
            }}
        >
            <Box>
                <Typography variant="h6">{`${company?.toUpperCase()} ${eventName?.toUpperCase()}`}</Typography>
                <Typography variant="caption">
                    <CalendarMonthIcon sx={{ mr: 0.5 }} />
                    {moment(date).format("DD-MM-YYYY HH:mm a")}
                </Typography>
            </Box>
            <Box style={{ marginTop: "auto" }}>
                <Button href={`/event/${slug}`} className="buttonCustom">
                    CARTELERA
                </Button>
            </Box>
        </Box>
    );
};

export default EventDateCard;
