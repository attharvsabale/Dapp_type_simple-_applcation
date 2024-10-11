import { ed25519 } from '@noble/curves/ed25519';
import { useWallet } from '@solana/wallet-adapter-react';
import bs58 from 'bs58';
import React from 'react';

export function SignMessage() {
    const { publicKey, signMessage } = useWallet();

    async function onClick() {
        if (!publicKey) throw new Error('Wallet not connected!');
        if (!signMessage) throw new Error('Wallet does not support message signing!');
        
        const message = document.getElementById("message").value;
        const encodedMessage = new TextEncoder().encode(message);
        const signature = await signMessage(encodedMessage);

        if (!ed25519.verify(signature, encodedMessage, publicKey.toBytes())) throw new Error('Message signature invalid!');
        alert('success', `Message signature: ${bs58.encode(signature)}`);
    };

    // Styles for the input field
    const inputStyle = {
        width: '100%',
        maxWidth: '300px',
        padding: '12px 15px',
        borderRadius: '30px',
        border: '2px solid #FFD700',
        outline: 'none',
        fontSize: '16px',
        margin: '10px 0',
        color: '#333',
        background: '#FFFFFF',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
    };

    // Change border color and box shadow on focus
    const handleFocus = (e) => {
        e.target.style.borderColor = '#FFB701';
        e.target.style.boxShadow = '0 4px 15px rgba(255, 183, 1, 0.5)';
    };

    const handleBlur = (e) => {
        e.target.style.borderColor = '#FFD700';
        e.target.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.2)';
    };

    // Button styles
    const buttonStyle = {
        background: '#dadada',
        color: 'black',
        padding: '12px 20px',
        fontSize: '16px',
        borderRadius: '30px',
        border: 'none',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease, transform 0.3s ease',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
        width: '100%',
        maxWidth: '150px',
        marginTop: '15px',
    };

    return (
        <div style={{ marginTop: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <input
                id="message"
                type="text"
                placeholder="Message"
                style={inputStyle}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
            <button
                onClick={onClick}
                style={buttonStyle}
                onMouseOver={(e) => {
                    e.target.style.backgroundColor = '#FF4D66'; // Change color on hover
                    e.target.style.transform = 'scale(1.05)'; // Slightly enlarge
                }}
                onMouseOut={(e) => {
                    e.target.style.backgroundColor = '#dadada'; // Revert color
                    e.target.style.transform = 'scale(1)'; // Revert size
                }}
            >
                Sign Message
            </button>
        </div>
    );
}
