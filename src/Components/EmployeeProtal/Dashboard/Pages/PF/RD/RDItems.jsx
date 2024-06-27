import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import JSAlert from 'js-alert';
import { fetchRashanItems, onCreateRashanItem } from './APIManager';
import moment from 'moment';

const RDItems = () => {
    const [items, setItems] = useState();
    const [form, setForm] = useState(false);

    useEffect(
        async () => {
            await fetchRashanItems(setItems);
        }, []
    )

    const onCreate = async (e) => {
        e.preventDefault();
        $('fieldset').prop('disabled', true); 
        const formData = {
            name: e.target['name'].value,
            uom: e.target['uom'].value,
            emp_id: localStorage.getItem('EmpID')
        };

        // CALLING API
        const response = await onCreateRashanItem(formData);
        
        // AFTER RESPONSE
        // COULD BE ERROR
        $('fieldset').prop('disabled', false);

        // ERROR HANDLER
        // IF CATEGORY CREATED (rashan_category_id) WILL BE IN THE RESPONSE
        if (response && response?.item_id) {
            setForm(false);
            await fetchRashanItems(setItems);
            JSAlert.alert(response?.msg).dismissIn(1500 * 1);
        }else {
            JSAlert.alert("Something went wrong!!!");
        }
    };

    if (form) {
        return (
            <div className="page">
                <div className="page-content">
                    <div className="d-flex align-items-center justify-content-between">
                        <h3 className="heading">
                            Create Rashan Item
                            <sub>new item for rashan distribution</sub>
                        </h3>
                        <button className='btn light' onClick={() => setForm(false)}>Back</button>
                    </div>
                    <hr />
                    <form onSubmit={onCreate}>
                        <fieldset>
                            <div className='row'>
                                <div className='col-md-6'>
                                    <label className='mb-0'><b>Item Name</b></label>
                                    <input type='text' className="form-control mb-3" name="name" required />
                                </div>
                                <div className='col-md-6'>
                                    <label className='mb-0'><b>Unit of Measurement</b></label>
                                    <input type='text' className="form-control mb-3" name="uom" placeholder='like: KG, PCS, LTR, ETC' required />
                                </div>
                            </div>
                            <div className='d-flex justify-content-end rounded mt-3'>
                                <button className='btn submit' id='createBtn'>Create</button>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </div>
        )
    }

    return (
        <div className='page'>
            <div className="page-content">
                <div className="d-flex align-items-center justify-content-between">
                    <h3 className="heading">
                        Rashan Items
                        <sub>Create new items for rashan distribution</sub>
                    </h3>
                    <button className='btn submit' onClick={() => setForm(true)}>New</button>
                </div>
                <hr />
                {
                    !items
                    ?
                    <h6 className="text-center mb-0">Loading...</h6>
                    :
                    items.length === 0
                    ?
                    <h6 className="text-center mb-0">No Record Found</h6>
                    :
                    <table className="table popUps">
                        <thead>
                            <tr>
                                <th className='border-top-0'>Sr.No</th>
                                <th className='border-top-0'>Item Name</th>
                                <th className='border-top-0'>Unit of Measurement</th>
                                <th className='border-top-0'>Created At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                items.map((val, i) => {
                                    return (
                                        <tr key={val.registration_id} className='pointer pointer-hover'>
                                            <td>{i+1}</td>
                                            <td>{val.item_name}</td>
                                            <td>{val.uom}</td>
                                            <td>{moment(val.createdAt).format('DD-MM-YYYY hh:mm A')}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                }
            </div>
        </div>
    )
}

export default RDItems;
