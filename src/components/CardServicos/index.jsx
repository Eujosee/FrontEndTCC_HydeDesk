import data from "../../data/dataServicos";

import Hardware from "../../images/hardware.jpg";
import Software from "../../images/software.jpg";
import Redes from "../../images/redes.jpg";

const img = {
  hardware: Hardware,
  software: Software,
  redes: Redes,
};

export default function CardServicos({ index }) {
  return (
    <div className="ring-1 ring-black/20 dark:bg-gray-800 flex flex-col items-center justify-center p-10 rounded-xl shadow-xl">
        <h1 className="text-gray-900 dark:text-branco font-bold text-4xl mb-2">
          {data[index].titulo}
        </h1>
      <div className="flex flex-col items-center">
        <div className="w-full p-4 flex flex-col text-justify">
          <div className="hidden lg:flex bg-cover bg-center p-4">
            <img
              src={img[data[index].img]}
              alt={data[index].titulo}
              className="rounded-2xl w-full h-full"
            ></img>
          </div>
            <span className="text-gray-400 dark:text-gray-200 text-lg">
              {data[index].descricao}
            </span>
        </div>
      </div>
    </div>
  );
}
