import './TaskForm.styles.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { ToastContainer, toast } from 'react-toastify'

const { REACT_APP_API_ENDPOINT } = process.env

const TaskForm = () => {

  const initialValues = {
    title: '',
    status: '',
    importance: '',
    description: '',
  }

  const onSubmit = () => {
    fetch(`${REACT_APP_API_ENDPOINT}task`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
       Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({ task:  values }),
    })
        .then(res => res.json())
        .then(data => {
            resetForm()
            toast("Tu tarea se creó correctamente")
          })
  }

  const required = "* Campo obligatorio"

  const validationSchema = () =>
    Yup.object().shape({
      title: Yup.string().min(6, "La cantidad minima de caracteres es 6").required(required),
      status: Yup.string().required(required),
      importance: Yup.string().required(required),
      description: Yup.string().required(required),
    })

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit
  })
  const { handleChange, handleSubmit, errors, touched, handleBlur, values, resetForm } = formik


  return (<section className="task-form">
    <h2>Crear tarea</h2>
    <p>Crea tus tareas</p>
    <form onSubmit={handleSubmit}>
      <div>
        <div>
          <input name='title' value={values.title} onChange={handleChange} onBlur={handleBlur} placeholder='Titulo' className={errors.title && touched.title ? 'error' : ''} />
          {errors.title && touched.title && <span className='errorText'>{errors.title}</span>}
        </div>
        <div>
          <select name='status' value={values.status} onChange={handleChange} onBlur={handleBlur} className={errors.status && touched.status ? 'error' : ''}>
            <option value="">Selecionar un estado</option>
            <option value='NEW'>Nueva</option>
            <option value='IN PROGRESS'>En Proceso</option>
            <option value='FINISHED'>Finalizada</option>
          </select>
          {errors.status && touched.status && <span className='errorText'>{errors.status}</span>}
        </div>
        <div>
          <select name='importance' value={values.importance} onChange={handleChange} onBlur={handleBlur} className={errors.importance && touched.importance ? 'error' : ''}>
            <option value="">Selecionar una prioridad</option>
            <option value="LOW">Baja</option>
            <option value="MEDIUM">Media</option>
            <option value="HIGH">Alta</option>
          </select>
          {errors.importance && touched.importance && <span className='errorText'>{errors.importance}</span>}
        </div>
      </div>
      <div>
        <textarea name='description' value={values.description} onChange={handleChange} onBlur={handleBlur} className={errors.description && touched.description ? 'error' : ''} placeholder='Descripción' />
        {errors.description && touched.description && <span className='errorText'>{errors.description}</span>}
      </div>
      <button type='submit'>Crear</button>
    </form>
    <ToastContainer />
  </section>)
}

export default TaskForm;