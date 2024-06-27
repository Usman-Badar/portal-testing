import axios from '../../../../../../axios';

// CREATED ON 25/06/2024
// THAT'S WHY ALL THE FUNCTIONS ARE NOT INCLUDED IN THIS FILE
// THIS FILE CREATED WHEN I WAS WORKING ON RASHAN CATEGORIES AND RASHAN DISTRIBUTION ITEMS


// ERROR HANDLER FOR EACH AND EVERY REQUEST
// CURRENTLY CONTAINS ONLY CONSOLE.LOG() FUNCTION
const errHandler = (err) => {
    console.log(err);
}

// RASHAN DISTRIBUTION CATEGORIES APIS
// TO FETCH THE LIST OF RASHAN CATEGORIES
export const fetchRashanCategoryList = async (setCategories) => {
    setCategories();
    try {
        const res = await axios.get('/pf/rd/rashan_categories/list');
        setCategories(res.data);
    } catch (err) {
        errHandler(err);
    }
}

// TO FETCH THE LIST OF RASHAN CATEGORIES
// THIS API ONLY CONTAINS TWO FIELDS
// RASHAN CATEGORY ID AND NAME
export const fetchRashanCategories = async (setCategories) => {
    try {
        const res = await axios.get('/pf/rd/rashan_categories');
        setCategories(res.data);
    } catch (err) {
        errHandler(err);
    }
};

// TO CREATE RASHAN CATEGORY
export const onCreateRashanCategory = async (formData) => {
    try {
        const res = await axios.post('/pf/rd/rashan_category/create', formData)
        return res.data;
    } catch (err) {
        errHandler(err);
    }
}

// TO LINK THE SELECTED ITEMS WITH A SPECIFIC RASHAN CATEGORY
export const linkItemsToRashanCategory = async (rashan_category_id, items) => {
    try {
        const res = await axios.post(
            '/pf/rd/rashan_category/link', {
                rashan_category_id: rashan_category_id,
                items: JSON.stringify(items),
                emp_id: localStorage.getItem('EmpID')
            }
        );
        return res.data;
    } catch (err) {
        errHandler(err);
    }
}


// RASHAN ITEMS APIS
// FETCH THE LIST OF ALL RASHAN ITEMS
export const fetchRashanItems = async (setItems) => {
    setItems();
    try {
        const res = await axios.get('/pf/rd/rashan_items');
        setItems(res.data);
    } catch (err) {
        errHandler(err);
    }
}

// TO CREATE RASHAN ITEM
export const onCreateRashanItem = async (formData) => {
    try {
        const res = await axios.post('/pf/rd/rashan_items/create', formData)
        return res.data;
    } catch (err) {
        errHandler(err);
    }
}

// LOAD THE LINKED ITEMS TO A SPECIFIC CATEGORY
// USED IN RASHAN CATEGORY PAGE WHEN CLICKED ON A SPECIFIC CATEGORY
export const fetchRashanLinkedItems = async (rashan_category_id, setItems) => {
    setItems();
    try {
        const res = await axios.get('/pf/rd/rashan_items/selected?rashan_category=' + rashan_category_id);
        console.log(res.data);
        setItems(res.data);
    } catch (err) {
        errHandler(err);
    }
}