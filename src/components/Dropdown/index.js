import ReactDOM from "react-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Menu } from "@headlessui/react";
import CardAvaliacao from "../../components/CardAvaliacao";
import React from "react";
import { Link } from "react-router-dom";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";

export default function Dropdown({item}) {
    return ReactDOM.createPortal(
    <>
      <Menu as="div" className="relative z-50 inline-block text-left">
        <div>
          <Menu.Button>
            {" "}
            <FontAwesomeIcon className="text-azul-hyde" icon={faEllipsis} />
          </Menu.Button>
        </div>

        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              <div>
                <Link
                  to={"/detalhes/" + item.id_chamado}
                  className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 font-semibold"
                >
                  <button />
                  Detalhes
                </Link>
              </div>
            </Menu.Item>
            <Menu.Item>
              <div>
                <Link
                  to={"/"}
                  className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 font-semibold"
                >
                  <button />
                  Conclusão
                </Link>
              </div>
            </Menu.Item>
            <Menu.Item>
              <div>
                <Link
                  to={<CardAvaliacao />}
                  className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 font-semibold"
                >
                  <button />
                  Avaliação
                </Link>
              </div>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Menu>
      </>,
      document.getElementById('portal')
    );
  }