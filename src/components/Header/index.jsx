import { Fragment, useState, useContext, useEffect } from "react";
import { Dialog, Disclosure, Popover, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  ListBulletIcon,
  ClipboardDocumentListIcon,
  UserPlusIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import { Context } from "../../context/AuthContext";
import secureLocalStorage from "react-secure-storage";
import ButtonDark from "../ButtonDark";
import api from "../../services/api";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [foto, setFoto] = useState("");
  const type = JSON.parse(secureLocalStorage.getItem("Tipo"));
  const id = JSON.parse(secureLocalStorage.getItem("Id"));

  useEffect(() => {
    (async () => {
      if (id) {
        switch (type) {
          case "tecnicos":
            try {
              const { data } = await api.get("/tecnicos/" + id);
              setFoto(data.foto);
            } catch (error) {}
            break;
          case "empresas":
            try {
              const { data } = await api.get("/empresas/" + id);
              setFoto(data.foto);
            } catch (error) {}
            break;
          case "funcionarios":
            try {
              const { data } = await api.get("/funcionarios/" + id);
              setFoto(data.foto);
            } catch (error) {}
            break;
          default:
            break;
        }
      }
    })();
  }, [id, type]);

  const { authenticated, handleLogout } = useContext(Context);

  return (
    <header className="bg-white dark:bg-gray-800 sticky w-full z-[49] top-0 left-0 shadow-md">
      <nav
        className="flex max-w-full items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex">
          <Link to="/" className="-m-1.5 p-1.5">
            <h1 className="font-extrabold text-3xl w-auto text-azul-hyde">
              Hyde<span className="text-gray-900 dark:text-white">Desk</span>
            </h1>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-my-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Abrir menu principal</span>
            <Bars3Icon
              className="h-6 w-6 dark:text-branco"
              aria-hidden="true"
            />
          </button>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:gap-x-12">
          <Popover.Group className="hidden lg:flex lg:gap-x-12">
            <Link
              to="/"
              className="text-md font-semibold leading-6 text-gray-900 dark:text-branco hover:text-azul-hyde dark:hover:text-azul-hyde"
            >
              Home
            </Link>
            <Link
              to="/institucional"
              className="text-md font-semibold leading-6 text-gray-900 dark:text-branco hover:text-azul-hyde dark:hover:text-azul-hyde"
            >
              Sobre
            </Link>
            {(type === "empresas" || type === "funcionarios") && (

                <Link
                  to="/dashboard"
                  className="text-md font-semibold leading-6 text-gray-900 dark:text-branco hover:text-azul-hyde dark:hover:text-azul-hyde"
                >
                  Dashboard
                </Link>

            )}
            {authenticated && (
              <Popover className="relative">
                <Popover.Button className="flex items-center gap-x-1 text-md font-semibold leading-6 text-gray-900 dark:text-branco hover:text-azul-hyde dark:hover:text-azul-hyde">
                  Chamados
                  <ChevronDownIcon
                    className="h-5 w-5 flex-none text-gray-400"
                    aria-hidden="true"
                  />
                </Popover.Button>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <Popover.Panel className="absolute -right-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white dark:bg-gray-800 dark:shadow-gray-900 shadow-lg ring-1 ring-gray-900/5 dark:ring-gray-50/5">
                    <div className="p-4">
                      <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50 dark:hover:bg-gray-900">
                        <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 dark:bg-gray-800 group-hover:bg-white dark:group-hover:bg-gray-900">
                          <ClipboardDocumentListIcon
                            className="h-6 w-6 text-gray-600 dark:text-branco group-hover:text-azul-hyde"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="flex-auto">
                          <Link
                            to="/lista-chamados"
                            className="block font-semibold text-gray-900 dark:text-branco"
                          >
                            Lista de chamados
                            <span className="absolute inset-0" />
                          </Link>
                          <p className="text-gray-600 dark:text-gray-400">
                            Ver lista com todos os chamados
                          </p>
                        </div>
                      </div>
                      {type === "funcionarios" && (
                        <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50 dark:hover:bg-gray-900">
                          <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 dark:bg-gray-800 group-hover:bg-white dark:group-hover:bg-gray-900">
                            <ListBulletIcon
                              className="h-6 w-6 text-gray-600 dark:text-branco group-hover:text-azul-hyde"
                              aria-hidden="true"
                            />
                          </div>
                          <div className="flex-auto">
                            <Link
                              to="/abrir-chamado"
                              className="block font-semibold text-gray-900 dark:text-branco"
                            >
                              Novo
                              <span className="absolute inset-0" />
                            </Link>
                            <p className=" text-gray-600 dark:text-gray-400">
                              Abrir um novo chamado
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </Popover.Panel>
                </Transition>
              </Popover>
            )}

            {type === "empresas" && (
              <Popover className="relative">
                <Popover.Button className="flex items-center gap-x-1 text-md font-semibold leading-6 text-gray-900 dark:text-branco hover:text-azul-hyde dark:hover:text-azul-hyde">
                  Funcionários
                  <ChevronDownIcon
                    className="h-5 w-5 flex-none text-gray-400"
                    aria-hidden="true"
                  />
                </Popover.Button>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <Popover.Panel className="absolute -right-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white dark:bg-gray-800 dark:shadow-gray-900 shadow-lg ring-1 ring-gray-900/5 dark:ring-gray-50/5">
                    <div className="p-4">
                      <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50 dark:hover:bg-gray-900">
                        <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 dark:bg-gray-800 group-hover:bg-white dark:group-hover:bg-gray-900">
                          <ClipboardDocumentListIcon
                            className="h-6 w-6 text-gray-600 dark:text-branco group-hover:text-azul-hyde"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="flex-auto">
                          <Link
                            to="/lista-funcionarios"
                            className="block font-semibold text-gray-900 dark:text-branco"
                          >
                            Lista de Funcionários
                            <span className="absolute inset-0" />
                          </Link>
                          <p className=" text-gray-600 dark:text-gray-400">
                            Ver lista com todos os funcionários
                          </p>
                        </div>
                      </div>
                      <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50 dark:hover:bg-gray-900">
                        <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 dark:bg-gray-800 group-hover:bg-white dark:group-hover:bg-gray-900">
                          <UserPlusIcon
                            className="h-6 w-6 text-gray-600 dark:text-branco group-hover:text-azul-hyde"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="flex-auto">
                          <Link
                            to="/cadastro-funcionario"
                            className="block font-semibold text-gray-900 dark:text-branco"
                          >
                            Novo
                            <span className="absolute inset-0" />
                          </Link>
                          <p className=" text-gray-600 dark:text-gray-400">
                            Cadastrar um novo funcionário
                          </p>
                        </div>
                      </div>
                    </div>
                  </Popover.Panel>
                </Transition>
              </Popover>
            )}
          </Popover.Group>
          <div className="hidden lg:flex lg:justify-end">
            {authenticated ? (
              <Popover className="relative">
                <Popover.Button className="group flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900 ">
                  {foto ? (
                    <img
                      src={"https://rei0mqdqxi.execute-api.us-east-1.amazonaws.com/" + foto}
                      alt="Foto"
                      className="h-10 w-10 text-gray-600 group-hover:text-azul-hyde rounded-full object-cover"
                    />
                  ) : (
                    <UserCircleIcon
                      className="h-6 w-6 text-gray-600 group-hover:text-azul-hyde"
                      aria-hidden="true"
                    />
                  )}
                  <ChevronDownIcon
                    className="h-5 w-5 flex-none text-gray-400"
                    aria-hidden="true"
                  />
                </Popover.Button>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <Popover.Panel className="absolute -right-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white dark:bg-gray-800 dark:shadow-gray-900 shadow-lg ring-1 ring-gray-900/5 dark:ring-gray-50/5">
                    <div className="p-4">
                      <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50 dark:hover:bg-gray-900">
                        <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 dark:bg-gray-800 group-hover:bg-white dark:group-hover:bg-gray-900">
                          {foto ? (
                            <img
                              src={
                                "https://rei0mqdqxi.execute-api.us-east-1.amazonaws.com/" + foto
                              }
                              alt="Foto"
                              className="h-10 w-10 text-gray-600 group-hover:text-azul-hyde rounded-full"
                            />
                          ) : (
                            <UserCircleIcon
                              className="h-6 w-6 text-gray-600 group-hover:text-azul-hyde"
                              aria-hidden="true"
                            />
                          )}
                        </div>
                        <div className="flex-auto">
                          <Link
                            to="/perfil"
                            className="block font-semibold text-gray-900 dark:text-branco"
                          >
                            Meu Perfil
                            <span className="absolute inset-0" />
                          </Link>
                          <p className="text-gray-600 dark:text-gray-400">
                            Veja e edite suas informações
                          </p>
                        </div>
                      </div>
                      <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50 dark:hover:bg-gray-900">
                        <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 dark:bg-gray-800 group-hover:bg-white dark:group-hover:bg-gray-900">
                          <ArrowRightOnRectangleIcon
                            className="h-6 w-6 text-gray-600 dark:text-branco group-hover:text-azul-hyde"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="flex-auto">
                          <button
                            onClick={() => handleLogout()}
                            className="block font-semibold text-gray-900 dark:text-branco"
                          >
                            Deslogar
                            <span className="absolute inset-0" />
                          </button>
                          <p className=" text-gray-600 dark:text-gray-400">
                            Sair da sua conta
                          </p>
                        </div>
                      </div>
                    </div>
                  </Popover.Panel>
                </Transition>
              </Popover>
            ) : (
              <Link
                to="/login"
                className="bg-azul-hyde hover:bg-cyan-600 p-1 px-6 rounded-md text-white text-md font-semibold leading-6"
              >
                Login
              </Link>
            )}
          </div>
          <ButtonDark />
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white dark:bg-gray-800 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link to="/" className="-m-1.5 p-1.5">
              <h1 className="font-extrabold text-3xl w-auto text-azul-hyde">
                Hyde<span className="text-black dark:text-branco">Desk</span>
              </h1>
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Fechar menu</span>
              <XMarkIcon
                className="h-6 w-6 dark:text-branco"
                aria-hidden="true"
              />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Link
                  to="/"
                  className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 dark:text-branco hover:bg-gray-50 dark:hover:bg-gray-900"
                >
                  Home
                </Link>
                <Link
                  to="/institucional"
                  className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 dark:text-branco hover:bg-gray-50 dark:hover:bg-gray-900"
                >
                  Sobre
                </Link>
                {type !== "tecnicos" && (
                    <Link  to="/dashboard"
                    className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 dark:text-branco hover:bg-gray-50 dark:hover:bg-gray-900">
                    DashBoard
                    </Link>
                )}
                {authenticated && (
                  <Disclosure as="div" className="-mx-3">
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 dark:text-branco hover:bg-gray-50 dark:hover:bg-gray-900">
                          Chamados
                          <ChevronDownIcon
                            className={classNames(
                              open ? "rotate-180" : "",
                              "h-5 w-5 flex-none"
                            )}
                            aria-hidden="true"
                          />
                        </Disclosure.Button>
                        <Disclosure.Panel className="mt-2 space-y-2">
                          <Disclosure.Button className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 dark:text-branco hover:bg-gray-50 dark:hover:bg-gray-900">
                            <Link to="/lista-chamados">Lista de chamados</Link>
                          </Disclosure.Button>

                          {type === "funcionarios" && (
                            <Disclosure.Button className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 dark:text-branco hover:bg-gray-50 dark:hover:bg-gray-900">
                              <Link to="/abrir-chamado">
                                Abrir um novo chamado
                              </Link>
                            </Disclosure.Button>
                          )}
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                )}
                {type === "empresas" && (
                  <Disclosure as="div" className="-mx-3">
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 dark:text-branco hover:bg-gray-50 dark:hover:bg-gray-900">
                          Funcionários
                          <ChevronDownIcon
                            className={classNames(
                              open ? "rotate-180" : "",
                              "h-5 w-5 flex-none"
                            )}
                            aria-hidden="true"
                          />
                        </Disclosure.Button>
                        <Disclosure.Panel className="mt-2 space-y-2">
                          <Disclosure.Button className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 dark:text-branco hover:bg-gray-50 dark:hover:bg-gray-900">
                            <Link to="/lista-funcionarios">
                              Lista de Funcionários
                            </Link>
                          </Disclosure.Button>

                          <Disclosure.Button className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 dark:text-branco hover:bg-gray-50 dark:hover:bg-gray-900">
                            <Link to="/cadastro-funcionario">
                              Cadastrar um novo funcionário
                            </Link>
                          </Disclosure.Button>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                )}
                {authenticated && (
                  <Link
                    to="/perfil"
                    className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 dark:text-branco hover:bg-gray-50 dark:hover:bg-gray-900"
                  >
                    Meu Perfil
                  </Link>
                )}
              </div>
              {!authenticated ? (
                <div className="py-6 flex flex-row justify-between">
                  <Link
                    to="/login"
                    className="-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-7 text-gray-900 dark:text-branco hover:bg-gray-50 dark:hover:bg-gray-900"
                  >
                    Login
                  </Link>
                  <ButtonDark />
                </div>
              ) : (
                <div className="py-6 flex flex-row justify-between">
                  <button
                    className="-mx-3 rounded-lg py-2.5 px-3 text-base font-semibold leading-7 text-gray-900 dark:text-branco hover:bg-gray-50 dark:hover:bg-gray-900"
                    onClick={() => handleLogout()}
                  >
                    Sair
                  </button>
                  <ButtonDark />
                </div>
              )}
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
