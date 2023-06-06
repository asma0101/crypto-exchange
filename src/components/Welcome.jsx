import CryptoCoinsPage from '../pages/CryptoCoinsPage';
import Labels from '../Shared/Labels';
import '../Shared/Styles/Home.scss';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'


function Welcome() {
    const coinsData = useSelector(state => state.coins.coinsData.coinsData);
    
    return (
        <>
            <div className="container-fluid pt-5 m-0 mt-5">
                <div className="row">
                    <div className="col-md-12">
                        <div className="text-wrapper">
                            <div className="row p-2">
                                <div className="text-dark header col-md-6 text-start">
                                    <h1>{Labels.PurchasedCryptoCoins}</h1>
                                </div>
                                <div className="col-md-6 text-end">
                                    <Link to="/home/purchase" className="navItem">{Labels.PurchaseCoins}</Link>
                                </div>
                            </div>
                            <div className="row p-3">
                                <div className="col-md-12">
                                    {
                                        coinsData?.length > 0 ?
                                            <CryptoCoinsPage></CryptoCoinsPage>
                                            :
                                            <>
                                                <h4>{Labels.NoRecords}</h4>
                                                <h4>
                                                    <Link to="/home/purchase">{Labels.PurchaseCoins}</Link>
                                                </h4>
                                            </>
                                    }
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    {/* <div className="col-md-6">
                        <div className="img-wrapper">
                            <div className="img">
                                <img src="/imgs/applogo.jpg" alt="" />
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </>
    );
}
export default Welcome;