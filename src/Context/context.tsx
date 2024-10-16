import {create} from 'zustand'
import { UserContext, UserType } from '../TypeScript/Types/types'

const useUserStore  = create<UserContext>(set => ({
    userAuth: null,
    userRole: null,
    dataUser: [],
    loading:true,
    updateUserAuth: newState => set({ userAuth: newState }),
    updateUserRole: newRole => set({ userRole: newRole }),
    setDataUser: (data: UserType[]) => set({ dataUser: data }),
    // loadInitialData: data => set({ dataUser: data, loading: false }),
    setLoading: (loading) => set({ loading }),
  }))
 
export {useUserStore }
