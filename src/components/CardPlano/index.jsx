import { AiOutlineCheck } from "react-icons/ai";
import data from "./data";

export default function CardPlano({ index }) {
  return (
    <div className="flex flex-col p-10 rounded-lg shadow-lg w-11/12 h-fit lg:h-[32rem] lg:w-[25rem] dark:bg-gray-800 dark:text-gray-50 border-gray-300/20 border-2 ring-1 ring-black/10">
      <h1 className="text-3xl font-semibold">{data[index].tipo}</h1>
      <span
        data-type={data[index].tipo}
        className="data-[type=Bronze]:bg-amber-600 data-[type=Prata]:bg-stone-400 data-[type=Ouro]:bg-yellow-500 w-full h-[4px]"
      ></span>
      <h2 className="text-2xl my-4">
        R$325<span className="text-xl">/mês</span>
      </h2>
      <ul className="space-y-3">
        {data[index].itens.map((item, index) => {
          return (
            <li key={index} className="flex items-center gap-x-2 break-words tracking-wide">
              <AiOutlineCheck size={20} />
              <span>{item}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
