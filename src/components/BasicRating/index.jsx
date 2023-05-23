import { useState } from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import api from "../../services/api";

import { AiOutlineLoading3Quarters } from "react-icons/ai";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export default function BasicRating({ id, onClose }) {
  const [value, setValue] = useState(2);

  const yupSchema = yup.object().shape({
    descricao: yup
      .string()
      .test(
        "test-invalid-desc",
        "A descrição da resolução é obrigatória quando a nota for menor que 3.",
        (desc) => {
          if (desc.length === 0 && value < 3) {
            return false;
          } else {
            return true;
          }
        }
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(yupSchema),
  });

  async function postDados(data) {
    const dados = {
      num_avaliacao: value,
      desc_avaliacao: data.descricao,
    };

    try {
      await api.put(`/chamados/avaliar/${id}`, dados);
      document.location.reload();
      onClose();
    } catch (error) {
      console.log(error);
    }

    reset();
  }

  return (
    <form onSubmit={handleSubmit(postDados)} className="w-full">
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
              console.log(newValue);
              if (newValue !== null) {
                setValue(newValue);
              } else {
                setValue(1);
              }
            }}
          />
        </div>

        {value < 3 && (
          <div className="flex justify-center flex-col pt-3 w-full">
            <label className="font-medium text-gray-500 dark:text-gray-300">
              Detalhes da Avaliação
            </label>
            <input
              className="w-full focus:outline-none focus:border-b-azul-hyde border-b-2 p-2 dark:bg-transparent dark:text-gray-100"
              {...register("descricao", { required: true })}
            />
            {errors.descricao && (
              <p className="text-red-500 pt-2 w-full text-center">
                {errors.descricao.message}
              </p>
            )}
          </div>
        )}
      </Box>

      <div className="mt-4 space-x-5">
        <button
          type="submit"
          className=" w-full mb-5 inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        >
          Enviar
        </button>
      </div>
    </form>
  );
}
