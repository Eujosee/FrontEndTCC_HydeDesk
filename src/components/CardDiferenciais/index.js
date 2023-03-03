import Card from "../CardTime";
import Slider from "react-slick";
import "./index.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Carrossel() {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="">
      <Slider className="flex justify-center items-center" {...settings}>
        <div className="flex m-5 justify-center bg-slate-300 shadow-md rounded-xl p-32">
          <h1 className="text-center">card</h1>
        </div>
        <div className="flex m-5 justify-center bg-slate-300 shadow-md rounded-xl p-32">
          <h1 className="text-center">card</h1>
        </div>
        <div className="flex m-5 justify-center bg-slate-300 shadow-md rounded-xl p-32">
          <h1 className="text-center">card</h1>
        </div>
        <div className="flex m-5 justify-center bg-slate-300 shadow-md rounded-xl p-32">
          <h1 className="text-center">card</h1>
        </div>
      </Slider>
    </div>
  );
}
