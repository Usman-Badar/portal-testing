/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import './Style.css';

import JSAlert from 'js-alert';
import $ from 'jquery';
import { Link, Route, Switch } from 'react-router-dom';
import Modal from '../../../../../UI/Modal/Modal';
import { useSelector } from 'react-redux';
import { useReactToPrint } from 'react-to-print';
import BreadCrumb from '../../../Components/BreadCrumb';
import moment from 'moment';
import { convertTZ } from '../../../../../../utils/date';

import ReactTooltip from 'react-tooltip';
import axios from '../../../../../../axios';

const UI = ( { setSPRSpecifications, setPR, setPRCode, CompanyViewer, Status, RequestStatuses, RemovedBills, AccessDefined, Admin, SPRSpecifications, PRCode, FilterPRCompany, FilterCompany, SpecKeyword, FilterAmount, LoadedCompanies, POUpdate, EditConfirmation, setStatus, setRemovedBills, setFilterPRCompany, setBills, setFilterAmount, setFilterCompany, setSpecKeyword, setEditConfirmation, updatePO, Vendor, Data, SubOrdinands, loadSubOrdinands, SubTotalCostCalculation, TotalCostCalculation, PRSpecifications, PRequestDetails, AdditionalRows, addAdditionalRow, PR, PRList, attachPR, PRAttachment, onFooterContentInput, selectVendor, Vendors, addRow, setPRAttachment, ApproveRequisition, AttachedBills, Specifications, RequestDetails, history, Requests, RejectRequisition, searchVendor, CancelRequisition, SubmitConfirmation, ShowBillModal, Bills, Locations, Companies, SubmitPO, loadRequests, openRequestDetails, POSubmittion, setSubmitConfirmation, onAttachBills, onContentInput, setShowBillModal } ) => {
    
    const { FormatMoney } = require('format-money-js');
    const fm = new FormatMoney({ symbol: 'Rs ', decimals: 2 });
    const Relations = useSelector((state) => state.EmpAuth.Relations);
    const AccessControls = useSelector( ( state ) => state.EmpAuth.EmployeeData );

    return (
        <>
            <div className="purchase_order">
                {
                    window.location.hash.includes('/purchase/order/recursive/details?po_id=')
                    ?
                    <BreadCrumb links={[{label: 'All PO Templates', href: '/purchase/order/recursive/requests'}]} currentLabel={ "PO Template Details - " + ( RequestDetails ? ( 'Ref #' + RequestDetails.po_id ) : '' ) } />
                    :
                    window.location.hash.includes('/purchase/order/recursive/form')
                    ?
                    <BreadCrumb links={[{label: 'All PO Templates', href: '/purchase/order/recursive/requests'}]} currentLabel="Purchase Order Form" />
                    :null
                }
                <Modal show={ ShowBillModal } Hide={ () => setShowBillModal(!ShowBillModal) } content={ <ModalContent RemovedBills={ RemovedBills } setRemovedBills={ setRemovedBills } setBills={ setBills } setShowBillModal={ setShowBillModal } Bills={ Bills } onAttachBills={ onAttachBills } /> } />
                <div className="purchase_order_form">
                    <Modal show={ SubmitConfirmation } Hide={ () => setSubmitConfirmation(!SubmitConfirmation) } content={ <SubmitConfirmationModal Data={ Data } Relations={ Relations } POSubmittion={ POSubmittion } /> } />
                    <Modal show={ EditConfirmation } Hide={ () => setEditConfirmation(!EditConfirmation) } content={ <EditConfirmationModal Relations={ Relations } Data={ Data } RequestDetails={ RequestDetails } POUpdate={ POUpdate } /> } />
                    <Modal show={ PRAttachment } Hide={ () => setPRAttachment(!PRAttachment) } content={ <PRAttachmentModal PR={ PR } FilterPRCompany={ FilterPRCompany } attachPR={ attachPR } PRList={ PRList } /> } />

                    <Switch>
                        <Route exact path="/purchase/order/recursive/form" render={ 
                            () => (
                                <POForm 
                                    Locations={ Locations }
                                    Companies={ Companies }
                                    Bills={ Bills }
                                    history={ history }
                                    Vendors={ Vendors }
                                    PR={ PR }
                                    Vendor={ Vendor }
                                    PRCode={ PRCode }
                                    SPRSpecifications={ SPRSpecifications }
                                    
                                    setPRCode={ setPRCode }
                                    setPR={ setPR }
                                    setSPRSpecifications={ setSPRSpecifications }
                                    setFilterPRCompany={ setFilterPRCompany }
                                    SubTotalCostCalculation={ SubTotalCostCalculation }
                                    TotalCostCalculation={ TotalCostCalculation }
                                    onFooterContentInput={ onFooterContentInput }
                                    addAdditionalRow={ addAdditionalRow }
                                    setPRAttachment={ setPRAttachment }
                                    selectVendor={ selectVendor }
                                    searchVendor={ searchVendor }
                                    addRow={ addRow }
                                    SubmitPO={ SubmitPO }
                                    onContentInput={ onContentInput }
                                    setShowBillModal={ setShowBillModal }
                                />
                            )
                        } />
                        <Route exact path="/purchase/order/recursive/form&&po_id=:id" render={ 
                            () => (
                                <POFormForEditing 
                                    Locations={ Locations }
                                    Companies={ Companies }
                                    Bills={ Bills }
                                    history={ history }
                                    Vendors={ Vendors }
                                    PR={ PR }
                                    PRCode={ PRCode }
                                    Specifications={ Specifications }
                                    RequestDetails={ RequestDetails }
                                    AdditionalRows={ AdditionalRows }
                                    SPRSpecifications={ SPRSpecifications }
                                    
                                    setSPRSpecifications={ setSPRSpecifications }
                                    setPR={ setPR }
                                    setPRCode={ setPRCode }
                                    openRequestDetails={ openRequestDetails }
                                    onFooterContentInput={ onFooterContentInput }
                                    addAdditionalRow={ addAdditionalRow }
                                    setPRAttachment={ setPRAttachment }
                                    selectVendor={ selectVendor }
                                    searchVendor={ searchVendor }
                                    addRow={ addRow }
                                    updatePO={ updatePO }
                                    onContentInput={ onContentInput }
                                    setShowBillModal={ setShowBillModal }
                                />
                            )
                        } />
                        <Route exact path="/purchase/order/recursive/requests" render={ 
                            () => (
                                <PORequests 
                                    Requests={ Requests }
                                    history={ history }
                                    AccessControls={ AccessControls }
                                    FilterCompany={ FilterCompany }
                                    SpecKeyword={ SpecKeyword }
                                    FilterAmount={ FilterAmount }
                                    LoadedCompanies={ LoadedCompanies }
                                    AccessDefined={ AccessDefined }
                                    Status={ Status }
                                    RequestStatuses={ RequestStatuses }
                                    fm={ fm }

                                    setStatus={ setStatus }
                                    setFilterAmount={ setFilterAmount }
                                    setFilterCompany={ setFilterCompany }
                                    setSpecKeyword={ setSpecKeyword }
                                    loadRequests={ loadRequests }
                                />
                            )
                        } />
                        <Route exact path="/purchase/order/recursive/details" render={ 
                            () => (
                                <RequestDetailsView 
                                    RequestDetails={ RequestDetails }
                                    Specifications={ Specifications }
                                    Bills={ AttachedBills }
                                    history={ history }
                                    AdditionalRows={ AdditionalRows }
                                    PRequestDetails={ PRequestDetails }
                                    PRSpecifications={ PRSpecifications }
                                    SubOrdinands={ SubOrdinands }
                                    Admin={ Admin }
                                    fm={ fm }
                                    CompanyViewer={ CompanyViewer }

                                    loadSubOrdinands={ loadSubOrdinands }
                                    openRequestDetails={ openRequestDetails }
                                    CancelRequisition={ CancelRequisition }
                                    RejectRequisition={ RejectRequisition }
                                    ApproveRequisition={ ApproveRequisition }
                                />
                            )
                        } />
                    </Switch>
                </div>
            </div>
        </>
    );

}

export default UI;

