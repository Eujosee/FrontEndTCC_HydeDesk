import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Menu } from "@headlessui/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { Float } from "@headlessui-float/react";
import {
  StarIcon,
  CheckBadgeIcon,
  ArchiveBoxIcon,
} from "@heroicons/react/24/outline";

export default function Dropdown({ item }) {
  return (
    <>
      <Menu as="div" className="relative z-50 inline-block text-left">
        <Float portal="#portal">
          <div>
            <Menu.Button>
              {" "}
              <FontAwesomeIcon className="text-azul-hyde" icon={faEllipsis} />
            </Menu.Button>
          </div>

          <Menu.Items className="absolute -right-5 z-10 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="p-2 ">
              <Menu.Item>
                <div className="flex flex-row items-center px-4 group hover:bg-azul-hyde rounded-md">
                  <ArchiveBoxIcon
                    className="h-6 w-6 text-azul-hyde group-hover:text-white"
                    aria-hidden="true"
                  />
                  <Link
                    to={"/detalhes/" + item.id_chamado}
                    className="block w-full px-2 py-2 text-left text-sm  font-semibold group-hover:text-white"
                  >
                    Detalhes
                  </Link>
                </div>
              </Menu.Item>
              <Menu.Item>
                <div className="flex flex-row items-center px-4 group hover:bg-azul-hyde rounded-md">
                  <CheckBadgeIcon
                    className="h-6 w-6 text-azul-hyde group-hover:text-white"
                    aria-hidden="true"
                  />
                  <Link
                    to=""
                    className="block w-full px-2 py-2 text-left text-sm font-semibold group-hover:text-white"
                  >
                    Conclusão
                  </Link>
                </div>
              </Menu.Item>
              <Menu.Item>
                <div className="flex flex-row items-center px-4 group hover:bg-azul-hyde rounded-md">
                  <StarIcon
                    className="h-6 w-6 text-azul-hyde group-hover:text-white"
                    aria-hidden="true"
                  />
                  <Link
                    to={""}
                    className="block w-full px-2 py-2 text-left text-sm font-semibold group-hover:text-white"
                  >
                    Avaliação
                  </Link>
                </div>
              </Menu.Item>
            </div>
          </Menu.Items>
        </Float>
      </Menu>
    </>
  );
}
