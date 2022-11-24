import MainLayout from "../../src/components/Layout/MainLayout";
import Login from "../../src/components/Login";
import { getCsrfToken } from "next-auth/react";
import {
    getProviders,
    useSession,
    signIn,
    signOut,
    LiteralUnion,
    ClientSafeProvider,
} from "next-auth/react";
import { GetServerSideProps } from "next";
import { BuiltInProviderType } from "next-auth/providers";
import { FC, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

interface Props {
    providers: Record<
        LiteralUnion<BuiltInProviderType, string>,
        ClientSafeProvider
    > | null;
    csrfToken: string | undefined;
    error: string;
}

const LoginPage: FC<Props> = ({ providers, csrfToken, error }) => {
    const { data: session } = useSession();

    const [loginForm, setLoginForm] = useState({
        csrfToken,
        username: "",
        password: "",
    });
    const { username, password } = loginForm;

    const handleSubmit = async () => {
        const resp = await axios.post(
            "/api/auth/callback/credentials",
            loginForm
        );
    };

    return (
        <MainLayout title={"Login"}>
            <>
                {session ? (
                    <>
                        Signed in as {session.user.email} <br />
                        {JSON.stringify(session.accessToken)}
                        {JSON.stringify(session.user)}
                        <button onClick={() => signOut()}>Sign out</button>
                    </>
                ) : (
                    <Login
                        providers={providers}
                        csrfToken={csrfToken}
                        error={error}
                    />
                    // <div>Login</div>
                )}

                {/* <Login /> */}
            </>
        </MainLayout>
    );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const providers = await getProviders();

    return {
        props: {
            providers,
            csrfToken: await getCsrfToken(ctx),
            error: ctx.query.error || "",
        },
    };
};
export default LoginPage;