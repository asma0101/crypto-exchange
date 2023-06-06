import Table from 'react-bootstrap/Table';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import Coin from '../components/Coin/Coin';
import Labels from '../Shared/Labels';
const CryptoCoinsPage = () => {

    const coinsData = useSelector(state => state.coins.coinsData.coinsData);
    const targetCurrency = useSelector(state => state.coins.targetCurrency.targetCurrency);
    console.log(coinsData)
    
    
    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>{Labels.CoinName}</th>
                        <th>{Labels.CurrentRate} ({targetCurrency })</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        coinsData.map((coin) => {
                            return <Coin key={coin?.name} coin={coin}></Coin>
                        })
                    }

                </tbody>
            </Table>
            
        </>
    );
}

export default CryptoCoinsPage;