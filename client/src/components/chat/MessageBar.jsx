import EmojiPicker from "emoji-picker-react"
import { useEffect, useRef, useState } from "react"
import { GrAttachment } from 'react-icons/gr'
import { IoSend } from "react-icons/io5"
import { RiEmojiStickerLine } from "react-icons/ri"

const MessageBar = () => {

    const emojiPickerRef = useRef(null)
    const [message, setMessage] = useState('')
    const [emojiPickerOpen, setEmojiPickerOpen] = useState(false)

    // add emoji in input
    const handleAddEmoji = (emoji) => {
        setMessage((msg) => msg + emoji.emoji)
    }


    // send message 
    const handleSendMessage = async () => {

    }

    // close emoji picker , if outside click
    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (e.target.id !== 'emoji-open') {

                if (emojiPickerRef.current && !emojiPickerRef.current.contains(e.target)) {
                    setEmojiPickerOpen(false)
                }
            }
        }
        document.addEventListener('mousedown', handleOutsideClick)
        return () => document.removeEventListener('mousedown', handleOutsideClick)
    }, [emojiPickerRef])

    // console.log("emojiPickerOpen = ", emojiPickerOpen)


    return (
        <div className="bg-[#1c1d25] h-[10vh] px-8 mb-6 flex-center gap-6 ">
            <div className="bg-[#2a2b33] flex flex-1 rounded-md items-center gap-5 pr-5 ">
                {/* messgae input */}
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

                {/* emoji button */}
                <div className="relative">
                    <button
                        onClick={() => setEmojiPickerOpen(!emojiPickerOpen)}
                        className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all"
                    >
                        <RiEmojiStickerLine className='text-2xl' />
                    </button>
                    {/* emoji picker */}
                    <div className="absolute bottom-16 right-0" ref={emojiPickerRef} >
                        <EmojiPicker
                            theme='dark'
                            open={emojiPickerOpen}
                            onEmojiClick={handleAddEmoji}
                            autoFocusSearch={false}
                        />
                    </div>
                </div>
            </div>

            {/* send message button */}
            <button className="bg-[#8417ff] hover:bg-[#741bda] flex-center p-5 rounded-md focus:border-none focus:outline-none
                         active:scale-90 duration-300 transition-all">
                <IoSend
                    onClick={handleSendMessage}
                    className='text-2xl'
                />
            </button>
        </div>
    )
}

export default MessageBar