import { getColor } from "@/lib/utils"
import { useAppStore } from "@/store"
import { Avatar, AvatarImage } from "@radix-ui/react-avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"

import { FiEdit2 } from 'react-icons/fi'
import { useNavigate } from "react-router-dom"
import { IoPowerSharp } from "react-icons/io5"
import { apiClient } from "@/lib/api-client"
import { LOGOUT_ROUTE } from "@/utils/constants"

const ProfileInfo = () => {

  const { userInfo, setUserInfo, token, setToken } = useAppStore()
  const navigate = useNavigate()


  // handle Logout
  const handleLogout = async () => {
    try {
      const response = await apiClient.post(LOGOUT_ROUTE, { token },
        { withCredentials: true }
      )
      console.log("LOGOUT_ROUTE API RESPONSE => ", response)

      if (response.data.success) {
        // clear userinfo from store
        setUserInfo(null)
        setToken(null)

        // clear local storage
        localStorage.removeItem("userInfo")
        localStorage.removeItem("token")
      }

    } catch (error) {
      console.log("LOGOUT_ROUTE API ERROR", error)
    }
  }

  return (
    <div className="absolute bottom-0 h-16 flex-between px-2 w-full bg-[#2a2b33]">
      <div className="flex-center gap-3">
        <div className="w-12 h-12 relative">
          <Avatar className="w-12 h-12 rounded-full overflow-hidden">
            {userInfo.image ? <AvatarImage
              src={userInfo.image}
              className="bg-black w-full h-full object-cover"
              alt='profile' />
              : <div
                className={`w-12 h-12 text-lg flex-center uppercase font-bold border-[1px] rounded-full 
              ${getColor(userInfo.selectedColor)}`}
              >
                {
                  userInfo.firstName ? userInfo.firstName.split("").shift()
                    : userInfo.email.split("").shift()
                }
              </div>
            }
          </Avatar>
        </div>

        {/* user first/last name */}
        <div>
          <p>
            {userInfo.firstName && userInfo.lastName ? `${userInfo.firstName} ${userInfo.lastName}` : ''}
          </p>
          <p className="text-neutral-500 text-sm">{userInfo.email}</p>
        </div>
      </div>

      <div className="flex gap-5">
        {/* edit profile button */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger onClick={() => navigate('/profile')}>
              <FiEdit2 className="text-purple-500 text-xl font-medium" />
            </TooltipTrigger>
            <TooltipContent className="bg-[#1c1b1e] border-none text-white " >
              <p>Edit Profile</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* logout button */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger onClick={handleLogout}>
              <IoPowerSharp className="text-purple-500 text-xl font-medium" />
            </TooltipTrigger>
            <TooltipContent className="bg-[#1c1b1e] border-none text-white " >
              <p>Edit Profile</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

      </div>
    </div>
  )
}

export default ProfileInfo