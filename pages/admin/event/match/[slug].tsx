import { useRouter } from "next/router";

interface Props {
    slug: string;
}
const MatchAdminPage: FC<Props> = ({ slug }) => {
    const router = useRouter();
    const match = router.query.slug;
    return (
        <MainLayout>
            <MatchCRUD />
        </MainLayout>
    );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
import { GetServerSideProps } from "next";
import { FC } from "react";
import MatchCRUD from "../../../../src/components/MatchCRUD";
import MainLayout from "../../../../src/components/Layout/MainLayout";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { slug } = ctx.query;
    console.log(slug);
    return {
        props: {
            slug,
        },
    };
};

export default MatchAdminPage;
