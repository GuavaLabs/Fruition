const connectWallet = async() =>{

  await window.ethereum.request({
    method: "wallet_requestPermissions",
    params: [
      {
        eth_accounts: {},
      },
    ],
  });

  // waits for account address from metamask
  const account = await ethereum.request({ method: "eth_requestAccounts" });
  // saves address in local storage
  localStorage.setItem("address", account[0]);

  console.log(localStorage)
}
