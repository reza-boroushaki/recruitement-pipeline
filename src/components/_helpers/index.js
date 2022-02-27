import moment from 'moment';

export const stages = [
    {name: "First contact", color: '#10EF7C'},
    {name: "Interview", color: '#1013EF'},
    {name: "Tech", color: 'navy'},
    {name: "Assignment", color: '#EFEC10'},
    {name: "Rejected", color: '#FA1B1B'},
    {name: "Hired", color: 'orange'}
]

export const acceptFileTypes = [
    {type: 'application/pdf', name: 'pdf'}
]

export const getDateTime = val => {
    return moment(val).format("MMM D, YYYY, hh:mma")
}

export const getDaysTill = val => {
    return moment(val).fromNow() + ', ' + moment(val).format("hh:mma")
}

export const generateActionObject = (elm, title, from, to) => {
    if(title === "resume") {
        from = ''; 
        to = '';
    };
    return {
        type: elm,
        title,
        from: from.length ? from : '',
        to,
        time: new Date().getTime()
    }
}