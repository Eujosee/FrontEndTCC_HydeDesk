import Imagem from "../../images/floppa2.png"
import Slider from "react-slick";
import "./index.css"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CardServicos from "../CardServicos";

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
        <CardServicos
						index={0}
					/>
					<CardServicos
						index={1}
					/>
					<CardServicos
						index={2}
					/>
        </Slider>
    </> 
  );
}
