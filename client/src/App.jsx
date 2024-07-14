import { Navigate, Route, Routes } from "react-router-dom"
import Auth from "./pages/auth"
import Profile from "./pages/profile"
import Chat from "./pages/chat"
import { useAppStore } from "./store"
import { useEffect, useState } from "react"
import { apiClient } from "./lib/api-client"
import { GET_USERINFO_ROUTE } from "./utils/constants"


// private route
const PrivateRoute = ({ children }) => {
  const { userInfo } = useAppStore()
  // /console.log({ userInfo })
  return userInfo ? children : <Navigate to='/auth' />
}

// Auth route
const AuthRoute = ({ children }) => {
  const { userInfo } = useAppStore()
  return userInfo ? <Navigate to='/chat' /> : children
}



function App() {
  const { userInfo, setUserInfo } = useAppStore()
  const [loading, setLoading] = useState(false)
  // console.log("userInfo from apppp = ",userInfo)

  // get user data
  useEffect(() => {
    const getUserData = async () => {
      setLoading(true)
      console.log("userInfo from apppp = ", userInfo)
      try {
        const response = await apiClient.get(GET_USERINFO_ROUTE,
          { withCredentials: true }
        )
        console.log("GET_USERINFO_ROUTE RESPONSE => ", response)
        // save user data to store and local-storage 
        if (response.data.success && response.data.user._id) {
          setUserInfo(response.data.user)
          localStorage.setItem("userInfo", JSON.stringify(response.data?.user));
        }
      } catch (error) {
        console.log('GET_USERINFO_ROUTE ERROR => ', error)
      }
      finally {
        setLoading(false)
      }
    }

    if (!userInfo) {
      console.log("calling again to find info")
      getUserData()
    }
    else {
      setLoading(false)
    }
  }, [userInfo, setUserInfo])


  if (loading) {
    return (<div className='text-7xl text-red-600 underline animate-bounce'>
      LOADING
    </div>)
  }

  return (
    <div className='overflow-auto  '>

      <Routes>
        <Route path='/auth' element={
          <AuthRoute>
            <Auth />
          </AuthRoute>
        }
        />

        <Route path='/profile' element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }

        />
        <Route path='/chat' element={
          <PrivateRoute>
            <Chat />
          </PrivateRoute>
        }
        />


        <Route path='*' element={<Navigate to='/auth' />} />
      </Routes>

    </div>
  )
}

export default App
