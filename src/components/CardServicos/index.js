import hardware from '../../images/hardware.jpg'
import {data} from './data';


function CardServicos({index}) {
    return (
        <div className="bg-stone-100 flex flex-col w-[90%] p-4 lg:w-[60rem] h-fit justify-center items-center rounded-xl lg:p-8" >
            <div className='w-full'>
                <h1 className="text-azul-hyde font-bold pl-4 text-4xl text-start mb-2">{data[index].titulo}</h1>
            </div>
            <div className='flex flex-row items-center'>
                <div className="w-full lg:w-1/2 h-full p-4 flex flex-col">
                    <h2 className="text-lg font-bold mb-5">Exemplos de problemas:</h2>
                    <div className="space-y-5">
                        {data[index].exemplos.map((exemplo) => {
                            return(

                        <div>
                            <p className="font-bold text-lg">{exemplo.label}</p>
                            <p className="text-gray-400">{exemplo.texto}</p>
                        </div>
                            )
                        }) }
                    </div>
                </div>
                <div className='hidden lg:flex w-1/2 h-full bg-cover bg-center p-4' >
                    <img src={hardware} alt="Hardware" className='w-full h-[25rem] rounded-2xl '></img>
                </div>

            </div>

        </div>

    );
}

export default CardServicos;