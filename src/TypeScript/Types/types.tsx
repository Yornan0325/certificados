import type { User } from "firebase/auth";

interface UserType {
  createdAt: Date;
  email: string;
  name: string;
  role: string;
  uid: string;
}

interface ModalType {
  close: () => void;
  isOpen: boolean;
  open: () => void;
}
interface InputFormProps {
  modal: ModalType;
  userDataforId: UserType | null;
  loading: boolean;
  userId: number;
  addUser: (userData: UserType) => void;
  updateUser: (userData: UserType) => void;
  deleteUser: (userId: number) => void;
  initialData: UserType;
}
interface ProjectType {
  projectTitle: string;
  uid: string;
}
 
interface CertificateType {
  certificateType: string;
  person: string;
  certificateUid: string;
  nameProject: string;
  projectUid?: string;
  state: string;
  date: string;
}
interface UserContext {
  loading: boolean;
  userAuth: UserAuth | null;
  userRole: UserRole | null;
  dataUser: UserType[];
  projects: ProjectType[];
  selectedProjectsUid: string;

  updateUserAuth: UpdateUserAuth;
  updateUserRole: (newRole: UserRole) => void;
  setDataAuthenticatedUser: (data: UserType[]) => void;
  setLoading: (loading: boolean) => void;
  setProjects: (projectsData: ProjectType[]) => void;
  // Propiedades del modal
  isModalOpen: boolean;
  modalContent: React.ReactNode | null;
  openModal: (content: React.ReactNode) => void;
  closeModal: () => void;

  setSelectedProjectsUid: (uid: string) => void;
}

type UpdateUserAuth = (newState: null | User) => void;
type UserAuth = null | User;
type UserRole = "admin" | "invitado" | null;

export type {
  UserContext,
  UpdateUserAuth,
  UserType,
  InputFormProps,
  ModalType,
  // ModalDeleteProps,
  ProjectType,
  CertificateType,
};
