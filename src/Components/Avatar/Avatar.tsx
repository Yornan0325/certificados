import React from "react";
import Logo from "./Logo";


const Avatar: React.FC<{ dimention: string, logoImage:string }> = ({ dimention, logoImage }) => {
 

  return (
    <div className="flex items-center justify-center">
      <div className="rounded-full overflow-hidden bg-white ">
        <Logo dimention={dimention} logoUrl={logoImage} />
      </div>
    </div>
  );
}

export default Avatar;