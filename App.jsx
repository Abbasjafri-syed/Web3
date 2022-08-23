
import './App.css';
import { useState } from 'react';
import Web3 from 'web3';
import contractData from "./abifile.json"


function App() {
  const [myWeb3, setMyWeb]= useState([])
  const [wallet, setWallet]= useState("Connect Wallet")

  const connectWallet = async () => {
    if (window.ethereum) {
      const myWeb3 = await new Web3(window.ethereum)
      console.log(myWeb3);
      await window.ethereum.enable()
      .then((a) => {
        console.log(a);
        setMyWeb(myWeb3)
        setWallet(a[0])
        loadWeb3(myWeb3)
      })
      .catch(e => {
        console.log(e);
      })
    } else {
      alert("Install Metamask")
    }
  }

  async function loadWeb3(myWeb33) {
    const myContract =  await new myWeb33.eth.Contract(contractData.abi, contractData.address)
    console.log(myContract);

    console.log(await myContract.methods.totalSupply().call());
    console.log(await myContract.methods.balanceOf("Wallet Address").call());
    console.log(await myContract.methods.transfer("receiver Address", "token amount with decimals").send({from: "Sender Addres"}));
  }

  return (
    <div className="">
      <button type='button' onClick={()=>{connectWallet()}}> {wallet} </button>
 
    </div>
  );
}

export default App;
