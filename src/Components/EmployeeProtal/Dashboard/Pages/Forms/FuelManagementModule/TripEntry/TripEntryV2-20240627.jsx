/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import './TripEntry.css';
import JSAlert from 'js-alert';
import $ from 'jquery';
import axios from '../../../../../../../axios';
import Modal from '../../../../../../UI/Modal/Modal';
import { useSelector } from 'react-redux';
import moment from 'moment';

function TripEntry() {
    const AccessControls = useSelector( ( state ) => state.EmpAuth.EmployeeData );
    const fromRef = useRef();
    const toRef = useRef();
    const dateRef = useRef();
    const fuelRef = useRef();
    const companyRef = useRef();
    const locationRef = useRef();
    const btnRef = useRef();
    const formRef = useRef();
    const fieldsetRef = useRef();
    const [Requests, setRequests] = useState();
    const [New, setNew] = useState(false);
    const [Details, setDetails] = useState();
    const [Locations, setLocations] = useState([]);
    const [Companies, setCompanies] = useState([]);

    useEffect(
        () => {
            let isActive = true;
            GetCompanies(isActive);
            return () => {
                isActive = false;
            }
        }, []
    );
    useEffect(
        () => {
            let isActive = true;
            loadRequests(isActive);
            return () => {
                isActive = false;
            }
        }, []
    );
    const GetCompanies = (isActive) => {
        axios.get('/getallcompanies')
        .then(res => {
            if (!isActive) return;
            setCompanies(res.data);
        }).catch(err => console.log(err));
    }
    const GetLocations = (value) => {
        setLocations([]);
        axios.post('/getcompanylocations', {company_code: value}).then(
            res => {
                setLocations(res.data);
            }
        ).catch(
            err => {
                console.log(err);
            }
        )
    }
    const onSubmit = (e) => {
        e.preventDefault();
        if (fromRef.current.value.trim().length === 0) {
            JSAlert.alert('Trip from location is required!!', 'Validation Error', JSAlert.Icons.Warning).dismissIn(4000);
            return false;
        }else if (toRef.current.value.trim().length === 0) {
            JSAlert.alert('Trip destination is required!!', 'Validation Error', JSAlert.Icons.Warning).dismissIn(4000);
            return false;
        }
        // else if (dateRef.current.value.trim().length === 0) {
        //     JSAlert.alert('Date is required!!', 'Validation Error', JSAlert.Icons.Warning).dismissIn(4000);
        //     return false;
        // }
        else if (isNaN(parseInt(fuelRef.current.value))) {
            JSAlert.alert('Invalid fuel quantity!!', 'Validation Error', JSAlert.Icons.Warning).dismissIn(4000);
            return false;
        }else if (parseFloat(fuelRef.current.value) <= 0) {
            JSAlert.alert('Fuel quantity must be greater than 0!!', 'Validation Error', JSAlert.Icons.Warning).dismissIn(4000);
            return false;
        }
        // else if (!isValidDate(dateRef)) {
        //     JSAlert.alert('Date should be valid and must not be greater than the current date!!', 'Validation Error', JSAlert.Icons.Warning).dismissIn(4000);
        //     return false;
        // }

        fieldsetRef.current.disabled = true;
        btnRef.current.innerHTML = 'Please Wait...';
        axios.post(
            '/fuel-managent/fuel-issue-for-trip/new',
            {
                company: companyRef.current.value,
                location: locationRef.current.value,
                from: fromRef.current.value,
                to: toRef.current.value,
                date: dateRef.current.disabled ? '' : dateRef.current.value,
                fuel: fuelRef.current.value,
                emp_id: localStorage.getItem('EmpID')
            }
        ).then((res) => {
            if (res.data === 'err') {
                fieldsetRef.current.disabled = false;
                btnRef.current.innerHTML = 'Retry';
                JSAlert.alert('Something Went Wrong!!', 'Warning', JSAlert.Icons.Warning).dismissIn(2000);
                return;
            }
            if (res.data === 'limit exceed') {
                fieldsetRef.current.disabled = false;
                btnRef.current.innerHTML = 'Retry';
                JSAlert.alert('Insufficient quantity at fuleing station!!', 'Warning', JSAlert.Icons.Warning).dismissIn(2000);
                return;
            }
            loadRequests(true);
            fieldsetRef.current.disabled = false;
            btnRef.current.innerHTML = 'Submit';
            formRef.current.reset();
            setNew(false);
            
            JSAlert.alert('Trip entry has been recorded', 'Success', JSAlert.Icons.Success).dismissIn(2000);
        }).catch(err => {
            console.log(err);
            JSAlert.alert('Failed To complete!!', 'Request Failed', JSAlert.Icons.Failed).dismissIn(4000);
            fieldsetRef.current.disabled = false;
            btnRef.current.innerHTML = 'Submit';
        });
    }
    const loadRequests = (isActive) => {
        axios.post('/fuel-managent/fuel-issue-for-trip/requests', {emp_id: localStorage.getItem("EmpID")}).then(res => {
            if (!isActive) return;
            setRequests(res.data);
        }).catch(err => console.log(err));
    }
    const loadDetails = (i) => {
        const obj = Requests[i];
        setDetails(obj);
    }
    if (!AccessControls) {
        return <></>
    }
    if (JSON.parse(AccessControls.access).includes(94) && New) {
        return (
            <div className='page' style={{fontFamily: "Roboto-Light"}}>
                <form className='page-content' ref={formRef} onSubmit={onSubmit}>
                    <h3 className="heading">
                        Create New Trips
                        <sub>Trailer Trip Entry</sub>
                    </h3>
                    <hr />
                    <fieldset ref={fieldsetRef}>
                        <div className="d-flex mb-2" style={{ gap: '20px' }}>
                            <div className='w-50'>
                                <label className='mb-0'>
                                    <b>Company</b>
                                </label>
                                <select className="form-control" name='company' ref={companyRef} onChange={(e) => GetLocations(e.target.value)} required>
                                    <option value=''>Select the option</option>
                                    {
                                        Companies.map(
                                            val => {

                                                return (
                                                    <option
                                                        key={val.company_code}
                                                        value={val.company_code}
                                                    // selected={details && details.company_code == val.company_code ? true : false}
                                                    > {val.company_name} </option>
                                                )

                                            }
                                        )
                                    }
                                </select>
                            </div>
                            <div className='w-50'>
                                <label className='mb-0'>
                                    <b>Location</b>
                                </label>
                                <select className="form-control" name='location' ref={locationRef} required>
                                    <option value=''>Select the option</option>
                                    {
                                        Locations.map(
                                            val => {

                                                return (
                                                    <option
                                                        key={val.location_code}
                                                        value={val.location_code}
                                                    // selected={details && details.location_code == val.location_code ? true : false}
                                                    > {val.location_name} </option>
                                                );

                                            }
                                        )
                                    }
                                </select>
                            </div>
                        </div>
                        <hr />
                        <h6><b>Trip</b></h6>
                        <div className="d-flex mb-3" style={{ gap: '20px' }}>
                            <div className='w-50'>
                                <label className='mb-0'>
                                    <b>From</b>
                                </label>
                                <input type='text' className="form-control" ref={fromRef} required />
                            </div>
                            <div className='w-50'>
                                <label className='mb-0'>
                                    <b>To</b>
                                </label>
                                <input type='text' className="form-control" ref={toRef} required />
                            </div>
                        </div>
                        <hr />
                        <div className="d-flex mb-2" style={{ gap: '20px' }}>
                            <div className='w-50'>
                                <label className='mb-0'>
                                    <b>Fuel (Ltr.)</b>
                                </label>
                                <input type='number' min={1} className="form-control" ref={fuelRef} required />
                            </div>
                            <div className='w-50'>
                                <label className='mb-0'>
                                    <b>Date</b>
                                </label>
                                {/* <input type="date" defaultValue={new Date().toISOString().slice(0, 10).replace('T', ' ')} max={new Date().toISOString().slice(0, 10).replace('T', ' ')} className="form-control" ref={dateRef} required disabled={AccessControls.access && JSON.parse(AccessControls.access).includes(95) ? false : true} /> */}
                                <input type="date" defaultValue={new Date().toISOString().slice(0, 10).replace('T', ' ')} max={new Date().toISOString().slice(0, 10).replace('T', ' ')} className="form-control" ref={dateRef} required disabled />
                            </div>
                        </div>
                        <div className='d-flex justify-content-end align-items-center'>
                            <button className="btn light" type="button" onClick={() => setNew(false)}>Cancel</button>
                            <button className="btn ml-3 submit" type='submit' ref={btnRef}>
                                Submit
                            </button>
                        </div>
                    </fieldset>
                </form>
            </div>
        )
    }

    return (
        <>
            {
                Details
                ?
                <ReceivalDetails AccessControls={AccessControls} Details={Details} setDetails={setDetails} loadRequests={loadRequests} />
                :
                <div className='FuelRecievedFrom page'>
                    <div className="page-content">
                        <div className="d-flex align-items-center justify-content-between">
                            <h3 className="heading">
                                Trip Entry
                                <sub>Trailer Trip Entry</sub>
                            </h3>
                            {JSON.parse(AccessControls.access).includes(94) && <button className="btn submit" onClick={() => setNew(true)}>New</button>}
                        </div>
                        <hr />
                        {
                            !Requests
                            ?
                            <h6 className='text-center mb-0' style={{fontFamily: "Roboto-Light"}}>
                                <b>Please Wait....</b>
                            </h6>
                            :
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th className='border-top-0'>#</th>
                                        <th className='border-top-0'>Issued Fuel (Ltr.)</th>
                                        <th className='border-top-0'>Trip Date</th>
                                        <th className='border-top-0'>Trip</th>
                                        <th className='border-top-0'>Submitted By</th>
                                        <th className='border-top-0'>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        Requests.map(
                                            ({trip_from, trip_to, fuel_to_issue, trip_date, submit_person, created_at, status}, i) => (
                                                <tr key={i} className='pointer pointer-hover' onClick={() => loadDetails(i)}>
                                                    <td className='border-top-0'>{i+1}</td>
                                                    <td className='border-top-0'>{fuel_to_issue}</td>
                                                    <td className='border-top-0'>{new Date(trip_date).toDateString()}</td>
                                                    <td className='border-top-0'>{trip_from} to {trip_to}</td>
                                                    <td className='border-top-0'>
                                                        <b>{submit_person}</b><br />
                                                        <span>{moment(created_at).format('DD-MM-YYYY hh:mm A')}</span>
                                                    </td>
                                                    <td className='border-top-0'><Status status={status} /></td>
                                                </tr>
                                            )
                                        )
                                    }
                                </tbody>
                            </table>
                        }
                    </div>
                </div>
            }
        </>
    )
}

