/* eslint-disable react-hooks/exhaustive-deps */
import React, { lazy, Suspense, useEffect, useState } from 'react';

import { getAllProducts, getCategories, GetCompanies, getSubCategories, GetSubLocations, search } from './Functions';
const UI = lazy( () => import('./UI') );

const Products = () => {

    const [ SearchedProductsList, setSearchedProductsList ] = useState();
    const [ ProductsList, setProductsList ] = useState([]);
    const [ Open, setOpen ] = useState(false);
    const [ CatType, setCatType ] = useState('consumable');
    const [ ShowZeroValues, setShowZeroValues ] = useState(false);
    const [ Category, setCategory ] = useState();
    const [ SubCategory, setSubCategory ] = useState();
    const [ Categories, setCategories ] = useState();
    const [ SubCategories, setSubCategories ] = useState();
    const [ Companies, setCompanies ] = useState();
    const [ CompanyCode, setCompanyCode ] = useState();
    const [ Locations, setLocations ] = useState([]);
    const [ LocationCode, setLocationCode ] = useState();
    const [ SubLocations, setSubLocations ] = useState([]);
    const [ SubLocationCode, setSubLocationCode ] = useState();

    useEffect(
        () => {
            setProductsList([]);
            setSearchedProductsList();
            getAllProducts( SubLocationCode, LocationCode, CompanyCode, CatType, setProductsList );
        }, [ CatType, CompanyCode, LocationCode, SubLocationCode ]
    )
    useEffect(
        () => {
            setTimeout(() => {
                GetCompanies(setCompanies, setLocations);
            }, 1000);
        }, []
    )
    useEffect(
        () => {
            if (LocationCode) {
                GetSubLocations(LocationCode, setSubLocations);
            }else {
                setSubLocations([]);
            }
        }, [LocationCode]
    )
    useEffect(
        () => {
            if ( sessionStorage.getItem('productCategory') && sessionStorage.getItem('productCategory') !== '' ) setCategory(sessionStorage.getItem('productCategory'));
            if ( sessionStorage.getItem('productSubCategory') && sessionStorage.getItem('productSubCategory') !== '' ) setSubCategory(sessionStorage.getItem('productSubCategory'));
            if ( sessionStorage.getItem('productCompany') && sessionStorage.getItem('productCompany') !== '' ) setCompanyCode(sessionStorage.getItem('productCompany'));
            if ( sessionStorage.getItem('productLocation') && sessionStorage.getItem('productLocation') !== '' ) setLocationCode(sessionStorage.getItem('productLocation'));
            if ( sessionStorage.getItem('productSubLocation') && sessionStorage.getItem('productSubLocation') !== '' ) setSubLocationCode(sessionStorage.getItem('productSubLocation'));
            if ( sessionStorage.getItem('CatType') && sessionStorage.getItem('CatType') !== '' ) setCatType(sessionStorage.getItem('CatType'));
            if ( sessionStorage.getItem('productZeroValues') && sessionStorage.getItem('productZeroValues') !== '' ) {
                if (parseInt(sessionStorage.getItem('productZeroValues')) === 1) {
                    setShowZeroValues(true);
                }else {
                    setShowZeroValues(false);
                }
            }
            if ( sessionStorage.getItem('productSearch') && sessionStorage.getItem('productSearch') !== '' ) {
                const obj = {
                    target: {
                        value: sessionStorage.getItem('productSearch')
                    }
                }
                search(obj, Category, SubCategory, ProductsList, setSearchedProductsList)
            };
        }, [ProductsList]
    )

    useEffect(
        () => {
            setCategory();
            setSubCategory();
            setCategories();
            setSubCategories();
            getCategories( setCategories );
        }, [ CatType ]
    )

    useEffect(
        () => {
            setSubCategory();
            setSubCategories();
            getSubCategories( Category, setSubCategories );

            if ( Category && Category.length > 0 )
            {
                const data = ProductsList;
                const arr = data.filter(
                    val => {
                        return val.category_id === parseInt(Category)
                    }
                );

                setSearchedProductsList(arr);
            }else {
                setSearchedProductsList();
            }
        }, [ Category ]
    )

    useEffect(
        () => {

            if ( SubCategory && SubCategory.length > 0 )
            {
                const data = ProductsList;
                const arr = data.filter(
                    val => {
                        return val.category_id === parseInt(Category) && val.sub_category_id === parseInt(SubCategory)
                    }
                );

                setSearchedProductsList(arr);
            }else
            if (Category && Category.length > 0) {
                const data = ProductsList;
                const arr = data.filter(
                    val => {
                        return val.category_id === parseInt(Category)
                    }
                );

                setSearchedProductsList(arr);
            }else {
                setSearchedProductsList();
            }

        }, [ SubCategory ]
    )

    return (
        <>
            <Suspense fallback={ <div>Loading...</div> }>
                <UI 
                    SearchedProductsList={ SearchedProductsList }
                    ProductsList={ ProductsList }
                    Open={ Open }
                    CatType={ CatType }
                    Category={ Category }
                    SubCategory={ SubCategory }
                    Categories={ Categories }
                    SubCategories={ SubCategories }
                    Companies={ Companies }
                    Locations={ Locations }
                    SubLocations={ SubLocations }
                    ShowZeroValues={ ShowZeroValues }
                    CompanyCode={ CompanyCode }
                    LocationCode={ LocationCode }
                    SubLocationCode={ SubLocationCode }

                    setShowZeroValues={ (val) => {setShowZeroValues(val); sessionStorage.setItem('productZeroValues', val?1:0)} }
                    setSubLocationCode={ setSubLocationCode }
                    setLocationCode={ setLocationCode }
                    setCompanyCode={ setCompanyCode }
                    search={ (e) => search( e, Category, SubCategory, ProductsList, setSearchedProductsList ) }
                    setCatType={ (val) => { setCatType(val); sessionStorage.setItem('CatType', val) } }
                    setCategory={ (val) => { setCategory(val); sessionStorage.setItem('Category', val) } }
                    setSubCategory={ (val) => { setSubCategory(val); sessionStorage.setItem('SubCategory', val) } }
                />
            </Suspense>
        </>
    );

}

export default Products;