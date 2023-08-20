import { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import './app.css';

const AddProduct = ({account, central}) => {

    const [companyContractAddress, setCompanyContractAddress] = useState('');
    const [productId, setProductId] = useState('');
    const [manufactureId, setManufactureId] = useState('');
    const [productName, setProductName] = useState('');
    const [productBrand, setProductBrand] = useState('');

    const [loading, setLoading] = useState(false);

    const [updateStatus, setUpdateStatus] = useState(false);
    
    function showErrorMessage(error) {
        setLoading(false);
        alert(`An error occurred while connecting to MetaMask: ${error.message}`);
    }

    const handleInput1Change = (e) => {
        setCompanyContractAddress(e.target.value);
      };
    
      const handleInput2Change = (e) => {
        setProductId(e.target.value);
      };

      const handleInput3Change = (e) => {
        setManufactureId(e.target.value);
      };

      const handleInput4Change = (e) => {
        setProductName(e.target.value);
      };

      const handleInput5Change = (e) => {
        setProductBrand(e.target.value);
      };


    const [value, setUrl] = useState('');
        const qrRef = useRef();
        const downloadQRCode = (e) => {
          e.preventDefault();
          let canvas = qrRef.current.querySelector("canvas");
          let image = canvas.toDataURL("image/png");
          let anchor = document.createElement("a");
          anchor.href = image;
          anchor.download = `qr-code.png`;
          document.body.appendChild(anchor);
          anchor.click();
          document.body.removeChild(anchor);
          setUrl("");
        };
        const qrCodeEncoder = (e) => {
          setUrl(e.target.value);
        };
      
        const qrcode = (
          <QRCodeCanvas
            id="qrCode"
            value={value}
            size={300}
            bgColor={"#ffffff"}
            level={"H"}
          />
        );


    const addProducts = async () => {
        try{
            const list = JSON.parse("[" + productId + "]");
            if(account && companyContractAddress && list){
                setUpdateStatus("Validate the transaction through your wallet");
                let transaction = await central.addproduct(account, companyContractAddress, list);
                setLoading(true);
                await transaction.wait();
                setUpdateStatus("Products Added");
                setLoading(false);
            }else{
                throw Error('Please check that you are connected to a wallet,and that you have provided all the fields');
            }
        }catch(error){
            console.log(error);
            showErrorMessage(error);
        }
        
    }


        


    return (
        <div className='AddProduct'>
            <h3 className='Component__title'>Add Products</h3>
            <div className='Component__form'>
                <div className='form__content'>
                    <label className='form__label'>Enter Company contract address</label>
                    <input type="text" className='form__input' value={companyContractAddress} onChange={handleInput1Change} />
                </div>
                <div className='form__content'>
                    <label className='form__label'>Enter Product id</label>
                    <input type="text"  className='form__input' value={productId} onChange={handleInput2Change} />
                </div>
                <div className='form__content'>
                    <label className='form__label'>Enter Manufacture id</label>
                    <input type="text"  className='form__input' value={manufactureId} onChange={handleInput3Change} />
                </div>
                <div className='form__content'>
                    <label className='form__label'>Enter Product Name</label>
                    <input type="text"  className='form__input' value={productName} onChange={handleInput4Change} />
                </div>
                <div className='form__content'>
                    <label className='form__label'>Enter Product Brand</label>
                    <input type="text"  className='form__input' value={productBrand} onChange={handleInput5Change} />
                </div>
                <button className='button__toggle form__button' onClick={addProducts}>Add Product</button>
                { account ? (
                    <>
                        {loading  ? (
                            <div>Transaction in progress..... It can take a few minutes</div>
                        ) : ( 
                            <p>{updateStatus}</p>
                        )}
                    </>
                ) : (
                    <h2>Connect to a crypto wallet first.......</h2>
                )
                
                }
            </div>

            <div className="qrcode__container">
            <div ref={qrRef}>{qrcode}</div>
            <div className="input__group">
                <form onSubmit={downloadQRCode}>
                <label>Enter Address</label>
                <input
                    type="text"
                    value={value}
                    onChange={qrCodeEncoder}
                    placeholder="Address of Company"
                />
                <button type="submit" disabled={!value}>
                    Download QR code
                </button>
                </form>
            </div>
            </div>    
        </div>

    )
}

export default AddProduct;