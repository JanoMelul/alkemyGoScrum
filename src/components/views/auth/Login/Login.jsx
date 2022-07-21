

import React from "react"
import { useFormik} from 'formik'
import { useNavigate, Link  } from 'react-router-dom'
import * as Yup from 'yup'
import Alert from '../../../../utils/Alert'
import '../Auth.styles.css'


const { REACT_APP_API_ENDPOINT } = process.env

const Login = () => {
  const navigate = useNavigate()

  const initialValues = {
    userName: "", 
    password: ""
  }

  const required = "* Campo obligatorio"

  const validationSchema = () =>
    Yup.object().shape({
      userName: Yup.string().required(required),
      password: Yup.string().required(required),
    })

    const onSubmit = () => {
      const { userName, password } = values

      fetch(`${REACT_APP_API_ENDPOINT}auth/login`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
            userName,
            password
        }),
      }) 
          .then(res => res.json())
          .then(data => { 
            if(data.status_code === 200) {
            localStorage.setItem("token", data?.result?.token)
            localStorage.setItem("userName", data?.result?.user.userName)
            navigate("/", { replace: true })
          } else {
            Alert()
          }
        })
    }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit
  })

  const { handleChange, handleSubmit, errors, touched, handleBlur, values } = formik

  return (<div>
    <div className='auth'>
    <form
    onSubmit={handleSubmit}>
      <h1>Iniciar Sesión</h1>
      <div>
        <label>Usuario</label>
        <input 
        name='userName'
        type='text' 
        value={values.userName}
        onChange={handleChange}
        onBlur={handleBlur}
        className={errors.userName && touched.userName ? 'error' : ''}

        />
        {errors.userName && touched.userName && <div className="errorText">{errors.userName}</div>}
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
{errors.password && touched.password && <div className="errorText">{errors.password}</div>}
      </div>
      <div>
        <button type='submit'>Enviar</button>
      </div>
      <div>
        <Link to="/register">Registrarse</Link>
      </div>
    </form>
    </div>
  </div>)
}

export default Login