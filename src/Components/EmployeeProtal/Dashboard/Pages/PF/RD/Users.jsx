import React, { useEffect, useState } from 'react';
import axios from '../../../../../../axios';
import $ from 'jquery';
import JSAlert from 'js-alert';

const Users = () => {
    const [users, setUsers] = useState();
    const [form, setForm] = useState(false);
    const [categories, setCategories] = useState([]);
    const [rashanCategories, setRashanCategories] = useState([]);
    const [category, setCategory] = useState('');

    useEffect(
        () => {
            if (form && categories.length === 0) fetchCategories();
        }, [form]
    );
    useEffect(
        () => {
            if (!form && !users) fetchUsers();
        }, [form]
    );

    const fetchCategories = () => {
        axios.get('/pf/rd/categories').then(
            res => {
                setCategories(res.data);
                fetchRashanCategories();
            }
        ).catch(err => {
            console.log(err);
        });
    };
    const fetchRashanCategories = () => {
        axios.get('/pf/rd/rashan_categories').then(
            res => {
                setRashanCategories(res.data);
            }
        ).catch(err => {
            console.log(err);
        });
    };
    const fetchUsers = () => {
        setUsers();
        axios.get('/pf/rd/users/list').then(
            res => {
                setUsers(res.data);
            }
        ).catch(err => {
            console.log(err);
        });
    };
    const onCreateUser = (e) => {
        e.preventDefault();
        $('fieldset').prop('disabled', true);
        axios.post('/pf/rd/users/registration', {
            name: e.target['name'].value,
            father_name: e.target['father_name'].value,
            cnic: e.target['cnic'].value,
            no_of_dependents: e.target['no_of_dependents'].value,
            rashan_category: e.target['rashan_category'].value,
            user_category: e.target['user_category'].value,
            user_employee_id: e.target['employee_id'] ? e.target['employee_id'].value : '',
            emp_id: localStorage.getItem('EmpID')
        }).then(
            res => {
                $('fieldset').prop('disabled', false);
                setForm(false);
                fetchUsers();
                if (res.data && res.data?.registration_id) {
                    JSAlert.alert("User has been created successfully!!").dismissIn(1500 * 1);
                } else {
                    console.log(res?.data);
                    JSAlert.alert("Something went wrong!!!");
                }
            }
        ).catch(err => {
            $('fieldset').prop('disabled', false);
            console.log(err);
        });
    }

    if (form) {
        return (
            <div className="page">
                <div className="page-content">
                    <div className="d-flex align-items-center justify-content-between">
                        <h3 className="heading">
                            Users Registration Form
                            <sub>Register New Users</sub>
                        </h3>
                        <button className='btn light' onClick={() => setForm(false)}>Back</button>
                    </div>
                    <hr />
                    <form onSubmit={onCreateUser}>
                        <fieldset>
                            <div className='row'>
                                <div className='col-md-6'>
                                    <label className='mb-0'><b>Name</b></label>
                                    <input type='text' className="form-control mb-3" name="name" required />

                                </div>
                                <div className='col-md-6'>
                                    <label className='mb-0'><b>Father Name</b></label>
                                    <input type='text' className="form-control mb-3" name="father_name" required />
                                </div>
                                <div className='col-md-6'>
                                    <label className='mb-0'><b>CNIC No</b></label>
                                    <input type='text' className="form-control mb-3" name="cnic" required />
                                </div>
                                <div className='col-md-6'>
                                    <label className='mb-0'><b>Number of Dependent</b></label>
                                    <input type='number' className="form-control mb-3" name="no_of_dependents" required />
                                </div>
                                <div className='col-md-6'>
                                    <label className='mb-0'><b>Rashan Category</b></label>
                                    <select className="form-control" name="rashan_category" required>
                                        <option value=''>Select Rashan Category</option>
                                        {
                                            rashanCategories.map((val, index) => {
                                                return <option key={index} value={val.rashan_category_id}>{val.rashan_category_name}</option>
                                            })
                                        }
                                    </select>
                                </div>
                                <div className='col-md-6'>
                                    <label className='mb-0'><b>User Category</b></label>
                                    <select className="form-control mb-3" name="user_category" onChange={(e) => setCategory(e.target.value)} required>
                                        <option value=''>Select User Category</option>
                                        {
                                            categories.map((val, index) => {
                                                return <option key={index} value={val.category_id}>{val.category_name}</option>
                                            })
                                        }
                                    </select>
                                </div>
                                {
                                    parseInt(category) === 1 && (
                                        <div className='col-md-12'>
                                            <label className='mb-0'><b>Employee Code</b></label>
                                            <input type='number' className="form-control mb-1" name="employee_id" required />
                                        </div>
                                    )
                                }
                            </div>
                            <div className='d-flex justify-content-end rounded mt-3'>
                                <button className='btn submit' id='createBtn'>Create</button>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </div>
        )
    }
    return (
        <div className='page'>
            <div className="page-content">
                <div className="d-flex align-items-center justify-content-between">
                    <h3 className="heading">
                        Punjwani Foundation Users
                        <sub>Registered Users of Punjwani Foundation</sub>
                    </h3>
                    <button className='btn submit' onClick={() => setForm(true)}>New</button>
                </div>
                <hr />
                {
                    !users
                    ?
                    <h6 className="text-center mb-0">Loading...</h6>
                    :
                    users.length === 0
                    ?
                    <h6 className="text-center mb-0">No Record Found</h6>
                    :
                    <table className="table popUps">
                        <thead>
                            <tr>
                                <th className='border-top-0'>Sr.No</th>
                                <th className='border-top-0'>Registration ID</th>
                                <th className='border-top-0'>Registration Date</th>
                                <th className='border-top-0'>User Name</th>
                                <th className='border-top-0'>Father Name</th>
                                <th className='border-top-0'>CNIC No</th>
                                <th className='border-top-0'>No. of Dependents</th>
                                <th className='border-top-0'>User Category</th>
                                {/* <th className='border-top-0'>Authorized By</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((val, i) => {
                                    return (
                                        <tr key={val.registration_id} className='pointer pointer-hover'>
                                            <td>{i+1}</td>
                                            <td>{val.registration_id}</td>
                                            <td>{new Date(val.createdAt).toDateString()}</td>
                                            <td>{val.name}</td>
                                            <td>{val.father_name}</td>
                                            <td>{val.cnic}</td>
                                            <td>{val.no_of_dependents}</td>
                                            <td>{val?.tbl_pf_rd_category?.category_name}</td>
                                            {/* <td>Abdul Rasheed Kath</td> */}
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                }
            </div>
        </div>
    )
}

export default Users;