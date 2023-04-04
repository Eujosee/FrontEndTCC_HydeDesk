import Slider from "react-slick";
import "./index.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CardServicos from "../CardServicos";

export default function CarrosselProdutos() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
  };

  const cards = [0, 1, 2];

  return (
    <Slider className="flex justify-center items-center" {...settings}>
      {cards.map((card) => {
        return <CardServicos key={card} index={card} />;
      })}
    </Slider>
  );
}
