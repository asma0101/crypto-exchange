import Footer from '../components/Footer';
import NavbarComp from '../components/Navbar';
import '../Shared/Styles/Home.scss';
import { Route, Routes, useNavigate } from 'react-router-dom';
import AboutUsPage from './AboutUsPage';
import Welcome from '../components/Welcome';
import { useEffect, useState } from 'react';
import BlogsPage from './BlogsPage';
import CoinTransfer from '../components/Coin/CoinTransfer';
import { useDispatch, useSelector } from 'react-redux';
import { setCoinChains, setCoins, setTargetCurrency } from '../redux/Actions/coinsActions';
import { apiCall } from '../services/apiCall';
import { BACKEND_URL } from '../Shared/BackendUrls';
import PurchaseCoins from '../components/Coin/PurchaseCoins';

function HomePage() {
    const [skip, setSkip] = useState(false);
    const [coinRates, setCoinRates] = useState([]);
    const [chains, setChains] = useState([]);
    const [currency, setCurrency] = useState('USD');
    let navigate = useNavigate();
    const loggedInUser = useSelector(state => state.users.loggedInUser.loggedInUser);
    let dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiCall(BACKEND_URL.GET_COINS, "GET");
                const cryptoArray = Object.keys(response.crypto).slice(0, 10).map((key) => ({
                    id: key,
                    ...response.crypto[key] ,
                }));
                setChains(cryptoArray);
                console.log("chains => ",chains);
            } catch (error) {
                console.error(error);
            }
        };
        const fetchCoinsRates = async () => {
            try {
                const response = await apiCall(`${BACKEND_URL.GET_USER_COINS}?userId=${loggedInUser.id}`, "GET");
                setCoinRates(response.data);
                setCurrency('USD');
            } catch (error) {
                console.error(error);
            }
        };
        if (!skip) {
            fetchData();
            fetchCoinsRates();
        }
        setSkip(true);

        dispatch(setCoins(coinRates));

        if (!(localStorage.getItem('isLoggedIn')) || (localStorage.getItem('isLoggedIn') === 'false')) {
            navigate('/signup');
        }
        dispatch(setTargetCurrency(currency));
    }, [coinRates, chains]);
    if(!skip)
        dispatch(setCoins(coinRates));

    dispatch(setCoinChains(chains));

   
    
    return (
        <>
           <NavbarComp />
			<Routes>
				<Route path="/" element={<Welcome/>}></Route>
                <Route path="/aboutUs" element={ <AboutUsPage/>}></Route>
                <Route path="/blogs" element={<BlogsPage />}></Route>
                <Route path="/transfer" element={<CoinTransfer />}></Route>
                <Route path="/purchase" element={<PurchaseCoins />}></Route>
            </Routes>
            {/* <Footer/> */}
        </>
        
    );
}
export default HomePage;