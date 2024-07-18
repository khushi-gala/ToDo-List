import React, { useEffect, useState } from 'react'
import Create from './Create'
import axios from 'axios'
import { BsCircleFill, BsFillCheckCircleFill, BsFillTrashFill } from "react-icons/bs";
// import {GoogleFont} from "react-google-fonts"

function Home() {
    const [todos, setTodos ] = useState([])
    console.log(todos);
    useEffect(() => {
        axios.get('https://to-do-list-silk-eta.vercel.app/get')
        .then(result => setTodos(result.data))
        .catch(err => console.log(err))
    }, [])
    
    const handleEdit = (id) =>{
        axios.put(`https://to-do-list-silk-eta.vercel.app/update/${id}`)
        .then(result =>{
            setTodos(todos.map(todo => todo._id === id ? { ...todo, done: true } : todo));
        })
        .catch(err => console.log(err))
    }  
    const handleDelete = (id) =>{
        axios.delete(`https://to-do-list-silk-eta.vercel.app/delete/${id}`)
        .then(result => {
            setTodos(todos.filter(todo => todo._id !== id));
        })
        .catch(err => console.log(err))
    }  
    return (
    <>
     <div className='container'>
        {/* <GoogleFont font="Open Sans"/> */}
        <h2 className='title'>To Do List📝</h2>
        <div className='box'>
        <Create />
        {
            todos.length === 0 ?
            (
            <div><h2 className='empty'>All Tasks Completed</h2>
            <div className='hidden'>Good Job😉</div>
            </div>
            )
            :
            (
            todos.map(todo => (
                // <div>{todo}</div>
                <div className='task'>
                    <div className='checkbox' onClick={() => handleEdit(todo._id)}>
                        {todo.done ? (
                            <BsFillCheckCircleFill className='icon'></BsFillCheckCircleFill>)
                        :(
                        <BsCircleFill className='icon'/>  )
                        }
                        
                        <p className={todo.done ? "line_through" : ""}>{todo.task}</p>
                    </div>
                    <div>
                        <span><BsFillTrashFill className='icon' onClick={() => handleDelete(todo._id)}/></span>
                    </div>
                </div>
            ))
        )}
        </div>
     </div>
    </>
  );
}

export default Home;
