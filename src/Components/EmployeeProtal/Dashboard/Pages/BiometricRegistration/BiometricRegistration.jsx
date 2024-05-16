import React from 'react';
import axios from '../../../../../axios';

const BiometricRegistration = () => {
    const secugen_lic = "";
    const uri = "https://localhost:8443/SGIFPCapture";
    const xmlhttp = new XMLHttpRequest();
    let fpobject;
    const prefix = "data:image/png;base64,";
    let template;

    async function enroll() {
        if (template) {
            if (document.getElementById('emp_id').value === '') {
                alert('Employee ID is required');
                return;
            }
            let formData = new FormData();
            formData.append('emp_id', document.getElementById('emp_id').value);
            formData.append('template', template);

            axios.post('/enroll/thumb', formData).then(() => {
                alert('success');
            }).catch(err => {
                console.log(err);
                alert('failed');
            })
            // fetch('https://182.180.190.108:4444/enroll/thumb', {
            //     method: "POST",
            //     body: formData,
            // })
            //     .then(() => {
            //     }).catch(err => {
            //         console.log(err);
            //     })
        } else {
            alert('Fingerprint is required');
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
            template = result.BMPBase64;
        } else {
            alert("Fingerprint Capture Error Code:  " + result.ErrorCode + ".\nDescription:  " + (result.ErrorCode) + "."); // ErrorCodeToString
        }
    }
    function ErrorFunc(status) {
        alert("Check if SGIBIOSRV is running; status = " + status + ":");
    }

    return (
        <div className="d-flex align-items-center justify-content-center bg-light w-100 vh-100">
            <div className="border rounded bg-white p-5 w-50">
                <h3 className="text-center">Biometric Registration</h3>
                <hr />
                <label className="mb-0">
                    <b>Employee ID</b>
                </label>
                <input id="emp_id" className="form-control" placeholder="for example: 5000" />

                <div className="text-center mt-3">
                    <img width="120" className="border px-3 py-1 rounded" style={{cursor: "pointer"}} onClick={() => CallSGIFPGetData(SuccessFunc, ErrorFunc)} id="FPImage2" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Fingerprint_picture.svg/1413px-Fingerprint_picture.svg.png" alt="fingerprints" />
                    <p className="mb-0">
                        <small>Right Thumb</small>
                    </p>
                </div>

                <div className="d-flex align-items-center justify-content-center mt-3">
                    <div className="btn-group">
                        <button className="btn btn-outline-dark" onClick={enroll}>Enroll</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BiometricRegistration;
