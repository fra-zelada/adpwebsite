import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { FC } from "react";
import { capitalize, Chip } from "@mui/material";
import { useRouter } from "next/router";
import NextLink from "next/link";

function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
}

export const NavigationBreadcrumbs: FC = () => {
    const router = useRouter();

    let paths = router.pathname.split("/").filter((e) => e);
    let slugString = "";

    if (!!paths.find((e) => e === "[slug]")) {
        const { slug } = router.query as { slug: string };
        slugString = slug;
    }
    paths = paths.filter((e) => e !== "[slug]");
    let pathHref = "/";
    return (
        <div role="presentation" onClick={handleClick}>
            <Breadcrumbs aria-label="breadcrumb">
                <NextLink href={pathHref} passHref>
                    <Chip label={"Home"} clickable></Chip>
                </NextLink>

                {paths.map((path, i) => {
                    pathHref = `${pathHref}${path}/`;
                    return (
                        <NextLink href={pathHref} passHref key={i}>
                            <Chip label={capitalize(path)} clickable></Chip>
                        </NextLink>
                    );
                })}
                {slugString && (
                    <Typography color="text.primary">
                        {slugString.replaceAll("_", " ").toUpperCase()}
                    </Typography>
                )}
            </Breadcrumbs>
        </div>
    );
};
