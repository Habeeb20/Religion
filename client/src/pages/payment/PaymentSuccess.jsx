import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {useLocation} from 'react-router-dom';


function PaymentSuccess() {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const reference = query.get('reference');
    const [paymentStatus, setPaymentStatus] = useState('');


    useEffect(() => {
        const verifyPayment = async () => {
            try {
                const { data } = await axios.post(`${import.meta.env.VITE_API_URL4}/payment/verify`, { reference });
                setPaymentStatus(data.data.status);
            } catch (error) {
                console.error('Payment verification failed', error);
            }
        };

        if (reference) {
            verifyPayment();
        }
    }, [reference]);
  return (
    <div>
        <h2>Payment Status</h2>
        <p>{paymentStatus}</p>
    </div>
  )
}

export default PaymentSuccess