const POForm = ( { setPRCode, setPR, setSPRSpecifications, SPRSpecifications, PRCode, SubTotalCostCalculation, TotalCostCalculation, Vendor, onFooterContentInput, PR, addAdditionalRow, setFilterPRCompany, setPRAttachment, Vendors, history, Locations, Bills, Companies, SubmitPO, selectVendor, addRow, searchVendor, setShowBillModal, onContentInput } ) => {

    const [ Drafts, setDrafts ] = useState(false);

    const saveToDraft = () => {

        let company_code = $('select[name="company_code"]').val();
        let company_name = $('select[name="company_code"] option:selected').text();
        let location_code = $('select[name="location_code"]').val();
        let location_name = $('select[name="location_code"] option:selected').text();
        let invoice_no = $('input[name="invoice_no"]').val();
        let draft_id = $('input#draft_id').val();
        let vendor_id = Vendor;
        
        let new_purchase = $('input[name="new_purchase"]')[0].checked;
        let repair = $('input[name="repair"]')[0].checked;
        let replace_recycle = $('input[name="replace_recycle"]')[0].checked;
        let invoice_attached = $('input[name="invoice_attached"]')[0].checked;

        let rows = document.getElementById('specifications_table_body').childNodes;
        let rows_array = Object.keys(rows).map((key) => [rows[key]]);
        let specifications = [];

        for ( let x = 0; x < rows_array.length; x++ )
        {
            let row = [];
            let columns = rows_array[x][0].childNodes;
            let columns_array = Object.keys(columns).map((key) => [columns[key]])
            for ( let y = 0; y < columns_array.length; y++ )
            {
                row.push(
                    {
                        id: columns_array[y][0].id,
                        value: columns_array[y][0].textContent
                    }
                );
            }

            specifications.push( row );

        }

        
        let footer_rows = document.getElementById('specifications_table_footer').childNodes;
        let filtered_rows = Array.from(footer_rows).filter(row => row.id.includes('additional_labels_'));
        let footer_rows_array = Object.keys(filtered_rows).map((key) => [filtered_rows[key]]);
        let additional_specifications = [];

        for ( let x = 0; x < footer_rows_array.length; x++ )
        {
            let label_column = footer_rows_array[x][0].childNodes[4];
            let label_value_column = footer_rows_array[x][0].childNodes[5];
            additional_specifications.push(
                {
                    label: label_column.textContent,
                    value: label_value_column.textContent
                }
            )
        }

        const data = {
            draft_id: new Date().getTime(),
            company_code: company_code,
            company_name: company_name,
            location_name: location_name,
            location_code: location_code,
            invoice_no: invoice_no,
            vendor_id: vendor_id,
            vendor_name: document.getElementById('vendor_id').value,
            new_purchase: new_purchase,
            repair: repair,
            replace_recycle: replace_recycle,
            invoice_attached: invoice_attached,
            specifications: JSON.stringify(specifications),
            additional_specifications: JSON.stringify(additional_specifications)
        }

        if ( localStorage.getItem('poDrafts') )
        {

            let po_list = JSON.parse(localStorage.getItem('poDrafts'));
            let exists = false;
            for ( let x = 0; x < po_list.length; x++ )
            {
                if ( po_list[x].draft_id == draft_id )
                {
                    po_list[x] = data;
                    localStorage.setItem('poDrafts', JSON.stringify(po_list));
                    exists = true;
                    JSAlert.alert("PO Saved In Draft.").dismissIn(1000 * 1);
                    history.replace('/dashboard');
                    setTimeout(() => {
                        history.replace('/purchase/order/recursive/form');
                    }, 200);
                }
            }

            if ( !exists )
            {
                if ( po_list.length < 5 )
                {
                    po_list.push(data);
                    localStorage.setItem('poDrafts', JSON.stringify(po_list));
                    JSAlert.alert("PO Saved In Draft.").dismissIn(1000 * 1);
                    history.replace('/dashboard');
                    setTimeout(() => {
                        history.replace('/purchase/order/recursive/form');
                    }, 200);
                }else
                {
                    JSAlert.alert("PO Draft Limit Exceed 😒.").dismissIn(1000 * 1);
                }
            }

        }else
        {
            localStorage.setItem('poDrafts', JSON.stringify([data]));
            JSAlert.alert("PO Saved In Draft.").dismissIn(1000 * 1);
            history.replace('/dashboard');
            setTimeout(() => {
                history.replace('/purchase/order/recursive/form');
            }, 200);
        }

    }

    const clearDraft = ( index ) => {

        let po_list = JSON.parse(localStorage.getItem('poDrafts'));

        let arr = po_list.filter(function(item, id) {
            return id !== index
        });

        if ( arr.length === 0 )
        {
            localStorage.removeItem('poDrafts');
        }else
        {
            localStorage.setItem('poDrafts', JSON.stringify(arr));
        }

        setDrafts(!Drafts);

    }

    const activateDraft = ( index ) => {

        let po_list = JSON.parse(localStorage.getItem('poDrafts'));
        let po = po_list[index];
        $('select[name="company_code"]').val(po.company_code);
        $('select[name="location_code"]').val(po.location_code);
        $('input[name="invoice_no"]').val(po.invoice_no);
        $('input[name="vendor_name"]').val(po.vendor_name);

        selectVendor( po.vendor_id, po.vendor_name );
        
        $('input[name="new_purchase"]').prop('checked', po.new_purchase);
        $('input[name="repair"]').prop('checked', po.repair);
        $('input[name="replace_recycle"]').prop('checked', po.replace_recycle);
        $('input[name="invoice_attached"]').prop('checked', po.invoice_attached);

        $("#specifications_table_body").children("tr").remove();
        $("#specifications_table_footer").children("tr").eq(1).remove();

        let specifications = JSON.parse(po.specifications);
        for( let x = 0; x < specifications.length; x++ )
        {
            addRows( specifications[x] );
        }

        let additional_specifications = JSON.parse(po.additional_specifications);
        for( let x = 0; x < additional_specifications.length; x++ )
        {
            addAdditionalRows( additional_specifications[x] );
        }

        SubTotalCostCalculation();
        TotalCostCalculation();

        document.getElementById('draft_id').value = po.draft_id;

    }

    const addRows = ( val ) => {

        let rows = document.getElementById('specifications_table_body').childNodes;
        let row = document.createElement('tr');
        row.id = "specification_row_" + parseInt(rows.length + 1);
    
        let column_serial_number = document.createElement('td');
        column_serial_number.id = "specification_serial_number_" + parseInt(rows.length + 1);
        column_serial_number.textContent = val[0].value;
        
        let column_description = document.createElement('td');
        column_description.contentEditable = true;
        column_description.addEventListener( 'input', onContentInput );
        column_description.id = "specification_description_" + parseInt(rows.length + 1);
        column_description.textContent = val[1].value;
        
        let column_quantity = document.createElement('td');
        column_quantity.contentEditable = true;
        column_quantity.addEventListener( 'input', onContentInput );
        column_quantity.id = "specification_quantity_" + parseInt(rows.length + 1);
        column_quantity.textContent = val[2].value;
        
        let column_unit = document.createElement('td');
        column_unit.contentEditable = true;
        column_unit.addEventListener( 'input', onContentInput );
        column_unit.id = "specification_unit_" + parseInt(rows.length + 1);
        column_unit.textContent = val[3].value;
        
        let column_est_cost = document.createElement('td');
        column_est_cost.contentEditable = true;
        column_est_cost.addEventListener( 'input', onContentInput );
        column_est_cost.id = "specification_est_cost_" + parseInt(rows.length + 1);
        column_est_cost.textContent = val[4].value;
        
        let column_total_est_cost = document.createElement('td');
        column_total_est_cost.id = "specification_total_cost_" + parseInt(rows.length + 1);
        column_total_est_cost.textContent = val[5].value;
    
        row.appendChild(column_serial_number);
        row.appendChild(column_description);
        row.appendChild(column_quantity);
        row.appendChild(column_unit);
        row.appendChild(column_est_cost);
        row.appendChild(column_total_est_cost);
    
        document.getElementById('specifications_table_body').appendChild(row);
    
    }

    const addAdditionalRows = ( val ) => {

        let rows = document.getElementById('specifications_table_footer').childNodes;
        let filtered_rows = Array.from(rows).filter(row => row.id.includes('additional_labels_'));
        let total = document.getElementById('final_total');
        let row = document.createElement('tr');
        row.id = "additional_labels_" + parseInt(filtered_rows.length + 1);
    
        let empty_column_1 = document.createElement('td');
        empty_column_1.className = "border-0";
        
        let empty_column_2 = document.createElement('td');
        empty_column_2.className = "border-0";
        
        let empty_column_3 = document.createElement('td');
        empty_column_3.className = "border-0";
        
        let empty_column_4 = document.createElement('td');
        empty_column_4.className = "border-0";
        
        let label_column = document.createElement('td');
        label_column.contentEditable = true;
        label_column.addEventListener( 'input', onFooterContentInput );
        label_column.className = "text-center";
        label_column.id = "additional_label_" + parseInt(filtered_rows.length + 1);
        label_column.textContent = val.label;
        
        let label_value_column = document.createElement('td');
        label_value_column.contentEditable = true;
        label_value_column.addEventListener( 'input', onFooterContentInput );
        label_value_column.id = "additional_value_" + parseInt(filtered_rows.length + 1);
        label_value_column.textContent = val.value;
    
        row.appendChild(empty_column_1);
        row.appendChild(empty_column_2);
        row.appendChild(empty_column_3);
        row.appendChild(empty_column_4);
        row.appendChild(label_column);
        row.appendChild(label_value_column);
    
        document.getElementById('specifications_table_footer').insertBefore(row, total);
    
    }

    return (
        <>
            <div className="d-flex align-items-center justify-content-between">
                <h3 className="heading">
                    Purchase Order Template
                    <sub>Make template of purchase orders</sub>
                    <input type="text" id="draft_id" className='d-none' />
                </h3>

                <div className="btn-group">
                    <button className="btn light" type='reset' onClick={ () => history.replace('/purchase/order/recursive/requests') }>
                        Back
                    </button>
                    {/* {
                        localStorage.getItem('poDrafts')
                        ?
                        <button className="btn green draftBtn" type='button'>
                            Draft <sup>({ JSON.parse(localStorage.getItem('poDrafts')).length })</sup>
                            <div className='draft_list'>

                                {
                                    JSON.parse(localStorage.getItem('poDrafts')).map(
                                        ( val, index ) => {
                                            return (
                                                <div className="draftItem" key={ index }>
                                                    <div onClick={ () => activateDraft(index) }>
                                                        <b>
                                                            { val.company_name }
                                                        </b><br />
                                                        <span>
                                                            { val.location_name }
                                                        </span>
                                                        <br />
                                                        {
                                                            JSON.parse(val.specifications).map(
                                                                ( value, id ) => {
                                                                    return <span key={id}>{ value[1].value + ( (id + 1) === JSON.parse(val.specifications).length ? '' : ',' ) }</span>
                                                                }
                                                            )
                                                        }
                                                    </div>
                                                    <i className="las la-times-circle" onClick={ () => clearDraft(index) }></i>
                                                </div>
                                            )
                                        }
                                    )
                                }

                            </div>
                        </button>
                        :null
                    }
                    <button className={ localStorage.getItem('poDrafts') ? "btn submit" : "btn green" } type='button' onClick={ saveToDraft }>
                        Save
                    </button> */}
                </div>
            </div>
            <hr />

            <form onSubmit={ SubmitPO }>   
                <fieldset>
                    <div className="flex_container mb-3">

                        <div>
                            <label className="mb-0"><b>Company Name</b></label>
                            <select className="form-control" name="company_code" onChange={ (e) => { setFilterPRCompany(e.target.options[e.target.selectedIndex].text) } } required>
                                <option value=''>Select the option</option>
                                {
                                    Companies.map(
                                        val => {

                                            return <option key={ val.company_code } value={ val.company_code }> { val.company_name } </option>

                                        }
                                    )
                                }
                            </select>
                        </div>
                        <div>
                            <label className="mb-0"><b>Invoice No</b></label>
                            <input className="form-control" name="invoice_no" />
                        </div>

                    </div>
                    <div className="flex_container mb-3">

                        <div>
                            <label className="mb-0"><b>Vendor</b></label>
                            <div className="p-relative">
                                <input className="form-control" name="vendor_id" id="vendor_id" onChange={ searchVendor } required />
                                {
                                    Vendors
                                    ?
                                    <div className="vendor_list">
                                        {
                                            Vendors.length === 0
                                            ?
                                            <p className="mb-0 text-center"> No Record Found </p>
                                            :
                                            Vendors.map(
                                                ( val, index ) => {
                                                    return (
                                                        <div key={ index } className="item" onClick={ () => selectVendor( val.vender_id, val.name ) }>
                                                            <label className="font-weight-bold mb-0">{ val.name }</label>
                                                            <p className="mb-0">{ val.phone }</p>
                                                            <p className="mb-0">{ val.address }</p>
                                                        </div>
                                                    )
                                                }
                                            )
                                        }
                                    </div>
                                    :null
                                }
                            </div>
                        </div>
                        <div>
                            <label className="mb-0"><b>Ship To (Location)</b></label>
                            <select className="form-control" name="location_code" required>
                                <option value=''>Select the option</option>
                                {
                                    Locations.map(
                                        val => {

                                            return <option key={ val.location_code } value={ val.location_code }> { val.location_name } </option>

                                        }
                                    )
                                }
                            </select>
                        </div>

                    </div>
                    <div className="grid_container mb-3 px-5">

                        <div className='grid_container align-items-center'>
                            <span>New Purchase</span>
                            <input type="checkbox" value="New Purchase" name="new_purchase" className='ml-2' />
                        </div>
                        <div className='grid_container align-items-center'>
                            <span>Repair</span>
                            <input type="checkbox" value="Repair" name="repair" className='ml-2' />
                        </div>
                        <div className='grid_container align-items-center'>
                            <span>Replacement / Recycle</span>
                            <input type="checkbox" value="Replacement / Recycle" name="replace_recycle" className='ml-2' />
                        </div>
                        <div className='grid_container align-items-center'>
                            <span>Invoice Attached</span>
                            <input type="checkbox" value="Invoice Attached" name="invoice_attached" className='ml-2' />
                        </div>

                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                        <label className='mb-1'><b>Purchase / Repair / Recycle / Replacement Specifications</b></label>
                        <i className="las la-plus-circle la-2x" style={ { cursor: 'pointer' } } title='Add New Row' onClick={ addRow }></i>
                    </div>
                    <table className="table table-bordered border-0">
                        <thead>
                            <tr>
                                <th className='text-center'>Sr.No.</th>
                                <th className='text-center'>Description</th>
                                <th className='text-center'>Quantity</th>
                                <th className='text-center'>Unit</th>
                                <th className='text-center'>Unit Price</th>
                                <th className='text-center'>Total Price</th>
                            </tr>
                        </thead>
                        <tbody id="specifications_table_body">
                            <tr id="specification_row_1">
                                <td id="specification_serial_number_1"></td>
                                <td id="specification_description_1" contentEditable onInput={ onContentInput }></td>
                                <td id="specification_quantity_1" contentEditable onInput={ onContentInput }></td>
                                <td id="specification_unit_1" contentEditable onInput={ onContentInput }></td>
                                <td id="specification_est_cost_1" contentEditable onInput={ onContentInput }></td>
                                <td id="specification_total_cost_1"></td>
                            </tr>
                        </tbody>
                        <tfoot id="specifications_table_footer">
                            <tr id="specification_total_row">
                                <td className='border-0'></td>
                                <td className='border-0'></td>
                                <td className='border-0'></td>
                                <td className='border-0'></td>
                                <td className='text-center' id="sub_total_calculated_amount_label"><b>Sub Total</b></td>
                                <td id="sub_total_calculated_amount"></td>
                            </tr>
                            <tr id="additional_labels_1">
                                <td className='border-0'></td>
                                <td className='border-0'></td>
                                <td className='border-0'></td>
                                <td className='border-0'></td>
                                <td className='text-center' id="additional_label_1" contentEditable onInput={ onFooterContentInput }></td>
                                <td id="additional_value_1" contentEditable onInput={ onFooterContentInput }></td>
                            </tr>
                            <tr id="final_total">
                                <td className='border-0'></td>
                                <td className='border-0'></td>
                                <td className='border-0'></td>
                                <td className='border-0 plus'>
                                    <i className="las la-plus-circle la-2x" style={ { cursor: 'pointer' } } title='Add New Row' onClick={ addAdditionalRow }></i>
                                </td>
                                <td className='text-center' id="total_calculated_amount_label"><b>Total</b></td>
                                <td id="total_calculated_amount"></td>
                            </tr>
                        </tfoot>
                    </table>
                    <div className="d-flex align-items-center justify-content-between">
                        <div className="btn-group">
                            <button className="btn green" type='button' onClick={ () => setShowBillModal(true) }>Attached Bills ({ Bills.length })</button>
                            <button title={ SPRSpecifications } className="btn submit" type='button' onClick={ () => setPRAttachment(true) }> { PR ? "PR (" + PRCode + ") Attached" : "Attach PR" }</button>
                                {
                                    PR && <button className='btn cancle' onClick={() => {
                                        setPRCode();
                                        setPR();
                                        setSPRSpecifications();
                                        setPRAttachment();
                                    }}>Remove PR</button>
                                }
                        </div>
                        <button className="btn submit" type='submit'>Save Template</button>
                    </div>
                </fieldset>
            </form>
        </>
    )

}

