import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { PaystackButton } from 'react-paystack';
import toast from 'react-hot-toast';
const LeaderPayment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { bankName, accountNumber, accountName, email, amount } = location.state; // Get passed data
  useEffect(() => {
    toast.success("you are to pay the sum of 1,000 before having access to this action" )
  }, [])

  const publicKey = `${import.meta.env.VITE_REACT_APP_PAYSTACK_PUBLIC_KEY}`;

  const componentProps = {
    email,
    amount: amount * 100, 
    publicKey,
    text: "Pay Now",
    onSuccess: (reference) => {
      console.log("Payment successful!", reference);
      navigate(-1); 
    },
    onClose: () => console.log("Payment closed"),
  };

  return (
    <div style={styles.container}>
      <h4 style={styles.heading}>Payment to: {accountName} ({bankName})</h4>
      <p style={styles.accountInfo}>Account Number: {accountNumber}</p>
      <div style={styles.buttonWrapper}>
        <PaystackButton {...componentProps} className="paystack-button" />
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    textAlign: 'center',
    backgroundColor: '#f7f7f7',
    borderRadius: '8px',
    maxWidth: '400px',
    margin: 'auto',
    marginTop: "130px",
    overflowY: "hidden",
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  },
  heading: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: '#333',
  },
  accountInfo: {
    fontSize: '1.1rem',
    marginBottom: '20px',
    color: '#555',
  },
  buttonWrapper: {
    display: 'inline-block',
    width: '40%',
    borderRadius: "35%",
    backgroundColor: "blue",
    color: "white"
  },
  payButton: {
    padding: '10px 20px',
    backgroundColor: '#28a745',
    color: '#fff',
    fontSize: '1.2rem',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    width: '100%',
    maxWidth: '200px',
    transition: 'background-color 0.3s ease',
  },
  payButtonHover: {
    backgroundColor: '#218838',
  }
};

export default LeaderPayment;
