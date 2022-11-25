import { Grid, Typography } from "@mui/material";
import React, { FC } from "react";

import { styled } from "@mui/material/styles";
import randomColor from "randomcolor";
import LinearProgress, {
    linearProgressClasses,
} from "@mui/material/LinearProgress";

interface Props {
    colorBar?: string;
    oponent: string;
    percentage: number;
    votes: number;
}

const VotesProgress: FC<Props> = ({
    // colorBar = "#1a90ff",
    colorBar,
    oponent,
    percentage,
    votes,
}) => {
    // console.log({ colorBar });
    // var colorGenerated = randomColor();

    const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
        height: 10,
        borderRadius: 5,
        [`&.${linearProgressClasses.colorPrimary}`]: {
            backgroundColor: "#A4A4A4",
            // theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
        },
        [`& .${linearProgressClasses.bar}`]: {
            borderRadius: 5,
            backgroundColor:
                theme.palette.mode === "light" ? colorBar : "#308fe8",
        },
    }));

    return (
        <Grid
            display={"flex"}
            style={{
                border: "solid 1px black",
                WebkitBorderRadius: "10px 10px 10px 10px",
                borderRadius: "10px 10px 10px 10px",
                paddingLeft: 7,
                paddingRight: 2,
                marginBottom: 2,
                WebkitBoxShadow: "2px 2px 5px 1px rgba(1,1,1,1)",
                boxShadow: "2px 2px 5px 1px rgba(1,1,1,1)",
            }}
        >
            <Grid item xs={4}>
                <Typography>{oponent}</Typography>
            </Grid>
            <Grid
                item
                xs={6}
                style={{
                    alignItems: "center",
                    alignContent: "center",
                    display: "grid",
                }}
            >
                <BorderLinearProgress
                    variant="determinate"
                    value={Number(percentage)}
                />
            </Grid>
            <Grid
                item
                xs={2}
                style={{
                    alignItems: "center",
                    alignContent: "center",
                    display: "grid",
                    marginLeft: 6,
                }}
            >
                {`${percentage}%`}
            </Grid>
        </Grid>
    );
};

export default VotesProgress;