const POFormForEditing = ( { setSPRSpecifications, setPR, setPRCode, PRCode, SPRSpecifications, updatePO, AdditionalRows, RequestDetails, Specifications, openRequestDetails, onFooterContentInput, PR, addAdditionalRow, setPRAttachment, Vendors, history, Locations, Bills, Companies, SubmitPO, selectVendor, addRow, searchVendor, setShowBillModal, onContentInput } ) => {

    useEffect(
        () => {
            if ( !RequestDetails )
            {
                const po_id = window.location.href.split('&&po_id=').pop();
                openRequestDetails( po_id, true );
            }else
            {
                selectVendor( RequestDetails.vendor_id, RequestDetails.vendor_name );
            }
        }, [RequestDetails]
    );

    return (
        <>
            <div className="d-flex align-items-center justify-content-between">
                <h3 className="heading">
                    Update Purchase order Template
                    <sub>Template Form For Editing</sub>
                    <input type="text" id="draft_id" className='d-none' />
                </h3>

                <div className="btn-group">
                    <button className="btn submit" type='reset' onClick={ () => history.replace('/purchase/order/recursive/requests') }>
                        Back
                    </button>
                </div>
            </div>
            <hr />

            {
                RequestDetails
                ?
                <form onSubmit={ updatePO }>   
                    <fieldset>
                        <div className="flex_container mb-3">

                            <div>
                                <label className="mb-0"><b>Company Name</b></label>
                                <select className="form-control" name="company_code" disabled required>
                                    <option value=''>Select the option</option>
                                    {
                                        Companies.map(
                                            val => {

                                                return <option key={ val.company_code } value={ val.company_code } selected={RequestDetails.company_code === val.company_code}> { val.company_name } </option>

                                            }
                                        )
                                    }
                                </select>
                            </div>
                            <div>
                                <label className="mb-0"><b>Invoice No</b></label>
                                <input className="form-control" name="invoice_no" defaultValue={RequestDetails.invoice_no} />
                            </div>

                        </div>
                        <div className="flex_container mb-3">

                            <div>
                                <label className="mb-0"><b>Vendor</b></label>
                                <div className="p-relative">
                                    <input className="form-control" name="vendor_id" id="vendor_id" onChange={ searchVendor } required />
                                    {
                                        Vendors
                                        ?
                                        <div className="vendor_list">
                                            {
                                                Vendors.length === 0
                                                ?
                                                <p className="mb-0 text-center"> No Record Found </p>
                                                :
                                                Vendors.map(
                                                    ( val, index ) => {
                                                        return (
                                                            <div key={ index } className="item" onClick={ () => selectVendor( val.vender_id, val.name ) }>
                                                                <label className="font-weight-bold mb-0">{ val.name }</label>
                                                                <p className="mb-0">{ val.phone }</p>
                                                                <p className="mb-0">{ val.address }</p>
                                                            </div>
                                                        )
                                                    }
                                                )
                                            }
                                        </div>
                                        :null
                                    }
                                </div>
                            </div>
                            <div>
                                <label className="mb-0"><b>Ship To (Location)</b></label>
                                <select className="form-control" name="location_code" required>
                                    <option value=''>Select the option</option>
                                    {
                                        Locations.map(
                                            val => {

                                                return <option key={ val.location_code } value={ val.location_code } selected={RequestDetails.location_code === val.location_code}> { val.location_name } </option>

                                            }
                                        )
                                    }
                                </select>
                            </div>

                        </div>

                        <div className="grid_container mb-3 px-5">

                            <div className='grid_container align-items-center'>
                                <span>New Purchase</span>
                                <input defaultChecked={RequestDetails.new_purchase === 1} type="checkbox" value="New Purchase" name="new_purchase" className='ml-2' />
                            </div>
                            <div className='grid_container align-items-center'>
                                <span>Repair</span>
                                <input defaultChecked={RequestDetails.repair === 1} type="checkbox" value="Repair" name="repair" className='ml-2' />
                            </div>
                            <div className='grid_container align-items-center'>
                                <span>Replacement / Recycle</span>
                                <input defaultChecked={RequestDetails.replace_recycle === 1} type="checkbox" value="Replacement / Recycle" name="replace_recycle" className='ml-2' />
                            </div>
                            <div className='grid_container align-items-center'>
                                <span>Invoice Attached</span>
                                <input defaultChecked={RequestDetails.invoice_attached === 1} type="checkbox" value="Invoice Attached" name="invoice_attached" className='ml-2' />
                            </div>

                        </div>

                        <div className="d-flex justify-content-between align-items-center">
                            <label className='mb-1'><b>Purchase / Repair / Recycle / Replacement Specifications</b></label>
                            <i className="las la-plus-circle la-2x" style={ { cursor: 'pointer' } } title='Add New Row' onClick={ addRow }></i>
                        </div>

                        <table className="table table-bordered border-0">
                            <thead>
                                <tr>
                                    <th className='text-center'>Sr.No.</th>
                                    <th className='text-center'>Description</th>
                                    <th className='text-center'>Quantity</th>
                                    <th className='text-center'>Unit</th>
                                    <th className='text-center'>Unit Price</th>
                                    <th className='text-center'>Total Price</th>
                                </tr>
                            </thead>
                            <tbody id="specifications_table_body">
                                {
                                    Specifications.map(
                                        ( val, index ) => {
                                            const num = index + 1;
                                            return (
                                                <tr id={ "specification_row_" + num } key={ index }>
                                                    <td id={ "specification_serial_number_" + num }>{val.specification_serial_number}</td>
                                                    <td id={ "specification_description_" + num } contentEditable onInput={ onContentInput }>{val.specification_description}</td>
                                                    <td id={ "specification_quantity_" + num } contentEditable onInput={ onContentInput }>{val.specification_quantity}</td>
                                                    <td id={ "specification_unit_" + num } contentEditable onInput={ onContentInput }>{val.specification_unit}</td>
                                                    <td id={ "specification_est_cost_" + num } contentEditable onInput={ onContentInput }>{val.specification_est_cost}</td>
                                                    <td id={ "specification_total_cost_" + num }>{val.specification_total_cost}</td>
                                                </tr>
                                            )
                                        }
                                    )
                                }
                            </tbody>
                            <tfoot id="specifications_table_footer">
                                <tr id="specification_total_row">
                                    <td className='border-0'></td>
                                    <td className='border-0'></td>
                                    <td className='border-0'></td>
                                    <td className='border-0'></td>
                                    <td className='text-center' id="sub_total_calculated_amount_label"><b>Sub Total</b></td>
                                    <td id="sub_total_calculated_amount">{RequestDetails.total_sub_value}</td>
                                </tr>
                                {
                                    AdditionalRows && AdditionalRows.map(
                                        (val, index) => {
                                            const num = index + 1;
                                            return (
                                                <tr id={"additional_labels_" + num} key={index}>
                                                    <td className='border-0'></td>
                                                    <td className='border-0'></td>
                                                    <td className='border-0'></td>
                                                    <td className='border-0'></td>
                                                    <td className='text-center' id={"additional_label_" + num} contentEditable onInput={ onFooterContentInput }>{val.label}</td>
                                                    <td id={"additional_value_" + num} contentEditable onInput={ onFooterContentInput }>{val.value}</td>
                                                </tr>
                                            )
                                        }
                                    )
                                }
                                <tr id="final_total">
                                    <td className='border-0'></td>
                                    <td className='border-0'></td>
                                    <td className='border-0'></td>
                                    <td className='border-0 plus'>
                                        <i className="las la-plus-circle la-2x" style={ { cursor: 'pointer' } } title='Add New Row' onClick={ addAdditionalRow }></i>
                                    </td>
                                    <td className='text-center' id="total_calculated_amount_label"><b>Total</b></td>
                                    <td id="total_calculated_amount">{RequestDetails.total_value}</td>
                                </tr>
                            </tfoot>
                        </table>

                        <div className="d-flex align-items-center justify-content-between">
                            <div className="btn-group">
                                <button className="btn green" type='button' onClick={ () => setShowBillModal(true) }>Attached Bills ({ Bills.length })</button>
                                <button title={ SPRSpecifications } className="btn submit" type='button' onClick={ () => setPRAttachment(true) }> { PR ? "PR (" + PRCode + ") Attached" : "Attach PR" }</button>
                                {
                                    PR && <button className='btn cancle' onClick={() => {
                                        setPRCode();
                                        setPR();
                                        setPRAttachment();
                                        setSPRSpecifications();
                                    }}>Remove PR</button>
                                }
                            </div>
                            <button className="btn submit" type='submit'>Update Template</button>
                        </div>
                    </fieldset>
                </form>
                :null
            }
        </>
    )

}

const RequestDetailsView = ( { CompanyViewer, fm, Admin, SubOrdinands, loadSubOrdinands, PRSpecifications, PRequestDetails, AdditionalRows, ApproveRequisition, history, Bills, Specifications, RequestDetails, CancelRequisition, RejectRequisition, openRequestDetails } ) => {

    const onBeforeGetContentResolve = useRef();
    
    const [PrintContentLoaded, setPrintContentLoaded] = useState(false);
    const [ StartPrint, setStartPrint ] = useState(false);
    const [ View, setView ] = useState("application");
    useEffect(
        () => {
            const po_id = window.location.href.split('?').pop().split('=').pop();
            openRequestDetails( po_id );
        }, []
    )
    useEffect(() => {
        if (PrintContentLoaded) {
            // Resolves the Promise, telling `react-to-print` it is time to gather the content of the page for printing
            onBeforeGetContentResolve.current();
        }
    }, [PrintContentLoaded, onBeforeGetContentResolve]);

    const printPO = () => {
        setStartPrint(true);
        handlePrint();
    }
    const handleOnBeforeGetContent = () => {
        return new Promise((resolve) => { // `react-to-print` will wait for this Promise to resolve before continuing
          // Load data
          onBeforeGetContentResolve.current = resolve;
          setPrintContentLoaded(true); // When data is done loading
        });
    };

    const componentRef = useRef();
    const handlePrint = useReactToPrint(
        {
            content: () => componentRef.current,
            copyStyles: true,
            pageStyle: 'p-3',
            onBeforeGetContent: handleOnBeforeGetContent,
            onAfterPrint: () => { setStartPrint(false); setPrintContentLoaded(false); }
        }
    );

    return (
        <>
            {
                RequestDetails
                ?
                CompanyViewer || Admin ||
                parseInt(RequestDetails.requested_by) === parseInt(localStorage.getItem("EmpID")) ||
                parseInt(RequestDetails.appr_rejct_by) === parseInt(localStorage.getItem("EmpID")) ||
                parseInt(RequestDetails.submitted_to) === parseInt(localStorage.getItem("EmpID"))
                ?
                <Detailing fm={ fm } componentRef={ componentRef } StartPrint={ StartPrint } printPO={ printPO } SubOrdinands={ SubOrdinands } loadSubOrdinands={ loadSubOrdinands } PRSpecifications={ PRSpecifications } PRequestDetails={ PRequestDetails } AdditionalRows={ AdditionalRows } ApproveRequisition={ ApproveRequisition } po_id={ window.location.href.split('?').pop().split('=').pop() } RejectRequisition={ RejectRequisition } CancelRequisition={ CancelRequisition } history={ history } Bills={ Bills } setView={ setView } View={ View } RequestDetails={ RequestDetails } Specifications={ Specifications } />
                :
                <>
                    <h6 className="text-center">Access Denied</h6>
                    <p className="text-center mb-0">
                        You don't have access to view the Purchase Order details (id#{RequestDetails.po_id}).
                    </p>
                </>
                :
                <h6 className="text-center">Loading Details....</h6>
            }
        </>
    )

}

