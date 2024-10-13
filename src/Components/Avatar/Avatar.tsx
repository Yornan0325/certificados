import React from "react";
import Logo from "./Logo";



// Utiliza la desestructuración en la firma de la función del componente
const Avatar: React.FC<{ dimention: string, logoUrl:string }> = ({ dimention, logoUrl }) => {
 

  return (
    <div className="flex items-center justify-center">
      <div className="rounded-full overflow-hidden bg-white">
        <Logo dimention={dimention} logoUrl={logoUrl} />
      </div>
    </div>
  );
}

export default Avatar;