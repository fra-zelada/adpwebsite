import { GetStaticProps, NextPage } from "next";

import Head from "next/head";
import Image from "next/image";
import Match from "../src/components/Match";
import styles from "../styles/Home.module.css";
import MatchModel from "../src/models/match";

interface Props {
    matches: IMatch[];
    event: string;
}

const Home: NextPage<Props> = ({ matches, event = "A Duras Penas" }) => {
    return (
        <MainLayout title={event}>
            <>
                {matches.map((match, i) => (
                    <Match key={i} match={match} />
                ))}
            </>
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
