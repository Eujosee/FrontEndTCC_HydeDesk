import * as React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";

export default function BasicRating() {
  const [value, setValue] = React.useState(2);

  return (
    <Box
      sx={{
        "& > legend": { mt: 2 },
      }}
    >
      <Rating
        name="Avaliação"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />

      {value < 3 && (
        <div className="flex flex-col w-full">
          <label className="font-medium text-gray-500">
            Detalhes da Avaliação
          </label>
          <textarea className="bg-gray-300 rounded h-36 pt-2 pl-4 shadow" />
        </div>
      )}
    </Box>
  );
}
