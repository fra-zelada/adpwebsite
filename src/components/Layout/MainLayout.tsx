import { Box } from "@mui/material";
import { NextPage } from "next";

import Head from "next/head";
import Image from "next/image";
import { FC, PropsWithChildren } from "react";
import styles from "../../../styles/Home.module.css";

interface Props {
    title?: string;
}

const MainLayout: FC<PropsWithChildren<Props>> = ({
    children,
    title = "A Duras Penas",
}) => {
    return (
        <div>
            <Head>
                <title>{`ADP - ${title}`}</title>
                <meta
                    name="viewport"
                    content="initial-scale=1, width=device-width"
                />

                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Box className="headerCustom">
                <div className="custom-shape-conter">
                    <div className="custom-shape-divider-top-1668139847">
                        <svg
                            data-name="Layer 1"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 1200 120"
                            preserveAspectRatio="none"
                        >
                            <path
                                d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                                className="shape-fill"
                            ></path>
                        </svg>
                    </div>
                </div>
            </Box>

            <Box
                style={{
                    marginTop: 0,
                    position: "sticky",
                    top: 0,
                    zIndex: 2,
                    width: "100%",
                    transition: "visibility 1s, opacity 1s",
                    display: "flex",
                    alignContent: " center",
                    alignItems: "center",
                    border: "1px solid blue",
                    justifyContent: "center",
                    background: `linear-gradient(to bottom,  rgba(192, 192, 231,1), rgba(192, 192, 231,0))`,
                    // marginBottom: '5em',
                }}
            >
                <picture>
                    <img
                        src="/images/nuevo_logo.png"
                        alt=""
                        height={100}
                        style={{
                            alignItems: "flex-start",
                            alignContent: "flex-start",
                        }}
                    />
                </picture>
            </Box>
            <div className={styles.container}>
                <main className={styles.main}>{children}</main>

                <footer className={styles.footer}>
                    <a
                        href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Powered by{" "}
                        <span className={styles.logo}>
                            <Image
                                src="/vercel.svg"
                                alt="Vercel Logo"
                                width={72}
                                height={16}
                            />
                        </span>
                    </a>
                </footer>
            </div>
        </div>
    );
};

export default MainLayout;
