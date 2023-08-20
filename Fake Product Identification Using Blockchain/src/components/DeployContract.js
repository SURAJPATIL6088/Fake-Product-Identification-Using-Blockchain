import React, {useState } from 'react'

const DeployContract = ({account, central}) => {

    const [contractAddress, setContractAddress] = useState(null);
    const [loading, setLoading] = useState(false);

    const [updateStatus, setUpdateStatus] = useState(false);

    function showErrorMessage(error) {
        setLoading(false);
        alert(`An error occurred while connecting to MetaMask: ${error.message}`);
    }


    const fetchContractAddress = async () => {
        try{
            if(account){
                const address = await central.getCompanySmartContractAddress(account);
                setContractAddress(address);
            }else{
                throw Error('Please check that you are connected to a wallet');
            }
        }catch(error){
            showErrorMessage(error);
        }
    }


    const createContract = async() =>{
        try{
            if(account){
                setUpdateStatus("Validate the transaction through your wallet");
                let transaction = await central.createSmartContract();
                setLoading(true);
                await transaction.wait();
                await fetchContractAddress();
                setUpdateStatus("Contract created \n Address: ");
                setLoading(false);
            }else{
                throw Error('Please check that you are connected to a wallet');
            }
        }catch(error){
            setLoading(false);
            showErrorMessage(error);
        }
        
    }


    return (
        <div className='DeployContract'>
            <h3 className='Component__title'>Create My Contract</h3>
            <button className='button__toggle form__button' onClick={createContract}>Create Contract</button>
            {loading  ? (
                <div>Transaction in progress... It can take a few minutes </div>
                ) : ( 
                <p>{updateStatus}{contractAddress}</p>
            )}
        </div>
    )
}

export default DeployContract;