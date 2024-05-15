"use client"

import Image from "next/image";
import styles from "./page.module.css";
import Task from "@/components/Task/Task";
import { useEffect, useState } from "react";
import { getTasks, createTask} from "@/utils/api";

export default function Home() {
  const [tasks, setTasks] = useState(null)
  const [taskAdd, setTaskAdd] = useState("")

  useEffect(() => {
    fetchAllTasks()
  }, [])

  // Buscando todas as tasks e setando no state de todas tasks
  const fetchAllTasks = async () => {
    let tasks = await getTasks()
    setTasks(tasks)
  }
  
  // Adicionando uma task
  const handleAddTask = async (e) => {
    e.preventDefault()
    if(taskAdd != ""){
      await createTask({
        title: taskAdd,
        done: false
      })
      await fetchAllTasks();
      setTaskAdd("")
    }
  }

  return (
    <main className={styles.main}>
      <h1>TODO List</h1>
      <form onSubmit={handleAddTask} className={styles.containerAddTask}>
        <div>
          <input 
            placeholder="Digite o titulo da sua task aqui"
            value={taskAdd}
            onChange={(e) => setTaskAdd(e.target.value)}
          />
        </div>
        <button type="submit" ><img src="https://super.so/icon/light/plus.svg"/></button>
      </form>
      <section className={styles.containerTasks}>
        { tasks ? (
          tasks.length != 0 ? (
            tasks.map((task) => <Task key={task.id} {...task} fetchAllTasks={fetchAllTasks}/>)
          ):(
            <p>Você não tem nenhuma tarefa!</p>
          )
        ):(
          <p>Carregando...</p>
        )}
      </section>
    </main>
  );
}
