import Avatar from "../Avatar/Avatar";
import SignOutButton from "../SignOutButton/SignOutButton";
import logoImage from "../../Components/Imagenes/logoImage.jpeg";
// import ButtonNewUser from "../NewUser/ButtonNewUser";
// import { useUserData } from '../../Hook/useUserDataFromFirestore';

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useUserStore } from "../../Context/context";
// import { Link } from "react-router-dom";

type Props = {
  name: string;
  imgUser: string;
  logoState: string;
  dimention: string;
  showItem: boolean;
  children: React.ReactNode;
};

const NavBarHome = ({
  imgUser,
  name,
  dimention,
  logoState,
  showItem,
}: Props) => {
  // const dataUser = useUserStore((state) => state.dataUser);
  const { dataUser, openModal } = useUserStore();
  // const [isOpen, setIsOpen] = useState(false);
  // console.log("dataUser", dataUser);

  const handleOpenModal = () => {
    openModal(true);
  };
  const navigation = [
    { name: "Proyecto", href: "/admin/nuevo/1", current: false },
  ];
  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }
  // if (loading) {
  //   return <p>Cargando datos...</p>;
  // }

  // const user = dataUser[0];
  return (
    <Disclosure as="nav" className="bg-gray-400">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-2">
            <div className="relative flex h-16 items-center justify-between">
              {logoState ? (
                <div className="flex items-center gap-2">
                  <Avatar dimention={dimention} logoImage={logoImage} />
                  <div className="hidden md:block">
                    <div className="mx-2">
                      <h2 className="block text-2xl text-opacity-50  text-black font-bold">
                        {name}
                      </h2>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-start mx-2 text-base font-medium ">
                    <img
                      src={imgUser}
                      className={
                        dimention +
                        "group-hover:w-24 group-hover:h-24  object-center object-cover rounded-full transition-all duration-500 delay-500 transform"
                      }
                      alt="titulo"
                    />
                    <div className="  ">
                      <div className="mx-2">
                        <h2 className="text-xl text-neutral-100">{name}</h2>
                      </div>
                    </div>
                  </div>
                </>
              )}
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex flex-shrink-0 items-center"></div>
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          onClick={handleOpenModal}
                          className={classNames(
                            item.current
                              ? "bg-gray-900 text-white"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "rounded-md px-3 py-2 text-sm font-medium"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Imagen del usuario */}

                {/* Menú desplegable de perfil en pantalla grande */}

                <Menu as="div" className="relative ml-3">
                  <div>
                    <MenuButton className="relative hidden lg:block md:block   rounded-full bg-gray-800 text-sm  ">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </MenuButton>
                  </div>

                  <Transition
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <MenuItems className="grid grid-cols-1 divide-y absolute right-0 z-10 mt-2 w-80 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <MenuItem>
                        {({ focus }) => (
                          <div
                            className={classNames(
                              focus ? "block" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            {dataUser.map((user) => (
                              <div key={user.uid}>
                                <p>Correo: {user.email}</p>
                                <p>Nombre: {user.name}</p>
                                <p>Rol: {user.role}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </MenuItem>

                      <MenuItem>
                        {({ focus }) => (
                          <div
                            className={classNames(
                              focus ? "block" : "",
                              "p-2 pb-2 text-sm text-gray-700"
                            )}
                          >
                            {showItem && <SignOutButton title="Salir" />}
                          </div>
                        )}
                      </MenuItem>
                    </MenuItems>
                  </Transition>
                </Menu>

                {/* Mobile menu button*/}
                <div className="relative inset-y-0 right-0  flex items-center sm:hidden">
                  {/* <div className="relative inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"> */}
                  <DisclosureButton className="relative  inset-x-0 top-0 inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </DisclosureButton>
                </div>
              </div>
            </div>
          </div>
          {/* vista del desplegable del munu modo movil*/}
          <DisclosurePanel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <DisclosureButton
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block  rounded-md px-3 py-2 text-base font-medium"
                  )}
                >
                  <div className="pb-2">
                    {/* <ButtonNewUser title="Nuevo" /> */}
                  </div>

                  {showItem && <SignOutButton title="Cerrar sesion" />}
                </DisclosureButton>
              ))}
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
};

export default NavBarHome;
