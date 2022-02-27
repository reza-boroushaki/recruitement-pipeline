import { useState, useEffect, useCallback } from 'react';
import Input from "../Inputs/Input";
import { stages, generateActionObject } from '../_helpers';

export default function Form() {
    const [stage, setStage] = useState(0);
    const [form, setForm] = useState(null);
    const stageChange = useCallback(val => {
        setStage(val);
    }, [])
    const updateForm = useCallback((title, val) => {
        const update = {
            ...form,
            [title]: typeof form[title] === "object" && title !== 'resume' ? [...form[title], val] : val,
            actions: [...form.actions, generateActionObject('input', title, form[title], val)]
        }
        setForm(update);
    }, [form])
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
                        -
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
                    <Input
                        attr={{
                            type: "text",
                            title: "Skills",
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
                            required: true
                        }}
                        updateForm={updateForm}
                        stage={stage}
                        stageChange={stageChange}
                        inputState={form?.experience}
                    />
                </div>
                <div className="rightCol">

                </div>
            </form>
        </>
    )
}
