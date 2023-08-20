import { ethers } from 'ethers'
import './app.css';
import { Link } from 'react-router-dom';


const Navigation = ({ account, setAccount }) => {

    function showErrorMessage(error) {
        alert(`An error occurred while connecting to MetaMask: ${error.message}`);
      }
      
    
    const connectHandler = async () => {
        try{
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const account = ethers.utils.getAddress(accounts[0])
            setAccount(account);
        }catch(error){
            console.log(error);
            showErrorMessage(error)
        }
        
    }

    

    return (
        <nav className='nav container'>
            <a href="/" className="nav__logo">Product Verifier</a>
            <div className='nav__menu'>
                <ul className='nav__list grid'>
                    <li className='nav__item'>
                        <Link className='nav__link' to="/">Home</Link>
                    </li>
                    <li className='nav__item'>
                        <Link className='nav__link' to="createcontract">CreateContract</Link>
                    </li>
                    <li className='nav__item'>
                        <Link className='nav__link' to="getcontract">FetchAddress</Link>
                    </li>
                    <li className='nav__item'>
                        <Link className='nav__link' to="addproduct">AddProducts</Link>
                    </li>
                    <li className='nav__item'>
                        <Link className='nav__link' to="verify">VerifyProduct</Link>
                    </li>
                    <li>
                        {account ? (
                            <>
                                <button
                                    type="button"
                                    className='button__toggle'
                                >
                                    {account.slice(0, 6) + '...' + account.slice(38, 42)}
                                </button>
                            </>
                        ) : (
                                <button
                                    type="button"
                                    className='button__toggle'
                                    onClick={connectHandler}
                                >
                                    Connect
                                </button>
                        )
                      }
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navigation;