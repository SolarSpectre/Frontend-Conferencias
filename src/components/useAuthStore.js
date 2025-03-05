import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      authUser: null,
      token: null, 
      isCheckingAuth: true,

      setToken: (newToken) => {
        set({ token: newToken });
      },
      checkAuth: async () => {
        try {
          const { token } = get();
          if (!token) throw new Error("No autenticado");

          set({
            authUser: { ...respuesta.data },
            token: respuesta.data.token,
          });

          return true;
        } catch (error) {
          set({ authUser: null, token: null });
          return false;
        }
      },
      login: async (data) => {
        try {
          const endpoint = "/login";
          const res = await axiosInstance.post(endpoint, data);
          console.log(res)

          set({
            authUser: { ...res.data.response },
            token: res.data.token,
          });
          
          const { authUser, token } = get();
          console.log(authUser)
          console.log(token)
          toast.success(`Bienvenido ${res.data.response.nombre}`);
        } catch (error) {
          toast.error(error.response?.data?.msg || "Error de autenticación");
        }
      },
      logout: async () => {
        try {
          set({ authUser: null, token: null });
          toast.success("Hasta luego!");
        } catch (error) {
          toast.error(error.response.data.message);
        }
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        authUser: state.authUser,
        token: state.token,
      }),
    }
  )
);