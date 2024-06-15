import React, { useEffect, useState } from 'react';
import Modal from '../../../../../UI/Modal/Modal';
import axios from '../../../../../../axios';
import JSAlert from 'js-alert';
import $ from 'jquery';

const Locations = () => {
    const [showModal, setShowModal] = useState(false);
    const [locations, setLocations] = useState([]);

    useEffect(
        () => {
            fetchLocations();
        }, []
    )

    const fetchLocations = () => {
        axios.get('/pf/rd/locations').then(
            res => {
                setLocations(res.data);
            }
        ).catch(err => {
            console.log(err);
        });
    }
    const addLocation = (e) => {
        e.preventDefault();
        $('fieldset').prop('disabled', true);
        axios.post('/pf/rd/locations/new', {
            location: e.target['location'].value,
            location_address: e.target['location_address'].value,
        }).then(
            res => {
                setShowModal(false);
                $('fieldset').prop('disabled', false);
                if (res.data && res.data?.location_code) {
                    fetchLocations();
                    JSAlert.alert("Location has been created successfully!!").dismissIn(1500 * 1);
                }else {
                    console.log(res?.data);
                    JSAlert.alert("Something went wrong!!!");
                }
            }
        ).catch(err => {
            $('fieldset').prop('disabled', false);
            console.log(err);
        });
    }

    return (
        <div className='page'>
            <div className='page-content'>
                <div>
                    <div className="d-flex align-items-center justify-content-between">
                        <h3 className="heading">
                            Rashan Distribution Locations
                            <sub>Locations where we distribute rashan</sub>
                        </h3>
                        <div className='d-flex justify-content-end'>
                            <button className='btn submit' onClick={() => setShowModal(true)}>New</button>
                        </div>
                    </div>
                    <hr />
                    <table className="table">
                        <thead>
                            <tr>
                                <th className='border-top-0'>#</th>
                                <th className='border-top-0'>Location</th>
                                <th className='border-top-0'>Location Address</th>
                            </tr>
                        </thead>
                        <tbody>
                            {locations.map((location, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{location.location_name}</td>
                                    <td>{location.address}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {showModal && (
                    <Modal show={true} Hide={() => setShowModal(false)} content={
                        <>
                            <h6 className='mb-0'>ADD LOCATION</h6>
                            <hr />
                            <form onSubmit={addLocation}>
                                <fieldset>
                                    <label className='mb-0'><b>Location</b></label>
                                    <input type='text' id='location' className="form-control mb-3" name="location" required />
                                    <label className='mb-0'><b>Location Address</b></label>
                                    <textarea type='text' id='location_name' className="form-control mb-3" name="location_address" required />
                                    <div className='d-flex justify-content-end'>
                                        <button type="submit" className="btn submit">Submit</button>
                                    </div>
                                </fieldset>
                            </form>
                        </>
                    } />
                )}
            </div>
        </div>

    )
}

export default Locations;