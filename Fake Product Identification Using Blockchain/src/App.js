import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';



// Components
import Navigation from './components/Navigation';
import Home from './components/Home';
import VerifyProduct from './components/VerifyProduct';
import AddProduct from './components/AddProduct';
import GetContract from './components/GetContract'

// ABIs
import CentralABI from './abis/Cental_ABI.json';

// Config
import config from './config.json';
import DeployContract from './components/DeployContract';


// const Home = () => <div>Home Page</div>;
// const About = () => <div>About Page</div>;
// const Contact = () => <div>Contact Page</div>;


function App() {
  const [provider, setProvider] = useState(null);
  const [central, setCentral] = useState(null);

  const [account, setAccount] = useState(null);

  function showErrorMessage(error) {
    alert(`An error occurred while connecting to MetaMask: ${error.message}  '\n'  'Check if you have metamask wallet installed'`);
  }

  const loadBlockchainData = async () => {
    try{
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = await provider.getSigner();
      setProvider(provider);
      const network = await provider.getNetwork();

      const central = new ethers.Contract(config[network.chainId].central.address, CentralABI, signer);
      setCentral(central);
    }catch(error){
      console.log(error);
      showErrorMessage(error);
    }

  }

  useEffect(() => {
    loadBlockchainData()
  },)

  return (
    <Router>
      <Navigation account={account} provider={provider} central={central} setAccount={setAccount} />
      <Routes>

        <Route path="/" element={ <Home/> } />
        <Route 
          path="/createcontract" 
          element = {<DeployContract  account={account} provider={provider} central={central} />}
        />
        <Route 
          path="/getcontract" 
          element = {<GetContract  account={account} provider={provider} central={central} />}
        />
        <Route 
          path="/addproduct"  
          element = {<AddProduct account={account} provider={provider} central={central} />}
        />

        <Route 
          path="/verify" 
          element = {<VerifyProduct  account={account} provider={provider} central={central} />}
        />
      </Routes>
    </Router>
  );
}



export default App;