const Detailing = ( { fm, componentRef, StartPrint, printPO, SubOrdinands, loadSubOrdinands, PRSpecifications, PRequestDetails, AdditionalRows, po_id, CancelRequisition, ApproveRequisition, RejectRequisition, history, Bills, View, setView, RequestDetails, Specifications } ) => {

    const [ CancelConfirm, setCancelConfirm ] = useState(false);
    const [ RejectConfirm, setRejectConfirm ] = useState(false);
    const [ ApprovalConfirm, setApprovalConfirm ] = useState(false);
    const [ EditConfirm, setEditConfirm ] = useState(false);
    const [ EditContent, setEditContent ] = useState(<></>);
    // const [ BackgroundPosition, setBackgroundPosition ] = useState("0% 0%");

    useEffect(
        () => {
            setEditContent(
                <div>
                    <h5>You want to edit this template?</h5>
                    <button className='btn light d-block ml-auto' onClick={ () => history.push('/purchase/order/recursive/form&&po_id=' + window.location.href.split('/').pop().split('po_id=').pop()) }>Yes</button>
                </div>
            )
        }, []
    )

    // const handleMouseMove = e => {
    //     const { left, top, width, height } = e.target.getBoundingClientRect()
    //     const x = (e.pageX - left) / width * 100
    //     const y = (e.pageY - top) / height * 100
    //     setBackgroundPosition(`${x}% ${y}%`);
    // }

    return (
        <>
            <div className='details_container'>
                <div className="purchase_requisition_details w-100">
                    <Modal show={ CancelConfirm } Hide={ () => setCancelConfirm(false) } content={ <CancelConfirmation po_id={ po_id } CancelRequisition={ CancelRequisition } /> } />
                    <Modal show={ ApprovalConfirm } Hide={ () => setApprovalConfirm(false) } content={ <ApprovalConfirmation SubOrdinands={ SubOrdinands } loadSubOrdinands={ loadSubOrdinands } requested_by={ RequestDetails.requested_by } po_id={ po_id } ApproveRequisition={ ApproveRequisition } /> } />
                    <Modal show={ RejectConfirm } Hide={ () => setRejectConfirm(false) } content={ <RejectConfirmation RequestDetails={ RequestDetails } Specifications={ Specifications } po_id={ po_id } RejectRequisition={ RejectRequisition } /> } />
                    <Modal show={ EditConfirm } Hide={ () => setEditConfirm(false) } content={ EditContent } />
                    <div className="d-flex align-items-end justify-content-between">
                        <h4 className="heading">
                            Purchase Order Template
                            <sub>Template Details</sub>
                        </h4>
                        <button className="btn light" onClick={ () => history.goBack() }>Back</button>
                    </div>
                    <br />
                    {/* <div className='ml-auto d-flex' style={ { width: 'fit-content' } }>
                        <div className="btn-group">
                            {
                                RequestDetails.requested_by != localStorage.getItem('EmpID') &&
                                RequestDetails.appr_rejct_by == localStorage.getItem('EmpID') &&
                                RequestDetails.status === 'waiting_for_approval'
                                ?
                                <>
                                    <button className="btn cancle" onClick={ () => setRejectConfirm(true) }>Reject</button>
                                    <button className="btn submit" onClick={ () => setApprovalConfirm(true) }>Approve</button>
                                </>
                                :null
                            }

                            {
                                RequestDetails.requested_by == localStorage.getItem('EmpID') &&
                                ( RequestDetails.status === 'sent' || RequestDetails.status === 'viewed' || RequestDetails.status === 'waiting_for_approval' )
                                ?
                                <>
                                    <button className="btn cancle" onClick={ () => setCancelConfirm(true) }>Cancel</button>
                                </>
                                :null
                            }
                        </div>
                    </div> */}
                    {
                        RequestDetails.requested_by == localStorage.getItem('EmpID') &&
                        ( RequestDetails.status === 'sent' || RequestDetails.status === 'viewed' || RequestDetails.status === 'waiting_for_approval' )
                        ?
                        <>
                            <button className="btn cancle d-block ml-auto" onClick={ () => setCancelConfirm(true) }>Delete</button>
                        </>
                        :null
                    }
                    {
                        View === 'application'
                        ?
                        <form className='popUps'>
                            <hr />
                            <p className="mb-1 ml-1">
                                <b>Invoice No: </b>
                                <span> {RequestDetails.invoice_no} </span>    
                            </p>  
                            <table className="table table-sm table-borderless">
                                <tbody>
                                    <tr>
                                        <td>
                                            <b>Company</b><br />
                                            <span>{ RequestDetails.company_name }</span>
                                        </td>
                                        <td>
                                            <b>Delivery / Work Location</b><br />
                                            <span>{ RequestDetails.location_name }</span>
                                        </td>
                                        <td>
                                            <b>Prepared By</b><br />
                                            <span>
                                                <Link to={ '/hr/employee/details/' + RequestDetails.requested_by } className='clickable'>{ RequestDetails.requested_employee_name }</Link> <br />
                                                { convertTZ(RequestDetails.requested_date).toDateString() + " at " + RequestDetails.requested_time.substring(0,5) }
                                            </span>
                                        </td>
                                        {/* <td>
                                            <b>Receiving at Accounts Dept.</b><br />
                                            <span>
                                                {
                                                    RequestDetails.view_date
                                                    ?
                                                    <>
                                                        <Link to={ '/hr/employee/details/' + RequestDetails.appr_rejct_by } className='clickable'>{ RequestDetails.hod_employee_name }</Link> <br />
                                                        { convertTZ(RequestDetails.view_date).toDateString() + ' at ' + RequestDetails.view_time.substring(0,5) }
                                                    </>
                                                    :
                                                    <span className={ RequestDetails.status + " text-white status_div" }>Not Viewed</span>
                                                }
                                            </span>
                                        </td> */}
                                    </tr>
                                    {/* <tr>
                                        <td>
                                            <b>Proceed To</b><br />
                                            <span>{ RequestDetails.submit_to_employee_name ? <Link to={ '/hr/employee/details/' + RequestDetails.appr_rejct_by } className='clickable'>{RequestDetails.submit_to_employee_name}</Link> : "Not Proceed Yet" }</span>
                                        </td>
                                        <td>
                                            <b>Request Status</b><br />
                                            <span className={ RequestDetails.status + " text-white status_div" }>{ RequestDetails.status.split('_').join(' ') }</span>
                                        </td>
                                        <>
                                            {
                                                RequestDetails.hod_employee_name != null
                                                ?
                                                RequestDetails.status === 'canceled'
                                                ?
                                                <>
                                                    <td>
                                                        <b>Cancel Date</b><br />
                                                        <span>{ convertTZ(RequestDetails.act_date).toDateString() } at { RequestDetails.act_time.substring(0,5) }</span>
                                                    </td>
                                                    <td>
                                                        <b>Reason To Cancel</b><br />
                                                        <span>{ RequestDetails.remarks_from_hod }</span>
                                                    </td>
                                                </>
                                                :
                                                RequestDetails.status === 'rejected'
                                                ?
                                                <>
                                                    <td>
                                                        <b>Rejected By</b><br />
                                                        <span>{ RequestDetails.hod_employee_name }</span>
                                                    </td>
                                                    <td>
                                                        <b>Accounts's Rejection</b><br />
                                                        <span>{ convertTZ(RequestDetails.act_date).toDateString() } at { RequestDetails.act_time.substring(0,5) }</span>
                                                    </td>
                                                </>
                                                :
                                                <>
                                                    {
                                                        RequestDetails.status === 'approved'
                                                        ?
                                                        <>
                                                            <td>
                                                                <b>Accounts's Approval</b><br />
                                                                <span>{ convertTZ(RequestDetails.act_date).toDateString() } at { RequestDetails.act_time.substring(0,5) }</span>
                                                            </td>
                                                            <td>
                                                                <b>Accounts's Remarks</b><br />
                                                                <span>{ RequestDetails.remarks_from_hod }</span>
                                                            </td>
                                                        </>
                                                        :null
                                                    }
                                                </>
                                                :null
                                            }
                                        </>
                                    </tr> */}
                                    <tr>
                                        <td colSpan={3}>
                                            <b>Additional Notes</b><br />
                                            <span>{ RequestDetails.note }</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <hr />
                            <fieldset disabled>

                                <div className="grid_container mb-3">

                                    <div className='w-100'>

                                        <h6 className='p-1' style={ { backgroundColor: '#e5e3e3' } }>Vendor</h6>

                                        <p className='font-weight-bold mb-0'>
                                            <Link to={ "/inventory/vendor/" + RequestDetails.vendor_id } className='clickable'>{ RequestDetails.vendor_name }</Link> - ({ RequestDetails.verified === 1 ? <span className='text-success'>Verified</span> : <span className='text-danger'>Not Verified</span> })
                                        </p>
                                        <p className="mb-0">{ RequestDetails.vendor_phone }</p>
                                        <p className="mb-0">{ RequestDetails.vendor_address }</p>

                                    </div>
                                    <div className='w-100'>
                                        {
                                            RequestDetails.new_purchase === 1
                                            ?
                                            <div className='w-100 mb-1 grid_container align-items-center'>
                                                <span>New Purchase</span>
                                                <input checked={ true } type="checkbox" className='ml-2' />
                                            </div>
                                            :null
                                        }
                                        {
                                            RequestDetails.repair
                                            ?
                                            <div className='w-100 mb-1 grid_container align-items-center'>
                                                <span>Repair</span>
                                                <input checked={ true } type="checkbox" className='ml-2' />
                                            </div>
                                            :null
                                        }
                                        {
                                            RequestDetails.replace_recycle
                                            ?
                                            <div className='w-100 mb-1 grid_container align-items-center'>
                                                <span>Replacement / Recycle</span>
                                                <input checked={ true } type="checkbox" className='ml-2' />
                                            </div>
                                            :null
                                        }
                                        {
                                            RequestDetails.invoice_attached
                                            ?
                                            <div className='w-100 mb-1 grid_container align-items-center'>
                                                <span>Invoice Attached</span>
                                                <input checked={ true } type="checkbox" className='ml-2' />
                                            </div>
                                            :null
                                        }
                                    </div>

                                </div>

                                <label className="mb-1"><b>Purchase / Repair / Replacement Specifications</b></label>

                                <table className="table table-borderless specifications-table">
                                    <thead>
                                        <tr>
                                            <th>Sr.No.</th>
                                            <th>Description</th>
                                            <th>Quantity</th>
                                            <th>Unit Price</th>
                                            <th className='text-right'>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            Specifications.map(
                                                ( val, index ) => {
                                                    return (
                                                        <tr key={ index }>
                                                            <td> { index + 1 } </td>
                                                            <td> { val.description } </td>
                                                            <td> { parseFloat(val.quantity).toFixed(2) } { val.unit } </td>
                                                            <td>{ fm.from(val.unit_price) }</td>
                                                            <td className='text-right'>{ fm.from(val.total_cost) }</td>
                                                        </tr>
                                                    )
                                                }
                                            )
                                        }
                                    </tbody>
                                    <br />
                                    <tfoot>
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td className='sub-total-td'><b>Sub Total</b></td>
                                            <td className='sub-total-td text-right'>{ fm.from(RequestDetails.total_sub_value) }</td>
                                        </tr>
                                        {
                                            AdditionalRows
                                            ?
                                            AdditionalRows.map(
                                                ( val, index ) => {
                                                    return (
                                                        <tr key={ index }>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                            <td className='text-capitalize'><b>{ val.label }</b></td>
                                                            <td className='text-right'>{ fm.from(val.value) }</td>
                                                        </tr>
                                                    )
                                                }
                                            )
                                            :null
                                        }
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td className='total-td'><b>Total</b></td>
                                            <td className='total-td text-right'>{ fm.from(RequestDetails.total_value) }</td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </fieldset>
                        </form>
                        :
                        View === 'bills'
                        ?
                        <div className='purchase_requisition_details_2' id="accordion">
                            
                            <div className='collapse_toogle mb-2 d-flex justify-content-between'>
                                <h6 className='mb-0'>Bills Attached</h6>
                                <h6 className='mb-0'>({Bills.length})</h6>
                            </div>
                            <div>
                                {
                                    Bills.length === 0
                                    ?
                                    <h6 className="text-center">No Bill Attached</h6>
                                    :
                                    <div className="grid_container">
                                            
                                        {
                                            Bills.map(
                                                (val, index) => {

                                                    return (
                                                        <div className='quotation_card'>
                                                            {
                                                                val.bill?.includes('.pdf')
                                                                ?
                                                                <iframe src={ process.env.REACT_APP_SERVER + '/' + val.bill } title="quotation_preview" key={ index } width="100%" style={{ flexGrow: 1, minHeight: 500 }}></iframe>
                                                                :
                                                                <img src={ process.env.REACT_APP_SERVER + '/' + val.bill } alt="quotation_preview" key={ index } />
                                                            }
                                                        </div>
                                                    )
                                                }
                                            )
                                        }

                                    </div>
                                }
                            </div>

                        </div>
                        :
                        <div className='purchase_requisition_details_2 mt-3' id="accordion">
                            <div className='collapse_toogle mb-2 d-flex justify-content-between'>
                                <h6 className='mb-0'>Attached Purchase Requisition</h6>
                                <h6 className='mb-0'>({PRequestDetails ? `${PRequestDetails.company_short_code + '-' + PRequestDetails.series_year + '-' + PRequestDetails.series_code}` : "Not Attached"})</h6>
                            </div>
                            {
                                PRequestDetails
                                ?
                                <>
                                    <table className='table table-sm table-borderless'>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <b>Company Name</b><br />
                                                    <span>{PRequestDetails.company_name}</span><br />
                                                    <b>Delivery / Work Location</b><br />
                                                    <span>{PRequestDetails.location_name}</span>
                                                </td>
                                                <td>
                                                    <b>Requested By</b><br />
                                                    <span>
                                                        {PRequestDetails.requested_employee_name} <br />
                                                        {new Date(PRequestDetails.requested_date).toDateString()} <br />
                                                        {PRequestDetails.requested_time}
                                                    </span>
                                                </td>
                                                <td>
                                                    <b>Submit To (Employee)</b><br />
                                                    <span>{PRequestDetails.submit_to_employee_name}</span><br />
                                                    <b>Employee Name (On Behalf Of)</b><br />
                                                    <span>{PRequestDetails.behalf_employee_name ? PRequestDetails.behalf_employee_name : <span className='text-secondary'>------</span>}</span>
                                                </td>
                                                <td>
                                                    {
                                                        PRequestDetails.view_date
                                                            ?
                                                            <>
                                                                <b>Viewed By</b><br />
                                                                <span>{PRequestDetails.submit_to_employee_name}</span><br />
                                                            </>
                                                            : null
                                                    }
                                                    <b>View Date & Time</b><br />
                                                    <span>
                                                        {
                                                            PRequestDetails.view_date
                                                                ?
                                                                <>
                                                                    {new Date(PRequestDetails.view_date).toDateString()} <br />
                                                                    {PRequestDetails.view_time}
                                                                </>
                                                                :
                                                                <span className={PRequestDetails.status + " text-white status_div"}>Not Viewed</span>
                                                        }
                                                    </span>
                                                </td>
                                                <td>
                                                    {
                                                        PRequestDetails.hod_employee_name != null
                                                            ?
                                                            PRequestDetails.status === 'rejected'
                                                                ?
                                                                <>
                                                                    <b>Rejected By</b><br />
                                                                    <span>{PRequestDetails.hod_employee_name}</span><br />
                                                                    <b>Date & Time</b><br />
                                                                    <span>{new Date(PRequestDetails.act_date).toDateString()} at {PRequestDetails.act_time}</span>
                                                                </>
                                                                :
                                                                <>
                                                                    <b>{PRequestDetails.status === 'canceled' ? "Canceled By" : "Proceed To"}</b><br />
                                                                    <span>{PRequestDetails.hod_employee_name}</span><br />
                                                                    {
                                                                        PRequestDetails.status === 'approved'
                                                                            ?
                                                                            <>
                                                                                <b>Date & Time</b><br />
                                                                                <span>{new Date(PRequestDetails.act_date).toDateString()} at {PRequestDetails.act_time}</span>
                                                                            </>
                                                                            :
                                                                            <>
                                                                                <b>Date & Time</b><br />
                                                                                <span className='text-danger'>Not Approved Yet</span>
                                                                            </>
                                                                    }
                                                                </>
                                                            : null
                                                    }
                                                </td>
                                                <td>
                                                    <b>Request Status</b><br />
                                                    <span className={PRequestDetails.status + " text-white status_div"}>{PRequestDetails.status.split('_').join(' ')}</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan={2}>
                                                    <b>Reason</b><br />
                                                    <span>{PRequestDetails.reason}</span>
                                                </td>
                                                <td colSpan={2}>
    
                                                    {
                                                        PRequestDetails.remarks != null
                                                            ?
                                                            <>
                                                                <b>{PRequestDetails.status === 'canceled' ? "Reason To Cancel" : "Inventory's Remarks"}</b><br />
                                                                <span>{PRequestDetails.remarks}</span>
                                                            </>
                                                            : null
                                                    }
                                                </td>
                                                <td colSpan={2}>
                                                    {
                                                        PRequestDetails.hod_employee_name != null ? PRequestDetails.status === 'rejected' ? null
                                                            :
                                                            <>
                                                                {
                                                                    PRequestDetails.status === 'approved'
                                                                        ?
                                                                        <>
                                                                            <b>H.O.D's Remarks</b><br />
                                                                            <span>{PRequestDetails.remarks_from_hod}</span>
                                                                        </>
                                                                        : null
                                                                }
                                                            </>
                                                            : null
                                                    }
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan={6}>
                                                    <b>Additional Notes</b><br />
                                                    <span>{PRequestDetails.note}</span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div className="grid_container py-3 mb-3 px-5 border-top border-bottom">
    
                                        {
                                            PRequestDetails.new_purchase === 1
                                                ?
                                                <div className='grid_container align-items-center'>
                                                    <b>New Purchase</b>
                                                    <input checked={true} type="checkbox" className='ml-2' />
                                                </div>
                                                : null
                                        }
                                        {
                                            PRequestDetails.repair
                                                ?
                                                <div className='grid_container align-items-center'>
                                                    <b>Repair</b>
                                                    <input checked={true} type="checkbox" className='ml-2' />
                                                </div>
                                                : null
                                        }
                                        {
                                            PRequestDetails.replace_recycle
                                                ?
                                                <div className='grid_container align-items-center'>
                                                    <b>Replacement / Recycle</b>
                                                    <input checked={true} type="checkbox" className='ml-2' />
                                                </div>
                                                : null
                                        }
                                        {
                                            PRequestDetails.budgeted
                                                ?
                                                <div className='grid_container align-items-center'>
                                                    <b>Budgeted</b>
                                                    <input checked={true} type="checkbox" className='ml-2' />
                                                </div>
                                                : null
                                        }
                                        {
                                            PRequestDetails.not_budgeted
                                                ?
                                                <div className='grid_container align-items-center'>
                                                    <b>Not Budgeted</b>
                                                    <input checked={true} type="checkbox" className='ml-2' />
                                                </div>
                                                : null
                                        }
                                        {
                                            PRequestDetails.invoice_attached
                                                ?
                                                <div className='grid_container align-items-center'>
                                                    <b>Invoice Attached</b>
                                                    <input checked={true} type="checkbox" className='ml-2' />
                                                </div>
                                                : null
                                        }
    
                                    </div>
    
                                    <label className="mb-1"><b>Purchase / Repair / Replacement Specifications</b></label>
    
                                    <table className="table table-borderless specifications-table">
                                        <thead>
                                            <tr>
                                                <th>Sr.No.</th>
                                                <th>Description</th>
                                                <th>Quantity</th>
                                                <th>Estimated Cost</th>
                                                <th className='text-right'>Total Cost</th>
                                            </tr>
                                        </thead>
                                        <tbody id="specifications_table_body">
                                            {
                                                PRSpecifications.map(
                                                    (val, index) => {
                                                        return (
                                                            <tr id={"specification_row_" + (index + 1)} key={index} pr_id={val.pr_id} spec_id={val.specification_id}>
                                                                <td id={"sr_no_" + (index + 1)}> {index + 1} </td>
                                                                <td id={"description_" + (index + 1)}> {val.description} </td>
                                                                <td id={"quantity_" + (index + 1)}> {val.quantity} </td>
                                                                <td id={"estimated_cost_" + (index + 1)}> Rs {val.estimated_cost.toLocaleString('en')} </td>
                                                                <td id={"total_estimated_cost_" + (index + 1)} className='text-right'> Rs {val.total_estimated_cost.toLocaleString('en')} </td>
                                                            </tr>
                                                        )
                                                    }
                                                )
                                            }
                                        </tbody>
                                        <br />
                                        <tfoot>
                                            <tr>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td className='total-td'><b>Total</b></td>
                                                <td className='text-right total-td'> Rs {PRequestDetails.total_value.toLocaleString('en')} </td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </>
                                :
                                <h6 className="text-center">No PR Attached</h6>
                            }
                            
                            {/* {
                                PRequestDetails
                                ?
                                <div>
                                    <form className='popUps'>   
                                        <fieldset disabled>
                                            <div className="flex_container mb-3">
        
                                                <div>
                                                    <label className="mb-0"><b>Company Name</b></label>
                                                    <input value={ PRequestDetails.company_name } className="form-control" />
                                                </div>
                                                <div>
                                                    <label className="mb-0"><b>Delivery / Work Location</b></label>
                                                    <input value={ PRequestDetails.location_name } className="form-control" />
                                                </div>
        
                                            </div>
        
                                            <div className="grid_container mb-3 px-5">
        
                                            {
                                                RequestDetails.new_purchase === 1
                                                ?
                                                <div className='grid_container align-items-center'>
                                                    <span>New Purchase</span>
                                                    <input checked={ true } type="checkbox" className='ml-2' />
                                                </div>
                                                :null
                                            }
                                            {
                                                RequestDetails.repair
                                                ?
                                                <div className='grid_container align-items-center'>
                                                    <span>Repair</span>
                                                    <input checked={ true } type="checkbox" className='ml-2' />
                                                </div>
                                                :null
                                            }
                                            {
                                                RequestDetails.replace_recycle
                                                ?
                                                <div className='grid_container align-items-center'>
                                                    <span>Replacement / Recycle</span>
                                                    <input checked={ true } type="checkbox" className='ml-2' />
                                                </div>
                                                :null
                                            }
                                            {
                                                RequestDetails.budgeted
                                                ?
                                                <div className='grid_container align-items-center'>
                                                    <span>Budgeted</span>
                                                    <input checked={ true } type="checkbox" className='ml-2' />
                                                </div>
                                                :null
                                            }
                                            {
                                                RequestDetails.not_budgeted
                                                ?
                                                <div className='grid_container align-items-center'>
                                                    <span>Not Budgeted</span>
                                                    <input checked={ true } type="checkbox" className='ml-2' />
                                                </div>
                                                :null
                                            }
                                            {
                                                RequestDetails.invoice_attached
                                                ?
                                                <div className='grid_container align-items-center'>
                                                    <span>Invoice Attached</span>
                                                    <input checked={ true } type="checkbox" className='ml-2' />
                                                </div>
                                                :null
                                            }
        
                                            </div>
        
                                            <label className="mb-0"><b>Reason For Repair / Replacement / New Purchase</b></label>
                                            <textarea className="form-control" value={ PRequestDetails.reason } />
        
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
                                                        PRSpecifications.map(
                                                            ( val, index ) => {
                                                                return (
                                                                    <tr key={ index }>
                                                                        <td className='text-center'> { index + 1 } </td>
                                                                        <td className='text-center'> { val.description } </td>
                                                                        <td className='text-center'> { val.quantity } </td>
                                                                        <td className='text-center'> Rs { val.estimated_cost.toLocaleString('en') } </td>
                                                                        <td className='text-center'> Rs { val.total_estimated_cost.toLocaleString('en') } </td>
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
                                                        <td className='text-center'> Rs { PRequestDetails.total_value.toLocaleString('en') } </td>
                                                    </tr>
                                                </tfoot>
                                            </table>
        
                                            <label className="mb-0"><b>Additional Notes</b></label>
                                            <textarea className="form-control" value={ PRequestDetails.note } />
                                        </fieldset>
                                    </form>
                                </div>
                                :
                                <h6 className="text-center">No PR Attached</h6>
                            } */}
                        </div>
                    }
                    {
                        StartPrint && RequestDetails
                        ?
                        <div id="po_to_print" ref={ componentRef } style={{ position: 'relative' }}>
                            <div style={
                                {
                                    position: 'fixed',
                                    top: 0,
                                    left: 0,
                                    border: '1px dotted gray',
                                    width: '100%',
                                    height: '100%'
                                }
                            }></div>

                            <div className="content p-4" style={{ fontFamily: "Poppins" }}>
                                <header>
                                    <h1 className='text-center font-weight-bold' style={{ letterSpacing: '10px', fontFamily: 'Cinzel' }}>SEABOARD GROUP</h1>
                                    <hr />
                                    <h3 className='text-center' style={{ letterSpacing: 10 }}> PURCHASE ORDER </h3>
                                    <br />
                                    <br />

                                    <div style={ { display: 'flex' } }>

                                        <div style={ { width: "50%" } }>
                                            <div 
                                                // style={ { display: 'flex' } }
                                            >
                                                <b style={ { width: '100%', display: 'block', marginBottom: 0, fontSize: 17 } }>Company Name</b>
                                                <span style={ { width: '100%', fontSize: 17 } }>
                                                    {RequestDetails.company_name} <br />
                                                    <u>{RequestDetails.website}</u>
                                                </span>
                                            </div>
                                            <div 
                                                // style={ { display: 'flex' } }
                                            >
                                                <b style={ { width: '100%', display: 'block', marginBottom: 0, fontSize: 17 } }>Ship To / Delivery Location</b>
                                                <span style={ { width: '100%', fontSize: 17 } }>
                                                    {RequestDetails.location_name} <br />
                                                    {RequestDetails.address} <br />
                                                    {RequestDetails.location_phone}
                                                </span>
                                            </div>
                                        </div>
                                        <div style={ { width: "50%" } }>
                                            <div style={ { display: 'flex' } }>
                                                <b style={ { width: '50%', padding: 5, fontSize: 17 } }>Invoice No:</b>
                                                <span style={ { width: '50%', padding: 5, fontSize: 17 } }>{ RequestDetails.invoice_no }</span>
                                            </div>
                                            <div style={ { display: 'flex' } }>
                                                <b style={ { width: '50%', padding: 5, fontSize: 17 } }>PO Number:</b>
                                                <span style={ { width: '50%', padding: 5, fontSize: 17 } }>{ RequestDetails.company_short_code + '-' + RequestDetails.series_year + '-' + RequestDetails.series_code }</span>
                                            </div>
                                            <div style={ { display: 'flex' } }>
                                                <b style={ { width: '50%', padding: 5, fontSize: 17 } }>PR Number:</b>
                                                <span style={ { width: '50%', padding: 5, fontSize: 17 } }>{ RequestDetails.pr_id ? (PRequestDetails.company_short_code + '-' + PRequestDetails.series_year + '-' + PRequestDetails.series_code) : "---------" }</span>
                                            </div>
                                            <div style={ { display: 'flex' } }>
                                                <b style={ { width: '50%', padding: 5, fontSize: 17 } }>Date:</b>
                                                <span style={ { width: '50%', padding: 5, fontSize: 17 } }>{ convertTZ(RequestDetails.requested_date).toDateString() }</span>
                                            </div>
                                        </div>

                                    </div>

                                    <hr />

                                    <div style={ { display: 'flex', flexWrap: 'wrap' } }>

                                        <div style={ { width: "50%" } }>

                                            <h6 style={ { backgroundColor: '#d3d3d3' } } className="p-1">Vendor</h6>
                                            <p className="mb-0">
                                                <b>{RequestDetails.vendor_name}</b>
                                            </p>
                                            <p className="mb-0">{RequestDetails.vendor_phone}</p>
                                            <p className="mb-0">{RequestDetails.vendor_address}</p>

                                        </div>
                                        <div style={ { width: "50%", paddingLeft: 10 } }>
                                            <div style={ { display: 'flex', alignItems: 'flex-end' } }>
                                                <b style={ { width: '50%', fontFamily: 'Poppins', padding: 2, fontSize: 17 } }>Replacement / Recycle</b>
                                                <span style={ { width: '50%', padding: 2 } }>
                                                    {
                                                        RequestDetails.replace_recycle === 1
                                                        ?
                                                        <i 
                                                            className="lar la-check-circle"
                                                            style={
                                                                { fontSize: 20, width: '20px', height: '20px' }
                                                            }    
                                                        ></i>
                                                        :
                                                        <i 
                                                            className="las la-times-circle"
                                                            style={
                                                                { fontSize: 20, width: '20px', height: '20px' }
                                                            }    
                                                        ></i>
                                                    }
                                                </span>
                                            </div>
                                            <div style={ { display: 'flex', alignItems: 'flex-end' } }>
                                                <b style={ { width: '50%', fontFamily: 'Poppins', padding: 2, fontSize: 17 } }>Invoice Attached</b>
                                                <span style={ { width: '50%', padding: 2 } }>
                                                    {
                                                        RequestDetails.invoice_attached === 1
                                                        ?
                                                        <i 
                                                            className="lar la-check-circle"
                                                            style={
                                                                { fontSize: 20, width: '20px', height: '20px' }
                                                            }    
                                                        ></i>
                                                        :
                                                        <i 
                                                            className="las la-times-circle"
                                                            style={
                                                                { fontSize: 20, width: '20px', height: '20px' }
                                                            }    
                                                        ></i>
                                                    }
                                                </span>
                                            </div>
                                            <div style={ { display: 'flex', alignItems: 'flex-end' } }>
                                                <b style={ { width: '50%', fontFamily: 'Poppins', padding: 2, fontSize: 17 } }>New Purchase</b>
                                                <span style={ { width: '50%', padding: 2 } }>
                                                    {
                                                        RequestDetails.new_purchase === 1
                                                        ?
                                                        <i 
                                                            className="lar la-check-circle"
                                                            style={
                                                                { fontSize: 20, width: '20px', height: '20px' }
                                                            }    
                                                        ></i>
                                                        :
                                                        <i 
                                                            className="las la-times-circle"
                                                            style={
                                                                { fontSize: 20, width: '20px', height: '20px' }
                                                            }    
                                                        ></i>
                                                    }
                                                </span>
                                            </div>
                                            <div style={ { display: 'flex', alignItems: 'flex-end' } }>
                                                <b style={ { width: '50%', fontFamily: 'Poppins', padding: 2, fontSize: 17 } }>Repair</b>
                                                <span style={ { width: '50%', padding: 2 } }>
                                                    {
                                                        RequestDetails.repair === 1
                                                        ?
                                                        <i 
                                                            className="lar la-check-circle"
                                                            style={
                                                                { fontSize: 20, width: '20px', height: '20px' }
                                                            }    
                                                        ></i>
                                                        :
                                                        <i 
                                                            className="las la-times-circle"
                                                            style={
                                                                { fontSize: 20, width: '20px', height: '20px' }
                                                            }    
                                                        ></i>
                                                    }
                                                </span>
                                            </div>
                                        </div>

                                    </div>
                                
                                    <br />
                                </header>
                            
                                <table className="table" style={{ zIndex: 1 }}>
                                    <thead>
                                        <tr>
                                            <th style={ { fontSize: 15, outline: '1px solid lightgray', textAlign: 'center' } }>Sr.No</th>
                                            <th style={ { fontSize: 15, outline: '1px solid lightgray', textAlign: 'left', maxWidth: 250 } }>Description</th>
                                            <th style={ { fontSize: 15, outline: '1px solid lightgray', textAlign: 'center' } }>Quantity</th>
                                            <th style={ { fontSize: 15, outline: '1px solid lightgray', textAlign: 'center' } }>Unit Price</th>
                                            <th style={ { fontSize: 15, outline: '1px solid lightgray', textAlign: 'center' } }>Total Cost</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            Specifications.map(
                                                ( val, index ) => {
                                                    return (
                                                        <tr style={ { borderColor: '#000' } } key={ index }>
                                                            <td style={ { fontSize: 15, outline: '1px solid lightgray', textAlign: 'center' } }>{ index + 1 }</td>
                                                            <td style={ { fontSize: 15, outline: '1px solid lightgray', textAlign: 'left', wordBreak: 'break-word' } }>{ val.description }</td>
                                                            <td style={ { fontSize: 15, outline: '1px solid lightgray', textAlign: 'center' } }>{ val.quantity } { val.unit }</td>
                                                            <td style={ { fontSize: 15, outline: '1px solid lightgray', textAlign: 'center' } }>Rs { val.unit_price.toLocaleString('en') }</td>
                                                            <td style={ { fontSize: 15, outline: '1px solid lightgray', textAlign: 'center' } }>Rs { val.total_cost.toLocaleString('en') }</td>
                                                        </tr>
                                                    );
                                                }
                                            )
                                        }
                                    </tbody>
                                    <tfoot style={ { position: 'relative' } }>
                                        <p style={ { position: 'absolute', width: '50%', fontWeight: 'bold', left: '5px', top: '20px' } } colSpan={6}>Comments and special instructions</p>
                                        <p style={ { position: 'absolute', width: '50%', left: '5px', top: '50px', overflow: 'overlay', wordBreak: 'break-word' } } colSpan={6}>{ RequestDetails.note }</p>
                                        <tr style={ { borderColor: '#000' } }>
                                            <td style={ { fontSize: 15, textAlign: 'center' } }></td>
                                            <td style={ { fontSize: 15, textAlign: 'center' } }></td>
                                            <td style={ { fontSize: 15, textAlign: 'center' } }></td>
                                            <th style={ { textAlign: 'center', fontSize: 15, outline: '1px solid lightgray' } }><b>Sub Total</b></th>
                                            <td style={ { fontSize: 15, outline: '1px solid lightgray', textAlign: 'center' } }>Rs { RequestDetails.total_sub_value.toLocaleString('en') }</td>
                                        </tr>
                                        {
                                            AdditionalRows
                                            ?
                                            AdditionalRows.map(
                                                ( val, index ) => {
                                                    return (
                                                        <tr key={ index }>
                                                            <td className='text-center' style={ { border: 0 } }></td>
                                                            <td className='text-center' style={ { border: 0 } }></td>
                                                            <td className='text-center' style={ { border: 0 } }></td>
                                                            <td className='text-center text-capitalize' style={{ outline: '1px solid lightgray', wordBreak: 'break-word' }}><b>{ val.label }</b></td>
                                                            <td className='text-center' style={{ outline: '1px solid lightgray' }}> Rs { val.value.toLocaleString('en') } </td>
                                                        </tr>
                                                    )
                                                }
                                            )
                                            :null
                                        }
                                        <tr style={ { borderColor: '#000' } }>
                                            <td style={ { fontSize: 15, textAlign: 'center' } }></td>
                                            <td style={ { fontSize: 15, textAlign: 'center' } }></td>
                                            <td style={ { fontSize: 15, textAlign: 'center' } }></td>
                                            <th style={ { textAlign: 'center', fontSize: 15, outline: '1px solid lightgray' } }><b>Total</b></th>
                                            <td style={ { fontSize: 15, outline: '1px solid lightgray', textAlign: 'center' } }>Rs { RequestDetails.total_value.toLocaleString('en') }</td>
                                        </tr>
                                    </tfoot>
                                </table>

                                <div className="footer" style={ { position: 'fixed', bottom: 0, left: 0, padding: 20, paddingBottom: 0, width: "100%", zIndex: -1 } }>
                                    <p style={ { fontSize: 17 } }> 
                                        <b style={ { marginRight: 5 } }>Note: </b> 
                                    </p>
                                    <p style={ { fontSize: 17, paddingLeft: 15 } }>
                                        - This is an electronically generated report, hence does not require a signature.
                                    </p>
                                    {
                                        RequestDetails.status === "approved" || RequestDetails.status === "rejected"
                                        ?
                                        <>
                                            <p style={ { fontSize: 17 } }> 
                                                <b style={ { marginRight: 5 } }>H.O.D's Remarks: </b> 
                                            </p>
                                            <p style={ { fontSize: 17, paddingLeft: 15 } }>
                                                - { RequestDetails.remarks_from_hod }
                                            </p>
                                        </>
                                        :null
                                    }
                                    <div style={ { display: 'flex' } }>
                                        <div style={ { width: '33.33%', padding: 10 } }>
                                            <b style={ { marginBottom: 10, display: 'block', textAlign: 'center', fontSize: 17 } }>Prepared By</b>
                                            <p style={ { textAlign: 'center', fontSize: 30, fontFamily: "Tangerine", transform: "rotate(-10deg) translate(0, 5px)" } }>
                                                { RequestDetails.requested_employee_name }
                                            </p>
                                            <p style={ { marginTop: 10, display: 'block', textAlign: 'center', fontSize: 17 } }>
                                                { RequestDetails.requested_employee_designation_name }
                                            </p>
                                        </div>
                                        <div style={ { width: '33.33%', padding: 10 } }>
                                            <b style={ { marginBottom: 10, display: 'block', textAlign: 'center', fontSize: 17 } }>{ RequestDetails.status === 'rejected' ? "Rejected By" : "Approved By" }</b>
                                            {
                                                RequestDetails.act_date
                                                ?
                                                <>
                                                    <p style={ { textAlign: 'center', fontSize: 30, fontFamily: "Tangerine", transform: "rotate(-10deg) translate(0, 5px)" } }>
                                                        { RequestDetails.hod_employee_name }
                                                    </p>
                                                    <p style={ { marginTop: 10, display: 'block', textAlign: 'center', fontSize: 17 } }>{ RequestDetails.hod_employee_designation_name }</p>
                                                </>
                                                :null
                                            }
                                        </div>
                                        <div style={ { width: '33.33%', padding: 10 } }>
                                            <b style={ { marginBottom: 10, display: 'block', textAlign: 'center', fontSize: 17 } }>Proceed To</b>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        :null
                    }
                </div>
                <div className="controls">
                    <button className='btn' onClick={ () => setView('application') }>
                        <i className="lab la-wpforms"></i>
                    </button>
                    <p className="text-center">PO</p>

                    <button className='btn' onClick={ () => setView('pr') }>
                        <i className="las la-file-alt"></i>
                        <span>
                            {PRequestDetails ? 1 : 0}
                        </span>
                    </button>
                    <p className="text-center">PR</p>

                    <button className='btn' onClick={ () => setView('bills') }>
                        <i className="las la-file-invoice-dollar"></i>
                        <span>
                            {Bills.length}
                        </span>
                    </button>
                    <p className="text-center">Bills</p>

                    <button className='btn' onClick={ printPO }>
                        <i className="las la-print"></i>
                    </button>
                    <p className="text-center">Print</p>

                    {
                        // RequestDetails.requested_by == localStorage.getItem('EmpID') && 
                        ( RequestDetails.status === 'sent' || RequestDetails.status === 'viewed' || RequestDetails.status === 'waiting_for_approval' )
                        ?
                        <>
                            <button className='btn' onClick={ () => setEditConfirm(true) }>
                                <i className="las la-pen-alt"></i>
                            </button>
                            <p className="text-center">Edit</p>
                        </>
                        :null
                    }
                </div>
            </div>
        </>
    )

}

