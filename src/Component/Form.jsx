import React, { useState } from 'react';
import './Form.css';
import { Button } from 'react-bootstrap';

const initialValue = {
    name: '',
    phone: '',
    email: ''
}

function Form() {
    const [formValue, setFormValue] = useState(initialValue);
    const [firstTableValue, setFirstTableValue] = useState([]);
    const [secondTableValue, setSecondTableValue] = useState([]);
    const [selectedField, setSelectedField] = useState(firstTableValue || []);
    const [selectedList, setSelectedList] = useState([]);

    const getFirstTableData = React.useCallback(() => {
        const firstData = localStorage.getItem("data");
        setFirstTableValue(firstData !== null ? JSON.parse(firstData) : firstTableValue);
    }, [])

    const getSecondTableData = React.useCallback(() => {
        const secondData = localStorage.getItem("secondData");
        setSecondTableValue(secondData !== null ? JSON.parse(secondData) : secondTableValue);
    }, [])

    React.useEffect(() => {
        getFirstTableData();
    }, [getFirstTableData])

    React.useEffect(() => {
        getSecondTableData();
    }, [getSecondTableData])

    const handleChange = (e) => {
        setFormValue((preValue) => {
            return {
                ...preValue,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem("data", JSON.stringify([...firstTableValue, formValue]));
        setFormValue(initialValue);
        getFirstTableData();
    }

    const handleDelete = (data) => {
        const deleted = firstTableValue && firstTableValue.filter((items, index) => index === data).map(newItem => newItem)
        const remaining = firstTableValue && firstTableValue.filter((items, index) => index !== data).map(newItem => newItem)
        localStorage.setItem("data", JSON.stringify(remaining));
        localStorage.setItem("secondData", JSON.stringify([...secondTableValue, deleted[0]]));
        getFirstTableData();
        getSecondTableData();
    }

    const handleCheckBox = (data) => {
        setSelectedField([...selectedField, data]);
    }

    // const handleMultipleDelete = () => {
    //     let _data = [...firstTableValue];
    //     selectedField.forEach((rd, indexs) => {
    //         console.log(indexs)
    //         _data = _data.filter((t, index) => index === indexs);
    //     });
    //     setSelectedList(_data);
    // };


    return (
        <div className="main">
            <form onSubmit={(e) => handleSubmit(e)} className="form">
                <div className="field">
                    <label htmlFor="name" className="labels">Name</label>
                    <input type="text" value={formValue.name} onChange={(e) => { handleChange(e) }} name="name" />
                </div>
                <div className="field">
                    <label className="labels">Phone</label>
                    <input type="text" value={formValue.phone} name="phone" onChange={(e) => { handleChange(e) }} />
                </div>
                <div className="field">
                    <label className="labels">Email</label>
                    <input type="text" value={formValue.email} name="email" onChange={(e) => { handleChange(e) }} />
                </div>
                <div>
                    <button type="submit" className="btnSubmit">Submit</button>
                </div>
            </form>
            <table className="firstTable">
                <thead className="thead">
                    <tr>
                        <th>S.N.</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                {firstTableValue && firstTableValue.length > 0 && firstTableValue.map((items, index) => {
                    return (
                        <tbody>
                            <tr key={index}>
                                <td>{index + 1}</td>
                                {/* <td className="tds"><input type="checkbox" onChange={() => handleCheckBox(index)} /></td> */}
                                <td>{items.name}</td>
                                <td>{items.phone}</td>
                                <td>{items.email}</td>
                                <td><button onClick={() => handleDelete(index)}>Delete</button></td>
                            </tr>
                        </tbody>
                    )
                })
                }
            </table>
            <hr />
            <hr />
            <table>
                <thead>
                    <tr>
                        <th>S.N</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                    </tr>
                </thead>
                {secondTableValue && secondTableValue.length > 0 && secondTableValue.map((items, index) => {
                    return (
                        <tbody>
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{items.name}</td>
                                <td>{items.phone}</td>
                                <td>{items.email}</td>
                            </tr>
                        </tbody>
                    )
                })
                }
            </table>
        </div>
    )
}

export default Form
