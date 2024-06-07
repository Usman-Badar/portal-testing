import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Workshop = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isRowClicked, setIsRowClicked] = useState(false);

  const keysToShow = ['status', 'serialId', 'equipmentType', 'equipmentName', 'company', 'location', 'dateTime', 'serviceMaintenance', 'requestedBy', 'description'];

  const formDataList = sessionStorage.getItem('workshop_requests') ? JSON.parse(sessionStorage.getItem('workshop_requests')) : [];
  const verificationStatus = (status) => {
    let color = '';
    if (status === 'Verify') {
      color = 'success';
    } else if (status === 'Pending') {
      color = 'warning';
    } else {
      color = 'danger';
    }

    if (selectedItem && !selectedItem.status) {
      selectedItem.status = 'Pending';
      selectedItem.color = 'warning';
    }

    setSelectedItem(prevItem => ({ ...prevItem, status, color }));
  };



  const handleRowClick = (item) => {
    setSelectedItem(item);
    setIsRowClicked(true);
  };


  return (
    <div className='page'>
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
            <div className='mt-5'>
              <table className="table table-striped ">
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
                  {formDataList.map((formData, index) => (
                    <tr style={{ cursor: "pointer" }} key={index} onClick={() => handleRowClick(formData)}>
                      <th scope="row">{index + 1}</th>
                      <td>{formData.company}</td>
                      <td>{formData.location}</td>
                      <td>{formData.equipmentType}</td>
                      <td>{formData.serviceMaintenance}</td>
                      <td >{formData.requestedBy}</td>
                      <td className='text-warning'>
                        <div style={{ display: "flex", alignItems: "center" }}> <span className='dot mr-1 bg-warning inline-block'></span> {formData.status || 'Pending'}</div></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {isRowClicked && (
          <div>
            <div className="d-flex align-items-center justify-content-between">
              <h3 className="heading">
                WORKSHOP Equipment Details
                <sub>SERVICE FORM TO MAINTAIN WORKSHOP EQUIPMENTS</sub>
              </h3>
              <div className='d-flex gap-5 '>
                <button type='button' onClick={() => verificationStatus('Verify')} className='btn submit mr-2'>Verify</button>
                <button type='button' onClick={() => verificationStatus('Reject')} className='btn cancle mr-2'>Reject</button>
                <Link to="/workshop" className="btn light">Back</Link>
              </div>
            </div>
            <hr />
            <div className='w-50 mx-auto'>
              <div className='main-banner'>
                <h1 className='mb-0'>{selectedItem.equipmentName}</h1>
              </div>
              <table className="table ">
                <tbody>
                  <tr>
                    <th><h6>Status</h6></th>
                    <td >
                      <div className={`text-${selectedItem.color || 'warning'}`} style={{ display: 'flex', alignItems: 'center' }}>
                        <span className={`dot bg-${selectedItem.color || 'warning'} mr-1`}></span>
                        {selectedItem.status || 'Pending'}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th><h6  >Requested Id</h6></th>
                    <td>{selectedItem.serialId}</td>
                  </tr>
                  <tr>
                    <th><h6>Company</h6></th>
                    <td>{selectedItem.company}</td>
                  </tr>
                  <tr>
                    <th><h6>Location</h6></th>
                    <td>{selectedItem.location}</td>
                  </tr>
                  <tr>
                    <th><h6>Equipment Type</h6></th>
                    <td>{selectedItem.equipmentType}</td>
                  </tr>
                  <tr>
                    <th><h6>Service Type</h6></th>
                    <td>{selectedItem.serviceMaintenance}</td>
                  </tr>
                  {/* <tr>
                    <th><h6>Date & Time</h6></th>
                    <td>{selectedItem.dateTime}</td>
                  </tr> */}
                  <tr>
                    <th><h6>Requested By</h6></th>
                    <td>{selectedItem.requestedBy}</td>
                  </tr>
                  <tr>
                    <th><h6>Requet Date</h6></th>
                    <td>{selectedItem.dateTime}</td>
                  </tr>
                  {/* <tr>
                    <th><h6>Requested At</h6></th>
                    <td>abc</td>
                  </tr> */}
                  <tr>
                    <th><h6>Description</h6></th>
                    <td>{selectedItem.description}</td>
                  </tr>
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
