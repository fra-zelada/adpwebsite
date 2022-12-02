import NextLink from "next/link";
import axios from "axios";
import { GetServerSideProps } from "next";
import { FC, useState } from "react";
import MainLayout from "../../../src/components/Layout/MainLayout";
import { IMatch } from "../../../src/interfaces/match";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";
import { unstable_getServerSession } from "next-auth";
import ScheduledEvent from "../../../src/models/scheduledEvent";
import { useRouter } from "next/router";
import { IScheduledEvent } from "../../../src/interfaces/scheduledEvent";
import { IEvent } from "../../../src/interfaces/event";
import { Typography } from "@mui/material";
import moment from "moment";
import { authOptions } from "../../api/auth/[...nextauth]";
interface Props {
    matches: IMatch[];
    slug: string;
    scheduledEvent: IScheduledEvent;
}

const EventAdminPage: FC<Props> = ({ matches = [], scheduledEvent }) => {
    const { slug, date, event } = scheduledEvent;
    const { company, value: eventName } = event as IEvent;
    const [matchesList, setMatchesList] = useState<IMatch[]>(matches);
    const [deletingMatch, setDeletingMatch] = useState<IMatch>();
    const [deleteDialog, setDeleteDialog] = useState(false);
    const onHandleDelete = async (idMatch: string) => {
        try {
            // await axios.delete("/api/match", { data: { _id: idMatch } });
            // alert("Eliminado");
            let refreshMatchesList = matchesList.filter(
                ({ _id }) => _id !== idMatch
            );
            matchesList.map((match) => {
                if (match._id === idMatch) setDeletingMatch(match);
                setDeleteDialog(true);
            });

            // setMatchesList(refreshMatchesList);
        } catch (error) {
            alert(`updating error: ${error}`);
        }
    };

    const handleClose = async (confirm: boolean) => {
        if (confirm) {
            await axios.delete("/api/match", {
                data: { _id: deletingMatch?._id },
            });
            alert("Eliminado");
            setMatchesList(
                matchesList.filter(({ _id }) => _id !== deletingMatch?._id)
            );
        }

        setDeleteDialog(false);
        setTimeout(() => {
            setDeletingMatch(undefined);
        }, 150);
    };

    const router = useRouter();
    const handleNewMatchButton = () => {
        router.push(`/admin/event/match/${slug}/new`);
    };

    return (
        <MainLayout>
            <>
                <Dialog
                    open={deleteDialog}
                    onClose={() => handleClose(false)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        ¿Confirma que eliminará el registro?
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {`Título: ${deletingMatch?.title} `}
                            <br />
                            {`Subtítulo: ${deletingMatch?.subtitle}`}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => handleClose(false)}>
                            Cancelar
                        </Button>
                        <Button
                            onClick={() => handleClose(true)}
                            color="secondary"
                            variant="contained"
                            autoFocus
                        >
                            Confirmar
                        </Button>
                    </DialogActions>
                </Dialog>
                <Box>
                    <Typography variant="h4">{`Evento: ${company} ${eventName}`}</Typography>
                    <Typography variant="h6">{`Fecha: ${moment(date).format(
                        "DD-MM-YYYY HH:mm"
                    )} `}</Typography>
                </Box>
                <Box
                    display={"flex"}
                    style={{
                        padding: 1,
                        margin: 5,
                        width: "100%",
                        justifyContent: "flex-end",
                    }}
                >
                    <Button variant="contained" onClick={handleNewMatchButton}>
                        New Match
                    </Button>
                </Box>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Título</TableCell>
                                <TableCell align="right">Subtítulo</TableCell>
                                <TableCell align="right">Oponentes</TableCell>
                                <TableCell align="right">Imagen</TableCell>
                                <TableCell align="right">Opciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {matchesList.map(
                                (
                                    { title, subtitle, oponents, _id, img },
                                    i
                                ) => (
                                    <TableRow
                                        key={i}
                                        sx={{
                                            "&:last-child td, &:last-child th":
                                                {
                                                    border: 0,
                                                },
                                        }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {title}
                                        </TableCell>
                                        <TableCell align="right">
                                            {subtitle}
                                        </TableCell>
                                        <TableCell align="right">
                                            {oponents.map(({ name }, i) => (
                                                <li key={i}>{name}</li>
                                            ))}
                                        </TableCell>
                                        <TableCell align="right">
                                            <picture>
                                                <img
                                                    src={img}
                                                    alt={title}
                                                    style={{ maxHeight: 100 }}
                                                />
                                            </picture>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Button
                                                variant="contained"
                                                onClick={() => {
                                                    onHandleDelete(_id!!);
                                                }}
                                            >
                                                Delete
                                            </Button>
                                            <NextLink
                                                href={`match/${slug}/${_id}`}
                                                passHref
                                            >
                                                <Button variant="outlined">
                                                    Editar
                                                </Button>
                                            </NextLink>
                                        </TableCell>
                                    </TableRow>
                                )
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </>
        </MainLayout>
    );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const session = await unstable_getServerSession(
        ctx.req,
        ctx.res,
        authOptions
    );

    if (!session) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }

    try {
        const { slug } = ctx.query as { slug: string };
        let eventSlug = slug;

        const scheduledEvent = await ScheduledEvent.findOne({
            slug: eventSlug,
        }).populate("event");

        const { data } = await axios.get(
            `${process.env.PATH_LOCALHOST}/api/event/${scheduledEvent?._id}`
        );
        return {
            props: {
                matches: JSON.parse(JSON.stringify(data)),
                scheduledEvent: JSON.parse(JSON.stringify(scheduledEvent)),
            },
        };
    } catch (error) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }
};

export default EventAdminPage;
