import { create } from 'zustand';

import type { User } from '@/interfaces/user.interface';
import { loginAction } from '../actions/login.action';
import { checkAuthAction } from '../actions/check-auth.action';

type AuthStatus = 'authenticated' | 'no-authenticated' | 'checking';

type AuthState = {
    user: User | null,
    token: string | null,
    authStatus: AuthStatus,

    isAdmin: () => boolean,

    login: (email: string, password: string) => Promise<boolean>,
    logout: () => void,
    checkAuthStatus: () => Promise<boolean>,
}

export const useAuthStore = create<AuthState>()((set, get) => ({
    user: null,
    token: null,
    authStatus: 'checking',
    isAdmin: () => {
        const role = get().user?.role;
        return role === 'Admin'
    },
    login: async (email: string, password: string) => {
        try {
            const data = await loginAction(email, password)
            localStorage.setItem('token', data.token)

            set({ user: data.user, token: data.token, authStatus: 'authenticated' });
            return true;
        } catch (error) {
            localStorage.removeItem('token');
            set({ user: null, token: null, authStatus: 'no-authenticated' });
            return false;
        }
    },
    logout: () => {
        localStorage.removeItem('token');
        set({ user: null, token: null, authStatus: 'no-authenticated' });
    },
    checkAuthStatus: async () => {
        try {
            const { user, token } = await checkAuthAction()
            set({ user, token, authStatus: 'authenticated' })
            return true;
        } catch (error: any) {
            set({ user: null, token: null, authStatus: 'no-authenticated' })
            console.log(error)
            return false;
        }
    }
}))