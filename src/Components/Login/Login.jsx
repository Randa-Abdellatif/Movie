import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

export default function Login({saveUserData}) {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false)

  let validate = Yup.object({
    email: Yup.string().required('Email is required').email('Email invalid'),
    password: Yup.string().required('password is required').matches(/^[A-Z][a-z0-9]{5,10}$/ , 'password must start with capital letter'),
  })

  let formik = useFormik({
    initialValues:{
      email:'',
      password:''
    },validationSchema:validate
    ,onSubmit:sendLoginData
  })

  let navigate = useNavigate()

  async function sendLoginData(values){
    setLoading(true)
    let {data} = await axios.post('https://route-ecommerce.onrender.com/api/v1/auth/signin',values).catch((error)=>{
      setError(error.response.data.errors.param +": "+ error.response.data.errors.msg)
      setLoading(false)
    })
    if(data.message == 'success'){
      localStorage.setItem('userToken', data.token);
      saveUserData();
      setLoading(false);
      navigate('/home')
    }
  }

  return <>
   <div className="w-75 mx-auto">
    <h2>Login Now</h2>
    <form onSubmit={formik.handleSubmit}>
      {error?<div className='alert alert-danger'>{error}</div>:""}

      <label htmlFor="email">Email :</label>
      <input type="email" name='email' id='email' onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control my-2' value={formik.values.email} />
      {formik.errors.email && formik.touched.email?<div className='alert alert-danger'>{formik.errors.email}</div>:""}

      <label htmlFor="password">Password :</label>
      <input type="password" name='password' id='password' onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control my-2' value={formik.values.password} />
      {formik.errors.password && formik.touched.password?<div className='alert alert-danger'>{formik.errors.password}</div>:""}

     

      <button type='submit' className='btn btn-info'>{loading?<i className='fas fa-spinner fa-spin'></i>:"Login"}</button>
    
    </form>
   </div>
   </>
}
