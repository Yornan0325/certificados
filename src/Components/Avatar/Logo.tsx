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
            " group-hover:w-12 group-hover:h-12 sm:justify-center object-center object-cover rounded-full transition-all duration-500 delay-500 transform"
          }
        />
      </>
    );
  };
  
  export default Logo;