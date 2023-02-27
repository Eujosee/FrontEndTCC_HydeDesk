import Header from "../../components/header";
import Footer from "../../components/Footer";
import ImagemFloppa from "../../images/floppa.jpg";
import ImagemFloppa1 from "../../images/floppa1.png";
import ImagemFloppa2 from "../../images/floppa2.png";
import Carrossel from "../../components/Carrosel";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <Header />
      <div className="flex flex-col w-full min-h-screen overflow-x-hidden dark:bg-preto ">
        <div className="w-full">
          <img src={ImagemFloppa1} alt="" />
        </div>
        <div
          id="historia"
          className="py-10 md:py-24 flex items-center justify-center"
        >
          <div className="max-w-lg">
            <h1 className="text-center font-bold text-2xl dark:text-white">
              Quem somos?
            </h1>

            <p className="text-gray-600 text-justify p-5 semi-bold dark:text-white">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse tempus posuere purus ac convallis. Nulla facilisi.
              Pellentesque habitant morbi tristique senectus et netus et
              malesuada fames ac turpis egestas. Phasellus in dictum nunc, non
              lacinia magna. Praesent nec lacus sit amet enim pellentesque
              elementum. Sed suscipit blandit massa eu molestie. Nulla vel elit
              nec sapien scelerisque suscipit. Ut tristique eget augue id
              luctus. Integer sit amet diam cursus, viverra diam a, dignissim
              lacus.
            </p>
          </div>
          <div className="md:px-20 hidden lg:flex">
            <div className="flex justify-center items-center w-80 h-80">
              <img src={ImagemFloppa} alt="" />
            </div>
          </div>
        </div>
        <div className="w-full h-90">
          <img src={ImagemFloppa2} alt="" />
        </div>
        <div className=" py-14 flex flex-col justify-center items-center">
          <h1 className="mb-10 font-bold text-2xl dark:text-white">
            Conheça nosso time
          </h1>
          <div className="max-w-full">
            <Carrossel />
          </div>
        </div>
        <div className="w-full flex flex-col justify-center items-center py-44 bg-slate-400">
          <h1 className="font-bold text-2xl">Estamos em obra</h1>
          <button className="hover:bg-cyan-600 text-white font-semibold py-2 px-10 rounded-md bg-azul-hyde">
            <Link to="">Em breve</Link>
          </button>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Home;
