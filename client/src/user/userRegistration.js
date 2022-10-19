import axios from 'axios';
import React, { useState } from 'react'

const UserRegister=()=>{
    const localhost='http://localhost:3000/api'
    const [userNameReg,setUserNameReg]=useState('')
    const [userDobReg,setUserDobReg]=useState('')
    const [userPasswordReg,setUserPasswordReg]=useState('')
    const [userEmailReg,setUserEmailReg]=useState('')
    const [userUserNameReg,setUserUserNameReg]=useState('')
    const [userImageReg,setUserImageReg]=useState('')

    const UserRegister=async(e)=>{
        try{
            await axios.post(localhost+'/user/register',{
                name:userNameReg,
                dob:userDobReg,
                password:userPasswordReg,
                email:userEmailReg,
                username:userUserNameReg,
                image:userImageReg
            })
        }catch(error){
            if(error.response){
                console.log("error----------->",error)
            }
        }
    }

    

    return(
        <div className="App">
            <h1>Sign Up</h1>
            <label>Name
                <input placeholder='name' type="text" onChange={(e)=>{
                setUserNameReg(e.target.value)
                }}/><br/>
            </label>

            <p>Username
                <input placeholder='username' type="text" onChange={(e)=>{
                setUserUserNameReg(e.target.value)
                }}/><br/>
            </p>

            <p>DOB
                <input placeholder='dob' type="text" onChange={(e)=>{
                setUserDobReg(e.target.value)
                }}/><br/>
            </p>

            <p>Email
                <input placeholder='email' type="text" onChange={(e)=>{
                setUserEmailReg(e.target.value)
                }}/><br/>
            </p>

            <p>Password
                <input placeholder='password' type="text" onChange={(e)=>{
                setUserPasswordReg(e.target.value)
                }}/><br/>
            </p>

            <p>Profile Picture
                <input type="file" value={userImageReg} onChange={(e)=>{
                setUserImageReg(e.target.value)
                }}/><br/>
            </p>

            <button onClick={UserRegister}>Sign Up</button>
        </div>
    )

}

export default UserRegister;