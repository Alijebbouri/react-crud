import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loading from './Loading';

function Student() {
    const [students,setStudents] = useState([]);
    const [loading,setLoading] = useState(true);
    useEffect(()=>{
        axios.get('http://127.0.0.1:8000/api/students').then(res =>{
            console.log(res.data)
            setStudents(res.data.students)
            setLoading(false)
        })
    },[])
    if(loading){
        return (
            <Loading/>
        )
    }
    const deleteStudent = (e,id) =>{
        e.preventDefault();
        const thisClicked = e.currentTarget;
        thisClicked.innerText = 'Deleting ...';
        axios.delete(`http://127.0.0.1:8000/api/students/${id}/delete`).then(
            res =>{
                alert(res.data.message);
                thisClicked.closest("tr").remove();
            }).catch(function(error){
                if(error.response.status === 404){
                    alert(error.response.data.message);
                    thisClicked.innerText = "Delete";
                }
            })       

    }
  return (
    <div className='container'>
        <div className='row'>
            <div className='col-md-12'>
                <div className='card'>
                    <div className='card-header'>
                        <h4>Students List 
                            <Link to='/students/create' className='btn btn-primary float-end'>Add Student</Link>
                        </h4>
                    </div>
                    <div className='card-body'>
                    <table className="table table-striped table-responsive">
                        <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Name</th>
                                <th scope="col">Course</th>
                                <th scope="col">Email</th>
                                <th scope="col">Phone </th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student,index)=>{
                                return <tr key={index}>
                                    <td>{student.id}</td>
                                    <td>{student.name}</td>
                                    <td>{student.course}</td>
                                    <td>{student.email}</td>
                                    <td>{student.phone}</td>
                                    <td className='d-flex'>
                                        <Link to={`/students/${student.id}/edit`} className='btn btn-warning me-2'>Edit</Link> 
                                        <button type='button' onClick={(e)=>deleteStudent(e,student.id)} className='btn btn-danger'>delete</button>
                                    </td>
                                </tr>
                            })}
                        </tbody>

                    </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Student