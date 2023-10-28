import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Loading from './Loading';

function StudentCreate() {
    const [inputErrorList,setInputErrorList] = useState({});
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate()
    const [student,setStudent] = useState({
        name:'',
        course:'',
        email:'',
        phone:'',
    });
    const handleInput = (e) => {
        e.persist();
        setStudent({ ...student, [e.target.name]: e.target.value });
      };
    const handleSubmit = (e) =>{
        e.preventDefault();
        setLoading(true)
        const data = {
            name: student.name,
            course: student.course,
            email: student.email,
            phone: student.phone,
        }
        axios.post('http://127.0.0.1:8000/api/students',data).then(res => {
            alert(res.data.message)
            navigate('/students')
            setLoading(false)
        }).catch(function(error){
            if(error.response){
                if(error.response.status === 422){
                    setInputErrorList(error.response.data.errors)
                    setLoading(false)
                }
                if(error.response.status === 500){
                    alert(error.response.data)
                }
            }
        })
    }
    if(loading){
        return (
            <Loading/>
        )
    }
  return (
    <div>
        <div className='container'>
            <div className='row'>
                <div className='col-md-12'>
                    <div className='card'>
                        <div className='card-header'>
                            <h4>Add Students 
                                <Link to='/students' className='btn btn-info float-end'>Back</Link>
                            </h4>
                        </div>
                        <div className='card-body'>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input type="text" id='name' name='name' value={student.name} className="form-control" onChange={handleInput} placeholder='Type your name' autoComplete="off"/>
                                <span className='text-danger'>{inputErrorList.name}</span>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="course" className="form-label">Course</label>
                                <input type="text" id='course'  name='course' value={student.course} className="form-control" onChange={handleInput}  placeholder='course' autoComplete="off"/>
                                <span className='text-danger'>{inputErrorList.course}</span>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email address</label>
                                <input type="email" id='email'  name='email'  value={student.email} onChange={handleInput}  className="form-control" placeholder='email ..' autoComplete="off"/>
                                <span className='text-danger'>{inputErrorList.email}</span>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="phone" className="form-label">Phone</label>
                                <input type="number" id='phone'  name='phone' className="form-control"  value={student.phone} onChange={handleInput}  placeholder='phone ..' autoComplete="off"/>
                                <span className='text-danger'>{inputErrorList.phone}</span>
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
export default StudentCreate