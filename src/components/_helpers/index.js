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

export const getActionTranslate = val => {
    console.log(val)
    if(val.title === 'full_name'){
        return(
            <>
                <p className='actionTitle'>You {val.from === '' ? 'added' : `changed ${val.from} to`} {val.to} {val.from === '' ? 'to the candidate list' : ''}</p>
                <p className='actionTime'><i>{getDateTime(val.time)}</i></p>
            </>
        )
    }else
    if(val.from === '' || (val.title !== 'full_name' && val.title !== 'skills' && val.title !== 'resume' && val.title !== 'staging')){
        return(
            <>
                <p className='actionTitle'>You {`changed ${val.title.replace('_',' ')} ${val.from === '' ? '' : 'from'} `} <b>{val.from && val.from}</b> to <b>{val.to}</b></p>
                <p className='actionTime'><i>{getDateTime(val.time)}</i></p>
            </>
        )
    }else
    if(val.title === 'skills'){
        return(
            <>
            {
                val.to
                ?
                <p className='actionTitle'>You added <b>{val.to}</b> to skills</p>
                :
                <p className='actionTitle'>You removed <b>{val.from}</b> from skills</p>
            }
                <p className='actionTime'><i>{getDateTime(val.time)}</i></p>
            </>
        )
    }else
    if(val.title === 'resume'){
        return(
            <>
                <p className='actionTitle'>You added file to resume</p>
                <p className='actionTime'><i>{getDateTime(val.time)}</i></p>
            </>
        )
    }
    if(val.title === 'staging'){
        return(
            <>
                <p className='actionTitle'>You changed status from <span style={{backgroundColor: `${stages[val.from].color}`}}></span> <b>{stages[val.from].name}</b> to <span style={{backgroundColor: `${stages[val.to].color}`}}></span> <b>{stages[val.to].name}</b></p>
                <p className='actionTime'><i>{getDateTime(val.time)}</i></p>
            </>
        )
    }
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