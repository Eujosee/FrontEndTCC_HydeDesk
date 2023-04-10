import Header from "../../components/Header";
import Footer from "../../components/Footer";
import PieChart from "../../components/PieChart";


export default function DashBoard () {
    return(
        <>
            <Header/>
            <div className="w-full h-screen flex items-center justify-center">
                <PieChart/>
            </div>
            <Footer/>
        </>
    );   
}