const ApprovalConfirmation = ( { SubOrdinands, po_id, ApproveRequisition, requested_by, loadSubOrdinands } ) => {

    useEffect(
        () => {

            loadSubOrdinands();

        }, []
    );

    return (
        <>
            <form className='pt-1' onSubmit={ (e) => ApproveRequisition( e, po_id, requested_by ) }>
                <fieldset>
                    <h6 className='font-weight-bold'>Confirm Approval</h6>
                    <hr />
                    <div className="alert alert-success d-none" id="error_alert_approval"></div>
                    <textarea placeholder='Add Your Remarks...' name="reason" cols="30" rows="5" className='form-control' required minLength={30} />
                    {
                        SubOrdinands
                        ?
                        SubOrdinands.length === 0
                        ?
                        <p className="text-center">No Record Found</p>
                        :
                        <select name="submit_to" required className='form-control mt-3'>
                            <option value="">Select the option</option>
                            {
                                SubOrdinands.map(
                                    ( val, index ) => {
                                        return (
                                            <option key={ index } value={ val.emp_id }>{ val.name }</option>
                                        )
                                    }
                                )
                            }
                        </select>
                        :
                        <p className="text-center">Please Wait.....</p>
                    }
                    <button className='btn d-block ml-auto submit mt-3'>Confirm</button>
                </fieldset>
            </form>
        </>
    )

}

