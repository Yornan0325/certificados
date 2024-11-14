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

  updateUserAuth: (newState) => set({ userAuth: newState }),
  updateUserRole: (newRole) => set({ userRole: newRole }),
  setDataAuthenticatedUser: (data: UserType[]) => set({ dataUser: data }),
  // loadInitialData: data => set({ dataUser: data, loading: false }),
  setLoading: (loading) => set({ loading }),
  setProjects: (projectsData: ProjectType[]) => set({ projects: projectsData }),
  openModal: (content: React.ReactNode) =>
  set({ isModalOpen: true, modalContent: content }),
  closeModal: () => set({ isModalOpen: false, modalContent: null }),
  // Seleccionar el proyecto por el uid
  setSelectedProjectsUid: (uid:string) => set({ selectedProjectsUid: uid }),
}));

export { useUserStore };
