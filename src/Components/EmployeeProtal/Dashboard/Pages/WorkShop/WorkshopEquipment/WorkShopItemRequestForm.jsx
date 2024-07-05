/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import $ from 'jquery';
import axios from '../../../../../../axios';

const WorkShopItemRequestForm = () => {
  const history = useHistory();
  const [Equipments, setEquipments] = useState([]);
  const [EquipmentNumbers, setEquipmentNumbers] = useState([]);
  const [Locations, setLocations] = useState([]);
  const [Companies, setCompanies] = useState([]);
  const [Other, setOther] = useState(false);
  const [RequestType, setRequestType] = useState('');

  useEffect(
    () => {
      GetCompanies();
    }, []
  )

  const GetCompanies = () => {
    axios.get('/getallcompanies')
      .then(res => {
        setCompanies(res.data);
        GetEquipments();
      }).catch(err => console.log(err));
  }
  const GetEquipments = () => {
    axios.get('/fuel-managent/equipment-types')
      .then(res => {
        setEquipments(res.data);
      }).catch(err => console.log(err));
  }
  const GetLocations = (value) => {
    setLocations([]);
    axios.post('/getcompanylocations', { company_code: value }).then(
      res => {
        setLocations(res.data);
      }
    ).catch(
      err => {
        console.log(err);
      }
    )
  }
  const GetEquipmentNumbers = (value) => {
    setEquipmentNumbers([]);
    axios.post('/fuel-managent/equipment-numbers', { type_id: value }).then(
      res => {
        setEquipmentNumbers(res.data);
      }
    ).catch(
      err => {
        console.log(err);
      }
    )
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (RequestType.length === 0) {
      return false;
    }
    $('fieldset').prop('disabled', true);
    axios.post('/workshop/equipment-request/new', {
      company: e.target['company'].value,
      location: e.target['location'].value,
      equipment_type: e.target['equipment_type'].value,
      equipment_number: e.target['equipment_number'].value,
      maintenance_type: e.target['serviceMaintenance'].value,
      maintenance_other: e.target['equipmentTypeOther'] ? e.target['equipmentTypeOther'].value : '',
      request_type: RequestType,
      description: e.target['description'].value,
      emp_id: localStorage.getItem('EmpID')
    }).then(
      () => {
        toast.success("Form submitted successfully!");
        history.push('/workshop');
      }
    ).catch(
      err => {
        $('fieldset').prop('disabled', false);
        console.log(err);
      }
    )
  };
  return (
    <div className='page'>
      <ToastContainer />
      <div className='page-content'>
        <div>
          <div className="d-flex align-items-center justify-content-between">
            <h3 className="heading">
              WORKSHOP REQUEST FORM
              <sub>SERVICE FORM TO REQUEST WORKSHOP EQUIPMENTS</sub>
            </h3>
            <Link to="/workshop" className="btn light">Back</Link>
          </div>
        </div>
        <hr />
        <form onSubmit={handleSubmit}>
          <fieldset>
            <div className='row'>
              <div className='col-md-6 mb-3'>
                <label className='mb-0'>
                  <b>Company</b>
                </label>
                <select className="form-control" name='company' onChange={(e) => GetLocations(e.target.value)} required>
                  <option value=''>Select the option</option>
                  {
                    Companies.map(
                      val => {
                        return <option key={val.company_code} value={val.company_code}> {val.company_name} </option>
                      }
                    )
                  }
                </select>
              </div>
              <div className='col-md-6 mb-3'>
                <label className='mb-0'>
                  <b>Company Location</b>
                </label>
                <select className="form-control" name='location' required>
                  <option value=''>Select the option</option>
                  {
                    Locations.map(
                      val => {
                        return <option key={val.location_code} value={val.location_code}> {val.location_name} </option>
                      }
                    )
                  }
                </select>
              </div>
            </div>
            <div className='row'>
              <div className='col-md-6 mb-3'>
                <label className='mb-0'>
                  <b>Equipment Type</b>
                </label>
                <select onChange={(e) => GetEquipmentNumbers(e.target.value)} name="equipment_type" className="form-control" required>
                  <option value=''>Select the option</option>
                  {
                    Equipments.map(
                      ({ id, equipment_type }) => {
                        return <option value={id}>{equipment_type}</option>
                      }
                    )
                  }
                </select>
              </div>
              <div className='col-md-6 mb-3'>
                <label className='mb-0'>
                  <b>Equipment Number</b>
                </label>
                <select className="form-control" name="equipment_number" required>
                  <option value=''>Select the option</option>
                  {
                    EquipmentNumbers.map(
                      val => {

                        return (
                          <option
                            key={val.id}
                            value={val.id}
                          // selected={details && details.location_code == val.location_code ? true : false}
                          > {val.equipment_number}</option>
                        );

                      }
                    )
                  }
                </select>
              </div>
            </div>
            <div className='row'>
              <div className='col-md-12'>
                <label className='mb-0'>
                  <b>Services Maintenance</b>
                </label>
                <select className="form-control" name="serviceMaintenance" onChange={(e) => setOther(e.target.value === 'Other' ? true : false)} required>
                  <option value=''>Select the option</option>
                  <option value='Fluid'>Fluid </option>
                  <option value='Electrical'>Electrical</option>
                  <option value='Mechanical'>Mechanical</option>
                  <option value='Tyre'>Tyre</option>
                  <option value='Hydraulic'>Hydraulic</option>
                  <option value='Other'>Other</option>
                </select>
              </div>
            </div>
            {Other && (
              <div className='row mt-3'>
                <div className='col-md-12'>
                  <label className='mb-0'>
                    <b>Equipment Type - Other</b>
                  </label>
                  <input type='text' className="form-control mb-3" name="equipmentTypeOther" required />
                </div>
              </div>
            )}
            <div className="row d-flex justify-content-around mt-3 ">
              <div className="col-auto">
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="requestType" onChange={(e) => setRequestType("Repair")} />
                  <label className='mb-0 mt-1 ml-1'>
                    <b>Repair Request</b>
                  </label>
                </div>
              </div>
              <div className="col-auto">
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="requestType" onChange={(e) => setRequestType("Replace")} />
                  <label className='mb-0 mt-1 ml-1'>
                    <b>Replace Request</b>
                  </label>
                </div>
              </div>
              <div className="col-auto">
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="requestType" onChange={(e) => setRequestType("NewItem")} />
                  <label className='mb-0 mt-1 ml-1'>
                    <b>New Item Request</b>
                  </label>
                </div>
              </div>
            </div>
            <label className='mb-0 mt-2'>
              <b>Description</b>
            </label>
            <textarea placeholder='Enter a valid reason in detail' className="form-control mb-3" name="description" minLength={50} required />
            <div className='d-flex justify-content-end mt-3 '>
              <button type="submit" className='btn submit'>Submit</button>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default WorkShopItemRequestForm;

