import { useRouter } from "next/router";
import axios from "axios";
interface Props {
    slug: string;
    match: IMatch;
    eventList: IEvent[];
    scheduledEvent: IScheduledEvent;
}
const MatchAdminPage: FC<Props> = ({
    slug,
    match = null,
    eventList,
    scheduledEvent,
}) => {
    const router = useRouter();

    return (
        <MainLayout showNavigation={false}>
            <>
                {!!match ? (
                    <MatchCRUD
                        match={match}
                        eventList={eventList}
                        scheduledEvent={scheduledEvent}
                    />
                ) : (
                    <MatchCRUD
                        eventList={eventList}
                        scheduledEvent={scheduledEvent}
                    />
                )}
            </>
        </MainLayout>
    );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
import {
    GetServerSideProps,
    GetServerSidePropsContext,
    PreviewData,
} from "next";
import { FC } from "react";
import MatchCRUD from "../../../../src/components/MatchCRUD";
import MainLayout from "../../../../src/components/Layout/MainLayout";
import { IMatch } from "../../../../src/interfaces/match";
import { ParsedUrlQuery } from "querystring";
import Event from "../../../../src/models/event";
import { IEvent } from "../../../../src/interfaces/event";
import ScheduledEvent from "../../../../src/models/scheduledEvent";
import { isValidObjectId } from "mongoose";
import { redirect } from "next/dist/server/api-utils";
import { IScheduledEvent } from "../../../../src/interfaces/scheduledEvent";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../../../api/auth/[...nextauth]";

export async function getServerSideProps(
    ctx: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
) {
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

    const { slug } = ctx.query as { slug: string[] };

    const event = slug[0] || "";
    const match = slug[1] || "";

    const scheduledEvent = await ScheduledEvent.findOne({
        slug: event,
    }).populate("event");
    if (!scheduledEvent || event.trim().length === 0) {
        return {
            redirect: {
                destination: "/",
            },
        };
    }
    if (match.trim().length === 0)
        return {
            redirect: {
                destination: "/",
            },
        };

    if (match === "new") {
        return {
            props: {
                scheduledEvent: JSON.parse(JSON.stringify(scheduledEvent)),
            },
        };
    }

    if (!isValidObjectId(match))
        return {
            redirect: {
                destination: "/",
            },
        };

    try {
        const { data } = await axios.get(
            `${process.env.PATH_LOCALHOST}/api/match/${match}`
        );

        return {
            props: {
                match: JSON.parse(JSON.stringify(data)),
                scheduledEvent: JSON.parse(JSON.stringify(scheduledEvent)),
            },
        };
    } catch (error) {
        return {
            redirect: {
                destination: "/",
            },
        };
    }
}

export default MatchAdminPage;
