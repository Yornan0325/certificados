import React from 'react';
import CardItem from './CardItem';
import { useUserStore } from "../../Context/context";
import { FaUser } from 'react-icons/fa';
export interface CardData {
    icon: JSX.Element;
    title: string;
    number: number;
  }
  import { useGetProjectsFromFirestore } from "../../Hook/useGetProjectsFromFirestore";
// export const cardData: CardData[] = [
//     { icon: <FaUser />, title: 'Consorcio Pozo Radial Puerto Mallarino 2020', number: 5 },
//     { icon: <FaUser />, title: 'Consorcio Sanear Candelaria 2022', number: 12 },
//     { icon: <FaUser />, title: 'Taller Metalmecanica', number: 8 },
//     // Agrega más elementos según sea necesario
//   ];
const Card: React.FC = () => {
  const { dataUser } = useUserStore();
  const { projects } = useUserStore();
  const { loading } = useGetProjectsFromFirestore();
  const role = dataUser[0]?.role || 'defaultRole';
  if (loading) {
    return <div>Loading...</div>; // Muestra un indicador de carga mientras se obtienen los datos
  }
    return (
      <div className="flex flex-wrap gap-4 justify-center mt-2">
        {projects.map((data, index) => (
          <CardItem 
            key={index}
            icon={<FaUser />} 
            title={data.title} 
            number={data.number} 
            role={role}
          />
        ))}
      </div>
    );
  };
  
  export default Card;