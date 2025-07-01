import { create } from "zustand";
import { UserContext, UserType, ProjectType } from "../TypeScript/Types/types";

const useUserStore = create<UserContext>((set) => ({
  userAuth: null,
  userRole: null,
  dataUser: [],
  loading: true,
  projects: [],
  isModalOpen: false,
  modalContent: null,
  selectedProjectsUid: '',

  // estado para guardar datos completos del usuario logueado
  userData: null, 

  updateUserAuth: (newState) => set({ userAuth: newState }),
  updateUserRole: (newRole) => set({ userRole: newRole }),
  setDataAuthenticatedUser: (data: UserType[]) => set({ dataUser: data }),
  setLoading: (loading) => set({ loading }),
  setProjects: (projectsData: ProjectType[]) => set({ projects: projectsData }),
  openModal: (content: React.ReactNode) =>
    set({ isModalOpen: true, modalContent: content }),
  closeModal: () => set({ isModalOpen: false, modalContent: null }),
  setSelectedProjectsUid: (uid:string) => set({ selectedProjectsUid: uid }),

  //función para guardar el usuario autenticado completo
  setUserData: (data: UserType[]) => set({ dataUser: data }),
}));

export { useUserStore };
