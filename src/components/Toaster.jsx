import { useState } from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

const Toaster = (props) => {
    const [showToast, setToastShow] = useState(true);
    const toggleToaster = () => {
        setToastShow(!showToast);
        props.resetToaster();
    };


    return (
        <>
            <ToastContainer position="top-center" className="p-3">
                <Toast show={showToast} onClose={toggleToaster} >
                    <Toast.Header className="bg-danger">
                        <img
                        src="holder.js/20x20?text=%20"
                        className="rounded me-2"
                        alt=""
                        />
                        <strong className="me-auto text-white">{props.heading}</strong>
                    </Toast.Header>
                    <Toast.Body className="text-danger text-bold">{props.message}</Toast.Body>
                </Toast>
            </ToastContainer>
        
        </>
    );
}


export default Toaster;