/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import axios from '../../../../../../axios';
import moment from 'moment';
import Modal from '../../../../../UI/Modal/Modal';
import JSAlert from 'js-alert';

const RD = () => {
  const d = new Date();
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const month = monthNames[d.getMonth()];
  const year = d.getFullYear();
  const secugen_lic = "";
  const uri = "https://localhost:8443/SGIFPCapture";
  const xmlhttp = new XMLHttpRequest();
  let fpobject;

  const [locations, setLocations] = useState([]);
  const [location, setLocation] = useState('');
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(1);
  const [searchedId, setSearchedId] = useState('');
  const [searchedObject, setSearchedObject] = useState(null);
  const [searchState, setSearchState] = useState('');
  const [DeliverConfirm, setDeliverConfirm] = useState(false);
  const [Template, setTemplate] = useState();

  useEffect(
    () => {
      if (searchedObject) setSearchedObject(null);
    }, [searchedId, category, location]
  )
  useEffect(
    () => {
      if (searchedId.length > 0) setSearchedId('');
    }, [category, location]
  )
  useEffect(
    () => {
      fetchLocations();
    }, []
  )

  const fetchCategories = () => {
    axios.get('/pf/rd/categories').then(
      res => {
        setCategories(res.data);
      }
    ).catch(err => {
      console.log(err);
    });
  };

  const fetchLocations = () => {
    axios.get('/pf/rd/locations').then(
      res => {
        setLocations(res.data);
        fetchCategories();
      }
    ).catch(err => {
      console.log(err);
    });
  }

  const verifyID = (e) => {
    e.preventDefault();
    const fieldset = document.getElementById('verification-form-fieldset');
    fieldset.disabled = true;
    setSearchState("Verifying ID...");
    setSearchedObject(null);

    axios.get(`/pf/rd/verify?id=${searchedId}&&category=${category}`).then(
      res => {
        fieldset.disabled = false;
        if (!res.data || res.data === '') {
          setSearchState(`No User Found With ${(category == 1 ? 'Employee' : 'Registration')} ID: ${searchedId}`);
        }else {
          setSearchState("");
          setSearchedObject(res.data);
        }
      }
    ).catch(err => {
      setSearchState("Error Occurred!!");
      console.log(err);
      fieldset.disabled = false;
    });
  };

  const are30DaysPassed = (deliveryDate) => {
    if (deliveryDate) {
      const a = moment(deliveryDate);
      const b = moment(new Date());
      const diff = b.diff(a, 'days');
      return diff > 30;
    }else {
      return true;
    }
  };

  function CallSGIFPGetData(successCall, failCall) {
    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        fpobject = JSON.parse(xmlhttp.responseText);
        successCall(fpobject);
      } else if (xmlhttp.status == 404) {
        failCall(xmlhttp.status)
      }
    }
    xmlhttp.onerror = function () {
      failCall(xmlhttp.status);
    }
    var params = "Timeout=10000";
    params += "&Quality=50";
    params += "&licstr=" + encodeURIComponent(secugen_lic);
    params += "&templateFormat=ISO";
    xmlhttp.open("POST", uri, true);
    xmlhttp.send(params);
  }

  function SuccessFunc(result) {
    if (result.ErrorCode == 0) {
      if (result != null && result.BMPBase64.length > 0) {
        document.getElementById('FPImage2').src = "data:image/bmp;base64," + result.BMPBase64;
      }
      setTemplate(result.BMPBase64);
    } else {
      JSAlert.alert("Description: " + (result.ErrorCode) + ".", "Fingerprint Capture Error Code:  " + result.ErrorCode);
    }
  }

  function ErrorFunc(status) {
    JSAlert.alert("Check if SGIBIOSRV is running; status = " + status + ":");
  }

  const confirmation = () => {
    const button = document.getElementById('confirmBtn');
    const passcode = document.getElementById('passcode') ? document.getElementById('passcode').value : '';
    if (!Template && passcode === '') {
      JSAlert.alert("Please enter the receiver's password or verify his biometric!!!");
    } else {
      button.disabled = true;
      button.innerText = 'Verifying...';
      axios.post('/pf/rd/delivery', {
        passcode: passcode,
        location: location,
        category: category,
        user_id: searchedObject.registration_id,
        user_employee_id: searchedObject.employee_id,
        emp_id: localStorage.getItem("EmpID"),
        template: Template ? Template : 'null'
      }).then(
        res => {
          button.disabled = false;
          button.innerText = 'Confirm';
          if (res.data && res.data?.rashan_distribution_id && res.data?.user_id) {
            setDeliverConfirm(false);
            setLocation('');
            setCategory(1);
            setSearchedId('');
            setSearchedObject(null);
            setSearchState('');
            setTemplate();
            JSAlert.alert("Rashan has been delivered successfully!!").dismissIn(1500 * 1);
          }else {
            if (res?.data?.type) {
              if (res?.data?.type === "pass_not_matched" || res?.data?.type === "biometric_not_found" || res?.data?.type === "biometric_not_matched") {
                JSAlert.alert(res?.data?.message, "Something went wrong!!!");
              }
            }else {
              console.log(res?.data);
              JSAlert.alert("Something went wrong!!!");
            }
          }
        }
      ).catch(err => {
        button.disabled = false;
        button.innerText = 'Confirm';
        console.log(err);
      });
    }
  }

  return (
    <>
      <div className='page'>
        <Modal show={DeliverConfirm} Hide={() => setDeliverConfirm(false)} content={
          <>
            <h6>Receiver's Confirmation</h6>
            <hr />
            <div className='text-center mb-3'>
              <img width="20%" className='pointer' onClick={() => CallSGIFPGetData(SuccessFunc, ErrorFunc)} id="FPImage2" src={"https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Fingerprint_picture.svg/1413px-Fingerprint_picture.svg.png"} alt="fingerprints" />
            </div>
            {
              searchedObject?.employee_id && (
                <>
                  <label className='mb-0'>{searchedObject?.name}'s Password</label>
                  <input type='password' name="passcode" id="passcode" className='form-control' />
                </>
              )
            }
            <br />
            <button className='btn submit d-block ml-auto' id="confirmBtn" onClick={confirmation}>Confirm</button>
          </>
        } />
        <div className='page-content' style={{fontFamily: "Roboto-Light"}}>
          <div className="d-flex align-items-center justify-content-between">
            <h3 className="heading">
              Rashan Distribution Form
              <sub>punjawani foundation rashan Distribution form</sub>
            </h3>
            <h6 className='border rounded px-3 py-2 mb-0'>
              <b>{month + " " + year}</b>
            </h6>
          </div>
          <hr />
          <form onSubmit={verifyID}>
            <fieldset id="verification-form-fieldset">
              <label className='mb-0'><b>Delivery Location</b></label>
              <select className="form-control mb-3" defaultValue={location} onChange={(e) => setLocation(e.target.value)} required>
                <option value="">Select Location</option>
                {
                  locations.map((val, index) => {
                    return <option key={index} value={val.location_code} selected={location === val.location_code}>{val.location_name}</option>
                  })
                }
              </select>
              <label className='mb-0'><b>Category</b></label>
              <select className="form-control mb-3" defaultValue={category} onChange={(e) => setCategory(e.target.value)} required>
                {
                  categories.map((val, index) => {
                    return <option key={index} value={val.category_id} selected={category === val.category_id}>{val.category_name}</option>
                  })
                }
              </select>
              <label className='mb-0'><b>{parseInt(category) === 1 ? 'Employee ID' : 'Registered ID'}</b></label>
              <input type='number' className="form-control mb-3" value={searchedId} onChange={(e) => setSearchedId(e.target.value)} required />
              <div className='d-flex justify-content-end'>
                <button className='btn submit' id='verifyButton'>Verify</button>
              </div>
            </fieldset>
          </form>
          <hr />
          {
            !searchedObject && <div className='d-flex justify-content-center align-items-center font-weight-bold'><h6>{searchState}</h6></div>
          }
          {searchedObject && (
            <div>
              {
                !are30DaysPassed(searchedObject.last_delivery_date) && (
                  <div className="alert alert-warning">
                    <b>Already Delivered</b><br />
                    <span>Rashan for the month of {month + " " + year}, is already delivered to {searchedObject.name}.</span>
                  </div>
                )
              }
              <table className="table">
                <tbody>
                  <tr>
                    <th className='border-top-0'>Registration ID</th>
                    <td className='border-top-0'>{searchedObject.registration_id}</td>
                  </tr>
                  {
                    searchedObject.employee_id && (
                      <tr>
                        <th>Employee ID</th>
                        <td>{searchedObject.employee_id}</td>
                      </tr>
                    )
                  }
                  <tr>
                    <th>Registered Name</th>
                    <td>{searchedObject.name}</td>
                  </tr>
                  <tr>
                    <th>Last Delivery Date</th>
                    <td>{searchedObject.last_delivery_date ? new Date(searchedObject.last_delivery_date).toDateString() : "No Delivery Found"}</td>
                  </tr>
                  <tr>
                    <th>Rashan Distribution Category</th>
                    <td>{searchedObject?.tbl_pf_rd_rashan_category?.rashan_category_name}</td>
                  </tr>
                </tbody>
              </table>
              {
                searchedObject?.tbl_pf_rd_rashan_category?.tbl_pf_rd_items?.length === 0
                ?
                  <div className="alert alert-danger">
                    <b>{searchedObject?.message?.title}</b><br />
                    <span>{searchedObject?.message?.description}</span>
                  </div>  
                :
                <>
                  <div className="alert alert-secondary">
                    <b>{searchedObject?.message?.title}</b><br />
                    <span>{searchedObject?.message?.description}</span>
                  </div>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Sr.No</th>
                        <th>Item</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        searchedObject?.tbl_pf_rd_rashan_category?.tbl_pf_rd_items?.map(
                          (val, index) => {
                            return (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{val.item_name}</td>
                              </tr>
                            )
                          }
                        )
                      }
                    </tbody>
                  </table>
                  {are30DaysPassed(searchedObject.last_delivery_date) && (
                    <div className='d-flex justify-content-end mt-4'>
                      <button type='button' className='btn submit' onClick={() => setDeliverConfirm(true)}>Deliver</button>
                    </div>
                  )}
                </>
              }
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default RD;
