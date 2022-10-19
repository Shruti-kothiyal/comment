import axios from 'axios';
import React, { useState } from 'react'

const UserCreateComment=()=>{
    const [commentBody,setCommentBody]=useState('')
    const [commentChapterId,setCommentChapterId]=useState('')
    const [token,setToken]=useState('')
    const localhost='http://localhost:3000/api'
    axios.post(localhost+'/comment/create',{
        body:commentBody,
        chapterId:commentChapterId
    },{
        headers:{
            token:sessionStorage.getItem('token')
        }
    })

    return(
        <div className="App">
            <label>Comments
                <input placeholder='email' type="text" value={email} onChange={(e)=>
                setUserEmailLogin(e.target.value)
                }/><br/>
            </label>
        </div>
    )
}

export default UserCreateComment;