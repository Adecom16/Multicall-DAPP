import { formatUnits } from "ethers";
import { useState } from "react";
import useTokensAndBalance from "../src/hooks/useTokenAndBalance";
import "./App.css";

function App() {
  const [account, setAccount] = useState("");
  const { tokens, address } = useTokensAndBalance(account);

  console.log(tokens);

  const handleAccountChange = (e) => {
    setAccount(e.target.value);
  };

  return (
    <div className="container">
      <h1 class="main-heading">Wallet Explorer</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Paste an address"
          value={account}
          onChange={handleAccountChange}
          className="custom-input"
        />
        <div className="current-account">Current Account: {address}</div>
      </div>
      <h1 className="title">Balances in Token List</h1>
      <div className="token-list">
        {tokens.length === 0 ? (
          <div className="loading">Loading...</div>
        ) : (
          tokens.map((token) => (
            <div key={token.address} className="token-item">
              <img
                src={token.logoURI}
                alt="Token Logo"
                className="token-image"
              />
              <div className="token-info">
                <span className="token-name">{token.name}</span>
                <span className="token-symbol">{token.symbol}</span>
              </div>
              <div className="token-details">
                <p>Address: {token.address}</p>
                <p>Balance: {formatUnits(token.balance, token.decimals)}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
