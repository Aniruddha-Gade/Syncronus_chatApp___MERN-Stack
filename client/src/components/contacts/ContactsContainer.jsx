import Title from "@/components/common/Title";
import ProfileInfo from "./ProfileInfo";
import NewDM from "./NewDM";
import { useEffect } from "react";
import { apiClient } from "@/lib/api-client";
import { GET_CONTACTS_FOR_DM_LIST_ROUTE } from "@/utils/constants";
import { useAppStore } from "@/store";
import ContactsList from "../common/ContactsList";
import CreateChannel from "./CreateChannel";

const ContactsContainer = () => {

  const { token, directMessagesContacts, setDirectMessagesContacts, channels } = useAppStore()

  useEffect(() => {
    try {
      const getAllContacts = async () => {
        const res = await apiClient.post(GET_CONTACTS_FOR_DM_LIST_ROUTE,
          { token, },
          { withCredentials: true }
        )
        console.log("GET_CONTACTS_FOR_DM_LIST_ROUTE RESPONSE 🟢🟢🟢 => ", res)
        if (res.data.success) {
          setDirectMessagesContacts(res.data.contacts)
        }
      }

      getAllContacts()
    } catch (error) {
      console.log("GET_CONTACTS_FOR_DM_LIST_ROUTE error 🔴🔴🔴 = ", error)
    }
  }, [token, setDirectMessagesContacts])


  return (
    <div className="relative w-full md:w-[35vw] lg:w-[30vw] xl:w-[20vw] bg-[#1b1c24] border-r-2 border-[#2f303b] ">
      <div className="">
        <Logo />
      </div>
      <div className="my-5">
        <div className="flex-between pr-10">
          <Title text='Direct Messages' />
          <NewDM />
        </div>
        <div className="overflow-y-auto max-h-[38vh] scrollbar-hidden">
          <ContactsList contacts={directMessagesContacts} />
        </div>
      </div>

      <div className="my-5">
        <div className="flex-between pr-10">
          <Title text='Channels' />
          <CreateChannel />
        </div>
        <div className="overflow-y-auto max-h-[38vh] scrollbar-hidden">
          <ContactsList contacts={channels} isChannel={true} />
        </div>
      </div>

      <ProfileInfo />
    </div>
  )
}

export default ContactsContainer

const Logo = () => {
  return (
    <div className="flex p-5 justify-start items-center gap-2">
      <svg
        id="logo-38"
        width="78"
        height="32"
        viewBox="0 0 78 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {" "}
        <path
          d="M55.5 0H77.5L58.5 32H36.5L55.5 0Z"
          className="ccustom"
          fill="#8338ec"
        ></path>{" "}
        <path
          d="M35.5 0H51.5L32.5 32H16.5L35.5 0Z"
          className="ccompli1"
          fill="#975aed"
        ></path>{" "}
        <path
          d="M19.5 0H31.5L12.5 32H0.5L19.5 0Z"
          className="ccompli2"
          fill="#a16ee8"
        ></path>{" "}
      </svg>
      <span className="text-3xl font-semibold text-white">Syncronus</span>
    </div>
  );
};

