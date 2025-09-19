import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export default function SizeSelector() {
  return (
    <FormControl>
      {/* <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel> */}
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <FormControlLabel value="M" control={<Radio />} label="M" />
        <FormControlLabel value="L" control={<Radio />} label="L" disabled />
        <FormControlLabel value="Venty" control={<Radio />} label="Venty" />
      </RadioGroup>
    </FormControl>
  );
}