const CancelConfirmation = ( { po_id, CancelRequisition } ) => {

    return (
        <>
            <form className='pt-1' onSubmit={ (e) => CancelRequisition( e, po_id ) }>
                <fieldset>
                    <h6 className='font-weight-bold'>Do you want to delete this template?</h6>
                    <hr />
                    <div className="alert alert-warning d-none" id="error_alert_cancelation"></div>
                    <textarea placeholder='Any Specific Reason...' name="reason" cols="30" rows="5" className='form-control' required minLength={30} />
                    <button className='btn d-block ml-auto submit mt-3'>Confirm</button>
                </fieldset>
            </form>
        </>
    )

}

const RejectConfirmation = ( { RequestDetails, Specifications, po_id, RejectRequisition } ) => {

    return (
        <>
            <form className='pt-1' onSubmit={ (e) => RejectRequisition( e, po_id, RequestDetails.requested_by, Specifications ) }>
                <fieldset>
                    <h6 className='font-weight-bold'>Confirm Rejection</h6>
                    <hr />
                    <div className="alert alert-warning d-none" id="error_alert_rejection"></div>
                    <textarea placeholder='Any Specific Reason...' name="reason" cols="30" rows="5" className='form-control' required minLength={30} />
                    <button className='btn d-block ml-auto submit mt-3'>Confirm</button>
                </fieldset>
            </form>
        </>
    )

}

