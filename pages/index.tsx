import { GetStaticProps, NextPage } from "next";
import { SocialIcon } from "react-social-icons";
import Head from "next/head";
import Image from "next/image";
import Match from "../src/components/Match";
import styles from "../styles/Home.module.css";
import MatchModel from "../src/models/match";
import YouTubeIcon from "@mui/icons-material/YouTube";
import NextLink from "next/link";
interface Props {
    matches: IMatch[];
    event: string;
}

const Home: NextPage<Props> = ({ matches, event = "A Duras Penas" }) => {
    return (
        <MainLayout title={event} showNavigation={false}>
            <Box
                style={{
                    width: "80%",
                }}
            >
                <Grid container>
                    <Grid item md={4} xs={12} sx={{ padding: 2 }}>
                        <Box
                            sx={{
                                padding: 4,
                                display: "flex",
                                alignContent: "center",
                                justifyContent: "center",
                            }}
                        >
                            <picture>
                                <img
                                    src="/images/nuevo_logo.png"
                                    alt="ADP Logo"
                                    height={150}
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
                        </Box>
                        <Grid
                            container
                            style={{
                                borderRadius: " 30px",
                                background: " #e0e0e0",
                                boxShadow:
                                    "15px 15px 30px #bebebe, -15px -15px 30px #ffffff",
                                padding: 20,
                            }}
                        >
                            <SocialCard
                                url={
                                    process.env.NEXT_PUBLIC_SOCIAL_YOUTUBE || ""
                                }
                            />
                            <SocialCard
                                url={
                                    process.env.NEXT_PUBLIC_SOCIAL_TWITTER || ""
                                }
                            />
                            <SocialCard
                                url={
                                    process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM ||
                                    ""
                                }
                            />
                        </Grid>
                    </Grid>
                    <Grid item md={8} xs={12}>
                        <Box
                            sx={{
                                padding: 2,
                                display: "flex",
                                flexDirection: "column",
                                alignContent: "center",
                                justifyContent: "center",
                                justifyItems: "center",
                                width: " 300",
                                height: " 300",
                                borderRadius: " 30px",
                                background: " #e0e0e0",
                                boxShadow:
                                    "15px 15px 30px #bebebe, -15px -15px 30px #ffffff",
                                marginTop: 2,
                            }}
                        >
                            <Box
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignContent: "center",
                                    textAlign: "center",
                                }}
                            >
                                <Typography variant="h6" sx={{ mb: 5 }}>
                                    Participa de las predicciones de nuestro
                                    canal, votando por tus favoritos
                                </Typography>
                            </Box>
                            <Box
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <button
                                    className="buttonCustom"
                                    style={{ width: "20em", height: "4em" }}
                                    onClick={() => (location.href = "/event")}
                                >
                                    <NextLink href={"/event"} passHref>
                                        CARTELERA Y VOTACIONES
                                    </NextLink>
                                </button>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </MainLayout>
    );
};

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.
import { IMatch } from "../src/interfaces/match";
import MainLayout from "../src/components/Layout/MainLayout";
import { Box, Button, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import { height } from "@mui/system";
import { SocialCard } from "../src/components/SocialCard";

export const getStaticProps: GetStaticProps = async (ctx) => {
    // const newMatch: IMatch = {
    //     img: "https://www.wwe.com/f/styles/talent_champion_xl/public/all/2022/11/20221107_SSeries_Match_Womens_FC_Date--1be8ac9fe134defe72df135ebf98110e.jpg",
    //     oponents: [
    //         { name: "bayley", votes: 0 },
    //         { name: "bianca", votes: 0 },
    //     ],
    //     title: "titulo",
    //     subtitle: "subtitulo",
    //     eventCode: "survivor22",
    //     votes: 2,
    // };

    // console.log(JSON.parse(JSON.stringify(matches)));

    // const nuevoMatch = new MatchModel(newMatch);
    // await nuevoMatch.save();
    const matches = await MatchModel.find();

    return {
        props: {
            matches: JSON.parse(JSON.stringify(matches)),
        },
    };
};
export default Home;
