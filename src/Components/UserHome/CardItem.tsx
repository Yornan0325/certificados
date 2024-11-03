import { Link } from "react-router-dom";

interface CardItemProps {
  icon: React.ReactNode;
  title: string;
  role: string;
}

const CardItem: React.FC<CardItemProps> = ({ icon, title, role }) => {
  return (
    <>
      <div className="relative flex items-center p-4 shadow-md border border-gray-200 rounded-lg w-80 bg-white">
        {/* Número en la esquina superior derecha */}
        <div className="absolute top-2   right-2 text-purple-600 text-sm font-medium">
          5
        </div>
        {/* Contenido principal de la tarjeta */}
        <div className="flex items-center space-x-3 mt-2">
          <div className="text-gray-700 text-4xl">{icon}</div>
          <div className="felex text-gray-700  mt-2 text-item-center text-base-center font-semibold">
            <Link to={`/${role}/${title}`}>
              <p>{title}</p>

              {/* <Icon path={mdiAccountEdit} size={1.2} /> */}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardItem;
