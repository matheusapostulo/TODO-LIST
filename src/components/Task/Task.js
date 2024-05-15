import { deleteTask, toogleTask } from "@/utils/api"
import styles from "./Task.module.css"

export default function Task({id, title, done, fetchAllTasks}){
    const handleToggleTask = async () => {
        // Vamos alterar o novo estado com o inverso do antigo. Por exemplo, se estava false, vai pra true.
        let currentState = {done: !done}
        // Chamando a função da api que vai fazer o toogle da Task
        await toogleTask(id, currentState)
        // Atualizando tasks que vem do componente pai (página principal)
        fetchAllTasks()
    }

    const handleDeleteTask = async () => {
        // Chamando a função da api que vai deletar a task
        await deleteTask(id);
        // Atualizando tasks que vem do componente pai (página principal)
        fetchAllTasks()
    }
    
    return(
        <main className={styles.main}>    
            <input type="checkbox" checked={done} readOnly={true} onClick={handleToggleTask}/>
            <h2>{title}</h2>
            <button onClick={handleDeleteTask}><img src="https://super.so/icon/light/trash-2.svg"/></button>
        </main>
        
    )
}