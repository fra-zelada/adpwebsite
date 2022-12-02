import { Box, Grid } from "@mui/material";
import React, { FC } from "react";
import { SocialIcon } from "react-social-icons";
import NextLink from "next/link";

interface Props {
    url: string;
}

export const SocialCard: FC<Props> = ({ url }) => {
    return (
        <Grid item xs={4}>
            <Box
                style={{
                    textAlign: "center",
                    justifyContent: "center",
                    display: "flex",

                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Box
                    style={{
                        background: "#f5f5f5",
                        padding: 10,
                        borderRadius: "50%",
                        transition: "box-shadow .3s ease, transform .2s ease",
                    }}
                    className="shadowHover"
                >
                    <SocialIcon url={url} />
                </Box>
            </Box>
        </Grid>
    );
};
