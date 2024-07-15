export const HOST = import.meta.env.VITE_SERVER_URL

export const authRoutes = `/api/auth`

export const SIGNUP_ROUTE = `${authRoutes}/signup`
export const LOGIN_ROUTE = `${authRoutes}/login`
export const GET_USERINFO_ROUTE = `${authRoutes}/user-info`
export const UPDATE_PROFILE_ROUTE = `${authRoutes}/update-profile`
export const LOGOUT_ROUTE = `${authRoutes}/logout`