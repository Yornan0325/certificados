interface LogoProps {
    dimention: string;
    logoUrl: string;  // Nueva propiedad para la URL de la imagen
  }
  
  const Logo: React.FC<LogoProps> = ({ dimention, logoUrl }) => {
    return (
      <>
        <img
          src={logoUrl}  // Usa la URL de la imagen que se pasa como prop
          alt="Logo"
          className={
            dimention +
            "  lg:justify-center object-center object-fill  transition-all duration-500   transform"
          }
        />
      </>
        //  "lg:justify-center object-center  transition-all duration-500   transform"
    );
  };
  
  export default Logo;