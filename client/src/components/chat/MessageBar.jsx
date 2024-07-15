import { useState } from "react"
import { GrAttachment } from 'react-icons/gr'
import { IoSend } from "react-icons/io5"
import { RiEmojiStickerLine } from "react-icons/ri"

const MessageBar = () => {

    const [message, setMessage] = useState('')

    const handleSendMessage = async () => {

    }

    return (
        <div className="bg-[#1c1d25] h-[10vh] px-8 mb-6 flex-center gap-6 ">
            <div className="bg-[#2a2b33] flex flex-1 rounded-md items-center gap-5 pr-5 ">
                <input
                    type='text'
                    placeholder="Enter a message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="bg-transparent p-5 flex-1 rounded-md focus:border-none focus:outline-none "
                />
                <button className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all">
                    <GrAttachment className='text-2xl' />
                </button>
                <div className="relative">
                    <button className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all">
                        <RiEmojiStickerLine className='text-2xl' />
                    </button>
                    <div className="absolute bottom-16 right-0"></div>
                </div>
            </div>
            <button className="bg-[#8417ff] hover:bg-[#741bda] flex-center p-5 rounded-md text-neutral-500 focus:border-none focus:outline-none
                        focus:text-white active:scale-75 duration-300 transition-all">
                <IoSend
                    onClick={handleSendMessage}
                    className='text-2xl'
                />
            </button>
        </div>
    )
}

export default MessageBar