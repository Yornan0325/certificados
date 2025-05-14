import { useState } from "react";
import Avatar from "../Avatar/Avatar";
import SignOutButton from "../SignOutButton/SignOutButton";
import AdminApprovalModal from "../Modal/AdminApprovalModal";
import logoImage from "../../Components/Imagenes/logoImage.jpeg";
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

type Props = {
  name: string;
  imgUser: string;
  logoState: string;
  dimention: string;
  showItem: boolean;
};

const NavBarHome = ({ imgUser, name, dimention, logoState, showItem }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { dataUser, openModal } = useUserStore();

  // Obtener el rol del usuario
  const userRole = dataUser.length > 0 ? dataUser[0].role : "invitado"; 
  
  const handleOpenModal = () => openModal(true);

  // Solo mostrar estas opciones si el usuario es ADMIN
  const navigation = userRole === "admin" ? [
    { name: "Consorcios", href: "/admin/nuevo/1", current: false },
    { name: "Solicitudes para aprobacion", href: "#", current: false, action: () => setIsModalOpen(true) }
  ] : [];

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <Disclosure as="nav" className="bg-gray-400">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-2">
            <div className="relative flex h-16 items-center justify-between">
              
              {/* Logo o Avatar */}
              {logoState ? (
                <div className="flex items-center gap-2">
                  <Avatar dimention={dimention} logoImage={logoImage} />
                  <div className="hidden md:block">
                    <h2 className="text-2xl text-opacity-50 text-black font-bold">{name}</h2>
                  </div>
                </div>
              ) : (
                <div className="flex items-center mx-2 text-base font-medium">
                  <img
                    src={imgUser}
                    className={`${dimention} group-hover:w-24 group-hover:h-24 object-center object-cover rounded-full transition-all`}
                    alt="titulo"
                  />
                  <div className="mx-2">
                    <h2 className="text-xl text-neutral-100">{name}</h2>
                  </div>
                </div>
              )}

              {/* Navegación */}
              <div className="flex items-center space-x-4">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={item.action ? item.action : undefined}
                    className={classNames(
                      "text-gray-100 hover:text-white",
                      "rounded-md px-3 py-2 text-sm font-medium cursor-pointer"
                    )}
                  >
                    {item.name}
                  </a>
                ))}

                {/* Menú Usuario */}
                <Menu as="div" className="relative ml-3">
                  <MenuButton className="relative hidden lg:block md:block rounded-full bg-gray-800 text-sm">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-8 w-8 rounded-full"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt="User Avatar"
                    />
                  </MenuButton>

                  <Transition
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <MenuItems className="absolute right-0 z-10 mt-2 w-80 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <MenuItem>
                        {({ active }) => (
                          <div className={classNames(active ? "bg-gray-100" : "", "block px-4 py-2 text-sm text-gray-700")}>
                            {dataUser.map((user) => (
                              <div key={user.uid}>
                                <p>Correo: {user.email}</p>
                                <p>Nombre: {user.name}</p>
                                <p>Rol: {userRole}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </MenuItem>
                      <MenuItem>
                        {({ active }) => (
                          <div className={classNames(active ? "bg-gray-100" : "", "p-2 text-sm text-gray-700")}>
                            {showItem && <SignOutButton title="Salir" />}
                          </div>
                        )}
                      </MenuItem>
                    </MenuItems>
                  </Transition>
                </Menu>

                {/* Botón Menú Responsive */}
                <DisclosureButton className="relative sm:hidden inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
                </DisclosureButton>
              </div>
            </div>
          </div>

          {/* Menú Responsive */}
          <DisclosurePanel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <DisclosureButton
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                >
                  {item.name}
                </DisclosureButton>
              ))}
              {showItem && <SignOutButton title="Cerrar sesión" />}
            </div>
          </DisclosurePanel>

          {/* Modal de Usuarios Pendientes */}
          {isModalOpen && <AdminApprovalModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}
        </>
      )}
    </Disclosure>
  );
};

export default NavBarHome;
