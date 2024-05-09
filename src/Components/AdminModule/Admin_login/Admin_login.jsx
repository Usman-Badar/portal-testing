/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import './Admin_login.css';

import $ from 'jquery';

import { useHistory } from 'react-router-dom';
import axios from '../../../axios';
import Form from '../../../utils/form/Form';
import JSAlert from 'js-alert';

const AdminLogin = () => {
    const history = useHistory();
    let key = 'real secret keys should be long and random';
    const encryptor = require('simple-encryptor')(key);

    const [ UserName, setUserName ] = useState('');
    const [ Password, setPassword ] = useState('');

    if (sessionStorage.getItem('UserID')) history.replace('/admin_module');

    return (
        <>
            <div className='page adminLoginContainer'>
                <Form 
                    loading={
                        {
                            type: 2
                        }
                    }
                    submission={
                        {
                            custom: true,
                            handler: ( e, setLoading ) => OnUserLogin( e, encryptor, UserName, Password, history, setUserName, setPassword, setLoading ),
                            api: '',
                            parameters: '',
                            successMessage: '',
                            redirectUrl: '',
                        }
                    }
                    heading={
                        {
                            type: 'center',
                            title: 'Back-end Management',
                            subTitle: 'Administrative Login Page',
                            line: true
                        }
                    }
                    fields={
                        [
                            {
                                grid: 1,
                                list: [
                                    {
                                        label: {
                                            text: "Login ID",
                                            bold: true
                                        },
                                        value: UserName,
                                        type: 'text',
                                        required: true,
                                        inputType: 'input',
                                        placeholder: "Administrative Login ID",
                                        changeHandler: setUserName,
                                    },
                                    {
                                        label: {
                                            text: "Password",
                                            bold: true
                                        },
                                        value: Password,
                                        type: 'password',
                                        required: true,
                                        inputType: 'input',
                                        placeholder: "Administrative Password",
                                        changeHandler: setPassword,
                                    },
                                ]
                            },
                        ]
                    }
                    btn={
                        {
                            alignment: 'center',
                            space: true,
                            list: [
                                {
                                    text: 'Login',
                                    type: 'submit',
                                    color: 'submit',
                                }
                            ]
                        }
                    }
                />
            </div>
        </>
    )

}

export default AdminLogin;

// On form submition, the following function call
const OnUserLogin = ( e, encryptor, UserName, Password, history, setUserName, setPassword, setLoading ) => {
    e.preventDefault();
    setLoading(true);
    $('fieldset').prop('disabled', true);
    axios.post('/validate_password', {
        login: encryptor.encrypt(UserName),
        password: encryptor.encrypt(Password),
        admin: true
    }).then(res => {
        setLoading(false);
        $('fieldset').prop('disabled', false);
        if (res.data && res.data.length > 0) {
            const data = res.data[0];
            if (data.user_category === "ADMIN") {
                JSAlert.alert('Welcome To Admin Panel', 'Login Success', JSAlert.Icons.Success).dismissIn(1000 * 3);
                sessionStorage.setItem('UserID', data.id);
                sessionStorage.setItem('userName', data.user_name);
                sessionStorage.setItem('UserImg', data.emp_image);

                setTimeout(() => {
                    history.replace('/admin_module');
                }, 1500);
            }else {
                JSAlert.alert("You're not allowed to login on admin panel.", 'Unauthorized Login', JSAlert.Icons.Failed);
            }
        }else {
            JSAlert.alert('Please recheck the entered login id and password!', 'Credentials Not Matched', JSAlert.Icons.Warning);
        }
    }).catch(err => {
        console.log(err);
        setLoading(false);
        $('fieldset').prop('disabled', false);
    });
}