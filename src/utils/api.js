const URL = "http://localhost:8000/todos"

export async function getTasks(){
    try {
        const data = await fetch(URL)
        const dataJson = await data.json()
        return dataJson;
        
    } catch (error) {
        console.log(error)
    }
}

export async function createTask(task){
    try {
        let strTask = JSON.stringify(task);
        let options = {
            method: 'POST',
            headers:{
                "Accept": "application/json",
                "Content-type": "application/json"
            },
            body: strTask
        }

        await fetch(URL, options)

    } catch (error) {
        console.log(error)
    }
}

export async function toogleTask(id, currentState){
    let strCurrentState = JSON.stringify(currentState);
    try {
        let options = {
            method: 'PATCH',
            body: strCurrentState
        }
        await fetch(URL + "/" + id, options)
    } catch (error) {
        console.log(error)
    }
}

export async function deleteTask(id){
    try {
        let options = {
            method: 'DELETE'
        }
        await fetch(URL + "/" + id, options)
    } catch (error) {
        console.log(error)
    }
}