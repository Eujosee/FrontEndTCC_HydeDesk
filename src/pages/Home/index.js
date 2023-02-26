import Footer from "../../components/Footer";
import Header from "../../components/header";
import ImagemLogin from "../../images/suporte.svg"

function Home() {
  return (
		<div className="font-Poppins">
			<Header />
			<div className="flex w-full h-screen items-center justify-center dark:bg-preto ">
				<div className="flex items-center justify-center">
					<div className="max-w-sm">
						<h1 className="font-bold dark:text-white">Suporte</h1>
						<h1 className="font-bold dark:text-white">Help Desk</h1>

						<p className="semi-bold dark:text-white">
							Aliquam laoreet commodo laoreet. Aenean luctus neque ut risus
							volutpat interdum. Phasellus tristique sem vel odio sollicitudin
							facilisis. Aliquam erat volutpat.
						</p>

						<div className="mt-8 flex flex-col">
							<button className="hover:bg-cyan-600 mb-6 bg-azul-hyde p-2 rounded-3xl text-white font-bold text-lg">
								Conheça mais
							</button>
						</div>
					</div>

					<div className="hidden lg:flex justify-center items-center">
						<div className="ml-40 mr-10 w-85 h-85">
							<img src={ImagemLogin} alt="Homem segurando uma ferramenta" />
							{/* <a href="https://storyset.com/internet">Internet illustrations by Storyset</a> */}
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}

export default Home;
