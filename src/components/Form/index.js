import { useState, useEffect, useCallback } from 'react';
import Input from "../Inputs/Input";
import FileInput from "../Inputs/FileInput";
import { stages, generateActionObject } from '../_helpers';
import { updateUser, getUser } from "../../api";
import './form.scss';

export default function Form({ userID }) {
    const [stage, setStage] = useState(0);
    const [form, setForm] = useState(null);
    const [loading, setLoading] = useState(true);
    const stageChange = useCallback(val => {
        setStage(val);
    }, [])
    const updateForm = useCallback((title, val) => {
        const update = {
            ...form,
            id: userID,
            [title]: typeof form[title] === "object" && title !== 'resume' ? [...form[title], val] : val,
            actions: [...form.actions, generateActionObject('input', title, form[title], val)]
        }
        setForm(update);
        updateUser(userID,update).then(res => {
            if(res.stat){
                console.log("updated");
            }
        })
        .catch(() => console.log("error"));
    }, [form, userID])
    const removeSkill = (e, skill) => {
        e.preventDefault();
        const filterSkill = form.skills.filter(item => item !== skill);
        const update = {
            ...form,
            skills: filterSkill,
            actions: [...form.actions, generateActionObject('input', 'skills', skill, '')]
        }
        setForm(update);
        updateUser(userID,update).then(res => {
            if(res.stat){
                console.log("updated");
            }
        })
        .catch(() => console.log("error"));
    }
    useEffect(() => {
        getUser(userID).then(user => {
            if(user){
                setForm(user);
                setLoading(false);
            }
        })
        .catch((e) => console.log(e));
    }, [userID]);
    if(loading){
        return <p>Loading...</p>
    }
    return (
        <>
            <h2 className='userName paddingLeftRight'>{form?.full_name}</h2>
            <form>
                <div className="leftCol">
                    <div className="stageWrapper paddingLeftRight">
                        <div>
                            <select style={{backgroundColor: `${stages[stage].color}`, border: `1px solid ${stages[stage].color}`}} onChange={e => stageChange(e.target.value)} value={stage}>
                                {
                                    stages.map((item, index) => <option key={index} value={index}>{item.name}</option>)
                                }
                            </select>
                        </div>
                    </div>
                    <div className='inputsContainer paddingLeftRight'>
                        <Input
                            attr={{
                                type: "text",
                                title: "Full name",
                                name: "full_name",
                                required: true
                            }}
                            updateForm={updateForm}
                            stage={stage}
                            stageChange={stageChange}
                            inputState={form?.full_name}
                        />
                        <Input
                            attr={{
                                type: "email",
                                title: "Email",
                                name: "email",
                                required: true
                            }}
                            updateForm={updateForm}
                            stage={stage}
                            stageChange={stageChange}
                            inputState={form?.email}
                        />
                        <Input
                            attr={{
                                type: "number",
                                title: "Phone number",
                                name: "phone_number",
                                required: true
                            }}
                            updateForm={updateForm}
                            stage={stage}
                            stageChange={stageChange}
                            inputState={form?.phone_number}
                        />
                        <div className="salaryWrapper">
                            <Input
                                attr={{
                                    type: "number",
                                    title: "Salary",
                                    name: "min_salary",
                                }}
                                updateForm={updateForm}
                                inputState={form?.min_salary}
                            />
                            <span>-</span>
                            <Input
                                attr={{
                                    type: "number",
                                    title: "",
                                    name: "max_salary",
                                }}
                                updateForm={updateForm}
                                inputState={form?.max_salary}
                            />
                        </div>
                        <p className='label'><label>Skills</label></p>
                        <div className='skillsTagWrapper'>
                            {
                                form?.skills?.map((item, index) => (
                                    <div key={index}>
                                        <span>{item}</span>
                                        <button onClick={e => removeSkill(e, item)}>x</button>
                                    </div>
                                ))
                            }
                        </div>
                        <Input
                            attr={{
                                type: "text",
                                title: "",
                                name: "skills",
                            }}
                            updateForm={updateForm}
                        />
                        <Input
                            attr={{
                                type: "text",
                                title: "Seniority",
                                name: "seniority",
                                required: true
                            }}
                            updateForm={updateForm}
                            stage={stage}
                            stageChange={stageChange}
                            inputState={form?.seniority}
                        />
                        <Input
                            attr={{
                                type: "number",
                                title: "Years of experience",
                                name: "experience",
                                required: true,
                                maxLength: 2
                            }}
                            updateForm={updateForm}
                            stage={stage}
                            stageChange={stageChange}
                            inputState={form?.experience}
                        />
                        <FileInput 
                            updateForm={updateForm}
                            inputState={form?.resume}
                        />
                    </div>
                </div>
                <div className="rightCol">

                </div>
            </form>
        </>
    )
}
