/* eslint-disable jsx-a11y/iframe-has-title */
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
import { convertTZ } from './../../../../../../utils/date';

import ReactTooltip from 'react-tooltip';

const UI = ( { releasePayment, PaymentStatus, setPaymentStatus, PaymentMode, setPaymentMode, clearSelectedAC, Cashier, updatePaymentStatus, AdvanceCash, TotalACAdjustment, AttachedAC, setAttachedAC, setUnAttachedAC, loadUnAttachedAdvanceCash, UnAttachedAC, setPRCode, setPR, setSPRSpecifications, unApproveRequest, CompanyViewer, Status, RequestStatuses, RemovedBills, AccessDefined, Admin, SPRSpecifications, PRCode, FilterPRCompany, FilterCompany, SpecKeyword, FilterAmount, LoadedCompanies, POUpdate, EditConfirmation, setStatus, setRemovedBills, setFilterPRCompany, setBills, setFilterAmount, setFilterCompany, setSpecKeyword, setEditConfirmation, updatePO, Vendor, Data, SubOrdinands, loadSubOrdinands, SubTotalCostCalculation, TotalCostCalculation, PRSpecifications, PRequestDetails, AdditionalRows, addAdditionalRow, PR, PRList, attachPR, PRAttachment, onFooterContentInput, selectVendor, Vendors, addRow, setPRAttachment, ApproveRequisition, AttachedBills, Specifications, RequestDetails, history, Requests, RejectRequisition, searchVendor, CancelRequisition, SubmitConfirmation, ShowBillModal, Bills, Locations, Companies, SubmitPO, loadRequests, openRequestDetails, POSubmittion, setSubmitConfirmation, onAttachBills, onContentInput, setShowBillModal } ) => {
    
    const { FormatMoney } = require('format-money-js');
    const fm = new FormatMoney({ symbol: 'Rs ', decimals: 2 });
    const Relations = useSelector((state) => state.EmpAuth.Relations);
    const AccessControls = useSelector( ( state ) => state.EmpAuth.EmployeeData );

    return (
        <>
            <div className="purchase_order">
                {
                    window.location.hash.includes('/purchase/order/details?po_id=')
                    ?
                    <BreadCrumb links={[{label: 'All Purchase Orders', href: '/purchase/order/requests'}]} currentLabel={ "Purchase Order Details - " + ( RequestDetails ? ( RequestDetails.code + '-' + RequestDetails.series_year + '-' + RequestDetails.series_code ) : '' ) } />
                    :
                    window.location.hash.includes('/purchase/order/form')
                    ?
                    <BreadCrumb links={[{label: 'All Purchase Orders', href: '/purchase/order/requests'}]} currentLabel="Purchase Order Form" />
                    :null
                }
                <Modal show={ ShowBillModal } Hide={ () => setShowBillModal(!ShowBillModal) } content={ <ModalContent RemovedBills={ RemovedBills } setRemovedBills={ setRemovedBills } setBills={ setBills } setShowBillModal={ setShowBillModal } Bills={ Bills } onAttachBills={ onAttachBills } /> } />
                <div className="purchase_order_form">
                    <Modal show={ SubmitConfirmation } Hide={ () => setSubmitConfirmation(!SubmitConfirmation) } content={ <SubmitConfirmationModal Data={ Data } Relations={ Relations } POSubmittion={ POSubmittion } /> } />
                    <Modal show={ EditConfirmation } Hide={ () => setEditConfirmation(!EditConfirmation) } content={ <EditConfirmationModal Relations={ Relations } Data={ Data } RequestDetails={ RequestDetails } POUpdate={ POUpdate } /> } />
                    <Modal show={ PRAttachment } Hide={ () => setPRAttachment(!PRAttachment) } content={ <PRAttachmentModal PR={ PR } FilterPRCompany={ FilterPRCompany } attachPR={ attachPR } PRList={ PRList } /> } />

                    <Switch>
                        <Route exact path="/purchase/order/form" render={ 
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
                                    UnAttachedAC={UnAttachedAC}
                                    AttachedAC={AttachedAC}
                                    TotalACAdjustment={TotalACAdjustment}
                                    
                                    setAttachedAC={setAttachedAC}
                                    setUnAttachedAC={setUnAttachedAC}
                                    loadUnAttachedAdvanceCash={loadUnAttachedAdvanceCash}
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
                        <Route exact path="/purchase/order/form&&po_id=:id" render={ 
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
                                    UnAttachedAC={UnAttachedAC}
                                    AttachedAC={AttachedAC}
                                    AdvanceCash={AdvanceCash}
                                    
                                    setAttachedAC={setAttachedAC}
                                    setUnAttachedAC={setUnAttachedAC}
                                    loadUnAttachedAdvanceCash={loadUnAttachedAdvanceCash}
                                    setPRCode={ setPRCode }
                                    setPR={ setPR }
                                    setSPRSpecifications={ setSPRSpecifications }
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
                        <Route exact path="/purchase/order/requests" render={ 
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
                                    PaymentMode={PaymentMode}
                                    PaymentStatus={PaymentStatus}

                                    setPaymentStatus={setPaymentStatus}
                                    setPaymentMode={setPaymentMode}
                                    setStatus={ setStatus }
                                    setFilterAmount={ setFilterAmount }
                                    setFilterCompany={ setFilterCompany }
                                    setSpecKeyword={ setSpecKeyword }
                                    loadRequests={ loadRequests }
                                />
                            )
                        } />
                        <Route exact path="/purchase/order/details" render={ 
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
                                    AccessControls={AccessControls}
                                    AdvanceCash={AdvanceCash}
                                    Cashier={Cashier}
                                    clearSelectedAC={clearSelectedAC}

                                    releasePayment={releasePayment}
                                    updatePaymentStatus={updatePaymentStatus}
                                    unApproveRequest={ unApproveRequest }
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

const POForm = ( { TotalACAdjustment, setAttachedAC, AttachedAC, setUnAttachedAC, loadUnAttachedAdvanceCash, UnAttachedAC, setPRCode, setPR, setSPRSpecifications, SPRSpecifications, PRCode, SubTotalCostCalculation, TotalCostCalculation, Vendor, onFooterContentInput, PR, addAdditionalRow, setFilterPRCompany, setPRAttachment, Vendors, history, Locations, Bills, Companies, SubmitPO, selectVendor, addRow, searchVendor, setShowBillModal, onContentInput } ) => {

    const [ Drafts, setDrafts ] = useState(false);
    const [ ShowACModal, setShowACModal ] = useState(false);
    const [ CompanySelected, setCompanySelected ] = useState();

    useEffect(
        () => {
            if (CompanySelected && ShowACModal) {
                loadUnAttachedAdvanceCash(CompanySelected);
            }
        }, [CompanySelected, ShowACModal]
    );
    useEffect(
        () => {
            setAttachedAC([]);
            setUnAttachedAC([]);

            setPRCode();
            setPR();
            setSPRSpecifications();
            setPRAttachment();
        }, [CompanySelected]
    )

    const onSelectAC = (e, i, id) => {
        if (e.target.checked) {
            const arr = AttachedAC.slice();
            const data = UnAttachedAC[i];
            const obj = {
                id: data.id,
                amount: data.amount
            }
            arr.push(obj);
            setAttachedAC(arr);
        }else {
            const arr = AttachedAC.slice();
            const filteredArr = arr.filter(val => val.id !== id);
            setAttachedAC(filteredArr);
        }
    }

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
                        history.replace('/purchase/order/form');
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
                        history.replace('/purchase/order/form');
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
                history.replace('/purchase/order/form');
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
                    Purchase Order
                    <sub>Application Form</sub>
                    <input type="text" id="draft_id" className='d-none' />
                </h3>

                <div className="btn-group">
                    <button className="btn submit" type='reset' onClick={ () => history.replace('/purchase/order/requests') }>
                        Back
                    </button>
                    {
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
                    </button>
                </div>
            </div>
            <hr />

            <form onSubmit={ SubmitPO }>   
                <fieldset>
                    <div className="flex_container mb-3">

                        <div>
                            <label className="mb-0"><b>Company Name</b></label>
                            <select className="form-control" name="company_code" onChange={ (e) => {
                                setFilterPRCompany(e.target.options[e.target.selectedIndex].text);
                                setCompanySelected(e.target.value);
                            } } required>
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
                            <tr id="specification_total_row">
                                <td className='border-0'></td>
                                <td className='border-0'></td>
                                <td className='border-0'></td>
                                <td className='border-0'></td>
                                <td className='text-center' id="ac_calculated_amount_label"><b>Adjust Advance Cash</b></td>
                                <td id="ac_calculated_amount">{TotalACAdjustment > 0 ? ('-' + parseFloat(TotalACAdjustment).toFixed(2)) : '0.00'}</td>
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
                            {CompanySelected && <button title={ SPRSpecifications } className="btn submit" type='button' onClick={ () => setPRAttachment(true) }> { PR ? "PR (" + PRCode + ") Attached" : "Attach PR" }</button>}
                            {
                                PR && <button className='btn cancle' onClick={() => {
                                    setPRCode();
                                    setPR();
                                    setSPRSpecifications();
                                    setPRAttachment();
                                }}>Remove PR</button>
                            }
                            {CompanySelected && <button className="btn light" type='button' onClick={ () => setShowACModal(true) }>Adjust Advance Cash {AttachedAC.length > 0 && <>({ AttachedAC.length })</>}</button>}
                        </div>
                        <button className="btn submit" type='submit'>Generate Purchase Order</button>
                        <Modal show={ ShowACModal } Hide={ () => setShowACModal(!ShowACModal) } content={
                            <>
                                <h6>Select Advance Cash</h6>
                                <hr />
                                {
                                    UnAttachedAC.length === 0
                                    ?
                                    <h6 className="text-center">No Record</h6>
                                    :
                                    <table className='table table-sm'>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>AC #</th>
                                                <th>Co & Loc</th>
                                                <th>Reason</th>
                                                <th>Date</th>
                                                <th>Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                UnAttachedAC.map((val, i) => {
                                                    const code = val.company_code_name + '-' + val.series_year + '-' + val.serial_no;
                                                    return (
                                                        <tr key={i}>
                                                            <td>
                                                                <input type='checkbox' name="AC" onChange={(e) => onSelectAC(e, i, val.id)} />
                                                            </td>
                                                            <td>{code}</td>
                                                            <td>{ val.company_name } <br /> { val.location_name }</td>
                                                            <td>{val.reason}</td>
                                                            <td>{val.submit_date}</td>
                                                            <td>{val.amount.toLocaleString('en')}</td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                }
                            </>
                        } />
                    </div>
                </fieldset>
            </form>
        </>
    )

}

const POFormForEditing = ( { AdvanceCash, UnAttachedAC, AttachedAC, setUnAttachedAC, setAttachedAC, loadUnAttachedAdvanceCash, setPRCode, setPR, setSPRSpecifications, PRCode, SPRSpecifications, updatePO, AdditionalRows, RequestDetails, Specifications, openRequestDetails, onFooterContentInput, PR, addAdditionalRow, setPRAttachment, Vendors, history, Locations, Bills, Companies, SubmitPO, selectVendor, addRow, searchVendor, setShowBillModal, onContentInput } ) => {

    const [ ShowACModal, setShowACModal ] = useState(false);

    useEffect(
        () => {
            if (ShowACModal) {
                loadUnAttachedAdvanceCash(RequestDetails.company_code, 'unapproved');
            }
        }, [ShowACModal]
    );
    useEffect(
        () => {
            if ( !RequestDetails )
            {
                const po_id = window.location.href.split('&&po_id=').pop();
                openRequestDetails( po_id, true );
            }else
            {
                selectVendor( RequestDetails.vendor_id, RequestDetails.vendor_name );
                setAttachedAC(AdvanceCash);
            }
        }, [RequestDetails]
    );
    
    const onSelectAC = (e, i, id) => {
        if (e.target.checked) {
            const arr = AttachedAC.slice();
            const data = UnAttachedAC[i];
            const obj = {
                id: data.id,
                amount: data.amount
            }
            arr.push(obj);
            setAttachedAC(arr);
        }else {
            const arr = AttachedAC.slice();
            const filteredArr = arr.filter(val => val.id !== id);
            setAttachedAC(filteredArr);
        }
    }

    return (
        <>
            <div className="d-flex align-items-center justify-content-between">
                <h3 className="heading">
                    Update Purchase Order
                    <sub>Application Form For Editing</sub>
                    <input type="text" id="draft_id" className='d-none' />
                </h3>

                <div className="btn-group">
                    <button className="btn submit" type='reset' onClick={ () => history.replace('/purchase/order/requests') }>
                        Back
                    </button>
                </div>
            </div>
            <hr />

            {
                RequestDetails
                ?
                <form onSubmit={ updatePO }>   
                    <Modal show={ShowACModal} Hide={() => setShowACModal(!ShowACModal)} content={
                        <>
                            <h6>Select Advance Cash</h6>
                            <hr />
                            {
                                UnAttachedAC.length === 0
                                    ?
                                    <h6 className="text-center">No Record</h6>
                                    :
                                    <table className='table table-sm'>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>AC #</th>
                                                <th>Co & Loc</th>
                                                <th>Reason</th>
                                                <th>Date</th>
                                                <th>Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                UnAttachedAC.map((val, i) => {
                                                    const code = val.company_code_name + '-' + val.series_year + '-' + val.serial_no;
                                                    return (
                                                        <tr key={i}>
                                                            <td>
                                                                <input type='checkbox' name="AC" onChange={(e) => onSelectAC(e, i, val.id)} />
                                                            </td>
                                                            <td>{code}</td>
                                                            <td>{val.company_name} <br /> {val.location_name}</td>
                                                            <td>{val.reason}</td>
                                                            <td>{val.submit_date}</td>
                                                            <td>{val.amount.toLocaleString('en')}</td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                            }
                        </>
                    } />
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
                                    parseFloat(RequestDetails.total_ac_adjustments) > 0 && (
                                        <tr id="specification_total_row">
                                            <td className='border-0'></td>
                                            <td className='border-0'></td>
                                            <td className='border-0'></td>
                                            <td className='border-0'></td>
                                            <td className='text-center' id="ac_calculated_amount_label"><b>Adjust Advance Cash</b></td>
                                            <td id="ac_calculated_amount">-{RequestDetails.total_ac_adjustments}</td>
                                        </tr>
                                    )
                                }
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
                                        setSPRSpecifications();
                                        setPRAttachment();
                                    }}>Remove PR</button>
                                }
                                {/* <button className="btn submit" type='button' onClick={ () => setShowACModal(true) }>Adjust Advance Cash {AttachedAC.length > 0 && <>({ AttachedAC.length })</>}</button> */}
                            </div>
                            <button className="btn submit" type='submit'>Update Purchase Order</button>
                        </div>
                    </fieldset>
                </form>
                :null
            }
        </>
    )

}

const RequestDetailsView = ( { releasePayment, clearSelectedAC, Cashier, updatePaymentStatus, AdvanceCash, unApproveRequest, AccessControls, CompanyViewer, fm, Admin, SubOrdinands, loadSubOrdinands, PRSpecifications, PRequestDetails, AdditionalRows, ApproveRequisition, history, Bills, Specifications, RequestDetails, CancelRequisition, RejectRequisition, openRequestDetails } ) => {

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
                Cashier || CompanyViewer || Admin ||
                parseInt(RequestDetails.requested_by) === parseInt(localStorage.getItem("EmpID")) ||
                parseInt(RequestDetails.appr_rejct_by) === parseInt(localStorage.getItem("EmpID")) ||
                parseInt(RequestDetails.submitted_to) === parseInt(localStorage.getItem("EmpID"))
                ?
                <Detailing releasePayment={releasePayment} clearSelectedAC={clearSelectedAC} Cashier={Cashier} updatePaymentStatus={updatePaymentStatus} AdvanceCash={AdvanceCash} unApproveRequest={unApproveRequest} AccessControls={AccessControls} fm={ fm } componentRef={ componentRef } StartPrint={ StartPrint } printPO={ printPO } SubOrdinands={ SubOrdinands } loadSubOrdinands={ loadSubOrdinands } PRSpecifications={ PRSpecifications } PRequestDetails={ PRequestDetails } AdditionalRows={ AdditionalRows } ApproveRequisition={ ApproveRequisition } po_id={ window.location.href.split('?').pop().split('=').pop() } RejectRequisition={ RejectRequisition } CancelRequisition={ CancelRequisition } history={ history } Bills={ Bills } setView={ setView } View={ View } RequestDetails={ RequestDetails } Specifications={ Specifications } />
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

const Detailing = ( { releasePayment, clearSelectedAC, Cashier, updatePaymentStatus, AdvanceCash, unApproveRequest, AccessControls, fm, componentRef, StartPrint, printPO, SubOrdinands, loadSubOrdinands, PRSpecifications, PRequestDetails, AdditionalRows, po_id, CancelRequisition, ApproveRequisition, RejectRequisition, history, Bills, View, setView, RequestDetails, Specifications } ) => {
    
    const [ selectedAC, setSelectedAC ] = useState([]);
    const [ paymentStatusModel, setPaymentStatusModel ] = useState(false);
    const [ unApprove, setUnApprove ] = useState(false);
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
                    <h5>Confirm to edit this request?</h5>
                    <button className='btn light d-block ml-auto' onClick={ () => history.push('/purchase/order/form&&po_id=' + window.location.href.split('/').pop().split('po_id=').pop()) }>Yes</button>
                </div>
            )
        }, []
    )

    const onACSelect = (e, id, i) => {
        if (e.target.checked) {
            const arr = selectedAC.slice();
            const data = AdvanceCash[i];
            const obj = {
                id: data.id,
                emp_id: data.emp_id,
                amount: data.amount,
                po_id: data.attached_to_po,
                verified_by: data.verified_by
            }
            arr.push(obj);
            setSelectedAC(arr);
        }else {
            const arr = selectedAC.slice();
            const filteredArr = arr.filter(val => val.id !== id);
            setSelectedAC(filteredArr);
        }
    }

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
                <Modal show={ paymentStatusModel } Hide={ () => setPaymentStatusModel(false) } content={
                        <>
                            <form onSubmit={(e) => updatePaymentStatus(e, po_id, RequestDetails.requested_by, setPaymentStatusModel)}>
                                <fieldset>
                                    <h6 className="mb-0">Update Payment Status</h6>
                                    <hr />
                                    <label className='mb-0'><b>Payament Sattus</b></label>
                                    <select name='payment_status' className="form-control mb-3" required>
                                        <option value="">Select an option</option>
                                        <option value="In progress">In progress</option>
                                        <option value="Cheque prepared">Cheque prepared</option>
                                        <option value="Paid">Paid</option>
                                        {/* {
                                            RequestDetails?.payment_status === 'Pending'
                                            ?
                                            <>
                                                <option value="In progress">In progress</option>
                                                <option value="Cheque prepared">Cheque prepared</option>
                                                <option value="Paid">Paid</option>
                                            </>
                                            :
                                            RequestDetails?.payment_status === 'In progress'
                                            ?
                                            <>
                                                <option value="Cheque prepared">Cheque prepared</option>
                                                <option value="Paid">Paid</option>
                                            </>
                                            :
                                            RequestDetails?.payment_status === 'Cheque prepared'
                                            ?
                                            <option value="Paid">Paid</option>
                                            :null
                                        } */}
                                    </select>
                                    <button className='btn d-block ml-auto submit'>Confirm</button>
                                </fieldset>
                            </form>
                        </>
                    } />
                    <Modal show={ unApprove } Hide={ () => unApprove(false) } content={
                        <>
                            <form onSubmit={(e) => unApproveRequest(e, po_id, RequestDetails.requested_by)}>
                                <fieldset>
                                    <h6 className="mb-0">Confirm to unapprove an approved request</h6>
                                    <hr />
                                    <label className='mb-0'><b>Your Remarks</b></label>
                                    <textarea name='remarks' className="form-control mb-3" minLength={20} required />
                                    <button className='btn d-block ml-auto cancle'>Confirm</button>
                                </fieldset>
                            </form>
                        </>
                    } />
                    <Modal show={ CancelConfirm } Hide={ () => setCancelConfirm(false) } content={ <CancelConfirmation po_id={ po_id } CancelRequisition={ CancelRequisition } /> } />
                    <Modal show={ ApprovalConfirm } Hide={ () => setApprovalConfirm(false) } content={ <ApprovalConfirmation SubOrdinands={ SubOrdinands } loadSubOrdinands={ loadSubOrdinands } requested_by={ RequestDetails.requested_by } po_id={ po_id } ApproveRequisition={ ApproveRequisition } /> } />
                    <Modal show={ RejectConfirm } Hide={ () => setRejectConfirm(false) } content={ <RejectConfirmation RequestDetails={ RequestDetails } Specifications={ Specifications } po_id={ po_id } RejectRequisition={ RejectRequisition } /> } />
                    <Modal show={ EditConfirm } Hide={ () => setEditConfirm(false) } content={ EditContent } />
                    <div className="d-flex align-items-end justify-content-between">
                        <h4 className="heading">
                            Purchase Order
                            <sub>Request Details</sub>
                        </h4>
                        <div className="d-flex">
                            <button className="btn light" onClick={ () => history.goBack() }>Back</button>
                            {
                                AdvanceCash.length === 0 && Cashier && RequestDetails?.payment_mode === 'Cash' && !RequestDetails?.cash_payment_dt
                                ?
                                <button id="clearBtn" className="btn submit ml-2" onClick={() => releasePayment(po_id, RequestDetails.requested_by)}>Release Payment</button>
                                :
                                AdvanceCash.length > 0 && selectedAC.length === AdvanceCash.length && Cashier && RequestDetails?.payment_mode === 'Cash' && !RequestDetails?.cash_payment_dt
                                ?
                                <button id="clearBtn" className="btn submit ml-2" onClick={() => clearSelectedAC(po_id, selectedAC)}>Clear</button>
                                :null
                            }
                            {
                                AccessControls.access && !Cashier && (JSON.parse(AccessControls.access).includes(109) || JSON.parse(AccessControls.access).includes(0)) && RequestDetails?.payment_status !== 'Paid' && RequestDetails?.status === 'approved' && RequestDetails?.payment_mode === 'Cheque' && (
                                    <button className="btn submit ml-2" onClick={() => setPaymentStatusModel(true)}>Payment Status</button>
                                )
                            }
                        </div>
                    </div>
                    <br />
                    <div className='ml-auto d-flex' style={ { width: 'fit-content' } }>
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
                            {
                                AccessControls.access && JSON.parse(AccessControls.access).includes(90) && RequestDetails.status === 'approved'
                                ?
                                <>
                                    <button className="btn cancle" onClick={ () => setUnApprove(true) }>UnApprove</button>
                                </>
                                :null
                            }
                        </div>
                    </div>
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
                                        <td>
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
                                        </td>
                                    </tr>
                                    <tr>
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
                                                        RequestDetails.status === 'approved' || RequestDetails.status === 'unapproved'
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
                                    </tr>
                                    {
                                        RequestDetails.status === 'unapproved' && (
                                            <tr>
                                                <td>
                                                    <b>Unapproved By</b><br />
                                                    <span>{ RequestDetails.unapproved_person_name }</span><br />
                                                    <span>{ RequestDetails.unapproved_person_designation_name }</span>
                                                </td>
                                                <td>
                                                    <b>Unapproved At</b><br />
                                                    <span>{ new Date(RequestDetails.unapproved_at).toDateString() }</span><br />
                                                    <span>{ new Date(RequestDetails.unapproved_at).toTimeString().substring(0,5) }</span>
                                                </td>
                                                <td colSpan={2}>
                                                    <b>Reamrks</b><br />
                                                    <span>{ RequestDetails.unapproved_comments }</span>
                                                </td>
                                            </tr>
                                        )
                                    }
                                    {
                                        RequestDetails?.payment_mode === 'Cheque'
                                        ?
                                        (
                                            RequestDetails?.status.toLowerCase() === 'approved'
                                            ?
                                            <tr>
                                                <td colSpan={2}>
                                                    <b>Additional Notes</b><br />
                                                    <span>{RequestDetails.note}</span>
                                                </td>
                                                <td>
                                                    <b>Payment Status</b><br />
                                                    {
                                                        RequestDetails?.payment_status === 'Pending'
                                                            ?
                                                            <span className="text-danger">Pending</span>
                                                            :
                                                            <div className='m-0 bg-lightgray'>
                                                                {RequestDetails?.in_progree_dt && <div><b className='text-warning'>In Progress</b> at {new Date(RequestDetails?.in_progree_dt).toDateString()} {new Date(RequestDetails?.in_progree_dt).toTimeString().substring(0, 5)}</div>}
                                                                {RequestDetails?.checque_prepared_dt && <div><b className='text-info'>Cheque Prepared</b> at {new Date(RequestDetails?.checque_prepared_dt).toDateString()} {new Date(RequestDetails?.checque_prepared_dt).toTimeString().substring(0, 5)}</div>}
                                                                {RequestDetails?.paid_dt && <div><b className='text-success'>Paid</b> at {new Date(RequestDetails?.paid_dt).toDateString()} {new Date(RequestDetails?.paid_dt).toTimeString().substring(0, 5)}</div>}
                                                            </div>
                                                    }
                                                </td>
                                                <td>
                                                    <b>Payment Mode</b><br />
                                                    <span className="text-secondary">{RequestDetails?.payment_mode}</span>
                                                </td>
                                            </tr>
                                            :
                                            <tr>
                                                <td colSpan={4}>
                                                    <b>Additional Notes</b><br />
                                                    <span>{ RequestDetails.note }</span>
                                                </td>
                                            </tr>
                                        )
                                        :
                                        RequestDetails?.status.toLowerCase() === 'approved'
                                        ?
                                        <tr>
                                            <td colSpan={2}>
                                                <b>Additional Notes</b><br />
                                                <span>{RequestDetails.note}</span>
                                            </td>
                                            <td>
                                                <b>Payment Status</b><br />
                                                {
                                                    RequestDetails?.cash_payment_dt
                                                    ?
                                                    <>
                                                        <span className="text-success">Paid </span>
                                                        at {new Date(RequestDetails?.cash_payment_dt).toDateString()} {new Date(RequestDetails?.cash_payment_dt).toTimeString().substring(0, 5)}
                                                    </>
                                                    :
                                                    <>
                                                        <span className="text-danger">Pending</span>
                                                    </>
                                                }
                                            </td>
                                            <td>
                                                <b>Payment Mode</b><br />
                                                <span className="text-secondary">{RequestDetails?.payment_mode}</span>
                                            </td>
                                        </tr>
                                        :
                                        <tr>
                                            <td colSpan={4}>
                                                <b>Additional Notes</b><br />
                                                <span>{ RequestDetails.note }</span>
                                            </td>
                                        </tr>
                                    }
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
                                            parseFloat(RequestDetails.total_ac_adjustments) > 0 && (
                                                <tr>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td className='sub-total-td text-danger'><b>Adjust Advance Cash</b></td>
                                                    <td className='sub-total-td text-right'>-{ fm.from(RequestDetails.total_ac_adjustments) }</td>
                                                </tr>
                                            )
                                        }
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
                        View === 'ac'
                        ?
                        <div className='purchase_requisition_details_2' id="accordion">
                            <div className='collapse_toogle mb-2 d-flex justify-content-between'>
                                <h6 className='mb-0'>Advance Cash Attached</h6>
                                <h6 className='mb-0'>({AdvanceCash.length})</h6>
                            </div>
                            <div>
                                {
                                    AdvanceCash.length === 0
                                    ?
                                    <h6 className="text-center">No Advance Cash Attached</h6>
                                    :
                                    <>
                                        {
                                            !RequestDetails?.cash_payment_dt && Cashier && selectedAC.length !== AdvanceCash.length && (
                                                <h6 className='alert alert-warning'>All Advance Cash are required to be selected</h6>
                                            )
                                        }
                                        <div className="grid_container">
                                            {
                                                AdvanceCash.map((val, i) => {
                                                    const dueSinsStart = moment(val.receival_date, "YYYY-MM-DD");
                                                    const dueSinsEnd = val.clearance_date ? moment(val.clearance_date, "YYYY-MM-DD") : moment().startOf('day');
                                                    return (
                                                        <div key={i} className='border' style={{maxHeight: '500px', overflow: 'auto'}}>
                                                            <div className='amountdiv'>
                                                                <h1 className='mb-0'>
                                                                    <small className='text-success' style={{ fontSize: 16 }}>Rs</small><span className='font-weight-bold'>{val.amount.toLocaleString('en')}</span>/-
                                                                </h1>
                                                                <h6 className='text-capitalize mb-0'>{val.amount_in_words}</h6>
                                                            </div>
                                                            <table className='table'>
                                                                <tbody>

                                                                    <tr>
                                                                        <td className='border-top-0'>
                                                                            <h6 className='font-weight-bold mb-0'>Advance Cash #</h6>
                                                                        </td>
                                                                        <td className='border-top-0'>
                                                                            {
                                                                                Cashier && RequestDetails?.payment_mode === 'Cash' && !RequestDetails?.cash_payment_dt
                                                                                ?
                                                                                <div className="d-flex align-items-center alert alert-secondary">
                                                                                    <input type="checkbox" onChange={(e) => onACSelect(e, val.id, i)} />
                                                                                    <p className='mb-0 ml-2'>{val.company_code_name + '-' + val.series_year + '-' + val.serial_no}</p>
                                                                                </div>
                                                                                :
                                                                                <p className='mb-0'>{val.company_code_name + '-' + val.series_year + '-' + val.serial_no}</p>
                                                                            }
                                                                        </td>
                                                                    </tr>

                                                                    <tr>
                                                                        <td>
                                                                            <h6 className='font-weight-bold'>Request Status</h6>
                                                                        </td>
                                                                        <td>
                                                                            <div className='d-flex align-items-center'>
                                                                                <div
                                                                                    className={
                                                                                        "dot mr-1 "
                                                                                        +
                                                                                        (
                                                                                            val.status === 'approved' || val.status === 'cleared'
                                                                                                ?
                                                                                                "bg-success"
                                                                                                :
                                                                                                val.status === 'rejected'
                                                                                                    ?
                                                                                                    "bg-danger"
                                                                                                    :
                                                                                                    val.status === 'waiting for approval' || val.status === 'pending for verification'
                                                                                                        ?
                                                                                                        "bg-warning"
                                                                                                        :
                                                                                                        val.status === 'issued'
                                                                                                            ?
                                                                                                            "bg-info"
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
                                                                                            val.status === 'approved' || val.status === 'cleared'
                                                                                                ?
                                                                                                "text-success"
                                                                                                :
                                                                                                val.status === 'rejected'
                                                                                                    ?
                                                                                                    "text-danger"
                                                                                                    :
                                                                                                    val.status === 'waiting for approval' || val.status === 'pending for verification'
                                                                                                        ?
                                                                                                        "text-warning"
                                                                                                        :
                                                                                                        val.status === 'issued'
                                                                                                            ?
                                                                                                            "text-info"
                                                                                                            :
                                                                                                            "text-dark"
                                                                                        )
                                                                                    }
                                                                                >{val.status}</div>
                                                                            </div>
                                                                        </td>
                                                                    </tr>

                                                                    <tr>
                                                                        <td >
                                                                            <h6 className='font-weight-bold'>Requested By</h6>
                                                                        </td>
                                                                        <td>
                                                                            <p className='mb-0 font-weight-bold'>
                                                                                <Link to={'/hr/employee/details/' + val.emp_id} className='clickable'>{val.requested_emp_name}</Link>
                                                                            </p>
                                                                            <p>{val.designation_name}</p>
                                                                        </td>
                                                                    </tr>

                                                                    {
                                                                        val.shp_line_adv === 'Y'
                                                                            ?
                                                                            <tr>
                                                                                <td>
                                                                                    <h6 className='font-weight-bold'>Line</h6>
                                                                                </td>
                                                                                <td>
                                                                                    <p className='mb-1'>{val.line}</p>
                                                                                </td>
                                                                            </tr>
                                                                            : null
                                                                    }

                                                                    <tr>
                                                                        <td>
                                                                            <h6 className='font-weight-bold'>Reason</h6>
                                                                        </td>
                                                                        <td>
                                                                            <pre style={{ fontFamily: 'Poppins', fontSize: '13px', width: '100%', whiteSpace: 'pre-wrap' }}>{val.reason}</pre>
                                                                        </td>
                                                                    </tr>

                                                                    <tr>
                                                                        <td>
                                                                            <h6 className='font-weight-bold'>Company</h6>
                                                                            <h6 className='font-weight-bold'>Cash Collection Location</h6>
                                                                        </td>
                                                                        <td>
                                                                            <p className='mb-1'>{val.company_name}</p>
                                                                            <p>{val.location_name}</p>
                                                                        </td>
                                                                    </tr>

                                                                    {
                                                                        val.shp_line_adv === 'Y'
                                                                            ?
                                                                            <tr>
                                                                                <td>
                                                                                    <h6 className='font-weight-bold'>Charges</h6>
                                                                                </td>

                                                                                <td>

                                                                                    {
                                                                                        val.d_o
                                                                                            ?
                                                                                            <span className='d-flex mb-1'>
                                                                                                <p className='mr-1 font-weight-bold'>D/O Charges :</p>
                                                                                                <p className='ml-1'>Rs {val.d_o}/-</p>
                                                                                            </span>
                                                                                            :
                                                                                            null
                                                                                    }

                                                                                    {
                                                                                        val.lolo
                                                                                            ?
                                                                                            <span className='d-flex mb-1'>
                                                                                                <p className='mr-1 font-weight-bold'>LOLO Charges :</p>
                                                                                                <p className='ml-1'>Rs {val.lolo}/-</p>
                                                                                            </span>
                                                                                            :
                                                                                            null
                                                                                    }

                                                                                    {
                                                                                        val.detention
                                                                                            ?
                                                                                            <span className='d-flex mb-1'>
                                                                                                <p className='mr-1 font-weight-bold'>Detention :</p>
                                                                                                <p className='ml-1'>Rs {val.detention}/-</p>
                                                                                            </span>
                                                                                            :
                                                                                            null
                                                                                    }

                                                                                    {
                                                                                        val.damage_dirty
                                                                                            ?
                                                                                            <span className='d-flex mb-1'>
                                                                                                <p className='mr-1 font-weight-bold'>Damage & Dirty :</p>
                                                                                                <p className='ml-1'>Rs {val.damage_dirty}/-</p>
                                                                                            </span>
                                                                                            :
                                                                                            null
                                                                                    }

                                                                                    {
                                                                                        val.csc
                                                                                            ?
                                                                                            <span className='d-flex mb-1'>
                                                                                                <p className='mr-1 font-weight-bold'>CSC Charges :</p>
                                                                                                <p className='ml-1'>Rs {val.csc}/-</p>
                                                                                            </span>
                                                                                            :
                                                                                            null
                                                                                    }

                                                                                    {
                                                                                        val.other_purpose_amount
                                                                                            ?
                                                                                            <span className='d-flex mb-1'>
                                                                                                <p className='mr-1 font-weight-bold'>Other Charges :</p>
                                                                                                <p className='ml-1'>Rs {val.other_purpose_amount}/-</p>
                                                                                            </span>
                                                                                            :
                                                                                            null
                                                                                    }

                                                                                    {
                                                                                        val.other_purpose_amount
                                                                                            ?
                                                                                            <span className='d-flex mb-1'>
                                                                                                <p className='mr-1 font-weight-bold'>Other Specification :</p>
                                                                                                <p className='ml-1'>{val.other_purpose_specification}</p>
                                                                                            </span>
                                                                                            :
                                                                                            null
                                                                                    }



                                                                                    {/* {
                                                                                val.other_purpose_specification
                                                                                    ?
                                                                                    <>
                                                                                        <p>Other Charges :</p>
                                                                                        <span className='d-flex mb-1'>
                                                                                            <p className='mr-1 font-weight-bold'>{val.other_purpose_specification} :</p>
                                                                                            <p className='ml-1'>{val.other_purpose_amount}</p>
                                                                                        </span>
                                                                                    </>
                                                                                    :
                                                                                    <p>Other Charges : {val.other_purpose_amount}</p>
                                                                            } */}
                                                                                </td>
                                                                            </tr>
                                                                            : null
                                                                    }
                                                                    <tr>
                                                                        <td>
                                                                            <h6 className='font-weight-bold'>{val.status === 'rejected' && val.approved_by === null ? "Rejected" : "Verified"} By</h6>
                                                                        </td>
                                                                        <td>
                                                                            <p className='mb-0 font-weight-bold'>
                                                                                {val.record_emp_name ? <Link to={'/hr/employee/details/' + val.verified_by} className='clickable'>{val.record_emp_name}</Link> : <span className='text-warning'>Pending For Verification</span>}
                                                                            </p>
                                                                            {val.verified_date ? <>{new Date(val.verified_date).toDateString()} at {moment(val.verified_time, 'h:mm:ss a').format('hh:mm A')}</> : null}
                                                                        </td>
                                                                    </tr>

                                                                    {
                                                                        val.verified_date
                                                                            ?
                                                                            <tr>
                                                                                <td>
                                                                                    {val.verified_date ? <h6 className='font-weight-bold mt-2'>{val.status === 'rejected' && val.approved_by === null ? "Rejection" : "Verification"} Remarks</h6> : null}
                                                                                </td>
                                                                                <td>
                                                                                    {val.verified_date ? <p>{val.verification_remarks}</p> : null}
                                                                                </td>
                                                                            </tr>
                                                                            : null
                                                                    }

                                                                    {
                                                                        val.approved_by !== null && val.status === 'rejected'
                                                                            ?
                                                                            <>
                                                                                <tr>
                                                                                    <td>
                                                                                        <h6 className='font-weight-bold'>Rejected By</h6>
                                                                                    </td>
                                                                                    <td>
                                                                                        <span>
                                                                                            <Link to={'/hr/employee/details/' + (val.approved_by !== null ? val.approved_by : val.verified_by !== null ? val.verified_by : val.emp_id)} className='clickable'>
                                                                                                {val.appr_emp_name ? val.appr_emp_name : val.record_emp_name}
                                                                                            </Link>
                                                                                        </span><br />
                                                                                        <b>Date & Time</b><br />
                                                                                        <span>{new Date(val.approved_date).toDateString() + " at " + moment(val.approved_time, 'h:mm:ss a').format('hh:mm A')}</span>
                                                                                    </td>
                                                                                </tr>

                                                                                <tr>
                                                                                    <td>
                                                                                        <h6 className='font-weight-bold'>
                                                                                            Rejection Remarks
                                                                                        </h6>
                                                                                    </td>
                                                                                    <td>
                                                                                        <pre style={{ fontFamily: 'Poppins', width: '100%', whiteSpace: 'pre-wrap' }}>{val.hod_remarks}</pre>
                                                                                    </td>
                                                                                </tr>
                                                                            </>
                                                                            :
                                                                            val.hod_remarks
                                                                                ?
                                                                                <>
                                                                                    <tr>
                                                                                        <td>
                                                                                            <h6 className='font-weight-bold'>Approved By</h6>
                                                                                        </td>
                                                                                        <td>
                                                                                            <span>
                                                                                                <Link to={'/hr/employee/details/' + (val.approved_by !== null ? val.approved_by : val.verified_by !== null ? val.verified_by : val.emp_id)} className='clickable'>
                                                                                                    {val.appr_emp_name ? val.appr_emp_name : val.record_emp_name}
                                                                                                </Link>
                                                                                            </span><br />
                                                                                            <b>Date & Time</b><br />
                                                                                            <span>{new Date(val.approved_date).toDateString() + " at " + moment(val.approved_time, 'h:mm:ss a').format('hh:mm A')}</span>
                                                                                        </td>
                                                                                    </tr>

                                                                                    <tr>
                                                                                        <td>
                                                                                            <h6 className='font-weight-bold'>
                                                                                                Approval Remarks
                                                                                            </h6>
                                                                                        </td>
                                                                                        <td>
                                                                                            <pre style={{ fontFamily: 'Poppins', width: '100%', whiteSpace: 'pre-wrap' }}>{val.hod_remarks}</pre>
                                                                                        </td>
                                                                                    </tr>
                                                                                </>
                                                                                : null
                                                                    }



                                                                    {
                                                                        val.status === 'cancelled'
                                                                            ?
                                                                            <>
                                                                                <tr>
                                                                                    <td>
                                                                                        <h6 className='font-weight-bold'>Cancelled By</h6>
                                                                                    </td>
                                                                                    <td>
                                                                                        <p className='mb-0 font-weight-bold'>
                                                                                            {<Link to={'/hr/employee/details/' + val.emp_id} className='clickable'>{val.requested_emp_name}</Link>}
                                                                                        </p>
                                                                                        {val.cancelled_at ? <>{new Date(val.cancelled_at).toDateString()} at {moment(val.cancelled_at, 'h:mm:ss a').format('hh:mm A')}</> : null}
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>
                                                                                        <h6 className='font-weight-bold'>Cancellation Remarks</h6>
                                                                                    </td>
                                                                                    <td>
                                                                                        <p className='mb-0'>
                                                                                            {val.cancellation_remarks}
                                                                                        </p>
                                                                                    </td>
                                                                                </tr>
                                                                            </>
                                                                            : null
                                                                    }

                                                                    {
                                                                        val.cashier_emp_name
                                                                            ?
                                                                            <tr>
                                                                                <td>
                                                                                    <h6 className='font-weight-bold'>Cashier</h6>
                                                                                </td>
                                                                                <td>
                                                                                    {
                                                                                        val.cashier_emp_name === null
                                                                                            ?
                                                                                            <span>-----</span>
                                                                                            :
                                                                                            <>
                                                                                                <span>
                                                                                                    <Link to={'/hr/employee/details/' + val.cashier} className='clickable'>{val.cashier_emp_name}</Link>
                                                                                                </span><br />
                                                                                            </>
                                                                                    }
                                                                                </td>
                                                                            </tr>

                                                                            : null
                                                                    }

                                                                    <tr>
                                                                        <td>
                                                                            <h6 className='font-weight-bold'>Collected By</h6>
                                                                        </td>
                                                                        <td>
                                                                            <p>
                                                                                {
                                                                                    val.received_person_name
                                                                                        ?
                                                                                        <>
                                                                                            <b>Name: </b>{val.received_person_name}<br />
                                                                                            <b>Contact: </b> {val.received_person_contact}<br />
                                                                                            <b>CNIC: </b> {val.received_person_cnic}
                                                                                        </>
                                                                                        :
                                                                                        val.receival_date
                                                                                            ?
                                                                                            <span className='text-success'>Cash Collected By <u><Link to={'/hr/employee/details/' + val.emp_id} className='clickable'>{val.requested_emp_name}</Link></u></span>
                                                                                            :
                                                                                            <span className='text-danger'>Cash Not Collected</span>
                                                                                }<br />
                                                                                {val.receival_date ? <><b>Collection Date: </b> {new Date(val.receival_date).toDateString()} at {moment(val.receival_time, 'h:mm:ss a').format('hh:mm A')}</> : null}
                                                                            </p>
                                                                        </td>

                                                                    </tr>

                                                                    {
                                                                        val.hod_remarks
                                                                            ?
                                                                            <>
                                                                                <tr>
                                                                                    <td>
                                                                                        <h6 className='font-weight-bold mb-0'>Amount Consumed</h6>
                                                                                    </td>
                                                                                    <td>
                                                                                        <p className='mb-1'>{val.after_amount ? ("PKR " + val.after_amount.toLocaleString('en')) : <span className='text-warning'>Amount Not Cleared</span>}</p>
                                                                                    </td>
                                                                                </tr>

                                                                                <tr>
                                                                                    <td>
                                                                                        <b>Clearance Date & Time</b><br />
                                                                                    </td>
                                                                                    <td>
                                                                                        {val.clearance_date ? <>{new Date(val.clearance_date).toDateString()} at {moment(val.clearance_time, 'h:mm:ss a').format('hh:mm A')}</> : null}
                                                                                    </td>
                                                                                </tr>

                                                                                <tr>
                                                                                    <td>
                                                                                        <h6 className='font-weight-bold mb-0 mt-2'>Due Since</h6>
                                                                                    </td>
                                                                                    <td>
                                                                                        <span className='text-danger'>
                                                                                            {
                                                                                                val.clearance_date
                                                                                                    ?
                                                                                                    <span className='text-success'>Amount Has Been Cleared</span>
                                                                                                    :
                                                                                                    val.receival_date ?
                                                                                                        <><span className="font-weight-bold" style={{ fontFamily: "Exo" }}>{moment.duration(dueSinsEnd.diff(dueSinsStart)).asDays()}</span> {moment.duration(dueSinsEnd.diff(dueSinsStart)).asDays() === 1 ? "Day" : "Days"}</>
                                                                                                        : "Cash Not Collected"
                                                                                            }</span>
                                                                                    </td>
                                                                                </tr>
                                                                            </>
                                                                            :
                                                                            null
                                                                    }
                                                                </tbody>

                                                            </table>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </>
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
                                            parseFloat(RequestDetails.total_ac_adjustments) > 0 && (
                                                <tr style={ { borderColor: '#000' } }>
                                                    <td style={ { fontSize: 15, textAlign: 'center' } }></td>
                                                    <td style={ { fontSize: 15, textAlign: 'center' } }></td>
                                                    <td style={ { fontSize: 15, textAlign: 'center' } }></td>
                                                    <th style={ { textAlign: 'center', fontSize: 15, outline: '1px solid lightgray' } }><b>Adjust Advance Cash</b></th>
                                                    <td style={ { fontSize: 15, outline: '1px solid lightgray', textAlign: 'center' } }>Rs -{ RequestDetails.total_ac_adjustments.toLocaleString('en') }</td>
                                                </tr>
                                            )
                                        }
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
                                        AdvanceCash.length > 0 && (
                                            <p style={ { fontSize: 17, paddingLeft: 15 } }>
                                                - Advance Cash with Sr.No {AdvanceCash.map((val, i) => {
                                                    return <span key={i}>{val.company_code_name + '-' + val.series_year + '-' + val.serial_no}{(i+1) === AdvanceCash.length ? '' : ', '}</span>
                                                })} {AdvanceCash.length === 1 ? " is " : " are "}attached with this P.O.
                                            </p>
                                        )
                                    }
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
                                        {
                                            RequestDetails.status === 'unapproved'
                                            ?
                                            <div style={ { width: '33.33%', padding: 10 } }>
                                                <b style={ { marginBottom: 10, display: 'block', textAlign: 'center', fontSize: 17 } }>Unapprvoed By</b>
                                                {
                                                    RequestDetails.unapproved_person_name
                                                    ?
                                                    <>
                                                        <p style={ { textAlign: 'center', fontSize: 30, fontFamily: "Tangerine", transform: "rotate(-10deg) translate(0, 5px)" } }>
                                                            { RequestDetails.unapproved_person_name }
                                                        </p>
                                                        <p style={ { marginTop: 10, display: 'block', textAlign: 'center', fontSize: 17 } }>{ RequestDetails.unapproved_person_designation_name }</p>
                                                    </>
                                                    :null
                                                }
                                            </div>
                                            :
                                            <div style={ { width: '33.33%', padding: 10 } }>
                                                <b style={ { marginBottom: 10, display: 'block', textAlign: 'center', fontSize: 17 } }>Proceed To</b>
                                            </div>
                                        }
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
                    {
                        parseFloat(RequestDetails?.total_ac_adjustments) > 0 && (
                            <>
                                <button className='btn' onClick={ () => setView('ac') }>
                                    <i className="las la-money-bill-wave-alt"></i>
                                    <span>
                                        {AdvanceCash.length}
                                    </span>
                                </button>
                                <p className="text-center">AC</p>
                            </>
                        )
                    }

                    <button className='btn' onClick={ printPO }>
                        <i className="las la-print"></i>
                    </button>
                    <p className="text-center">Print</p>

                    {
                        RequestDetails.requested_by == localStorage.getItem('EmpID') && 
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

            /**
              * @author ComFreek
              * @license MIT (c) 2013-2015 ComFreek <http://stackoverflow.com/users/603003/comfreek>
              * Please retain this author and license notice!
              */
            function valOrFunction(val, ctx, args) {
                if (typeof val == "function") {
                    return val.apply(ctx, args);
                } else {
                    return val;
                }
            }

            function InvalidInputHelper(input, options) {
                input.setCustomValidity(valOrFunction(options.defaultText, window, [input]));

                function changeOrInput() {
                    if (input.value == "") {
                        input.setCustomValidity(valOrFunction(options.emptyText, window, [input]));
                    } else {
                        input.setCustomValidity("");
                    }
                }

                function invalid() {
                    if (input.value == "") {
                        input.setCustomValidity(valOrFunction(options.emptyText, window, [input]));
                    } else {
                        input.setCustomValidity(valOrFunction(options.invalidText, window, [input]));
                    }
                }

                input.addEventListener("change", changeOrInput);
                input.addEventListener("input", changeOrInput);
                input.addEventListener("invalid", invalid);
            }

            InvalidInputHelper(document.getElementById("paymentMode"), {
                defaultText: "",
                emptyText: "Please select the mode of payment.",
                invalidText: function (input) {
                    return 'The mode of payment "' + input.value + '" is invalid!';
                }
            });

        }, []
    );

    return (
        <>
            <form className='pt-1' onSubmit={ (e) => ApproveRequisition( e, po_id, requested_by ) }>
                <fieldset>
                    <h6 className='font-weight-bold'>Confirm Approval</h6>
                    <hr />
                    <div className="alert alert-success d-none" id="error_alert_approval"></div>
                    <select id="paymentMode" name="payment_mode" required className='form-control my-3' title="Please select the mode of payment.">
                        <option value="">Mode Of Payment</option>
                        <option value="Cash">Cash</option>
                        <option value="Cheque">Cheque</option>
                    </select>
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
                    <h6 className='font-weight-bold'>Confirm Cancellation</h6>
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

const PORequests = ( { PaymentStatus, setPaymentStatus, PaymentMode, setPaymentMode, fm, Status, RequestStatuses, AccessDefined, LoadedCompanies, FilterAmount, SpecKeyword, FilterCompany, AccessControls, history, Requests, loadRequests, setStatus, setSpecKeyword, setFilterCompany, setFilterAmount } ) => {

    const [ ShowFilters, setShowFilters ] = useState(false);
    const [ List, setList ] = useState();
    const types = {
        total_value: 'total_value',
        series_code: 'series_code',
        requested_date: 'requested_date',
    };
    // const momentTZ = require('moment-timezone');
    
    useEffect(
        () => {
            if (Requests) {
                const Arr = Requests.filter(
                    val => {
                        return val.payment_status.toLowerCase().includes(PaymentStatus.toLowerCase()) && val.payment_mode.toLowerCase().includes(PaymentMode.toLowerCase()) && val.status.toLowerCase().includes(Status.toLowerCase()) && val.company_name.toLowerCase().includes(FilterCompany.toLowerCase()) && val.specifications.toLowerCase().includes(SpecKeyword.toLowerCase())
                    }
                );
                const moreFiltered = Status.length === 0 ? Arr : Arr.filter(val => val.status.toLowerCase().length === Status.toLowerCase().length);
                const amountFiltered = FilterAmount.length === 0 ? moreFiltered : moreFiltered.filter(val => val.total_value >= parseFloat(FilterAmount));
                setList(amountFiltered);
            }
        }, [ Status, Requests, FilterCompany, SpecKeyword, FilterAmount, PaymentMode, PaymentStatus ]
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
        sessionStorage.removeItem('PaymentMode');
        sessionStorage.removeItem('PaymentStatus');
        setFilterCompany("");
        setSpecKeyword("");
        setFilterAmount('');
        setPaymentMode('');
        setPaymentStatus('');
    }

    return (
        <>
            <div className="purchase_requests">
                <div className="d-flex align-items-end justify-content-between">
                    <h3 className="heading">
                        Purchase Order
                        <sub>Previous Requests</sub>
                    </h3>
                    <div>
                        {
                            AccessControls.access
                            ?
                            JSON.parse(AccessControls.access).includes(22) || JSON.parse(AccessControls.access).includes(0)
                            ?
                            <button className='btn submit' onClick={ () => history.replace('/purchase/order/form') }>New</button>
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
                                            SpecKeyword !== '' || FilterCompany !== '' || FilterAmount !== ''
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
                <br />
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
                                <div className='w-50 AmountSearch-div '>
                                    <label className="font-weight-bold mb-0">Mode Of Payment</label>
                                    <select value={PaymentMode} className='form-control form-control-sm mb-2' onChange={(e) => setPaymentMode(e.target.value)}>
                                        <option value=''>Select Option</option>
                                        <option value="Cash">Cash</option>
                                        <option value="Cheque">Cheque</option>
                                    </select>
                                </div>
                                <div className='w-50 AmountSearch-div '>
                                    <label className="font-weight-bold mb-0">Payment Status</label>
                                    <select value={PaymentStatus} className='form-control form-control-sm mb-2' onChange={(e) => setPaymentStatus(e.target.value)}>
                                        <option value=''>Select Option</option>
                                        <option value="Paid">Paid</option>
                                        <option value="Cheque Prepared">Cheque Prepared</option>
                                        <option value="In Progress">In Progress</option>
                                        <option value="Pending">Pending</option>
                                    </select>
                                </div>
                                <button className='btn green d-block ml-auto mt-2' type='button' onClick={resetFilters}>Reset All</button>
                            </div>
                        </div>
                        <br />
                    </>
                    :null
                }
                <ul className="nav nav-tabs mb-3">
                    {/* <li className="nav-item" onClick={ () => { setStatus('overview'); sessionStorage.setItem('POStatus', 'overview') } }>
                        <a className={ Status === 'overview' ? 'nav-link active text-capitalize' : 'nav-link text-capitalize' }>overview</a>
                    </li> */}
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
                </ul>
                <div className='records-container' style={{ maxHeight: '70vh' }}>
                    {
                        List
                        ?
                        List.length === 0
                        ?
                        <h6 className="text-center">No Request Found</h6>
                        :
                        <table className="table popUps">
                            <thead>
                                <tr>
                                    <th className='border-top-0'>
                                        <div className='d-flex align-items-center'>
                                            PO No
                                            <div className='ml-2'>
                                                <i onClick={ () => sortArray('series_code', 1, 'number') } className="las la-chevron-up d-block" style={{ cursor: 'pointer' }}></i>
                                                <i onClick={ () => sortArray('series_code', 0, 'number') } className="las la-chevron-down d-block" style={{ cursor: 'pointer' }}></i>
                                            </div>
                                        </div>
                                    </th>
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
                                    <th className='border-top-0'>Status</th>
                                    <th className='border-top-0'>Payment Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* {console.log(momentTZ.tz.guess())} */}
                                {
                                    List.map(
                                        ( val, index ) => {
                                            return (
                                                <tr key={ index } className='pointer pointer-hover' onClick={ () => history.push('/purchase/order/details?po_id=' + val.po_id) }>
                                                    <td>{ val.code + '-' + val.series_year + '-' + val.series_code }</td>
                                                    <td>{ val.code } <br /> { val.location_name }</td>
                                                    <td>{ val.specifications }</td>
                                                    {/* <td>{ val.no_items_requested > 1 ? (val.no_items_requested + " Items") : (val.no_items_requested + " Item") }</td> */}
                                                    <td>
                                                        { convertTZ(val.requested_date).toDateString() } <br />
                                                        { val.requested_time }
                                                    </td>
                                                    <td><span style={{ fontFamily: "Exo", fontWeight: 500 }}>{ fm.from(val.total_value) }</span></td>
                                                    <td>
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
                                                                        val.status === 'rejected' || val.status === 'unapproved'
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
                                                                        val.status === 'rejected' || val.status === 'unapproved'
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
                                                    </td>
                                                    <td>
                                                        {
                                                            val.payment_mode === 'Cash'
                                                            ?
                                                            <span className={!val.cash_payment_dt ? "text-warning" : "text-secondary"}>{!val.cash_payment_dt ? "Pending" : "Paid"}</span>
                                                            :
                                                            val.payment_status === 'Paid'
                                                            ?
                                                            <span className='text-success'>Paid</span>
                                                            :
                                                            val.payment_status === 'Cheque prepared'
                                                            ?
                                                            <span className='text-info'>Cheque Prepared</span>
                                                            :
                                                            val.payment_status === 'In progress'
                                                            ?
                                                            <span className='text-secondary'>In Progress</span>
                                                            :
                                                            <span className='text-danger'>Pending</span>
                                                        }<br />
                                                        {
                                                            val.status === 'approved' && (<><b>Mode of Payment: </b>{val.payment_mode}</>)
                                                        }
                                                    </td>
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
                    <button className='btn submit d-block mx-auto mt-3'>Confirm & Submit</button>
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