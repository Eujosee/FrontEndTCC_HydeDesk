import Header from "../../components/Header";
import Footer from "../../components/Footer";
import PieChart from "../../components/PieChart";


export default function DashBoard () {
    return(
        <>
            <Header/>
            <div className="w-full h-screen flex items-center justify-center">
                <div className="w-1/4 h-1/2 p-6 bg-slate-50 shadow-lg rounded-xl flex items-center justify-center">
                    <PieChart/>
                </div>
            </div>
            <Footer/>
        </>
    );   
}