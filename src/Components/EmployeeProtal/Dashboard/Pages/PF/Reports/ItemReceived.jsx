// list of records delivered during the period
import React, { useEffect, useState } from 'react';
import ReactTooltip from 'react-tooltip';
import { fetchItemsReceivedinPeriod, fetchItemsReceivedList } from '../APIManager';

const ItemReceived = () => {
    const [ list, setList ] = useState();                       // ITEMS RECEIVED LIST
    const [ Item, setItem ] = useState();                       // SELECTED ITEM TO LOAD SUB-ENTRIES
    const [ SubEntries, setSubEntries ] = useState();           // SUB ENTRIES FOR A PARTICULAR LIST ITEM
    const [ ShowFilters, setShowFilters ] = useState(false);    // SHOW FILTERS FORM TRUE/FALSE
    const [ locations, setLocations ] = useState([]);           // LOCATIONS LIST
    const [ StartDate, setStartDate ] = useState('');           // * FILTER START DATE
    const [ EndDate, setEndDate ] = useState('');               // * FILTER END DATE
    const [ Name, setName ] = useState('');                     // * FILTER ITEM NAME
    const [ Location, setLocation ] = useState('');             // * FILTER ITEM LOCATION

    useEffect(
        () => {
            // IF BOTH START AND END DATES HAVE VALUES
            // WE WILL FETCH THE USER LIST
            if (StartDate.length > 0 && EndDate.length > 0) {
                setSubEntries();
                fetchItemsReceivedinPeriod( StartDate, EndDate, setList);
            }
            
            // IF BOTH START AND END DATES ARE EMPTY
            // WE WILL SET USERS STATE TO EMPTY
            // THE LOGIC IS IF START AND END DATES ARE EMPTY, THE USERS LIST WILL BE EMPTY
            if (StartDate.length === 0 && EndDate.length === 0) {
                setList();
                setLocations([]);
                setSubEntries();
            }
        }, [StartDate, EndDate] // IF BOTH START AND END DATES VALUES ARE CHANGED
    );

    // IF SESSION STORAGE HAS VALUES
    useEffect(
        () => {
            if (sessionStorage.getItem('PF_Reports_3_Name')) setName(sessionStorage.getItem('PF_Reports_3_Name'));
            if (sessionStorage.getItem('PF_Reports_3_StartDate')) setStartDate(sessionStorage.getItem('PF_Reports_3_StartDate'));
            if (sessionStorage.getItem('PF_Reports_3_EndDate')) setEndDate(sessionStorage.getItem('PF_Reports_3_EndDate'));
        }, []
    );

    // IF USERS LIST LENGTH IS GREATER THAN 0
    // FETCH USER CATEGORIES
    // TO FILTER
    useEffect(
        () => {
            if (list && list.length > 0) {
                // TO SET LOAD LOCATIONS LIST IN FILTER
                // PUSH ALL LOCATIONS IN THE locations STATE
                // PRESENT IN THE LIST OF ITEMS RECEIVED AT A PARTICULAR LOCATION
                let locationsArr = [];
                for (let x = 0; x < list.length; x++) {
                    if (!locationsArr.includes(list[x].tbl_pf_rd_location?.location_name)) // IF LOCATION IS NOT EXISTS IN locationsArr VARIABLE
                    {
                        locationsArr.push(list[x]?.tbl_pf_rd_location?.location_name);
                    }
                }
                setLocations(locationsArr);
            }
        }, [list]
    );

    // TO REMOVE THE SESSIONS
    // RESET THE FILTERS
    const resetFilters = () => {
        sessionStorage.removeItem('PF_Reports_3_Name');
        sessionStorage.removeItem('PF_Reports_3_Location');
        sessionStorage.removeItem('PF_Reports_3_StartDate');
        sessionStorage.removeItem('PF_Reports_3_EndDate');
        setStartDate("");
        setEndDate("");
        setName("");
        setLocation("");
    }

    const onLoadSubEntries = async (index, location_code, item_id, StartDate, EndDate, setSubEntries) => {
        if (Item === index) {
            setItem();
            setSubEntries();
        }else {
            setItem(index);
            await fetchItemsReceivedList(location_code, item_id, StartDate, EndDate, setSubEntries);
        }
    }

    return (
        <div className='page'>
            <div className="page-content">
                <div className="d-flex align-items-center justify-content-between">
                    <h3 className="heading">
                        Item Received During the period
                        <sub>Total Item Received During the period</sub>
                    </h3>
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
                                        Location !== '' || StartDate !== '' || EndDate !== '' || Name !== ''
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
                <br />
                {
                    ShowFilters
                    ?
                    <>
                        <div className='filter-content popUps'>
                            <div className='flex'>
                                {
                                    // * IF USERS LIST LENGTH IS GREATER THAN 0
                                    list && list?.length > 0 && (
                                        <>
                                            <div className='w-50'>
                                                <label className="font-weight-bold mb-0">Search Item</label>
                                                <input value={Name} type="search" placeholder='Search Item Names...' onChange={ (e) => {
                                                    setName(e.target.value);
                                                    sessionStorage.setItem('PF_Reports_3_Name', e.target.value);
                                                }} className='form-control form-control-sm mb-2' />
                                            </div>
                                            <div className='w-50'>
                                                <label className="font-weight-bold mb-0">Locations</label>
                                                <select className="form-control form-control-sm mb-2" onChange={(e) => {
                                                    setLocation(e.target.value);
                                                    sessionStorage.setItem('PF_Reports_3_Location', e.target.value);
                                                }}>
                                                    <option value=''>Select Location</option>
                                                    {
                                                        locations.map((location, index) => {
                                                            return <option key={index} value={location}>{location}</option>
                                                        })
                                                    }
                                                </select>
                                            </div>
                                        </>
                                    )
                                }
                                <div className='w-50'>
                                    <label className="font-weight-bold mb-0">Start Date</label>
                                    <input value={StartDate} type="date" onChange={ (e) => {
                                        setStartDate(e.target.value);
                                        sessionStorage.setItem('PF_Reports_3_StartDate', e.target.value)
                                    }} className='form-control form-control-sm mb-2' />
                                </div>
                                <div className='w-50'>
                                    <label className="font-weight-bold mb-0">End Date</label>
                                    <input value={EndDate} type="date" onChange={ (e) => {
                                        setEndDate(e.target.value);
                                        sessionStorage.setItem('PF_Reports_3_EndDate', e.target.value)
                                    }} className='form-control form-control-sm mb-2' />
                                </div>
                                <button className='btn green d-block ml-auto mt-2' type='button' onClick={resetFilters}>Reset All</button>
                            </div>
                        </div>
                        <br />
                    </>
                    :null
                }
                <hr />
                {
                    !list
                    ?
                    <h6 className="text-center mb-0">No Date Selected</h6>
                    :
                    list.length === 0
                    ?
                    <h6 className="text-center mb-0">No Record Found</h6>
                    :
                    <table className="table popUps">
                        <thead>
                            <tr>
                                <th className='border-top-0'>Sr.No</th>
                                <th className='border-top-0'>Item Name</th>
                                <th className='border-top-0'>Location Name</th>
                                <th className='border-top-0'>Total Quantity Received</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                list.filter(val => val.tbl_pf_rd_item.item_name.toLowerCase().includes(Name.toLowerCase()) && val.tbl_pf_rd_location?.location_name.toLowerCase().includes(Location.toLowerCase())).map((val, i) => {
                                    return (
                                        <>
                                            <tr key={val.registration_id} onClick={() => onLoadSubEntries(i, val.tbl_pf_rd_location.location_code, val.tbl_pf_rd_item.item_id, StartDate, EndDate, setSubEntries)} className='pointer pointer-hover'>
                                                <td>{i+1}</td>
                                                <td>{val.tbl_pf_rd_item.item_name}</td>
                                                <td>{val?.tbl_pf_rd_location?.location_name}</td>
                                                <td>{parseFloat(val?.total_in_qty).toFixed(2)}</td>
                                            </tr>
                                            {
                                                Item === i && SubEntries && (
                                                    <>
                                                        <tr id={`subEntries${i}`} className='pointer pointer-hover'>
                                                            <th className='border bg-light'></th>
                                                            <th className='border bg-light'>Sr.No</th>
                                                            <th className='border bg-light'>Quantity</th>
                                                            <th className='border bg-light'>Received At</th>
                                                        </tr>
                                                        {
                                                            SubEntries.map(
                                                                (val, ii) => {
                                                                    return (
                                                                        <tr id={`subEntries${i}`} key={ii}>
                                                                            <td className='border bg-light'></td>
                                                                            <td className='border bg-light'>{ii + 1}</td>
                                                                            <td className='border bg-light'>{val.in_qty}</td>
                                                                            <td className='border bg-light'>{val.transaction_date}</td>
                                                                        </tr>
                                                                    )
                                                                }
                                                            )
                                                        }
                                                    </>
                                                )
                                            }
                                        </>
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

export default ItemReceived;