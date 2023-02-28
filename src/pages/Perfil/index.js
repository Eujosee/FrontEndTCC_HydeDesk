import { useEffect, useState } from "react";
<<<<<<< HEAD
import Header from "../../components/header";
import Footer from "../../components/Footer";
=======
import Header from "../../components/Header";
import Footer from "../../components/Footer"
import CardPerfil from "../../components/Perfil";
>>>>>>> a6ecedcea4ba7c2dedd5d9b66dac7010b59accd7
import api from "../../api";
import CardPerfil from "../../components/Perfil";

export default function Perfil() {


  return (
    <div className="font-Poppins dark:bg-gray-900">
      <Header />
        <CardPerfil/>
      <Footer />
    </div>
  );
}
