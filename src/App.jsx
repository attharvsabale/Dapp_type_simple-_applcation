import React, { useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';

import '@solana/wallet-adapter-react-ui/styles.css';
import { SendTokens } from './SendTokens';
import { SignMessage } from './SignMessage';

function App() {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  // Container style remains simple
  const containerStyle = {
    background: 'linear-gradient(145deg, #E2B5E3, #8E57FD)', // Gradient background for the container
    borderRadius: '15px',
    padding: '40px',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.2)',
    maxWidth: '550px',
    margin: 'auto',
    width: '100%',
    textAlign: 'center',
    color: 'white',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  };

  // Button container for alignment
  const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '30px',
    padding: '0 10px',
  };

  // Glassmorphism effect for buttons
  const glassButtonStyle = {
    background: 'rgba(255, 255, 255, 0.1)', // Semi-transparent for glass effect
    backdropFilter: 'blur(10px)', // Blurred background for frosted look
    border: '1px solid rgba(255, 255, 255, 0.2)', // Slightly transparent border
    color: 'white',
    padding: '12px 25px',
    fontSize: '16px',
    fontWeight: '600',
    borderRadius: '30px',
    cursor: 'pointer',
    transition: 'transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)', // Soft shadow for depth
  };

  // Hover effect for WalletMultiButton
  const multiButtonHoverStyle = {
    backgroundColor: 'rgba(255, 77, 1, 0.7)', // Hover with more opacity and different color
    boxShadow: '0 8px 20px rgba(255, 77, 1, 0.5)', // Intense shadow on hover
    transform: 'scale(1.05)', // Slight scaling effect
  };

  // Hover effect for WalletDisconnectButton
  const disconnectButtonHoverStyle = {
    backgroundColor: 'rgba(31, 142, 241, 0.7)', // Hover with more opacity and different color
    boxShadow: '0 8px 20px rgba(31, 142, 241, 0.5)', // Intense shadow on hover
    transform: 'scale(1.05)', // Slight scaling effect
  };

  return (
      <ConnectionProvider endpoint={endpoint}>
          <WalletProvider wallets={[]} autoConnect>
              <WalletModalProvider>
                <div style={containerStyle}>
                  <h2 style={{ marginBottom: '30px' }}>Solana Wallet</h2>
                  
                  <div style={buttonContainerStyle}>
                    {/* WalletMultiButton with glassmorphism effect and hover */}
                    <WalletMultiButton 
                      style={glassButtonStyle} 
                      onMouseOver={(e) => {
                        e.target.style.backgroundColor = multiButtonHoverStyle.backgroundColor; 
                        e.target.style.transform = multiButtonHoverStyle.transform;
                        e.target.style.boxShadow = multiButtonHoverStyle.boxShadow;
                      }}
                      onMouseOut={(e) => {
                        e.target.style.backgroundColor = glassButtonStyle.background;
                        e.target.style.transform = 'scale(1)';
                        e.target.style.boxShadow = glassButtonStyle.boxShadow;
                      }}
                    />
                    
                    {/* WalletDisconnectButton with glassmorphism effect and hover */}
                    <WalletDisconnectButton 
                      style={glassButtonStyle} 
                      onMouseOver={(e) => {
                        e.target.style.backgroundColor = disconnectButtonHoverStyle.backgroundColor;
                        e.target.style.transform = disconnectButtonHoverStyle.transform;
                        e.target.style.boxShadow = disconnectButtonHoverStyle.boxShadow;
                      }}
                      onMouseOut={(e) => {
                        e.target.style.backgroundColor = glassButtonStyle.background;
                        e.target.style.transform = 'scale(1)';
                        e.target.style.boxShadow = glassButtonStyle.boxShadow;
                      }}
                    />
                  </div>

                  <div style={{ marginTop: '20px' }}>
                    <SignMessage />
                    <SendTokens />
                  </div>
                </div>
              </WalletModalProvider>
          </WalletProvider>
      </ConnectionProvider>
  );
}

export default App;
