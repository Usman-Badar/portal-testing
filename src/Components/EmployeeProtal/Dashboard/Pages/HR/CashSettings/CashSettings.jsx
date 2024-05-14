import React, { useEffect, useState } from 'react';
import axios from '../../../../../../axios';
import JSAlert from 'js-alert';
import $ from 'jquery';

const CashSettings = () => {
    const [ Locations, setLocations ] = useState([]);
    const [ UpdateLocations, setUpdateLocations ] = useState([]);

    useEffect(
        () => {
            GetLocations();
        }, []
    );

    const GetLocations = () => {
        axios.get('/getalllocations').then(
            res => {
                setLocations( res.data );
            }
        ).catch(
            err => {
                console.log( err );
            }
        )
    }
    const updateLocations = () => {
        $("#updateBtn").prop('disabled', true);
        axios.put('/update_locations/biometric', {locations: JSON.stringify(UpdateLocations)}).then(() => {
            GetLocations();
            $("#updateBtn").prop('disabled', false);
            setUpdateLocations([]);
            JSAlert.alert('Locations Updated!!');
        }).catch(
            err => {
                $("#updateBtn").prop('disabled', false);
                console.log(err);
            }
        )
    }
    const onChangeHandler = (e, value) => {
        let arr = UpdateLocations.slice();
        const exists = arr.filter(val => val.location_code === value.location_code);
        if (exists.length > 0) {
            arr = arr.filter(val => val.location_code !== value.location_code);
        }else {
            value.req_biometric_for_cash = e.target.value === 'Required' ? 1 : 0;
            arr.push(value);
        }
        setUpdateLocations(arr);
    }
    return (
        <div className='page'>
            <div className="page-content">
                <div className="d-flex align-items-center justify-content-between">
                    <h3 className="heading">
                        Advance Cash Biometric
                        <sub>Setup biometric for advance cash in different locations</sub>
                    </h3>
                    {UpdateLocations.length > 0 && <button id="updateBtn" className="btn submit" onClick={updateLocations}>Update</button>}
                </div>
                <hr />
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Location</th>
                            <th>Biometric For Cash Collection</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Locations.map((val, i) => {
                                return (
                                    <tr key={val.location_code}>
                                        <td>{i+1}</td>
                                        <td>{val.location_name}</td>
                                        <td>
                                            <select defaultValue={val.req_biometric_for_cash === 1 ? "Required" : "Not Required"} onChange={(e) => onChangeHandler(e, val)} style={{width: '100%', padding: 10, background: 'none', border: 0, outline: 'none', boxShadow: 'none'}}>
                                                <option value="Required" selected={val.req_biometric_for_cash === 1}>Required</option>
                                                <option value="Not Required" selected={val.req_biometric_for_cash === 0}>Not Required</option>
                                            </select>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default CashSettings;