const PORequests = ( { fm, Status, RequestStatuses, AccessDefined, LoadedCompanies, FilterAmount, SpecKeyword, FilterCompany, AccessControls, history, Requests, loadRequests, setStatus, setSpecKeyword, setFilterCompany, setFilterAmount } ) => {

    const [ generatePos, setGeneratePos ] = useState(false);
    const [ ShowFilters, setShowFilters ] = useState(false);
    const [ List, setList ] = useState();
    const [ checkedPOs, setCheckedPOs ] = useState([]);
    const types = {
        total_value: 'total_value',
        series_code: 'series_code',
        requested_date: 'requested_date',
    };
    // const momentTZ = require('moment-timezone');
    
    useEffect(
        () => {
            const Arr = Requests ? Requests.filter(
                val => {
                    return val.status.toLowerCase().includes(Status.toLowerCase()) && val.company_name.toLowerCase().includes(FilterCompany.toLowerCase()) && val.specifications.toLowerCase().includes(SpecKeyword.toLowerCase()) && val.total_value >= FilterAmount;
                }
            ):null;
            setList(Arr);
        }, [ Status, Requests, FilterCompany, SpecKeyword, FilterAmount ]
    )
    useEffect(
        () => {
            if ( AccessDefined )
            {
                loadRequests()
            }
        }, [ AccessDefined ]
    );

    const sortArray = ( type, in_de, dataType ) => {
        const sortProperty = types[type];
        let sorted = sort( sortProperty, in_de, dataType );
        setList(sorted);
    };

    const sort = ( property, in_de, dataType ) => {
        const result =
        dataType === "number"
        ? sortNumber(property, in_de)
        : dataType === "string"
        ? sortString(property, in_de)
        : dataType === 'date'
        ? sortDate(property, in_de)
        : [];

        return result;
    }

    const sortNumber = ( property, in_de ) => {
        let sorted;
        if ( in_de > 0 )
        {
            sorted = [...List].sort((a, b) => b[property] - a[property]);
        }else
        {
            sorted = [...List].sort((a, b) => a[property] - b[property]);
        }
        return sorted;
    }

    const sortString = ( property, in_de ) => {
        let sorted;
        if ( in_de > 0 )
        {
            sorted = [...List].sort((a, b) => b[property].localeCompare(a[property]));
        }else
        {
            sorted = [...List].sort((a, b) => a[property].localeCompare(b[property]));
        }
        return sorted;
    }

    const sortDate = ( property, in_de ) => {
        let sorted;
        if ( in_de > 0 )
        {
            sorted = [...List].sort((a, b) => new Date(b[property]) - new Date(a[property]));
        }else
        {
            sorted = [...List].sort((a, b) => new Date(a[property]) - new Date(b[property]));
        }
        return sorted;
    }

    const resetFilters = () => {
        sessionStorage.removeItem('FilterCompany');
        sessionStorage.removeItem('SpecKeyword');
        sessionStorage.removeItem('FilterAmount');
        setFilterCompany("");
        setSpecKeyword("");
        setFilterAmount(-100000);
    }

    const generatePO = () => {
        if (AccessControls.access && JSON.parse(AccessControls.access).includes(89)) {
            setGeneratePos(false);
            if (checkedPOs.length === 0) {
                JSAlert.alert("No PO is checked, atleast one PO must checked!!", "Validation Error", JSAlert.Icons.Failed).dismissIn(1000 * 2);
                return;
            }
            JSAlert.alert("Please Wait, generating PO(s)...").dismissIn(1000 * 2);
            axios.post('/purchase/order/recursive/generate/all', {arr: JSON.stringify(List), checkedArr: JSON.stringify(checkedPOs), emp_id: localStorage.getItem('EmpID')})
            .then(() => {
                $('input.checkboxes').prop('checked', false);
                setCheckedPOs([]);
                JSAlert.alert("All Purchase Orders (" + checkedPOs.length + ") Has Been Generated!!", "Success", JSAlert.Icons.Success).dismissIn(1000 * 2);
            }).catch(err => console.log(err));
        }else {
            JSAlert.alert("You don't have access", "Access Denied", JSAlert.Icons.Failed).dismissIn(1000 * 2);
        }
    }

    const checkPO = (e, po_id) => {
        const { checked } = e.target;
        let arr = checkedPOs.slice();
        if (checked) {
            arr.push(po_id);
        }else {
            arr = arr.filter(id => id !== po_id);
        }
        setCheckedPOs(arr);
    }

    return (
        <>
            <Modal show={generatePos} Hide={ () => setGeneratePos(!generatePos) } content={
                <>
                    <h6><b>Confirm To Generate Auto-POs</b></h6>
                    <hr />
                    <button className="btn submit d-block ml-auto" onClick={generatePO}>Confirm</button>
                </> 
            } />
            <div className="purchase_requests">
                <div className="d-flex align-items-end justify-content-between">
                    <h3 className="heading">
                        Purchase Order templates
                        <sub>View All the saved templates</sub>
                    </h3>
                    <div>
                        {/* {
                            AccessControls.access
                            ?
                            JSON.parse(AccessControls.access).includes(89)
                            ?
                            :null
                            :null
                        } */}
                        {
                            AccessControls.access && JSON.parse(AccessControls.access).includes(89) && checkedPOs.length > 0
                            ?
                            <button className='btn submit mr-2' onClick={() => setGeneratePos(true)}>Generate POs</button>
                            :null
                        }
                        {
                            AccessControls.access
                            ?
                            JSON.parse(AccessControls.access).includes(22) || JSON.parse(AccessControls.access).includes(0)
                            ?
                            <button className='btn submit' onClick={ () => history.replace('/purchase/order/recursive/form') }>New</button>
                            :null
                            :null
                        }
                        <button className="btn submit px-2 ml-2 filter-emit" onClick={() => setShowFilters(!ShowFilters)} type='button'>
                            {
                                ShowFilters
                                    ?
                                    <>
                                        <i className="las la-times"></i>
                                    </>
                                    :
                                    <div data-tip data-for='filter'>
                                        {
                                            SpecKeyword !== '' || FilterCompany !== '' || FilterAmount !== -100000
                                            ?
                                            <div className='filterisOpen'></div>
                                            :
                                            null
                                        }
                                        <i className="las la-filter"></i>
                                        <ReactTooltip id='filter' place="top">
                                            Filters
                                        </ReactTooltip>
                                    </div>
                            }
                        </button>
                    </div>
                </div>
                <hr />
                {
                    ShowFilters
                    ?
                    <>
                        <div className='filter-content popUps'>
                            <div className='flex'>
                                <div className='w-100 searchDiv'>
                                    <label className="font-weight-bold mb-0">Search Specifications</label>
                                    <input value={SpecKeyword} placeholder='Search Keywords...' type="search" onChange={ (e) => setSpecKeyword(e.target.value) } className='form-control form-control-sm mb-2' />
                                </div>
                                <div className='w-50 dropdownDiv ' >
                                    {
                                        LoadedCompanies
                                        ?
                                        <>
                                            <label className="font-weight-bold mb-0">Company</label>
                                            <select value={ FilterCompany } className='form-control form-control-sm mb-2' onChange={ (e) => setFilterCompany(e.target.value) }>
                                                <option value=''>Select Option</option>
                                                {
                                                    LoadedCompanies.sort().map(
                                                        ( company, index ) => {

                                                            return <option key={ index } value={ company }>{ company }</option>;

                                                        }
                                                    )
                                                }
                                            </select>
                                        </>
                                        :null
                                    }
                                </div>
                                <div className='w-50 AmountSearch-div '>
                                    <label className="font-weight-bold mb-0">Amount</label>
                                    <input value={FilterAmount} placeholder='Amount Greater (>) Than' type="number" onChange={ (e) => setFilterAmount(e.target.value) } className='form-control form-control-sm mb-2' />
                                </div>
                                <button className='btn green d-block ml-auto mt-2' type='button' onClick={resetFilters}>Reset All</button>
                            </div>
                        </div>
                        <br />
                    </>
                    :null
                }
                {/* <ul className="nav nav-tabs mb-3">
                    <li className="nav-item" onClick={ () => { setStatus(''); sessionStorage.setItem('POStatus', '') } }>
                        <a className={ Status === '' ? 'nav-link active text-capitalize' : 'nav-link text-capitalize' }>all { Status === '' ? `(${List?List.length:0})` : "" }</a>
                    </li>
                    {
                        RequestStatuses.map(
                            ( status, index ) => {
                                return (
                                    <li className="nav-item" onClick={ () => { setStatus( status ); sessionStorage.setItem('POStatus', status) } } key={ index }>
                                        <a className={ Status === status ? 'nav-link active text-capitalize' : 'nav-link text-capitalize' }>
                                            { status.split('_').join(' ') } { Status === status ? `(${List?List.length:0})` : "" }
                                        </a>
                                    </li>
                                )
                            }
                        )
                    }
                </ul> */}
                <div className='records-container' style={{ maxHeight: '70vh' }}>
                    {
                        List
                        ?
                        List.length === 0
                        ?
                        <h6 className="text-center">No Request Found</h6>
                        :
                        <table className="table popUps" style={{fontFamily: "Roboto-Light"}}>
                            <thead>
                                <tr>
                                    {/* <th className='border-top-0'>
                                        <div className='d-flex align-items-center'>
                                            PO No
                                            <div className='ml-2'>
                                                <i onClick={ () => sortArray('series_code', 1, 'number') } className="las la-chevron-up d-block" style={{ cursor: 'pointer' }}></i>
                                                <i onClick={ () => sortArray('series_code', 0, 'number') } className="las la-chevron-down d-block" style={{ cursor: 'pointer' }}></i>
                                            </div>
                                        </div>
                                    </th> */}
                                    <th className='border-top-0'></th>
                                    <th className='border-top-0'>Sr.No</th>
                                    <th className='border-top-0'>Co & Loc</th>
                                    <th className='border-top-0'>Specifications</th>
                                    <th className='border-top-0'>
                                        <div className='d-flex align-items-center'>
                                            Date & Time
                                            <div className='ml-2'>
                                                <i onClick={ () => sortArray('requested_date', 1, 'date') } className="las la-chevron-up d-block" style={{ cursor: 'pointer' }}></i>
                                                <i onClick={ () => sortArray('requested_date', 0, 'date') } className="las la-chevron-down d-block" style={{ cursor: 'pointer' }}></i>
                                            </div>
                                        </div>
                                    </th>
                                    <th className='border-top-0'>
                                        <div className='d-flex align-items-center'>
                                            Total Value
                                            <div className='ml-2'>
                                                <i onClick={ () => sortArray('total_value', 1, 'number') } className="las la-chevron-up d-block" style={{ cursor: 'pointer' }}></i>
                                                <i onClick={ () => sortArray('total_value', 0, 'number') } className="las la-chevron-down d-block" style={{ cursor: 'pointer' }}></i>
                                            </div>
                                        </div>
                                    </th>
                                    <th className='border-top-0'>Last Generated At</th>
                                    {/* <th className='border-top-0'>Status</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {/* {console.log(momentTZ.tz.guess())} */}
                                {
                                    List.map(
                                        ( val, index ) => {
                                            return (
                                                <tr key={ index } className='pointer pointer-hover'>
                                                    {/* <td>{ val.code + '-' + val.series_year + '-' + val.series_code }</td> */}
                                                    <td>
                                                        <input onChange={(e) => checkPO(e, val.po_id)} type="checkbox" className='checkboxes form-control' />
                                                    </td>
                                                    <td onClick={ () => history.push('/purchase/order/recursive/details?po_id=' + val.po_id) }>{ index + 1 }</td>
                                                    <td onClick={ () => history.push('/purchase/order/recursive/details?po_id=' + val.po_id) }>{ val.company_name } <br /> { val.location_name }</td>
                                                    <td onClick={ () => history.push('/purchase/order/recursive/details?po_id=' + val.po_id) }>{ val.specifications }</td>
                                                    {/* <td>{ val.no_items_requested > 1 ? (val.no_items_requested + " Items") : (val.no_items_requested + " Item") }</td> */}
                                                    <td onClick={ () => history.push('/purchase/order/recursive/details?po_id=' + val.po_id) }>
                                                        { convertTZ(val.requested_date).toDateString() } <br />
                                                        { val.requested_time }
                                                    </td>
                                                    <td onClick={ () => history.push('/purchase/order/recursive/details?po_id=' + val.po_id) }><span style={{ fontFamily: "Exo", fontWeight: 500 }}>{ fm.from(val.total_value) }</span></td>
                                                    <td onClick={ () => history.push('/purchase/order/recursive/details?po_id=' + val.po_id) }>
                                                        {val.last_generated_at ? moment(val.last_generated_at).format('DD-MM-YYYY hh:mm A') : "Not Generated Yet"}
                                                    </td>
                                                    {/* <td>
                                                        <div className='d-flex align-items-center'>
                                                            <div 
                                                                className={
                                                                    "dot mr-1 "
                                                                    +
                                                                    (
                                                                        val.status === 'approved'
                                                                        ?
                                                                        "bg-success"
                                                                        :
                                                                        val.status === 'rejected'
                                                                        ?
                                                                        "bg-danger"
                                                                        :
                                                                        val.status === 'waiting_for_approval'
                                                                        ?
                                                                        "bg-warning"
                                                                        :
                                                                        "bg-dark"
                                                                    )
                                                                }
                                                            ></div>
                                                            <div
                                                                className={
                                                                    "text-capitalize "
                                                                    +
                                                                    (
                                                                        val.status === 'approved'
                                                                        ?
                                                                        "text-success"
                                                                        :
                                                                        val.status === 'rejected'
                                                                        ?
                                                                        "text-danger"
                                                                        :
                                                                        val.status === 'waiting_for_approval'
                                                                        ?
                                                                        "text-warning"
                                                                        :
                                                                        "text-dark"
                                                                    )
                                                                }
                                                                style={{ fontSize: 12 }}
                                                            >
                                                                {
                                                                    val.status === 'waiting_for_approval' && parseInt(val.appr_rejct_by) === parseInt(localStorage.getItem("EmpID"))
                                                                    ?
                                                                    "Pending"
                                                                    :
                                                                    val.status.split('_').join(' ')
                                                                }
                                                            </div>
                                                        </div>
                                                    </td> */}
                                                </tr>
                                            )
                                        }
                                    )
                                }
                            </tbody>
                        </table>
                        :
                        <h6 className="text-center">Please Wait....</h6>
                    }
                </div>
            </div>
        </>
    )

}

