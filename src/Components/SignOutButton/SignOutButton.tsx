import React from 'react';
import Icon from '@mdi/react';
import { mdiExitRun } from '@mdi/js';
import   { useHandleAuthSigOut } from "../../Hook/useHandleAuthSigOut";
interface SignOutButtonProps {
 
  title: string;
}
const SignOutButton: React.FC<SignOutButtonProps>  = ({title}) => {
    const { signOutSesion } = useHandleAuthSigOut();

return(
  <div className="flex items-center" onClick={signOutSesion} >
    <Icon path={mdiExitRun} size={1} />
    <span className="cursor-pointer text-xl mx-2">{title}</span>
  </div>
)};

export default SignOutButton;