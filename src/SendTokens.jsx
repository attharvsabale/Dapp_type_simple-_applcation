import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";

export function SendTokens() {
    const wallet = useWallet();
    const { connection } = useConnection();

    async function sendTokens() {
        let to = document.getElementById("to").value;
        let amount = document.getElementById("amount").value;
        const transaction = new Transaction();
        transaction.add(SystemProgram.transfer({
            fromPubkey: wallet.publicKey,
            toPubkey: new PublicKey(to),
            lamports: amount * LAMPORTS_PER_SOL,
        }));

        await wallet.sendTransaction(transaction, connection);
        alert("Sent " + amount + " SOL to " + to);
    }

    // Styles for the input fields
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

    // Styles for the send button
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

    // Button hover effect
    const buttonHoverStyle = {
        backgroundColor: '#FF4D01',
        transform: 'scale(1.05)',
    };

    return (
        <div style={{ marginTop: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <input
                id="to"
                type="text"
                placeholder="To"
                style={inputStyle}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
            <input
                id="amount"
                type="text"
                placeholder="Amount"
                style={inputStyle}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
            <button
                onClick={sendTokens}
                style={buttonStyle}
                onMouseOver={(e) => {
                    e.target.style.backgroundColor = buttonHoverStyle.backgroundColor;
                    e.target.style.transform = buttonHoverStyle.transform;
                }}
                onMouseOut={(e) => {
                    e.target.style.backgroundColor = buttonStyle.background;
                    e.target.style.transform = 'scale(1)';
                }}
            >
                Send
            </button>
        </div>
    );
}
