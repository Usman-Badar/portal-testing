import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import JSAlert from 'js-alert';
import moment from 'moment';
import Modal from '../../../../../UI/Modal/Modal';
import { fetchRashanCategoryList, fetchRashanItems, fetchRashanLinkedItems, linkItemsToRashanCategory, onCreateRashanCategory } from './APIManager';

const RDRashanCategories = () => {
    const [items, setItems] = useState();
    const [categories, setCategories] = useState();
    const [isCategorySelected, setIsCategorySelected] = useState();
    const [selectedItems, setSelectedItems] = useState();
    const [form, setForm] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [searchItems, setSearchItems] = useState('');

    useEffect(
        async () => {
            await fetchRashanCategoryList(setCategories);
        }, []
    );

    useEffect(
        async () => {
            if (isCategorySelected) await fetchRashanItems(setItems);
        }, [isCategorySelected] // CLICKED ON A CATEGORY
    );

    useEffect(
        async () => {
            if (items) await fetchRashanLinkedItems(isCategorySelected.rashan_category_id, setSelectedItems);
        }, [items]
    )

    // TO CREATE A NEW RASHAN CATEGORY
    const onCreate = async (e) => {
        e.preventDefault();
        $('fieldset').prop('disabled', true); 
        const formData = {
            name: e.target['name'].value,
            emp_id: localStorage.getItem('EmpID')
        };

        // CALLING API
        const response = await onCreateRashanCategory(formData);
        
        // AFTER RESPONSE
        // COULD BE ERROR
        $('fieldset').prop('disabled', false);

        // ERROR HANDLER
        // IF CATEGORY CREATED (rashan_category_id) WILL BE IN THE RESPONSE
        if (response && response?.rashan_category_id) {
            setForm(false);
            await fetchRashanCategoryList(setCategories);
            JSAlert.alert(response?.msg).dismissIn(1500 * 1);
        }else {
            JSAlert.alert("Something went wrong!!!");
        }
    };

    // UPON SELECTING/DESELECTING AN ITEM
    const onSelectItem = (e, obj) => {
        const { checked } = e.target;
        let arr = selectedItems?.slice();
        if (checked) {
            arr.push(obj);
        }else {
            arr = arr.filter(val => val.item_id !== obj.item_id);
        }
        setSelectedItems(arr);
    }

    const confirmLink = async () => {
        $('#confirm').prop('disabled', true);

        // CALLING API
        const response = await linkItemsToRashanCategory(isCategorySelected.rashan_category_id, selectedItems);

        // AFTER RESPONSE
        // COULD BE ERROR
        $('#confirm').prop('disabled', false);

        // ERROR HANDLER
        // IF RESPONSE OBJECT HAS A KEY NAMED 'success'
        // THAT MEANS THE FUNCTION IS SUCCEED
        if (response && response?.success) {
            setIsCategorySelected();
            setShowModal(false);
            await fetchRashanCategoryList(setCategories);
            JSAlert.alert(response?.msg).dismissIn(1500 * 1);
        }else {
            JSAlert.alert("Something went wrong!!!");
        }
    }

    // IF CATEGORY IS SELECTED
    if (isCategorySelected) {
        return (
            <div className="page">
                {showModal && <Modal show={true} Hide={() => setShowModal(false)} content={
                    <>
                        <h6>Confirm to link the selected items?</h6>
                        <hr />
                        <p>By confirming, the selected items will be linked with the current category.</p>
                        <button id="confirm" className="btn submit d-block ml-auto" onClick={confirmLink}>Confirm</button>
                    </>
                } />}
                <div className="page-content">
                    <div className="d-flex align-items-center justify-content-between">
                        <h3 className="heading">
                            {isCategorySelected.rashan_category_name}
                            <sub>Link items with this category</sub>
                        </h3>
                        <div>
                            <button className='btn light' onClick={() => setIsCategorySelected()}>Back</button>
                            {
                                selectedItems?.length > 0 && (<button className='btn submit ml-2' onClick={() => setShowModal(true)}>Link</button>)
                            }
                        </div>
                    </div>
                    <hr /> 
                    {
                        !items
                        ?
                        <h6 className='text-center mb-0'>Loading Items...</h6>
                        :
                        items.length === 0
                        ?
                        <div className="alert alert-danger">
                            <b>No Item is Entered</b><br />
                            <span>Request the application admin to enter the items in the PF module.</span>
                        </div>
                        :
                        <>
                            <div>
                                <label className='mb-0'><b>Search Items</b></label>
                                <input type='search' onChange={(e) => setSearchItems(e.target.value)} className="form-control mb-3" name="search_items" required />
                            </div>

                            {/* LOADING THOSE ITEMS WHICH ARE ALREADY LINKED TO THE SELECTED CATEGORY */}
                            {
                                !selectedItems && (
                                    <div className="alert alert-secondary">
                                        Loading the linked items....
                                    </div>
                                )
                            }

                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Sr.No</th>
                                        <th colSpan={2}>Item Name</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        items.filter(val => val.item_name.toLowerCase().includes(searchItems.toLowerCase())).map((val, i) => {
                                            const isSelected = selectedItems?.filter(value => value.item_id === val.item_id)[0];
                                            return (
                                                <tr key={i}>
                                                    <td>{i+1}</td>
                                                    <td>{val.item_name}</td>
                                                    <td>
                                                        <input type="checkbox" checked={isSelected} onChange={(e) => onSelectItem(e, val)} />
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </>
                    }
                </div>
            </div>
        )
    }

    // IF FORM IS OPEN
    if (form) {
        return (
            <div className="page">
                <div className="page-content">
                    <div className="d-flex align-items-center justify-content-between">
                        <h3 className="heading">
                            Create Rashan Category
                            <sub>new category for rashan distribution</sub>
                        </h3>
                        <button className='btn light' onClick={() => setForm(false)}>Back</button>
                    </div>
                    <hr />
                    <form onSubmit={onCreate}>
                        <fieldset>
                            <div className='row'>
                                <div className='col-md-12'>
                                    <label className='mb-0'><b>Category Name</b></label>
                                    <input type='text' className="form-control mb-3" name="name" required />
                                </div>
                            </div>
                            <div className='d-flex justify-content-end rounded mt-1'>
                                <button className='btn submit' id='createBtn'>Create</button>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </div>
        )
    }

    // THE REQUEST LIST PAGE
    return (
        <div className='page'>
            <div className="page-content">
                <div className="d-flex align-items-center justify-content-between">
                    <h3 className="heading">
                        Rashan Categories
                        <sub>Create new categories for rashan</sub>
                    </h3>
                    <button className='btn submit' onClick={() => setForm(true)}>New</button>
                </div>
                <hr />
                {
                    !categories
                    ?
                    <h6 className="text-center mb-0">Loading...</h6>
                    :
                    categories.length === 0
                    ?
                    <h6 className="text-center mb-0">No Record Found</h6>
                    :
                    <table className="table popUps">
                        <thead>
                            <tr>
                                <th className='border-top-0'>Sr.No</th>
                                <th className='border-top-0'>Rashan Category</th>
                                <th className='border-top-0'>Linked Items</th>
                                <th className='border-top-0'>Created At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                categories.map((val, i) => {
                                    return (
                                        <tr onClick={() => setIsCategorySelected(val)} key={val.registration_id} className='pointer pointer-hover'>
                                            <td>{i+1}</td>
                                            <td>{val.rashan_category_name}</td>
                                            <td>{val.linkedItems}</td>
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

export default RDRashanCategories;
