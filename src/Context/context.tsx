import {create} from 'zustand'
import { UserContext, UserType,ProjectType } from '../TypeScript/Types/types'

const useUserStore  = create<UserContext>(set => ({
    userAuth: null,
    userRole: null,
    dataUser: [],
    loading:true,
    projects: [],
    updateUserAuth: newState => set({ userAuth: newState }),
    updateUserRole: newRole => set({ userRole: newRole }),
    setDataUser: (data: UserType[]) => set({ dataUser: data }),
    // loadInitialData: data => set({ dataUser: data, loading: false }),
    setLoading: (loading) => set({ loading }),
    setProjects: (projectsData: ProjectType[]) => set({ projects: projectsData}),
  }))
 
export {useUserStore }
