import Imagem from "../../images/floppa2.png"
import Slider from "react-slick";
import "./index.css"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Carrossel() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      initialSlide: 0,
    }
  return (
    <>
        <Slider className="flex justify-center items-center" {...settings}>
                <img className="p-10 h-1/2 w-full" src={Imagem}/>
                <img className="p-10 h-1/2 w-full" src={Imagem}/>
                <img className="p-10 h-1/2 w-full" src={Imagem}/>
            
        </Slider>
    </> 
  );
}
