import { Link } from 'react-router-dom';

function Home() {
    return (
      <div className = 'Home'>
        <h3 className='Component__title'>Welcome, </h3>
        <div className='Home__description'>
          <p>
            Companies may register to receive a customized smart contract, which will serve
            as a registry of all products produced by the company. This smart contract will
            be made publicly accessible, allowing any individual to verify the authenticity
            of a product by checking its presence on the corresponding smart contract.<br/>
            <span className="Home__warning">Note: Only contract owners can add products to their contract</span>
          </p>
        </div>
          <div className='Home__instructions'>
            <ul>
              <li>To create a smart contract for your organization visit:  <Link className='Home__link' to="createcontract">Create Contract page</Link></li>
              <li>To fetch smart contract address linked to a wallet address visit: <Link className='Home__link' to="getcontract">Fetch Address page</Link></li>
              <li>To add products to your smart contract visit:  <Link className='Home__link' to="addproduct">Add Products page</Link></li>
              <li>To verify the authenticity of a product visit: <Link className='Home__link' to="verify">Verify Product page</Link></li>
            </ul>
          </div>
      </div>
    );
  }
  
export default Home;