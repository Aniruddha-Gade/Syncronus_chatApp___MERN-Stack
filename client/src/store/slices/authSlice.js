export const createAuthSlice = (set) => (
    {
        userInfo: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null,
        setUserInfo: (userInfo) => set({ userInfo }),
    }

)