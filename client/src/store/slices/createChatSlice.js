export const createChatSlice = (set, get) => ({
    selectedChatType: undefined,
    selectedChatData: undefined,
    selectedChatMessages: [],
    directMessagesContacts: [],

    setSelectedChatType: (selectedChatType) => set({ selectedChatType }),
    setSelectedChatData: (selectedChatData) => set({ selectedChatData }),
    setselectedChatMessages: (selectedChatMessages) => set({ selectedChatMessages }),
    setDirectMessagesContacts: (directMessagesContacts) => set({ directMessagesContacts }),
    closeChat: () => set({
        selectedChatType: undefined,
        selectedChatData: undefined,
        selectedChatMessages: []
    }),
    addMessage: (message) => {
        const selectedChatType = get().selectedChatType
        const selectedChatMessages = get().selectedChatMessages

        set({
            selectedChatMessages: [
                ...selectedChatMessages,
                {
                    ...message,
                    recipient: selectedChatType === 'channel'
                        ? message.recipient
                        : message.recipient._id,
                    sender: selectedChatType === 'channel'
                        ? message.sender
                        : message.sender._id,
                }
            ]
        })
    }
});