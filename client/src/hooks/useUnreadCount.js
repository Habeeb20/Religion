import { useState, useEffect } from "react";


const useUnreadCount = (userId) => {
    const[unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        const fetchUnreadCount = async() => {
            const response = await fetch(`${import.meta.env.VITE_API_URL3}/messages/users/${userId}unread-messages`);
            const data = await response.json()
                setUnreadCount(data.count)
            
        };
        fetchUnreadCount();
    }, [userId])

    return unreadCount;
}

export default useUnreadCount