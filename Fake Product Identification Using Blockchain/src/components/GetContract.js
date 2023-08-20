import {useState } from 'react'

const GetContract = ({ account, central }) => {
    const [contractAddress, setContractAddress] = useState('');
    const [walletAddress, setWalletAddress] = useState('');

    function showErrorMessage(error) {
        alert(`An error occurred while connecting to MetaMask: ${error.message}`);
    }

    const handleInput1Change = (e) => {
        setWalletAddress(e.target.value);
      };

    const fetchContractAddress = async () => {
        try{
            if(walletAddress){
                const address = await central.getCompanySmartContractAddress(walletAddress);
                setContractAddress(address);
            }else{
                throw new Error('Enter wallet address');
            }
        }catch(error){
            console.log(error);
            showErrorMessage(error)
        }
    }

    return (
        <div className='GetContract'>
            <h3 className='Component__title'>Fetch Assosciated Contract Address</h3>
            <div className='Component__form'>
                <div className='form__content'>
                    <label  className='form__label'>Enter Company wallet address</label>
                    <input type="text" className='form__input' value={walletAddress} onChange={handleInput1Change} />
                </div>
                <button className='button__toggle form__button' onClick={fetchContractAddress}>Fetch Address</button>
                {contractAddress && <p>Result: {contractAddress}</p>}
            </div>
        </div>
    )
}

export default GetContract;