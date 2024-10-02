import { useEffect, useState } from "react"
import useConversation from "../zustand/useConversation"
import toast from "react-hot-toast"

const useGetMessages = () => {
  const [loading, setLoading] = useState(false)
  const { messages, setMessages, selectedConversation } = useConversation()

  useEffect(() => {
    const getMessages = async () => {
      try {
        setLoading(true)

        const res = await fetch(`${import.meta.env.VITE_API_URL3}/messages/${selectedConversation._id}`, {
          method: 'GET',
          credentials: 'include',
        })

        const data = await res.json()

        if (data.error) throw new Error(data.error)

        setMessages(data)
      } catch (error) {
        toast.error(error.message)
      } finally {
        setLoading(false)
      }
    }

    if (selectedConversation?._id) {
      getMessages()
    }
  }, [selectedConversation._id, setMessages])

  return { messages, loading }
}

export default useGetMessages
