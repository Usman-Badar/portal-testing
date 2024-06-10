import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import $ from 'jquery';
import axios from '../../../../../../axios';
import moment from 'moment';
import { useSelector } from 'react-redux';
import JSAlert from 'js-alert';
import Modal from '../../../../../UI/Modal/Modal';

const Workshop = () => {
  const AccessControls = useSelector( ( state ) => state.EmpAuth.EmployeeData );
  const [selectedItem, setSelectedItem] = useState(null);
  const [isRowClicked, setIsRowClicked] = useState(false);
  const [Requests, setRequests] = useState();
  const [modal, setModal] = useState();

  useEffect(() => {
    loadRequests();
  }, []);

  const confirmation = (status, callback) => {
    setModal(
      <form onSubmit={(e) => callback(e)}>
        <h6><b>Confirm to {status} this request?</b></h6>
        <hr />
        <textarea name="remarks" className='form-control' placeholder='Your Remarks' minLength={30} required></textarea>
        <button id='confirm' className="btn d-block ml-auto submit mt-3" type='submit'>Confirm</button>
      </form>
    )
  }
  const handleRowClick = (item) => {
    setSelectedItem(item);
    setIsRowClicked(true);
  };
  const loadRequests = () => {
    axios.post('/workshop/equipment-request/list', { emp_id: localStorage.getItem('EmpID') }).then(
      res => {
        setRequests(res.data);
      }
    ).catch(
      err => {
        console.log(err);
      }
    )
  };
  const verifyRequest = (e) => {
    e.preventDefault();
    $('#verifyBtn').prop('disabled', true);
    $('#confirm').prop('disabled', true);
    axios.post('/workshop/equipment-request/verify', { remarks: e.target['remarks'].value, emp_id: localStorage.getItem('EmpID'), id: selectedItem.id }).then(
      () => {
        setModal();
        setIsRowClicked(false);
        $('#confirm').prop('disabled', false);
        $('#verifyBtn').prop('disabled', true);
        JSAlert.alert("Request has been verified");
        loadRequests();
      }
    ).catch(
      err => {
        $('#confirm').prop('disabled', false);
        $('#verifyBtn').prop('disabled', true);
        console.log(err);
      }
    )
  }
  const rejectRequest = (e) => {
    e.preventDefault();
    $('#rejectBtn').prop('disabled', true);
    $('#confirm').prop('disabled', true);
    axios.post('/workshop/equipment-request/reject', { remarks: e.target['remarks'].value, emp_id: localStorage.getItem('EmpID'), id: selectedItem.id }).then(
      () => {
        setModal();
        setIsRowClicked(false);
        $('#confirm').prop('disabled', false);
        $('#rejectBtn').prop('disabled', true);
        JSAlert.alert("Request has been rejected");
        loadRequests();
      }
    ).catch(
      err => {
        $('#confirm').prop('disabled', false);
        $('#rejectBtn').prop('disabled', true);
        console.log(err);
      }
    )
  }

  return (
    <div className='page'>
      {modal && <Modal show={true} Hide={() => setModal()} content={modal} />}
      <div className='page-content'>
        {!isRowClicked && (
          <div>
            <div className="d-flex align-items-center justify-content-between">
              <h3 className="heading">
                WORKSHOP MAINTENANCE FORM
                <sub>SERVICE FORM TO MAINTAIN WORKSHOP EQUIPMENTS</sub>
              </h3>
              <Link to="/workshop_item_request" className="btn submit">Request</Link>
            </div>
            <hr />
            {
              !Requests
              ?
              <h6 className="text-center mb-0">Please Wait...</h6>
              :
              Requests.length === 0
              ?
              <h6 className="text-center mb-0">No Record Found</h6>
              :
              <div className='mt-5'>
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">Sr.No</th>
                      <th scope="col">Company</th>
                      <th scope="col">Location</th>
                      <th scope="col">Equipment Name</th>
                      <th scope="col">Equipment Type</th>
                      <th scope="col">Requested By</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Requests.map((formData, index) => (
                      <tr style={{ cursor: "pointer" }} key={index} onClick={() => handleRowClick(formData)}>
                        <th scope="row">{index + 1}</th>
                        <td>{formData.company_name}</td>
                        <td>{formData.location_name}</td>
                        <td>{formData.equipment_type_name}</td>
                        <td>{formData.equipment_no}</td>
                        <td>
                          {formData.requested_by_name}<br />
                          {moment(formData.requested_at).format('DD-MM-YYYY hh:mm A')}
                        </td>
                        <td className={formData.status === 'Pending' ? 'text-warning' : formData.status === 'Verified' ? 'text-success' : 'text-danger'}>
                          <div style={{ display: "flex", alignItems: "center" }}> <span className={'dot mr-1 inline-block ' + (formData.status === 'Pending' ? 'bg-warning' : formData.status === 'Verified' ? 'bg-success' : 'bg-danger')}></span> {formData.status}</div></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            }
          </div>
        )}
        {isRowClicked && (
          <div>
            <div className="d-flex align-items-center justify-content-between">
              <h3 className="heading">
                WORKSHOP Equipment Details
                <sub>SERVICE FORM TO MAINTAIN WORKSHOP EQUIPMENTS</sub>
              </h3>
              <div className='d-flex gap-5'>
                {
                  JSON.parse(AccessControls.access).includes(112) && selectedItem.status === 'Pending' && (
                    <>
                      <button id="verifyBtn" type='button' onClick={() => confirmation('verify', (e) => verifyRequest(e))} className='btn submit mr-2'>Verify</button>
                      <button id="rejectBtn" type='button' onClick={() => confirmation('reject', (e) => rejectRequest(e))} className='btn cancle mr-2'>Reject</button>
                    </>
                  )
                }
                <Link to="/workshop" className="btn light">Back</Link>
              </div>
            </div>
            <hr />
            <div className='w-50 mx-auto'>
              <div className='main-banner'>
                <h1 className='mb-0 font-weight-bold'>{selectedItem.equipment_no}</h1>
                <h6 className='mb-0'>{selectedItem.equipment_type_name}</h6>
              </div>
              <table className="table ">
                <tbody>
                  <tr>
                    <th><h6>Status</h6></th>
                    {
                      selectedItem.status === 'Pending'
                      ?
                      <td>
                        <div className={`text-warning`} style={{ display: 'flex', alignItems: 'center' }}>
                          <span className={`dot bg-warning mr-1`}></span>
                          {selectedItem.status}
                        </div>
                      </td>
                      :
                      selectedItem.status === 'Verified'
                      ?
                      <td>
                        <div className={`text-success`} style={{ display: 'flex', alignItems: 'center' }}>
                          <span className={`dot bg-success mr-1`}></span>
                          {selectedItem.status}
                        </div>
                      </td>
                      :
                      <td>
                        <div className={`text-danger`} style={{ display: 'flex', alignItems: 'center' }}>
                          <span className={`dot bg-danger mr-1`}></span>
                          {selectedItem.status}
                        </div>
                      </td>
                    }
                  </tr>
                  <tr>
                    <th><h6>Request Id</h6></th>
                    <td>{selectedItem.id}</td>
                  </tr>
                  <tr>
                    <th><h6>Company</h6></th>
                    <td>{selectedItem.company_name}</td>
                  </tr>
                  <tr>
                    <th><h6>Location</h6></th>
                    <td>{selectedItem.location_name}</td>
                  </tr>
                  <tr>
                    <th><h6>Equipment Type</h6></th>
                    <td>{selectedItem.equipment_type_name}</td>
                  </tr>
                  <tr>
                    <th><h6>Service Type</h6></th>
                    <td>{selectedItem.maintenance_type}</td>
                  </tr>
                  {
                    selectedItem.maintenance_type === 'Other' && (
                      <tr>
                        <th><h6>Service Type (Other)</h6></th>
                        <td>{selectedItem.maintenance_type_other}</td>
                      </tr>
                    )
                  }
                  <tr>
                    <th><h6>Description</h6></th>
                    <td>{selectedItem.description}</td>
                  </tr>
                  <tr>
                    <th><h6>Requested By</h6></th>
                    <td>{selectedItem.requested_by_name}</td>
                  </tr>
                  <tr>
                    <th><h6>Requested At</h6></th>
                    <td>{moment(selectedItem.requested_at).format('DD-MM-YYYY hh:mm A')}</td>
                  </tr>
                  {
                    selectedItem.status === 'Verified' && (
                      <>
                        <tr>
                          <th><h6>Verified By</h6></th>
                          <td>{selectedItem.verified_by_name}</td>
                        </tr>
                        <tr>
                          <th><h6>Verified At</h6></th>
                          <td>{moment(selectedItem.verified_at).format('DD-MM-YYYY hh:mm A')}</td>
                        </tr>
                      </>
                    )
                  }
                  {
                    selectedItem.status === 'Rejected' && (
                      <>
                        <tr>
                          <th><h6>Rejected By</h6></th>
                          <td>{selectedItem.verified_by_name}</td>
                        </tr>
                        <tr>
                          <th><h6>Rejected At</h6></th>
                          <td>{moment(selectedItem.verified_at).format('DD-MM-YYYY hh:mm A')}</td>
                        </tr>
                      </>
                    )
                  }
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Workshop;
