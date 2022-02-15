import { FormGroup, FormControlLabel, Switch } from "@mui/material"
export const Options = () => {
    return (
        <>
        <FormGroup>
            <FormControlLabel control={<Switch />} label="Show Game Notifications" />
            <FormControlLabel control={<Switch />} label="Show Live Notifications" />
            <FormControlLabel control={<Switch />} label="Show Youtube Notifications" />
            <FormControlLabel control={<Switch />} label="Show Twitter Notifications" />
            <FormControlLabel control={<Switch />} label="Show Esfandradio Notifications" />
        </FormGroup>
        </>
    )
}