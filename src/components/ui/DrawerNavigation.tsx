import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from "@mui/icons-material/Login";
import { Button } from "@mui/material";
import NextLink from "next/link";
import { signOut, useSession } from "next-auth/react";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
    open?: boolean;
}>(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
    ...(open && {
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: 0,
    }),
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
    transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: drawerWidth,
    }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-start",
}));

export const DrawerNavigation = () => {
    const { data: session, status } = useSession();

    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    const [value, setValue] = React.useState(0);
    const pages = ["Products", "Pricing", "Blog"];

    return (
        <Box sx={{ display: "flex", maxHeight: 50 }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                open={open}
                style={{
                    display: "flex",
                    alignContent: "center",
                    maxHeight: 150,
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignContent: "center",
                        width: "100%",
                    }}
                >
                    <NextLink href="/">
                        <picture>
                            <img
                                src="/images/nuevo_logo.png"
                                alt=""
                                height={50}
                                style={{
                                    alignItems: "flex-start",
                                    alignContent: "flex-start",
                                    zIndex: 5000,
                                    borderRadius:
                                        "50% 50% 50% 50% / 50% 50% 50% 50% ",
                                    WebkitBoxShadow:
                                        "5px 5px 15px 5px #FF8080, -9px 5px 15px 5px #FFE488, -7px -5px 15px 5px #8CFF85, 12px -5px 15px 5px #80C7FF, 12px 10px 15px 7px #E488FF, -10px 10px 15px 7px #FF616B, -10px -7px 27px 1px #8E5CFF, 5px 5px 15px 5px rgba(0,0,0,0.02)",
                                    boxShadow:
                                        "5px 5px 15px 5px #FF8080, -9px 5px 15px 5px #FFE488, -7px -5px 15px 5px #8CFF85, 12px -5px 15px 5px #80C7FF, 12px 10px 15px 7px #E488FF, -10px 10px 15px 7px #FF616B, -10px -7px 27px 1px #8E5CFF, 5px 5px 15px 5px rgba(0,0,0,0.02)",
                                }}
                            />
                        </picture>
                    </NextLink>

                    <Box
                        sx={{
                            flexGrow: 1,
                            display: {
                                xs: "none",
                                md: "flex",
                                marginLeft: "2em",
                            },
                            alignItems: "center",
                        }}
                    >
                        <Button
                            // onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: "white", display: "block" }}
                            href={"/"}
                        >
                            Inicio
                        </Button>
                        <Button
                            // onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: "white", display: "block" }}
                            href={"/event"}
                        >
                            Eventos
                        </Button>
                        {/* <ButtonMenu /> */}
                    </Box>
                    <Box
                        style={{
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="end"
                            onClick={handleDrawerOpen}
                            sx={{ ...(open && { visibility: "hidden" }) }}
                            style={{
                                marginRight: "0.5em",
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Box>
                    {/* </Toolbar> */}
                </Box>
            </AppBar>
            <Main open={open}>
                <DrawerHeader />
            </Main>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                    },
                }}
                variant="persistent"
                anchor="right"
                open={open}
                onClose={handleDrawerClose}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === "rtl" ? (
                            <ChevronLeftIcon />
                        ) : (
                            <ChevronRightIcon />
                        )}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    <NextLink href={"/"}>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <HomeIcon />
                                </ListItemIcon>
                                <ListItemText primary={"Inicio"} />
                            </ListItemButton>
                        </ListItem>
                    </NextLink>
                </List>
                <List>
                    <NextLink href={"/event"}>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <EventAvailableIcon />
                                </ListItemIcon>
                                <ListItemText primary={"Eventos"} />
                            </ListItemButton>
                        </ListItem>
                    </NextLink>
                </List>
                <Divider />
                {status !== "authenticated" && (
                    <List>
                        <NextLink href={"/admin/login"}>
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <LoginIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={"Acceso Admin"} />
                                </ListItemButton>
                            </ListItem>
                        </NextLink>
                    </List>
                )}
                {status === "authenticated" && (
                    <>
                        <Divider />
                        <List>
                            <NextLink href={"/admin/event"}>
                                <ListItem disablePadding>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <CalendarMonthIcon />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={"Panel de Eventos"}
                                        />
                                    </ListItemButton>
                                </ListItem>
                            </NextLink>
                        </List>
                        <Divider />
                        <List>
                            <ListItem disablePadding onClick={() => signOut()}>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <CalendarMonthIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={"Salir"} />
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </>
                )}
            </Drawer>
        </Box>
    );
};
