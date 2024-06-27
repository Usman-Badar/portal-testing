/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
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
  const [Status, setStatus] = useState('');
  const [PRequestDetails, setPRequestDetails] = useState();
  const [Specifications, setSpecifications] = useState([]);

  useEffect(() => {
    loadRequests();
  }, []);
  useEffect(() => {
    if (Status === 'PR') loadPRDetails();
  }, [Status]);

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
  const loadPRDetails = () => {
    axios.post(
      '/purchase/requisition/details',
      {
        pr_id: selectedItem.attached_to_pr,
        emp_id: localStorage.getItem("EmpID")
      }
    )
      .then(
        res => {
          function renameKeys(obj, newKeys) {
            const keyValues = Object.keys(obj).map(key => {
              const newKey = newKeys[key] || key;
              return { [newKey]: obj[key] };
            });
            return Object.assign({}, ...keyValues);
          }
          let specifications = [];
          setPRequestDetails(res.data[1][0]);
          if (window.location.href.includes('&&pr_id=')) {
            for (let x = 0; x < res.data[2].length; x++) {
              const newKeys = { sr_no: "specification_serial_number", description: "specification_description", quantity: "specification_quantity", estimated_cost: "specification_est_cost", total_estimated_cost: "specification_total_cost" };
              const obj = renameKeys(res.data[2][x], newKeys);
              specifications.push(obj);
            }
          } else {
            specifications = res.data[2];
          }
          setSpecifications(specifications);
        }
      ).catch(
        err => {

          console.log(err);

        }
      );
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
            <ul className="nav nav-tabs mb-3">
              <li className="nav-item" onClick={() => setStatus('')}>
                <a className={Status === '' ? 'nav-link active text-capitalize' : 'nav-link text-capitalize'}>Details</a>
              </li>
              {
                selectedItem.attached_to_pr !== null
                  ?
                  <li className="nav-item" onClick={() => setStatus('PR')}>
                    <a className={Status === 'PR' ? 'nav-link active text-capitalize' : 'nav-link text-capitalize'}>Purchase Requisition</a>
                  </li>
                  : null
              }
            </ul>
            {
              Status === ''
              ?
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
              :
              PRequestDetails
              ?
              <form className='popUps purchase_requisition_details_2'>
                <fieldset disabled>
                  <div className="flex_container mb-3">

                    <div className='mb-3'>
                      <label className="mb-0"><b>Company Name</b></label>
                      <input value={PRequestDetails.company_name} className="form-control" />
                    </div>
                    <div>
                      <label className="mb-0"><b>Delivery / Work Location</b></label>
                      <input value={PRequestDetails.location_name} className="form-control" />
                    </div>

                  </div>

                  <div className="grid_container mb-3 px-5">

                    {
                      PRequestDetails.new_purchase === 1
                        ?
                        <div className='grid_container align-items-center'>
                          <span>New Purchase</span>
                          <input checked={true} type="checkbox" className='ml-2' />
                        </div>
                        : null
                    }
                    {
                      PRequestDetails.repair
                        ?
                        <div className='grid_container align-items-center'>
                          <span>Repair</span>
                          <input checked={true} type="checkbox" className='ml-2' />
                        </div>
                        : null
                    }
                    {
                      PRequestDetails.replace_recycle
                        ?
                        <div className='grid_container align-items-center'>
                          <span>Replacement / Recycle</span>
                          <input checked={true} type="checkbox" className='ml-2' />
                        </div>
                        : null
                    }
                    {
                      PRequestDetails.budgeted
                        ?
                        <div className='grid_container align-items-center'>
                          <span>Budgeted</span>
                          <input checked={true} type="checkbox" className='ml-2' />
                        </div>
                        : null
                    }
                    {
                      PRequestDetails.not_budgeted
                        ?
                        <div className='grid_container align-items-center'>
                          <span>Not Budgeted</span>
                          <input checked={true} type="checkbox" className='ml-2' />
                        </div>
                        : null
                    }
                    {
                      PRequestDetails.invoice_attached
                        ?
                        <div className='grid_container align-items-center'>
                          <span>Invoice Attached</span>
                          <input checked={true} type="checkbox" className='ml-2' />
                        </div>
                        : null
                    }

                  </div>

                  <label className="mb-0"><b>Reason For Repair / Replacement / New Purchase</b></label>
                  <textarea className="form-control" value={PRequestDetails.reason} />

                  <br />

                  <label className="mb-1"><b>Purchase / Repair / Replacement Specifications</b></label>

                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th className='text-center'>Sr.No.</th>
                        <th className='text-center'>Description</th>
                        <th className='text-center'>Quantity</th>
                        <th className='text-center'>Estimated Cost</th>
                        <th className='text-center'>Total Cost</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        Specifications.map(
                          (val, index) => {
                            return (
                              <tr key={index}>
                                <td className='text-center'> {index + 1} </td>
                                <td className='text-center'> {val.description} </td>
                                <td className='text-center'> {val.quantity} </td>
                                <td className='text-center'> Rs {val.estimated_cost.toLocaleString('en')} </td>
                                <td className='text-center'> Rs {val.total_estimated_cost.toLocaleString('en')} </td>
                              </tr>
                            )
                          }
                        )
                      }
                    </tbody>
                    <tfoot>
                      <tr>
                        <td className='text-center'></td>
                        <td className='text-center'></td>
                        <td className='text-center'></td>
                        <td className='text-center'><b>Total</b></td>
                        <td className='text-center'> Rs {PRequestDetails.total_value.toLocaleString('en')} </td>
                      </tr>
                    </tfoot>
                  </table>

                  <label className="mb-0"><b>Additional Notes</b></label>
                  <textarea className="form-control" value={PRequestDetails.note} />
                </fieldset>
              </form>
              :
              <h6 className="text-center">Loading...</h6>
            }
          </div>
        )}
      </div>
    </div>
  );
};

export default Workshop;
