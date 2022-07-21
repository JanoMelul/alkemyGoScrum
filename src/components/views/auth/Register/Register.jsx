import '../Auth.styles.css'


import { Link, useNavigate } from 'react-router-dom'
import React, {useState, useEffect } from "react"
import { useFormik } from 'formik'
import * as Yup from 'yup'
import {v4 as uuidv4 } from 'uuid'
import { Switch, FormControlLabel } from '@mui/material'


const { REACT_APP_API_ENDPOINT } = process.env

const Register = () => {

  const [data, setData] = useState()
  const navigate = useNavigate()

  useEffect(() =>{
  fetch(`${REACT_APP_API_ENDPOINT}auth/data`)
    .then(resultado => resultado.json())
    .then(data => setData(data.result))
  }, [])

  const initialValues = {
    userName: "",
    password: "",
    email: "",
    teamID: "",
    role: "",
    continent: "",
    region: "",
    switch: false,
  }

  const required = "* Campo obligatorio"

  const validationSchema = () =>
    Yup.object().shape({
      userName: Yup.string().min(6, "La cantidad minima de caracteres es 6").required(required),
      password: Yup.string().min(6, "La cantidad minima de caracteres es 6").required(required),
      email: Yup.string().email("Debe ser un email valido").required(required),
      role: Yup.string().required(required),
      continent: Yup.string().required(required),
      region: Yup.string().required(required),
    })

    const handleChangeContinent = value => {
      setFieldValue('continent', value)
      if(value !== "America") setFieldValue("region", "Otro")
    }

  const onSubmit = () => {
    const teamID = !values.teamID ? uuidv4() : values.teamID
    fetch(`${REACT_APP_API_ENDPOINT}auth/register`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        user: {
          userName: values.userName,
          password: values.password,
          email: values.email,
          teamID,
          role: values.role,
          continent: values.continent,
          region: values.region,
        },
      }),
    }).then(res => res.json())
        .then(data => navigate("/registered/" + data?.result?.user?.teamID, {replace: true}))
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit
  })

  const { handleChange, handleSubmit, errors, touched, handleBlur, values, setFieldValue } = formik


  return (<div>
    <div className='auth'>
      <form
        onSubmit={handleSubmit}>
        <h1>Registro</h1>
        <div>
          <label>Nombre de usuario</label>
          <input
            name='userName'
            type='text'
            value={values.userName}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.userName && touched.userName ? 'error' : ''}
          />
          {errors.userName && touched.userName && <div className='errorText'>{errors.userName}</div>}
        </div>
        <div>
          <label>Contraseña</label>
          <input
            name='password'
            type='password'
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.password && touched.password ? 'error' : ''}
          />
          {errors.password && touched.password && <div className='errorText'>{errors.password}</div>}
        </div>
        <div>
          <label>Email</label>
          <input
            name='email'
            type='email'
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.email && touched.email ? 'error' : ''}
          />
          {errors.email && touched.email && <div className='errorText'>{errors.email}</div>}
        </div>
        {
          <FormControlLabel 
            control = {
              <Switch 
                value={values.switch}
                onChange = {() => {
                  formik.setFieldValue("switch", !formik.values.switch)
                }}
                name="switch"
                color='primary'
                />
                }
                label="Perenecés a un equipo ya creado"
              />
        }
        {values.switch && (
          <div>
          <label>Por favor, introduce el identificador de equipo</label>
        <input type="text" name="teamID" value={values.teamID}  onChange={handleChange}/>
        </div>
        )}
        
        <div>
          <label>Rol</label>
          <select
            name='role'
            value={values.role}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.role && touched.role ? 'error' : ''}
          >
            <option value="">Selecionar rol...</option>
            {
              data?.Rol?.map(option => (<option key={option} value={option}>{option}</option>))
            }
          </select>
          {errors.role && touched.role && <div className='errorText'>{errors.role}</div>}
        </div>
        <div>
          <label>Continente</label>
          <select
            name='continent'
            value={values.continent}
            onChange={event => handleChangeContinent(event.currentTarget.value)}
            onBlur={handleBlur}
            className={errors.continent && touched.continent ? 'error' : ''}
          >
            <option value="">Selecionar continente...</option>
            {data?.continente?.map(option => (
              <option key={option} value={option}>{option}</option>
              ))}
          </select>
          {errors.continent && touched.continent && <div className='errorText'>{errors.continent}</div>}
        </div>
        {values.continent === "America" && (
          <div>
          <label>Región</label>
          <select
            name='region'
            value={values.region}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.region && touched.region ? 'error' : ''}
          >
            <option value="">Selecionar region...</option>
            {
              data?.region?.map(option => (<option key={option} value={option}>{option}</option>))
            }
          </select>
          {errors.region && touched.region && <div className='errorText'>{errors.region}</div>}
        </div>
        )}
        

        <div>
          <button type='submit'>Enviar</button>
        </div>
        <div>
          <Link to="/login">Ir a Iniciar Sesión</Link>
        </div>
      </form>
    </div>
  </div>)
}

export default Register