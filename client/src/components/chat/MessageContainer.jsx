import { useAppStore } from "@/store"
import moment from "moment";
import { useEffect, useRef } from "react";

const MessageContainer = () => {
  const scrollRef = useRef();
  const { selectedChatType, selectedChatData, userInfo, selectedChatMessages } = useAppStore();

  // scrol down as new message come 
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedChatMessages]);


  const renderMessages = () => {
    let lastDate = null;
    return selectedChatMessages.map((message, index) => {
      const messageDate = moment(message.timestamp).format("YYYY-MM-DD");
      const showDate = messageDate !== lastDate;
      lastDate = messageDate;
      return (
        <div key={message._id + index}>
          {showDate && <div className="text-center text-gray-500 my-2">
            {moment(message.timestamp).format("LL")}
          </div>
          }

          {
            selectedChatType === 'contact' && renderDMMessages(message)
          }
        </div>
      );
    });
  };


  const renderDMMessages = (message) => (
    <div
      className={`flex flex-col
        ${message.sender === selectedChatData._id ? "items-start" : "items-end"}
      `}
    >
      {message.messageType === "text" && (
        <div
          className={`
            ${
              message.sender === selectedChatData._id
              ? "bg-[#2a2b33]/5 text-white/80 border-[#ffffff]/20"
                : "bg-[#8417ff]/5 text-[#8417ff] border-[#8417ff]/50"
            }
            border inline-block p-4 rounded my-1 max-w-[50%] break-words
          `}
        >
          {message.content}
        </div>
      )}
      <div className="text-xs text-gray-600">
        {moment(message.timestamp).format("LT")}
      </div>
    </div>
  );
  

  return (
    <div className="flex-1 overflow-y-auto scrollbar-hidden p-4 px-8 md:w-[65vw] lg:w-[70vw] xl:w-[80vw] w-full">
      {renderMessages()}
      <div ref={scrollRef} />
    </div>
  );
};

export default MessageContainer;
