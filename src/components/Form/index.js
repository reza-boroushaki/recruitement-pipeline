import { useState, useEffect, useCallback } from 'react';
import { stages } from '../_helpers';

export default function Form() {
    const [stage, setStage] = useState(0);
    const stageChange = useCallback(val => {
        setStage(val);
    }, [])
    return (
        <>
            <form>
                <div className="leftCol">
                    <div className="stageWrapper">
                        <select style={{backgroundColor: `${stages[stage].color}`}} onChange={e => stageChange(e.target.value)} value={stage}>
                            {
                                stages.map((item, index) => <option key={index} value={index}>{item.name}</option>)
                            }
                        </select>
                    </div>
                </div>
                <div className="rightCol">

                </div>
            </form>
        </>
    )
}
