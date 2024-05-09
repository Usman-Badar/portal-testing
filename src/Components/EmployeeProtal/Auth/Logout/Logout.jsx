import React, { useEffect } from 'react';

import { useHistory } from 'react-router-dom';

import socket from '../../../../io';
import axios from '../../../../axios';
import loading from '../../../../images/loadingIcons/icons8-iphone-spinner.gif';
import JSAlert from 'js-alert';
import { useDispatch } from 'react-redux';
import { EmployeeLogin } from '../../../../Redux/Actions/Action';

const Logout = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    useEffect(
        () => {
            setTimeout(() => {
                logout();
            }, 500);
        }, []
    )

    function logout() {
        axios.post('/portal/logout', {
            emp_id: localStorage.getItem('EmpID')
        }).then(() => {
            if (localStorage.getItem('EmpID')) {
                socket.emit('UserLost', localStorage.getItem('EmpID'));
                localStorage.removeItem('Token');
                localStorage.removeItem('name');
                localStorage.removeItem('EmpID');
            }
            const empty = [
                [{}],
                [],
                []
            ];
            dispatch(EmployeeLogin(empty));
        
            history.replace('/login');
        }).catch(() => {
            JSAlert.alert('Something went wrong...', "Couldn't Logout", JSAlert.Icons.Failed).dismissIn(1000 * 4);
            history.goBack();
        })
    }

    return(
        <div className='w-100 vh-100 d-flex align-items-center justify-content-center bg-lightgray'>
            <div className='text-center bg-white p-5 w-50' style={{fontFamily: 'Roboto-Light'}}>
                <img src={loading} width='65' height='65' alt='loading...' />
                <h1 className='mt-3'>Logging Out</h1>
                <h6>Please wait while your logout is in process...</h6>
            </div>
        </div>
    )
    
}

export default Logout;