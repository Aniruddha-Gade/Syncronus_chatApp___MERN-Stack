import { useAppStore } from "@/store"

const MessageContainer = () => {

  const { selectedChatMessages, userInfo } = useAppStore()
  console.log({ selectedChatMessages })
  // console.log('userInfo._id = ', userInfo._id)
  // console.log('selectedChatMessages[0].sender_id = ', selectedChatMessages[0].sender)

  if (!selectedChatMessages.length) {
    console.log("messge Not found ")
  } else {
    if (userInfo._id === selectedChatMessages[0].sender) {
      console.log("Matched 🟢🟢🟢")
    }
    else {
      console.log("Not 🔴🔴🔴")
    }
  }

  return (
    <div className="flex-1 p-4 px-8 overflow-y-auto scrollbar-hidden w-full md:w-[65vw] lg:w-[70vw] xl:w-[80vw]">
      {
        !selectedChatMessages.length ? <div className="text-4xl bg-red-600 ">
          Message Not found
        </div>
          :
          <div className="flex gap-3 text-black flex-col">
            {
              selectedChatMessages?.map((message) => (
                <div key={message._id} className="bg-red-000 w-full " >
                  <div className={` ${userInfo._id === message.sender ?
                    'bg-green-700 flex justify-end' : 'bg-yellow-700 flex justify-start'} p-2 w-fi font-bold text-3xl `}

                  >
                    {message.content}
                  </div>
                </div>
              ))
            }
          </div>
      }

    </div>
  )
}

export default MessageContainer