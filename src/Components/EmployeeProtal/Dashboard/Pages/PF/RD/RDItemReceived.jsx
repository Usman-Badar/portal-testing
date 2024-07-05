import React, { useEffect, useState } from 'react';
import { fetchDistributionLocations } from '../APIManager';
import moment from 'moment';
import $ from 'jquery';
import axios from '../../../../../../axios';
import JSAlert from 'js-alert';
import Modal from '../../../../../UI/Modal/Modal';

const RDItemReceived = () => {
    const [locations, setLocations] = useState([]);                     // LOCATIONS LIST
    const [location, setLocation] = useState('');                       // SELECTED LOCATION
    const [items, setItems] = useState();                               // ITEMS SEARCHED BY A KEYWORD
    const [selectedItem, setSelectedItem] = useState();                 // SINGLE ITEM SELECTED BY USER
    const [selectedItems, setSelectedItems] = useState([]);             // LIST OF ITEMS SELECTED BY USER
    const [itemsLoadingState, setItemsLoadingState] = useState('');     // LOADING TEXT WHILE SEARCHING ITEMS
    const [quantity, setQuantity] = useState('');                       // ITEM QUANTITY
    const [form, setForm] = useState(false);                            // STATE TO SHOW ENTRY FORM TRUE/FALSE
    const [modalData, setModalData] = useState();                       // CONTENT FOR MODAL
    const [itemEntries, setItemEntries] = useState();                   // LIST OF ENTRIES

    // TO FETCH DISTRIBUTION LOCATIONS
    // COMPONENT_DID_MOUNT
    useEffect(
        async () => {
            await fetchDistributionLocations(setLocations);
        }, []
    );

    // IF ITEM IS SELECTED
    useEffect(
        () => {
            if (selectedItem) {
                setItems();
                setItemsLoadingState('');
                $('#item_name').val(selectedItem?.item_name);
            }
        }, [selectedItem]
    );

    // LOAD ITEM ENTRIES
    useEffect(
        async () => {
            await fetchReceivedItemsEntries();
        }, []
    )

    // FUNCTION TO SEARCH ITEMS BASED ON A KEYWORD
    const searchItems = (e) => {
        const keyword = e.target.value;
        let timeout;

        setItems();
        if (keyword.length === 0) return;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            setItemsLoadingState("Loading...");
            axios.get('/pf/rd/search/rashan_items?keyword=' + keyword).then(response => {
                const itemsArr = response.data.filter(val => !selectedItems.some(value => value.item_id === val.item_id));
                if (itemsArr.length === 0) {
                    setItemsLoadingState("No Record Found");
                }else {
                    setItemsLoadingState("");
                    setItems(itemsArr);
                }
            } ).catch( err => {
                setItemsLoadingState("Error to load items...");
                console.log(err);
                JSAlert.alert(`Something went wrong. ${err}`, "Failed To Fetch", JSAlert.Icons.Failed);
            } );
        }, 1000);
    };

    const addItem = () => {
        if (!selectedItem) {
            JSAlert.alert("No item selected, you cannot enter item name manually. You need to select an item from the list.");
            return;
        }
        if (quantity.length === 0 || parseInt(quantity) < 1 || isNaN(quantity)) {
            JSAlert.alert("Quantity is required, quantity must be greater than 0!!!");
            return;
        }
        const itemsArr = selectedItems.slice();
        selectedItem.quantity = quantity;
        itemsArr.push(selectedItem);
        setSelectedItems(itemsArr);
        setSelectedItem();
        setQuantity('');
        $('#item_name').val('');
    }

    const submitRequest = () => {
        if (location.length === 0) {
            JSAlert.alert("Please select a location!!!");
            return;
        }
        setModalData(
            <>
                <h6>Confirm</h6>
                <p>Do you want to submit the entry for items received?</p>
                <button className='btn submit d-block ml-auto' id="confirmSubmit" onClick={confirmSubmit}>Confirm</button>
            </>
        );
    }

    const fetchReceivedItemsEntries = async () => {
        setItemEntries();
        const res = await axios.get('/pf/rd/received_items/entries_list');
        setItemEntries(res.data);
    }

    const confirmSubmit = async () => {
        $('#confirmSubmit').prop('disabled', true);
        const res = await axios.post('/pf/rd/received_items/entry', {
            items: JSON.stringify(selectedItems),
            location: location,
            user_id: localStorage.getItem('EmpID')
        });

        $('#confirmSubmit').prop('disabled', false);
        if (res && res.data.request_id) {
            setLocations([]);
            setLocation('')
            setItems()
            setSelectedItem()
            setSelectedItems([])
            setItemsLoadingState('')
            setQuantity('')
            setForm(false)
            setModalData()
            await fetchReceivedItemsEntries();
            JSAlert.alert(res.data?.msg).dismissIn(1500 * 1);
        }else {
            JSAlert.alert("Something went wrong!!!");
        }
    }

    // IF FORM STATE VALUE IS TRUE
    if (form) {
        return (
            <div className="page" style={{fontFamily: 'Roboto-Light'}}>
                {modalData?<Modal show={true} Hide={() => setModalData()} content={modalData} />:null}
                <div className="page-content">
                    <div className="d-flex align-items-center justify-content-between">
                        <h3 className="heading">
                            Receive Rashan Items
                            <sub>Entry of new item received at a location</sub>
                        </h3>
                        <button className='btn light' onClick={() => setForm(false)}>Back</button>
                    </div>
                    <hr />
                    <div className='row'>
                        <div className='col-md-12'>
                            <label className='mb-0'><b>Receiving Location</b></label>
                            <select className="form-control mb-3" defaultValue={location} onChange={(e) => setLocation(e.target.value)} required>
                                <option value="">Select Location</option>
                                {
                                    locations.map((val, index) => {
                                        return <option key={index} value={val.location_code} selected={location === val.location_code}>{val.location_name}</option>
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <form>
                        <fieldset>
                            <h6 className='font-weight-bold'>Enter Received Items</h6>
                            <div className='row'>
                                <div className='col-md-6'>
                                    <label className='mb-0'><b>Search Item</b></label>
                                    <div style={{position: 'relative'}}>
                                        <input type='search' id="item_name" className="form-control" onChange={searchItems} />
                                        {
                                            items && items.length > 0
                                            ?
                                            <div className='border rounded bg-white' style={{position: 'absolute', top: '100%', left: 0, width: '100%', maxHeight: 300, overflow: 'auto'}}>
                                                {/* FILTER IF ITEMS SEARCHED IS CONTAINS ANY OF THE ITEM PRESENT IN THE SELECTED ITEMS STATE */}
                                                {
                                                    items.filter(val => !selectedItems.some(value => value.item_id === val.item_id)).map(
                                                        (val, index) => {
                                                            return <p className='mb-0 pointer pointer-hover p-2 pl-3' key={index} onClick={() => setSelectedItem(val)}>{val.item_name}</p>
                                                        }
                                                    )
                                                }
                                            </div>
                                            :
                                            itemsLoadingState
                                        }
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <label className='mb-0'><b>Quantity</b></label>
                                    <input type='number' className="form-control" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                                </div>
                            </div>
                            <div className='d-flex justify-content-end rounded mt-3'>
                                <button type='button' onClick={addItem} className='btn submit' id='createBtn'>Add Item</button>
                            </div>
                        </fieldset>
                    </form>
                    <h6 className='font-weight-bold'>Received Items List</h6>
                    <table className="table popUps">
                        <thead>
                            <tr>
                                <th className='border-top-0'>Sr.No</th>
                                <th className='border-top-0'>Item Name</th>
                                <th className='border-top-0'>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                selectedItems.map((val, i) => {
                                    return (
                                        <tr key={val.registration_id} className='pointer pointer-hover'>
                                            <td>{i+1}</td>
                                            <td>{val.item_name}</td>
                                            <td>{val.quantity}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                    {
                        selectedItems.length > 0 && (
                            <div className='d-flex justify-content-end rounded mt-3'>
                                <button type='button' onClick={submitRequest} className='btn submit' id='submitBtn'>Submit</button>
                            </div>
                        )
                    }
                </div>
            </div>
        )
    };

    // IF FORM STATE VALUE IS NOT TRUE
    return (
        <div className='page'>
            <div className="page-content">
                <div className="d-flex align-items-center justify-content-between">
                    <h3 className="heading">
                        Rashan Items Received Entry
                        <sub>Rashan Received at distribution locations</sub>
                    </h3>
                    <button className='btn submit' onClick={() => setForm(true)}>New Entry</button>
                </div>
                <hr />
                {
                    !itemEntries
                    ?
                    <h6 className="text-center mb-0">Loading...</h6>
                    :
                    itemEntries.length === 0
                    ?
                    <h6 className="text-center mb-0">No Record Found</h6>
                    :
                    <table className="table popUps">
                        <thead>
                            <tr>
                                <th className='border-top-0'>Sr.No</th>
                                <th className='border-top-0'>Location</th>
                                <th className='border-top-0'>No of Items</th>
                                <th className='border-top-0'>Created At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                itemEntries.map((val, i) => {
                                    return (
                                        <tr key={val.registration_id} className='pointer pointer-hover'>
                                            <td>{i+1}</td>
                                            <td>{val.tbl_pf_rd_location?.location_name}</td>
                                            <td>{val.no_of_items}</td>
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
    );
}

export default RDItemReceived;
