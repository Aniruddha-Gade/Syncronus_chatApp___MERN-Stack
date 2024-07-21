export const HOST = import.meta.env.VITE_SERVER_URL


// auth Routes
export const authRoutes = `/api/auth`

export const SIGNUP_ROUTE = `${authRoutes}/signup`
export const LOGIN_ROUTE = `${authRoutes}/login`
export const GET_USERINFO_ROUTE = `${authRoutes}/user-info`
export const UPDATE_PROFILE_ROUTE = `${authRoutes}/update-profile`
export const LOGOUT_ROUTE = `${authRoutes}/logout`


// contacts Routes
export const contactsRoutes = `/api/contacts`

export const SEARCH_CONTACTS_ROUTE = `${contactsRoutes}/search-contacts`
export const GET_CONTACTS_FOR_DM_LIST_ROUTE = `${contactsRoutes}/get-contacts-for-dm`


// message Routes
export const messageRoutes = `/api/message`

export const GET_ALL_MESSAGES_ROUTE = `${messageRoutes}/get-all-messages`
