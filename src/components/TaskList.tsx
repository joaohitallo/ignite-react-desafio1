import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    if (!newTaskTitle) return; // checa se tem algo digitado no titulo/input

    const newTask = {       //cria um modelo de task
      id: Math.random(),
      title: newTaskTitle,
      isComplete: false,
    }

    setTasks(oldState => [...oldState, newTask]) // recupera as tasks antigas e adiciona a nova task
    setNewTaskTitle('')  //muda o input pra ''
  }

  function handleToggleTaskCompletion(id: number) {
    const newTasks = tasks.map(task => task.id == id ? {  // Pega a task com id igual, acessa ela e muda o isComplete para false,
      ...task,                                            // caso o id seja diferente ele retorna a task sem mudanças.
      isComplete: !task.isComplete
    }: task )                                             // ***** testar uso do Array.prototype.flatMap()

    setTasks(newTasks)                                      // atualiza as tasks
  }

  function handleRemoveTask(id: number) {
    const taskfilter = tasks.filter(task => task.id != id); // Filtra as tasks com id diferente da que foi removida e adc a taskfilter
                                                            // que são todas as tasks menos a task removida
    setTasks(taskfilter);                                   // ***** testar uso do Array.prototype.flatMap()
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}