export default TripEntry;

const Status = ({ status }) => {
    return (
        <div className='d-flex align-items-center'>
            <div
                className={
                    "dot mr-1 "
                    +
                    (
                        status === 'Active' || status === 'Issued'
                            ?
                            "bg-success"
                            :
                            status === 'Replied' || status === 'Closed'
                                ?
                                "bg-primary"
                                :
                                status === 'Waiting For Verification' || status === 'Waiting For Verification'
                                    ?
                                    "bg-warning"
                                    :
                                    "bg-danger"
                    )
                }
            ></div>
            <div
                className={
                    "text-capitalize "
                    +
                    (
                        status === 'Active' || status === 'Issued'
                            ?
                            "text-success"
                            :
                            status === 'Replied' || status === 'Closed'
                                ?
                                "text-primary"
                                :
                                status === 'Waiting For Verification' || status === 'Waiting For Verification'
                                    ?
                                    "text-warning"
                                    :
                                    "text-danger"
                    )
                }
                style={{ fontSize: 12 }}
            >
                {status.split('_').join(' ')}
            </div>
        </div>
    )
}

const ReceivalDetails = ({ AccessControls, Details, setDetails, loadRequests }) => {
    const [modal, setModal] = useState();
    const updateDetails = async (e) => {
        e.preventDefault();
        $('fieldset').prop('disabled', true);
        axios.post(
            '/fuel-managent/fuel-issue-for-trip/update',
            {
                from: e.target['trip_from'].value,
                to: e.target['trip_to'].value,
                fuel: e.target['fuel_to_issue'].value,
                id: Details.id,
                emp_id: localStorage.getItem('EmpID')
            }
        ).then((res) => {
            if (res.data === 'err') {
                $('fieldset').prop('disabled', false);
                JSAlert.alert('Something Went Wrong!!', 'Warning', JSAlert.Icons.Warning).dismissIn(2000);
                return;
            }
            if (res.data === 'limit exceed') {
                $('fieldset').prop('disabled', false);
                JSAlert.alert('Insufficient quantity at fuleing station!!', 'Warning', JSAlert.Icons.Warning).dismissIn(2000);
                return;
            }
            setModal();
            setDetails();
            loadRequests(true);
            $('fieldset').prop('disabled', false);
            
            JSAlert.alert('Trip entry has been updated', 'Success', JSAlert.Icons.Success).dismissIn(2000);
        }).catch(err => {
            console.log(err);
            JSAlert.alert('Failed To complete!!', 'Request Failed', JSAlert.Icons.Failed).dismissIn(4000);
            $('fieldset').prop('disabled', false);
        });
    }
    return (
        <>
            {modal && <Modal show={true} Hide={() => setModal()} content={modal} />}
            <div className='page'>
                <div className="page-content">
                    <div className="d-flex align-items-center justify-content-between">
                        <h3 className="heading">
                            Trailer Trip Details
                            <sub>Trailer Trip Entry</sub>
                        </h3>
                        <div>
                            <button className="btn light" onClick={() => setDetails()}>Back</button>
                            <button className="btn submit ml-2" onClick={() => setModal(<>
                                <h6><b>Edit Trip Entry</b></h6>
                                <hr />
                                <form onSubmit={updateDetails}>
                                    <fieldset>
                                        <label className="mb-0">From</label>
                                        <input name="trip_from" defaultValue={Details?.trip_from} type="text" className="form-control mb-2" required />
                                        <label className="mb-0">To</label>
                                        <input name="trip_to" defaultValue={Details?.trip_to} type="text" className="form-control mb-2" required />
                                        <label className="mb-0">Fuel</label>
                                        <input name="fuel_to_issue" defaultValue={Details?.fuel_to_issue} type="number" className="form-control" min={1} required />
                                        <button className="btn submit d-block ml-auto mt-2">Update</button>
                                    </fieldset>
                                </form>
                            </>)}>Edit</button>
                        </div>
                    </div>
                    <hr />
                    <div className='w-50 mx-auto' style={{fontFamily: "Roboto-Light"}}>
                        <div className='main-banner'>
                            <h1 className='mb-0' style={{fontSize: 35}}>
                                <span className='font-weight-bold'>{Details.trip_from}<small className='text-dark font-weight-bold' style={{ fontSize: 16 }}> to </small>{Details.trip_to}</span>
                            </h1>
                            <h6 style={{fontSize: 15}} className='text-capitalize mb-0'>Trailer Trip</h6>
                        </div>
                        <table className="table">
                            <tbody>
                                <tr>
                                    <td><h6 className='font-weight-bold'>Status</h6></td>
                                    <td><Status status={Details.status} /></td>
                                </tr>
                                <tr>
                                    <td><h6 className='font-weight-bold'>Fuel Issued (Ltr.)</h6></td>
                                    <td>{Details.fuel_to_issue} (Ltr.)</td>
                                </tr>
                                <tr>
                                    <td><h6 className='font-weight-bold'>Trip Date</h6></td>
                                    <td>{moment(Details.trip_date).format("DD-MM-YYYY")}</td>
                                </tr>
                                <tr>
                                    <td><h6 className='font-weight-bold'>Created By</h6></td>
                                    <td>{Details.submit_person}</td>
                                </tr>
                                <tr>
                                    <td><h6 className='font-weight-bold'>Created At</h6></td>
                                    <td>{moment(Details.created_at).format("DD-MM-YYYY hh:mm A")}</td>
                                </tr>
                                {
                                    Details.updated_at && (
                                        <>
                                            <tr>
                                                <td><h6 className='font-weight-bold'>Updated By</h6></td>
                                                <td>{Details.update_person}</td>
                                            </tr>
                                            <tr>
                                                <td><h6 className='font-weight-bold'>Updated At</h6></td>
                                                <td>{moment(Details.updated_at).format("DD-MM-YYYY hh:mm A")}</td>
                                            </tr>
                                        </>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}