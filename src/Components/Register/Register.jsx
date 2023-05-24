import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

export default function Register() {

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false)

  let validate = Yup.object({
    name: Yup.string().required('Name is required').min(3 , 'minimun name 3 char').max(15 , 'maximun name 15 char'),
    email: Yup.string().required('Email is required').email('Email invalid'),
    password: Yup.string().required('password is required').matches(/^[A-Z][a-z0-9]{5,10}$/ , 'password must start with capital letter'),
    rePassword: Yup.string().required('password is required').oneOf([Yup.ref('password')] , 'rePassword dont match'),
    phone: Yup.string().required('phone is required').matches(/^01[0125][0-9]{8}$/ , 'phone invalid')
  })

  let formik = useFormik({
    initialValues:{
      name:"",
      email:'',
      password:'',
      rePassword:'',
      phone:''
    },validationSchema:validate
    ,onSubmit:sendRegisterData
  })

  let navigate = useNavigate()

  async function sendRegisterData(values){
    setLoading(true)
    let {data} = await axios.post('https://route-ecommerce.onrender.com/api/v1/auth/signup',values).catch((error)=>{
      setError(error.response.data.errors.param +": "+ error.response.data.errors.msg)
      setLoading(false)
    })
    if(data.message == 'success'){
      setLoading(false);
      navigate('/login')
    }
  }

  return <>
   <div className="w-75 mx-auto">
    <h2>Register Now</h2>
    <form onSubmit={formik.handleSubmit}>
      {error?<div className='alert alert-danger'>{error}</div>:""}
      <label htmlFor="name">Name :</label>
      <input type="text" name='name' id='name' onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control my-2' value={formik.values.name} />
      {formik.errors.name && formik.touched.name?<div className='alert alert-danger'>{formik.errors.name}</div>:""}

      <label htmlFor="email">Email :</label>
      <input type="email" name='email' id='email' onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control my-2' value={formik.values.email} />
      {formik.errors.email && formik.touched.email?<div className='alert alert-danger'>{formik.errors.email}</div>:""}

      <label htmlFor="password">Password :</label>
      <input type="password" name='password' id='password' onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control my-2' value={formik.values.password} />
      {formik.errors.password && formik.touched.password?<div className='alert alert-danger'>{formik.errors.password}</div>:""}

      <label htmlFor="rePassword">rePassword :</label>
      <input type="password" name='rePassword' id='rePassword' onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control my-2' value={formik.values.rePassword} />
      {formik.errors.rePassword && formik.touched.rePassword?<div className='alert alert-danger'>{formik.errors.rePassword}</div>:""}

      <label htmlFor="phone">Phone :</label>
      <input type="tel" name='phone' id='phone' onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control my-2' value={formik.values.phone} />
      {formik.errors.phone && formik.touched.phone?<div className='alert alert-danger'>{formik.errors.phone}</div>:""}

      <button type='submit' className='btn btn-info'>{loading?<i className='fas fa-spinner fa-spin'></i>:"Register"}</button>
    
    </form>
   </div>
   </>
}
