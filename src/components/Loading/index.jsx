import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function Loading(){
    return(
        <div className="flex w-full h-screen overflow-hidden gap-2 items-center justify-center m-auto dark:bg-preto">
          <AiOutlineLoading3Quarters
            size={25}
            className="animate-spin text-gray-900 dark:text-gray-50"
          />
          <span className="text-gray-900 dark:text-gray-50"> Carregando...</span>
        </div>
    )
}