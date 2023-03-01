import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ImagemFloppa1 from "../../images/floppa1.png";
import ImagemFloppa2 from "../../images/floppa2.png";
import Carrossel from "../../components/CarroselProdutos";
import CardDiferenciais from "../../components/CardDiferenciais";

function Homeinterativo() {
    return (
        <>
            <Header />
            <div className="flex flex-col w-full min-h-screen overflow-x-hidden dark:bg-preto ">
                <div className="w-full ">
                    <img className="w-full" src={ImagemFloppa1} alt="" />
                </div>
                <div className=" py-14 flex flex-col justify-center items-center">
                    <h1 className="font-bold text-2xl dark:text-white">
                        PRODUTOS
                    </h1>
                    <div className="max-w-full">
                        <Carrossel />
                    </div>
                </div>
                <div className="w-full h-90">
                    <img className="w-full" src={ImagemFloppa2} alt="" />
                </div>
                <div className=" py-14 flex flex-col justify-center items-center">
                    <h1 className="mb-10 font-bold text-2xl dark:text-white">
                        RECURSOS
                    </h1>
                    <div className="max-w-full">
                        <CardDiferenciais />
                    </div>
                </div>
                <div className="w-full flex flex-col justify-center items-center py-32 bg-slate-400">
                    <h1 className="font-bold text-2xl">Citação</h1>
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
                <div className=" py-14 flex flex-col justify-center items-center">
                    <h1 className="mb-10 font-bold text-2xl dark:text-white">
                        DIFERENCIAIS
                    </h1>
                    <div className="w-full p-10">
                        <div class="grid grid-cols-2 gap-6">
                            <div><img className="w-full" src={ImagemFloppa1} alt="" /></div>
                            <div><img className="w-full" src={ImagemFloppa1} alt="" /></div>
                            <div><img className="w-full" src={ImagemFloppa1} alt="" /></div>
                            <div><img className="w-full" src={ImagemFloppa1} alt="" /></div>
                        </div>
                    </div>
                </div>
                <div className="w-full flex flex-col justify-center items-center py-32 bg-slate-400">
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
                <Footer />
            </div>
        </>
    );
}

export default Homeinterativo;