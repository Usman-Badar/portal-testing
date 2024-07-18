export const sortArray = (type, in_de, dataType, setState) => {
    let sorted = sort(type, in_de, dataType);
    setState(sorted);
};

export const sort = (property, in_de, dataType) => {
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

export const sortNumber = (arr, property, in_de) => {
    let sorted;
    if (in_de > 0) {
        sorted = [...arr].sort((a, b) => b[property] - a[property]);
    } else {
        sorted = [...arr].sort((a, b) => a[property] - b[property]);
    }
    return sorted;
}

export const sortString = (arr, property, in_de) => {
    let sorted;
    if (in_de > 0) {
        sorted = [...arr].sort((a, b) => b[property].localeCompare(a[property]));
    } else {
        sorted = [...arr].sort((a, b) => a[property].localeCompare(b[property]));
    }
    return sorted;
}

export const sortDate = (arr, property, in_de) => {
    let sorted;
    if (in_de > 0) {
        sorted = [...arr].sort((a, b) => new Date(b[property]) - new Date(a[property]));
    } else {
        sorted = [...arr].sort((a, b) => new Date(a[property]) - new Date(b[property]));
    }
    return sorted;
}