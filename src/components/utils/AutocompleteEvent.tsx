import { styled, TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { Dispatch, FC, SetStateAction } from "react";
import { IEvent } from "../../interfaces/event";

interface Props {
    eventList: IEvent[];
    eventSelected: IEvent | undefined;
    setEventSelected: Dispatch<SetStateAction<IEvent | undefined>>;
    // const [eventSelected, setEventSelected] = useState<IEvent | undefined>(
    // undefined
    // );
}

const AutocompleteEvent: FC<Props> = ({
    eventList,
    eventSelected = null,
    setEventSelected,
}) => {
    const GroupHeader = styled("div")(({ theme }) => ({
        position: "sticky",
        top: "-8px",
        padding: "4px 10px",
        // color: theme.palette.primary.main,
        // backgroundColor:
        // theme.palette.mode === "light"
        // ? lighten(theme.palette.primary.light, 0.85)
        // : darken(theme.palette.primary.main, 0.8),
    }));

    const GroupItems = styled("ul")({
        padding: 0,
    });

    return (
        <Autocomplete
            onChange={(target, value) => {
                setEventSelected(value!!);
            }}
            id="grouped-demo"
            options={eventList.sort(
                (a, b) => -b.value!!.localeCompare(a.value!!)
            )}
            groupBy={(option) => option.company!!}
            getOptionLabel={(option) => option.value!!}
            sx={{ width: 300 }}
            renderInput={(params) => {
                return <TextField {...params} label="Evento..." />;
            }}
            value={eventSelected ? eventSelected : null}
            defaultValue={eventSelected ? eventSelected : null}
            renderGroup={(params) => {
                return (
                    <li key={params.group}>
                        <GroupHeader>{params.group}</GroupHeader>
                        <GroupItems>{params.children}</GroupItems>
                    </li>
                );
            }}
        />
    );
};

export default AutocompleteEvent;
