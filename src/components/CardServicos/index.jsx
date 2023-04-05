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
    <div className="bg-branco dark:bg-gray-800 flex flex-col w-[90%] h-[46rem] lg:h-[40rem] mt-8 p-4 lg:w-[70rem] justify-center items-center rounded-xl lg:p-8">
      <div className="w-full">
        <h1 className="text-azul-hyde font-bold pl-4 text-4xl text-start mb-2">
          {data[index].titulo}
        </h1>
      </div>
      <div className="flex flex-row items-center">
        <div className="w-full lg:w-1/2 h-full p-4 flex flex-col">
          <h2 className="text-lg font-bold mb-5 dark:text-branco">
            Exemplos de problemas:
          </h2>
          <div className="space-y-5">
            {data[index].exemplos.map((exemplo) => {
              return (
                <div>
                  <p className="font-bold text-lg dark:text-branco">
                    {exemplo.label}
                  </p>
                  <p className="text-gray-400 dark:text-gray-400">
                    {exemplo.texto}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="hidden lg:flex w-1/2 h-full bg-cover bg-center p-4">
          <img
            src={img[data[index].img]}
            alt=""
            className="w-full h-[25rem] rounded-2xl "
          ></img>
        </div>
      </div>
    </div>
  );
}
