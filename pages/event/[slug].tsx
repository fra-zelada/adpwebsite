import { GetServerSideProps, GetStaticProps, NextPage } from "next";

import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import MainLayout from "../../src/components/Layout/MainLayout";
import { IMatch } from "../../src/interfaces/match";
import Match from "../../src/components/Match";
import MatchModel from "../../src/models/match";
import { redirect } from "next/dist/server/api-utils";
import ScheduledEvent from "../../src/models/scheduledEvent";
import { IScheduledEvent } from "../../src/interfaces/scheduledEvent";
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    // console.log(JSON.parse(JSON.stringify(matches)));
    const { slug } = ctx.params as { slug: string };

    const matches = await MatchModel.find().populate({
        path: "event",
        match: {
            slug: slug,
        },
    });

    if (slug.length === 0) {
        return {
            redirect: {
                destination: "/",
                permanent: true,
            },
        };
    }

    if (matches.length === 0) {
        return {
            redirect: {
                destination: "/",
                permanent: true,
            },
        };
    }

    return {
        props: {
            matches: JSON.parse(JSON.stringify(matches)),
        },
    };
};
export default Home;
