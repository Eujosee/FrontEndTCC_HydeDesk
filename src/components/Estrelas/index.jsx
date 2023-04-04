import { useState } from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import api from "../../services/api";
//import StarIcon from "@mui/icons-material/Star";

export default function BasicRating(id, onClose, dataChamado) {
  const [value, setValue] = useState(2);
  const [descricao, setDescricao] = useState(null);
  const dados = {
    num_avaliacao: value,
    desc_avaliacao: descricao,
  };

  console.log(id.id);

  console.log(dados);
  async function postDados() {
    try {
      const response = await api.post("/chamados/avaliar/" + id.id, dados);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div onClose={onClose}>
      <Box
        sx={{
          "& > legend": { mt: 2 },
        }}
      >
        <div className="flex justify-center">
          <Rating
            name="Avaliação"
            size="large"
            // emptyIcon={
            //   <StarIcon className={"dark:text-gray-100"} fontSize="inherit" />
            // }
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          />
        </div>

        {value < 3 ? (
          <div className="flex justify-center flex-col pt-3">
            <label className="font-medium text-gray-500 dark:text-gray-300">
              Detalhes da Avaliação
            </label>
            <input
              // name="descricao"
              onChange={(e) => [setDescricao(e.target.value)]}
              className="w-80 focus:outline-none focus:border-b-azul-hyde border-b-2 p-2 dark:bg-transparent dark:text-gray-100"
            />
          </div>
        ) : null}
      </Box>

      <div className="mt-4 space-x-5">
        <button
          type="button"
          className=" w-full mb-5 inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          onClick={postDados}
        >
          Enviar
        </button>
      </div>
    </div>
  );
}