const PRAttachmentModal = ( { PR, FilterPRCompany, attachPR, PRList } ) => {

    const Arr = PRList ? PRList.filter(val => val.company_name.toLowerCase().includes(FilterPRCompany.toLowerCase())) : undefined;

    return (
        <>
            <h5>Attach Purchase Requisition</h5>
            <hr />
            {
                Arr
                ?
                Arr.length === 0
                ?
                <p className="mb-0 text-center">No Record Found</p>
                :
                <table className="table table-sm table-hover">
                    <thead>
                        <tr>
                            <th>PR #</th>
                            <th>Co & Loc</th>
                            <th>Specifications</th>
                            <th>Date</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Arr.map(
                                ( val, index ) => {
                                    const code = val.company_short_code + '-' + val.series_year + '-' + val.series_code;
                                    return (
                                        <tr className={ PR && PR == val.pr_id ? 'highlighted' : '' } onClick={ () => attachPR( val.pr_id, code, val.specifications ) } key={index} style={ { cursor: 'pointer', transition: '.3s' } }>
                                            <td>{ code }</td>
                                            <td>{ val.company_name } <br /> { val.location_name }</td>
                                            <td>{ val.specifications }</td>
                                            <td>{ convertTZ(val.requested_date).toDateString() }</td>
                                            <td>Rs { val.total_value.toLocaleString('en') }</td>
                                        </tr>
                                    )
                                }
                            )
                        }
                    </tbody>
                </table>
                :
                <p className="mb-0 text-center">Please Wait...</p>
            }
        </>
    )

}

const SubmitConfirmationModal = ( { Data, Relations, POSubmittion } ) => {

    return (
        <>
            <form onSubmit={ POSubmittion }>
                <h5>Confirmation</h5>
                <hr />
                <fieldset>
                    <label className="mb-0"><b>Any Additional Notes</b></label>
                    <textarea className="form-control" name="notes" required />

                    <label className="mb-0 mt-2"><b>Submit To</b></label>
                    <select className="form-control" name="request_to" required>
                        <option value="">Select the option</option>
                        {
                            !Data
                            ?null
                            :
                            Relations.map(
                                (val, index) => {
                                    let option;
                                    if ( val.category === 'all' || val.category.includes('purchase_order') )
                                    {
                                        if ( val.companies.includes( parseInt(Data.company_code) ) )
                                        {
                                            if ( val.pr_approval_limit && val.pr_approval_limit >= parseFloat(Data.total_calculated_amount) )
                                            {
                                                option = <option value={val.sr} key={index}> {val.name} </option>;
                                            }
                                        }
                                    }

                                    return option;
                                }
                            )
                        }
                    </select>
                    <button className='btn submit d-block mx-auto mt-3'>Confirm & Save</button>
                </fieldset>
            </form>
        </>
    )

}

const EditConfirmationModal = ( { RequestDetails, Relations, Data, POUpdate } ) => {

    return (
        <>
            {
                RequestDetails
                ?
                <form onSubmit={ POUpdate }>
                    <h5>Confirmation</h5>
                    <hr />
                    <fieldset>
                        <label className="mb-0"><b>Any Additional Notes</b></label>
                        <textarea className="form-control" name="notes" required defaultValue={RequestDetails.note} />

                        <label className="mb-0 mt-2"><b>Submit To</b></label>
                        <select className="form-control" name="request_to" required>
                            <option value="">Select the option</option>
                            {
                                !Data
                                ?null
                                :
                                Relations.map(
                                    (val, index) => {
                                        let option;
                                        if ( val.category === 'all' || val.category.includes('purchase_order') )
                                        {
                                            if ( val.companies.includes( parseInt(Data.company_code) ) )
                                            {
                                                if ( val.pr_approval_limit && val.pr_approval_limit >= parseFloat(Data.total_calculated_amount) )
                                                {
                                                    option = <option value={val.sr} key={index}> {val.name} </option>;
                                                }
                                            }
                                        }

                                        return option;
                                    }
                                )
                            }
                        </select>
                        <button className='btn green d-block mx-auto mt-3'>Confirm & Update</button>
                    </fieldset>
                </form>
                :null
            }
        </>
    )

}

const ModalContent = ( { RemovedBills, Bills, setRemovedBills, setShowBillModal, onAttachBills, setBills } ) => {

    const removeAttachedBill = ( id ) => {
        const Arr = Bills.filter(
            ( val, index ) => {
                return index !== id;
            }
        );
        const RemovedArr = Bills.filter(
            ( val, index ) => {
                return index === id;
            }
        );
        const rArr = RemovedBills;
        if ( RemovedArr[0].bill )
        {
            rArr.push(RemovedArr[0]);
        }

        setBills(Arr);
        setRemovedBills(rArr);
    }

    return (
        <>
            <div className='modal_content'>

                <div className="d-flex justify-content-between align-items-center">
                    <h4 className='mb-0'>Bills</h4>
                    <input type="file" className='quotations_file' onChange={ onAttachBills } multiple accept="image/*" />
                </div>
                <hr />

                {
                    Bills.length === 0
                    ?
                    <h6 className="text-center">No Bill Attached</h6>
                    :
                    <>
                        <div className="quotations_grid_container">

                            {
                                Bills.map(
                                    ( val, index ) => {
                                        const img = val.file ? URL.createObjectURL(val.file) : ( process.env.REACT_APP_SERVER + '/' + val.bill );
                                        const title = val.name ? val.name : val.bill.split('/').pop();
                                        return (
                                            <div className='attached-bill'>
                                                <i title="Double Click To Remove" className="las la-trash-alt" onDoubleClick={ () => removeAttachedBill(index) }></i>
                                                <img src={ img } alt="attached_quotation" key={ index } />
                                                <span> { title } </span>
                                            </div>
                                        )
                                    }
                                )
                            }

                        </div>
                    </>
                }

                <button className="btn submit d-block mx-auto mt-3" onClick={ () => setShowBillModal(false) }>Close</button>

            </div>
        </>
    )

}