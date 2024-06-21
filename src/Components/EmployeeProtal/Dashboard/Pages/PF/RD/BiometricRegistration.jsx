/* eslint-disable eqeqeq */
import React, { useState } from 'react';
import axios from '../../../../../../axios';
import JSAlert from 'js-alert';
import $ from 'jquery';

const BiometricRegistration = () => {
    const secugen_lic = "";
    const uri = "https://localhost:8443/SGIFPCapture";
    const xmlhttp = new XMLHttpRequest();
    let fpobject;
    
    const [Template, setTemplate] = useState();

    async function enroll() {
        if (Template) {
            if (document.getElementById('registration_id').value === '') {
                JSAlert.alert('Registration ID is required');
                return;
            }
            let formData = new FormData();
            formData.append('registration_id', document.getElementById('registration_id').value);
            formData.append('template', Template ? Template : 'null');
            formData.append('emp_id', localStorage.getItem('EmpID'));

            $('#enrolBtn').prop('disabled', true);
            $('#enrolBtn').text('Verifying Biometric....');
            axios.post('/pf/rd/biometric/registration', formData).then((res) => {
                $('#enrolBtn').prop('disabled', false);
                $('#enrolBtn').text('Enroll');
                if (res.data?.type === 'not_found' || res.data?.type === 'already_exists') {
                    JSAlert.alert(res.data?.message);
                    return;    
                }
                setTemplate();
                document.getElementById('registration_id').value = "";
                JSAlert.alert('Biometric has been registered!!!');
            }).catch(err => {
                console.log(err);
                JSAlert.alert('Failed to register biometric!!');
                $('#enrolBtn').prop('disabled', false);
                $('#enrolBtn').text('Enroll');
            })
        } else {
            JSAlert.alert('Fingerprint is required');
        }
    }

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
            JSAlert.alert("Fingerprint Capture Error Code:  " + result.ErrorCode + ".\nDescription:  " + (result.ErrorCode) + ".");
        }
    }
    function ErrorFunc(status) {
        JSAlert.alert("Check if SGIBIOSRV is running; status = " + status + ":");
    }
    return (
        <div className="d-flex align-items-center justify-content-center bg-light w-100 pt-4" style={{fontFamily: "Roboto-Light"}}>
            <div className="border rounded bg-white p-5 w-75">
                <h3 className="text-center">
                    <b>Punjwani Foundation</b>
                </h3>
                <h6 className="text-center">Biometric Registration</h6>
                <hr />
                <label className="mb-0">
                    <b>Registration ID</b>
                </label>
                <input id="registration_id" className="form-control" />

                <div className="text-center mt-3">
                    <img width="120" className="border px-3 py-1 rounded" style={{ cursor: "pointer" }} onClick={() => CallSGIFPGetData(SuccessFunc, ErrorFunc)} id="FPImage2" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Fingerprint_picture.svg/1413px-Fingerprint_picture.svg.png" alt="fingerprints" />
                    <p className="mb-0">
                        <small>Right Thumb</small>
                    </p>
                </div>

                <div className="d-flex align-items-center justify-content-center mt-3">
                    <div className="btn-group">
                        <button className="btn btn-outline-dark" id="enrolBtn" onClick={enroll}>Enroll</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BiometricRegistration;