// import ButtonNewUser from "../NewUser/ButtonNewUser";
// import { useUserData } from '../../Hook/useUserDataFromFirestore';

import { Disclosure } from "@headlessui/react";
// import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
// import { useUserStore } from "../../Context/context";
// import { Link } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

const NavBar = ({ children }: Props) => {
  return (
    <div>
      <Disclosure as="nav" className="bg-gray-400">
        {children}
      </Disclosure>
    </div>
  );
};

export default NavBar;
