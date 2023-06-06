import { useFormik } from 'formik';
import Labels from "../../Shared/Labels";
import Button from 'react-bootstrap/Button';
import '../../Shared/Styles/Signup.scss';
import { Dropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import Toaster from "../Toaster";
import { apiCall } from '../../services/apiCall';
import { BACKEND_URL } from '../../Shared/BackendUrls';
import { setCoins } from '../../redux/Actions/coinsActions';
const CoinTransfer = () => {
    const [toaster, setShowToaster] = useState(false);
    const [errorHeading, setErrorHeading] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [selectedVal, setSelectedVal] = useState('');
    const [selectedAddress, setSelectedAddress] = useState('');
    const coinChains = useSelector(state => state.coins.coinChains.coinsChainData);
    const selectedCoin = useSelector(state => state.coins.selectedCoin.selectedCoin);
    const loggedInUser = useSelector(state => state.users.loggedInUser.loggedInUser);
    const [addresses, setAddresses] = useState([]);

    let dispatch = useDispatch();
    useEffect(() => {
        let isMounted = true;
        const fetchItems = async () => {
            let response = await apiCall(BACKEND_URL.GET_TRANSFER_ADDRESSES, 'GET');
            if (response.success) {
                setAddresses(response.data);
            }
        };
        fetchItems();
        return () => {
            isMounted = false;
        };
    }, []);

    const validate = values => {
        const errors = {};
        if (!selectedAddress) {
            errors.address = Labels.FieldRequired;
        } 
        return errors;
    };

    const { values, errors, handleSubmit, resetForm } = useFormik({
        initialValues: {
            address: '',
            chain: ''
        },
        validate,
        onSubmit: values => {
            handleTransfer();
            setErrorHeading(Labels.Success);
            setErrorMsg(Labels.CoinPurchasedSuccessfully);
            setShowToaster(true);
            setSelectedVal('');
            setSelectedAddress('');
            resetForm();
        },
    });
    const handleDropdownChange = (event) => {
        setSelectedVal(event.target.innerText);
    };
    const handleDropdownAddress = (event) => {
        setSelectedAddress(event.target.innerText);
    };
    const handleTransfer = async () => {
        let response = await apiCall(BACKEND_URL.TRANSFER_COIN, 'POST',
            {
                senderId: loggedInUser.id,
                receiverId: selectedAddress,
                coin: selectedCoin
            })
        if (response.success) {
            dispatch(setCoins(response.updatedUserCoins));
            setErrorHeading(Labels.Success);
            setErrorMsg(response.message);
            setShowToaster(true);
        }
    }
    return (
        <>
            <div className="container-fluid">
                <div className="row p-5 mt-4 pb-1">
                    <div className="col-md-12  justify-content-center">
                        <div className="form-header row">
                            <h1>{Labels.TransferCoin} <b>{selectedCoin?.name}</b></h1>
                            <h5>{Labels.CurrentRate} <b>{selectedCoin?.rate}</b></h5>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-md-5 p-3" style={{ border: '1px solid grey' }}>
                                <form onSubmit={handleSubmit}>
                                    <div className="dropdownClass">
                                        <Dropdown>
                                            <Dropdown.Toggle variant="dark" id="dropdown-basic">
                                                {selectedAddress || Labels.SelectTransferAddress}
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                {
                                                    addresses.map((address) => {
                                                        return <Dropdown.Item key={address.id}
                                                            value={values.address}
                                                            onClick={handleDropdownAddress}>{address.id}</Dropdown.Item>
                                                    })
                                                }
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                    <div className="errorMsg">
                                        {errors.address ? <div>{errors.address}</div> : null}
                                    </div>
                                    <div className="dropdownClass mt-4">
                                        <Dropdown>
                                            <Dropdown.Toggle variant="dark" id="dropdown-basic">
                                                {selectedVal || Labels.SelectCoinChain}
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                {
                                                    coinChains.map((chain) => {
                                                        return <Dropdown.Item key={chain.id}
                                                            value={values.chain}
                                                            onClick={handleDropdownChange}>{chain.name_full}</Dropdown.Item>
                                                    })
                                                }
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                    <div className="errorMsg">
                                        {errors.chain ? <div>{errors.chain}</div> : null}
                                    </div>
                                    <div className="submitButton transferBtn mt-3">
                                        <Button variant="outline-dark" type="submit" size="lg"
                                        >{Labels.Transfer}</Button>
                                    </div>
                                   

                                </form>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
            {
                toaster ? <Toaster heading={errorHeading} message={errorMsg}
                    resetToaster={() => { setErrorMsg(''); setErrorHeading(''); setShowToaster(false); }}></Toaster>
                    : null
            }
            
        </>
    );

}

export default CoinTransfer;