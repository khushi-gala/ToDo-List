import React, { useState , useEffect} from 'react'
import axios from 'axios'
function Create() {
    const [task, setTask] = useState()
    
    const handleAdd = () =>{
        axios.post('https://to-do-list-silk-eta.vercel.app/add', {task: task})
        .then(result => location.reload() )
        .catch(err => console.log(err))
    }
  return (
    <div className='create_form'>
        <input type="text" name="" id="" placeholder='Enter Task' onChange={(e)=> setTask(e.target.value)}/>
        <button type="button" onClick={handleAdd}>Add</button>
    </div>
  )
}

export default Create
