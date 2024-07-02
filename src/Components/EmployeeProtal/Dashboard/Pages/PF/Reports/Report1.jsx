import React, { useEffect, useState } from 'react';
import ReactTooltip from 'react-tooltip';
import moment from 'moment';
import { fetchUserCategories, fetchUsersCollectedRashan } from '../RD/APIManager';

const Report1 = () => {
    const [ users, setUsers ] = useState();                     // USERS LIST
    const [ ShowFilters, setShowFilters ] = useState(false);    // SHOW FILTERS FORM TRUE/FALSE
    const [ categories, setCategories ] = useState([]);         // USER CATEGORIES LIST
    const [ companies, setCompanies ] = useState([]);           // COMPANIES LIST
    const [ locations, setLocations ] = useState([]);           // LOCATIONS LIST
    const [ StartDate, setStartDate ] = useState('');           // * FILTER START DATE
    const [ EndDate, setEndDate ] = useState('');               // * FILTER END DATE
    const [ Name, setName ] = useState('');                     // * FILTER USER NAME
    const [ Category, setCategory ] = useState('');             // * FILTER USER CATEGORY
    const [ Company, setCompany ] = useState('');               // * FILTER USER COMPANY
    const [ Location, setLocation ] = useState('');             // * FILTER USER LOCATION

    useEffect(
        () => {
            // IF BOTH START AND END DATES HAVE VALUES
            // WE WILL FETCH THE USER LIST
            if (StartDate.length > 0 && EndDate.length > 0) fetchUsersCollectedRashan( StartDate, EndDate, setUsers);
            
            // IF BOTH START AND END DATES ARE EMPTY
            // WE WILL SET USERS STATE TO EMPTY
            // THE LOGIC IS IF START AND END DATES ARE EMPTY, THE USERS LIST WILL BE EMPTY
            if (StartDate.length === 0 && EndDate.length === 0) {
                setUsers();
                setCategories([]);
                setCompanies([]);
                setLocations([]);
            }
        }, [StartDate, EndDate] // IF BOTH START AND END DATES VALUES ARE CHANGED
    );

    // IF SESSION STORAGE HAS VALUES
    useEffect(
        () => {
            if (sessionStorage.getItem('PF_Reports_1_Name')) setName(sessionStorage.getItem('PF_Reports_1_Name'));
            if (sessionStorage.getItem('PF_Reports_1_StartDate')) setStartDate(sessionStorage.getItem('PF_Reports_1_StartDate'));
            if (sessionStorage.getItem('PF_Reports_1_EndDate')) setEndDate(sessionStorage.getItem('PF_Reports_1_EndDate'));
        }, []
    );

    // IF USERS LIST LENGTH IS GREATER THAN 0
    // FETCH USER CATEGORIES
    // TO FILTER
    useEffect(
        () => {
            if (users && users.length > 0) {
                fetchUserCategories(setCategories);
                
                // TO SET LOAD COMPANIES LIST IN FILTER
                // PUSH ALL COMPANIES IN THE companies STATE
                // PRESENT IN THE LIST OF USERS
                let companiesArr = [];
                for (let x = 0; x < users.length; x++) {
                    if (
                        users[x]?.tbl_pf_rd_category?.category_id === 1 &&  // IF USER CATEGORY IS EMPLOYEE
                        !companiesArr.includes(users[x].company_name) // IF CATEGORY IS NOT EXISTS IN companiesArr VARIABLE
                    )
                    {
                        companiesArr.push(users[x].company_name);
                    }
                }
                setCompanies(companiesArr);

                // TO SET LOAD LOCATIONS LIST IN FILTER
                // PUSH ALL LOCATIONS IN THE locations STATE
                // PRESENT IN THE LIST OF USERS
                let locationsArr = [];
                for (let x = 0; x < users.length; x++) {
                    if (
                        users[x]?.tbl_pf_rd_category?.category_id === 1 &&  // IF USER CATEGORY IS EMPLOYEE
                        !locationsArr.includes(users[x].location_name) // IF CATEGORY IS NOT EXISTS IN locationsArr VARIABLE
                    )
                    {
                        locationsArr.push(users[x].location_name);
                    }
                }
                setLocations(locationsArr);
            }
        }, [users]
    );

    // TO REMOVE THE SESSIONS
    // RESET THE FILTERS
    const resetFilters = () => {
        sessionStorage.removeItem('PF_Reports_1_Name');
        sessionStorage.removeItem('PF_Reports_1_Category');
        sessionStorage.removeItem('PF_Reports_1_Company');
        sessionStorage.removeItem('PF_Reports_1_Location');
        sessionStorage.removeItem('PF_Reports_1_StartDate');
        sessionStorage.removeItem('PF_Reports_1_EndDate');
        setStartDate("");
        setEndDate("");
        setName("");
        setCategory("");
        setCompany("");
        setLocation("");
    }

    return (
        <div className='page'>
            <div className="page-content">
                <div className="d-flex align-items-center justify-content-between">
                    <h3 className="heading">
                        list of records delivered during the period
                        <sub>Users who collected the rashan during the period</sub>
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
                                        Location !== '' || Company !== '' || StartDate !== '' || EndDate !== '' || Name !== '' || Category !== ''
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
                                    users && users?.length > 0 && (
                                        <>
                                            <div className='w-50'>
                                                <label className="font-weight-bold mb-0">Search Name</label>
                                                <input value={Name} type="search" placeholder='Search User Names...' onChange={ (e) => {
                                                    setName(e.target.value);
                                                    sessionStorage.setItem('PF_Reports_1_Name', e.target.value);
                                                }} className='form-control form-control-sm mb-2' />
                                            </div>
                                            <div className='w-50'>
                                                <label className="font-weight-bold mb-0">User Category</label>
                                                <select className="form-control form-control-sm mb-2" onChange={(e) => {
                                                    setCategory(e.target.value);
                                                    sessionStorage.setItem('PF_Reports_1_Category', e.target.value);
                                                }}>
                                                    <option value=''>Select Category</option>
                                                    {
                                                        categories.map((val, index) => {
                                                            return <option key={index} value={val.category_name}>{val.category_name}</option>
                                                        })
                                                    }
                                                </select>
                                            </div>
                                            <div className='w-50'>
                                                <label className="font-weight-bold mb-0">Companies</label>
                                                <select className="form-control form-control-sm mb-2" onChange={(e) => {
                                                    setCompany(e.target.value);
                                                    sessionStorage.setItem('PF_Reports_1_Company', e.target.value);
                                                }}>
                                                    <option value=''>Select Company</option>
                                                    {
                                                        companies.map((company, index) => {
                                                            return <option key={index} value={company}>{company}</option>
                                                        })
                                                    }
                                                </select>
                                            </div>
                                            <div className='w-50'>
                                                <label className="font-weight-bold mb-0">Locations</label>
                                                <select className="form-control form-control-sm mb-2" onChange={(e) => {
                                                    setLocation(e.target.value);
                                                    sessionStorage.setItem('PF_Reports_1_Location', e.target.value);
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
                                        sessionStorage.setItem('PF_Reports_1_StartDate', e.target.value)
                                    }} className='form-control form-control-sm mb-2' />
                                </div>
                                <div className='w-50'>
                                    <label className="font-weight-bold mb-0">End Date</label>
                                    <input value={EndDate} type="date" onChange={ (e) => {
                                        setEndDate(e.target.value);
                                        sessionStorage.setItem('PF_Reports_1_EndDate', e.target.value)
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
                    !users
                    ?
                    <h6 className="text-center mb-0">No Date Selected</h6>
                    :
                    users.length === 0
                    ?
                    <h6 className="text-center mb-0">No Record Found</h6>
                    :
                    <table className="table popUps">
                        <thead>
                            <tr>
                                <th className='border-top-0'>Sr.No</th>
                                <th className='border-top-0'>Registration ID</th>
                                <th className='border-top-0'>User Name</th>
                                <th className='border-top-0'>User Category</th>
                                <th className='border-top-0'>Company Name</th>
                                <th className='border-top-0'>Location Name</th>
                                <th className='border-top-0'>Last Delivery Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.filter(
                                    val =>  val.name.toLowerCase().includes(Name.toLowerCase()) &&
                                            val.company_name.toLowerCase().includes(Company.toLowerCase()) &&
                                            val.location_name.toLowerCase().includes(Location.toLowerCase()) &&
                                            val?.tbl_pf_rd_category?.category_name.toLowerCase().includes(Category.toLowerCase())
                                ).map((val, i) => {
                                    return (
                                        <tr key={val.registration_id} className='pointer pointer-hover'>
                                            <td>{i+1}</td>
                                            <td>{val.registration_id}</td>
                                            <td>{val.name}</td>
                                            <td>{val?.tbl_pf_rd_category?.category_name}</td>
                                            <td>{val?.company_name}</td>
                                            <td>{val?.location_name}</td>
                                            <td>{moment(val?.last_delivery_date).format('YYYY-MM-DD')}</td>
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

export default Report1;