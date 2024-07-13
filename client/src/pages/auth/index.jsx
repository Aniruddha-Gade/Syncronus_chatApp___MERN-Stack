
import victoryEmoji from '@/assets/victory.svg'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { apiClient } from '@/lib/api-client'
import { useAppStore } from '@/store'
import { LOGIN_ROUTE, SIGNUP_ROUTE } from '@/utils/constants'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const Auth = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const navigate = useNavigate()
  const { setUserInfo } = useAppStore()

  const validateSignup = () => {
    if (!email.length) {
      toast.error("Email is required")
      return false
    }
    if (!password.length) {
      toast.error("Password is required")
      return false
    }
    if (password !== confirmPassword) {
      toast.error("Password & Confirm Password should be same")
      return false
    }
    return true;
  }
  const validateLogin = () => {
    if (!email.length) {
      toast.error("Email is required")
      return false
    }
    if (!password.length) {
      toast.error("Password is required")
      return false
    }
    return true;
  }

  const handleLogin = async () => {
    if (validateLogin()) {
      const response = await apiClient.post(LOGIN_ROUTE,
        { email, password },
        { withCredentials: true } // to receive cookie
      )
      console.log("LOGIN_API_RESPONSE => ", response)

      if (response.data.user?._id) {
        setUserInfo(response.data.user)
        if (response.user?.profileSetup) {
          navigate("/chat")
        }
        else navigate("/profile")
      }
    }

  }
  const handleSignup = async () => {
    if (validateSignup()) {
      const response = await apiClient.post(SIGNUP_ROUTE,
        { email, password },
        { withCredentials: true } // to receive cookie
      )
      console.log("SIGNUP_API_RESPONSE => ", response)
      if (response.data.success) {
        setUserInfo(response.data.user)
        navigate("/profile")
      }
    }
  }


  return (
    <div className="flex-center h-screen w-screen ">
      <div className="h-[80vh] w-[80vw] md:w-[90vw] lg:w-[70vw] xl:w-[60vw] bg-white border-2 border-white text-opacity-90 shadow-2xl rounded-3xl grid xl:grid-cols-2">

        <div className="flex-center flex-col gap-10">
          <div className="flex-center mt-10 flex-col ">
            <div className="flex-center">
              <h1 className="text-5xl md:text-6xl font-bold">
                Welcome
              </h1>
              <img src={victoryEmoji} className="w-[100px]" alt='Victory Emoji' />
            </div>
            <p className='font-medium text-center'>Fill the form to get started with best chat app</p>
          </div>

          {/* Tabs - login/signup */}
          <div className='flex-center w-full '>
            <Tabs className='w-3/4' defaultValue='login'>
              <TabsList className='bg-transparent w-full rounded-none   '>
                <div className='flex '>
                  <TabsTrigger value="login"
                    className='data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300'
                  >
                    login
                  </TabsTrigger>
                  <TabsTrigger value="signup"
                    className='data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300'
                  >
                    Signup
                  </TabsTrigger>
                </div>

                {/* login content */}
                <TabsContent className='flex flex-col gap-5 mt-10' value='login'  >
                  <Input
                    type='email'
                    placeholder='Enter email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='rounded-full p-6'
                  />
                  <Input
                    type='password'
                    placeholder='Enter password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='rounded-full p-6'
                  />
                  <Button className='rounded-full p-6 ' onClick={handleLogin}>
                    Login
                  </Button>
                </TabsContent>

                {/* signup content */}
                <TabsContent className='flex flex-col gap-5 ' value='signup'>
                  <Input
                    type='email'
                    placeholder='Enter email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='rounded-full p-6'
                  />
                  <Input
                    type='password'
                    placeholder='Enter password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='rounded-full p-6'
                  />
                  <Input
                    type='password'
                    placeholder='Enter confirm password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className='rounded-full p-6'
                  />
                  <Button className='rounded-full p-6' onClick={handleSignup}>
                    Signup
                  </Button>
                </TabsContent>
              </TabsList>
            </Tabs>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Auth