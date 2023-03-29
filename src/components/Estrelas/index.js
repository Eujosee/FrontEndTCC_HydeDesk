import * as React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";

export default function BasicRating() {
  const [value, setValue] = React.useState(2);

  return (
    <Box
      sx={{
        "& > legend": { mt: 2 },
      }}
    >
      <div className="flex justify-center">
        <Rating
          name="Avaliação"
          size="large"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        />
      </div>

      {value < 3 && (
        <div className="flex justify-center flex-col pt-3">
          <label className="font-medium text-gray-500">
            Detalhes da Avaliação
          </label>
          <input className="w-80 focus:outline-none focus:border-b-azul-hyde border-b-2 p-2" />
        </div>
      )}
    </Box>
  );
}
