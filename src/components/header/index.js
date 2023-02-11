import "./header.css";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Header() {
  const [isNavExpanded, setIsNavExpanded] = useState(false);

  return (
		<nav className="navigation">
			<a href="/" className="brand-name">
        <p>HYDE</p>
        <p className="preto">DESK</p>
			</a>
			<button
				className="hamburger"
				onClick={() => {
					setIsNavExpanded(!isNavExpanded);
				}}
			>
				{/* icon from Heroicons.com */}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-5 w-5"
					viewBox="0 0 20 20"
					fill="white"
				>
					<path
						fillRule="evenodd"
						d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
						clipRule="evenodd"
					/>
				</svg>
			</button>
			<div
				className={
					isNavExpanded ? "navigation-menu expanded" : "navigation-menu"
				}
			>
				<ul>
					<li>
						<a href="/">Sobre</a>
					</li>
					<li>
						<a href="/about">Informações</a>
					</li>
					<li>
						<a className="login" href="/login">
							Login
						</a>
					</li>
				</ul>
			</div>
		</nav>
	);
}

		// 		<>
		// 			<header className="header">
		// 				<div className="container">
		// 					<div className="coluna col-6">
		// 						<a className="link1" href="/">
		// 							<div className="logo">
		// 								<h1 className="hyde">Hyde</h1>
		// 								<h1 className="desk">Desk</h1>
		// 							</div>
		// 						</a>
		// 					</div>
		// 					<div className="coluna2 col-6">
		// 						<div className="container-info">
		// 							<a className="link1" href="/">
		// 								<div className="sobre">
		// 									<h2 className="sobre">Sobre nós</h2>
		// 								</div>
		// 							</a>
		// 							<a className="link1" href="/">
		// 								<div className="informacoes">
		// 									<h2 className="informacoes">Informações</h2>
		// 								</div>
		// 							</a>
		// 							<a className="link1" href="/">
		// 								<div className="login">
		// 									<h2 className="login">Login</h2>
		// 								</div>
		// 							</a>
		// 						</div>
		// 					</div>
		// 				</div>
		// 			</header>
		// 		</>
