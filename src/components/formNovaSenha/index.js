export default function Form(){
  
    return (
			<div className="bg-white px-10 py-10 dark:bg-preto">
				<div>
					<div>
						<label className="text-lg font-semibold items-center text-gray-900 dark:text-branco">
							Nova Senha
						</label>
						<input
							type="text"
							className="focus:outline-none focus:border-azul-hyde border-b-2 w-full p-2  dark:text-branco  dark:bg-preto"
							placeholder="Nova senha"
						/>
					</div>
				</div>
				<div className="mt-10">
					<label className="text-lg font-semibold items-center text-gray-900 dark:text-branco">
						Confirmar nova senha
					</label>
					<input
						type="text"
						className="focus:outline-none focus:border-azul-hyde border-b-2 w-full p-2  dark:text-branco  dark:bg-preto"
						placeholder="Confirmar nova senha"
					/>
				</div>
				<div className="mt-8 flex flex-col justify-center items-center">
					<button
						className="hover:bg-cyan-600 mb-6 bg-azul-hyde p-2 w-2/3 rounded-md text-white font-bold text-lg "
						onClick={() => {}}
					>
						{" "}
						Atualizar
					</button>
					<p className="text-red-500 flex justify-center"></p>
				</div>
			</div>
		);
}