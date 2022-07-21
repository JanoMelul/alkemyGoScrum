import React, {useState, useEffect} from "react"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import './Tasks.styles.css';
import useResize from '../../../hooks/useResize'
import Header from "../../Header/Header";
import Card from "../../Card/Card"
import TaskForm from '../../TaskForm/TaskForm';
import { FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import debounce from 'lodash.debounce'
import { useSelector, useDispatch } from "react-redux";
import {getTasks, deleteTask, editTaskStatus} from "../../../store/actions/tasksActions"

const Tasks = () => {
  const [list, setList] = useState(null)
  const [renderList, setRenderList] = useState(null)
  const [search, setSearch] = useState(null)
  const [tasksFromWho, setTasksFromWho] = useState("ALL")
  const { isPhone} = useResize()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getTasks(tasksFromWho === "ME" ? "/me" : ""))
  }, [tasksFromWho])

  const { loading, error, tasks} = useSelector(state => {
    return state.tasksReducer
  })
  
  useEffect(() => {
    if(tasks?.length) {
      setList(tasks)
      setRenderList(tasks)
    }
  }, [tasks])



  useEffect(() => {
    if(search) {
      setRenderList(list.filter(data => data.title.toLowerCase().startsWith(search.toLowerCase())))
    } else  {
        setRenderList(list)
      }
  }, [search])


  const handleDelete = id => dispatch(deleteTask(id))

  const handleEditCardStatus = data => dispatch(editTaskStatus(data))

  if(error) return <div>Hay un error</div>


  const rendersAllCards = () => {
    return renderList?.map(data => <Card key={data._id} data={data} deleteCard={handleDelete} editCardStatus={handleEditCardStatus}/>)
  }

  const rendersColumnCards = text => {
    return renderList?.filter(data => data.status === text).map(data => <Card key={data._id} data={data} deleteCard={handleDelete} editCardStatus={handleEditCardStatus}/>)
  }

  const handleChangeImportance = (e) => {
    if(e.currentTarget.value === "ALL") {
      setRenderList(list)
    } else 
    setRenderList(list.filter(data => data.importance === e.currentTarget.value))
  }

  const handleSearch = debounce(e => { 
    setSearch(e?.target?.value) 
  }, 500)

return (
<>
<Header />
<main id="tasks">
  <TaskForm />
  <section className="wrapper_list">
    <div className="list_header">
      <h2>Mis tareas</h2>
    </div>
    <div className="filters">
      <FormControl >
        <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        onChange={e => {
          setTasksFromWho(e.currentTarget.value);
        }}
        >
          <FormControlLabel 
            value="ALL"
            control={<Radio />}
            label="Todas"
          />
          <FormControlLabel 
            value="ME"
            control={<Radio />}
            label="Mis tareas"
          />
        </RadioGroup>
      </FormControl>
      <div className="search">
        <input type="text" onChange={handleSearch}/>
      </div>
      <select name="importance" onChange={handleChangeImportance}>
        <option value="">Selecionar una prioridad</option>
        <option value="ALL">Todas</option>
        <option value="LOW">Baja</option>
        <option value="MEDIUM">Media</option>
        <option value="HIGH">Alta</option>
      </select>
    </div>
    {isPhone ?  <div className="list phone">
    {!renderList?.length ? (<div><h3>No hay tareas creadas</h3></div>) : loading ? 
    <>
    <Skeleton height={90} />
    <Skeleton height={90} />
    <Skeleton height={90} />
    </> : (
      rendersAllCards())}
    </div> :
    <div className="list_group">
    {!renderList?.length ? (<div><h3>No hay tareas creadas</h3></div>) : loading ? 
    <>
    <Skeleton height={90} />
    <Skeleton height={90} />
    <Skeleton height={90} />
    </>
     : 
   ( <>
    <div className="list">
      <h4>Nuevas</h4>
      {rendersColumnCards("NEW")}
    </div>
    <div className="list">
      <h4>En proceso</h4>
      {rendersColumnCards("IN PROGRESS")}
    </div>
    <div className="list">
      <h4>Finalizadas</h4>
      {rendersColumnCards("FINISHED")}
    </div>
    </>)
    }
    </div>
    }
  </section>
</main>
</>
)}

export default Tasks