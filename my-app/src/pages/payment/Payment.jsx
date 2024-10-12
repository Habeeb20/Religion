import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Payment = () => {
    const location = useLocation();
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [amount, setAmount] = useState('20000');

    useEffect(() => {
        if (location.state && location.state.amount) {
            setAmount(location.state.amount);
        }
    }, [location.state]);

    const handlePayment = async () => {
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL4}/paystack/pay`, { email, amount });
            window.location.href = data.data.authorization_url;
            // navigate('/paymentverification')
        } catch (error) {
            console.error("payment initiation failed",  error.response ? error.response.data : error.message);
        }
    };

    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50">
                <div className="p-8 bg-white rounded-lg shadow-md w-full max-w-md">
                    <h2 className="text-2xl font-semibold text-blue-800 mb-6">Paystack Payment</h2>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 mb-4 border border-blue-500 rounded-lg focus:outline-none focus:border-green-700"
                        required
                    />
                    <input
                        type="number"
                        placeholder="Amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full px-4 py-2 mb-6 border border-blue-500 rounded-lg focus:outline-none focus:border-green-700"
                        required
                    />
                    <button
                        onClick={handlePayment}
                        className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200"
                    >
                        Pay
                    </button>
                </div>
            </div>
        </>
    );
};

export default Payment;
