import { Typography } from "@mui/material";
import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import MainLayout from "../../src/components/Layout/MainLayout";
import { authOptions } from "../api/auth/[...nextauth]";

const AdminPage = () => {
    return (
        <MainLayout>
            <Typography variant="h4">... Panel en construcción</Typography>
        </MainLayout>
    );
};

export default AdminPage;

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

    return {
        props: {},
    };
};
