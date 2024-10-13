import { useEffect } from 'react';
import { useUserStore } from '../Context/context';
import { UserType } from '../TypeScript/Types/types';
import response from '../Hooks/data.json';

const useDataUsers = () => {
  const setDataUser = useUserStore((state) => state.setDataUser);
  const setLoading = useUserStore((state) => state.setLoading);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Simular un tiempo de carga para mostrar el spinner de carga
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Obtener los datos de usuarios del archivo JSON
        const data: UserType[] = response;

        // Actualizar el estado de los datos de usuarios
        setDataUser(data);
      } catch (error) {
        console.error('Error al cargar los datos de usuarios:', error);
      } finally {
        // Indicar que la carga ha finalizado, ya sea exitosa o con error
        setLoading(false);
      }
    };

    // Llamar a la función fetchData al montar el componente o cuando cambien las dependencias
    fetchData();
  }, [setDataUser, setLoading]);

  // Retornar null si no se necesita renderizar nada en este hook
  return null;
};

export default useDataUsers;