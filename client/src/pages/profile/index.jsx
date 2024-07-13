import { useAppStore } from "@/store"

const Profile = () => {

  const { userInfo } = useAppStore()
  return (
    <div className="text-5xl ">
      _id : {userInfo._id} <br />
      email : {userInfo.email}
    </div>
  )
}

export default Profile