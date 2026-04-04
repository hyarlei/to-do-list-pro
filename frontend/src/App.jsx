import { useCallback, useEffect, useState } from 'react'
import './App.css'

const API_URL = 'http://localhost:3000'

function App() {
  const [tasks, setTasks] = useState([])
  const [categories, setCategories] = useState([])
  const [filter, setFilter] = useState('all')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [loading, setLoading] = useState(true)

  const fetchCategories = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/categories`)
      const data = await res.json()
      setCategories(data)
      if (data.length > 0) {
        setCategoryId(data[0].id)
      }
    } catch (error) {
      console.error('Erro ao carregar categorias:', error)
    }
  }, [])

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true)
      let url = `${API_URL}/tasks`
      if (filter === 'completed') {
        url += '?completed=true'
      } else if (filter === 'pending') {
        url += '?completed=false'
      }
      
      const res = await fetch(url)
      const data = await res.json()
      setTasks(data)
    } catch (error) {
      console.error('Erro ao carregar tarefas:', error)
    } finally {
      setLoading(false)
    }
  }, [filter])

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  const handleAddTask = async (e) => {
    e.preventDefault()
    
    if (!title.trim() || !categoryId) {
      alert('Preencha o título e selecione uma categoria')
      return
    }

    try {
      const res = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          description: description || null,
          completed: false,
          categoryId: Number(categoryId)
        })
      })

      if (res.ok) {
        setTitle('')
        setDescription('')
        fetchTasks()
      } else {
        alert('Erro ao adicionar tarefa')
      }
    } catch (error) {
      console.error('Erro ao adicionar tarefa:', error)
      alert('Erro ao adicionar tarefa')
    }
  }

  const handleToggleTask = async (taskId, completed) => {
    try {
      const res = await fetch(`${API_URL}/tasks/${taskId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !completed })
      })

      if (res.ok) {
        fetchTasks()
      }
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error)
    }
  }

  const handleDeleteTask = async (taskId) => {
    if (confirm('Deseja deletar esta tarefa?')) {
      try {
        const res = await fetch(`${API_URL}/tasks/${taskId}`, {
          method: 'DELETE'
        })

        if (res.ok) {
          fetchTasks()
        }
      } catch (error) {
        console.error('Erro ao deletar tarefa:', error)
      }
    }
  }

  return (
    <div className="container">
      <header>
        <h1>To-Do List Pro</h1>
      </header>

      <main>
        {/* Formulário */}
        <section className="form-section">
          <form onSubmit={handleAddTask}>
            <div className="form-group">
              <input
                type="text"
                placeholder="Título da tarefa..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="form-row">
              <textarea
                placeholder="Descrição (opcional)..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
              >
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit">+ Adicionar Tarefa</button>
          </form>
        </section>

        {/* Filtros */}
        <section className="filter-section">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            Todas ({tasks.length})
          </button>
          <button
            className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
            onClick={() => setFilter('pending')}
          >
            Pendentes
          </button>
          <button
            className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            Concluídas
          </button>
        </section>

        {/* Lista de tarefas */}
        <section className="tasks-section">
          {loading ? (
            <p className="loading">Carregando tarefas...</p>
          ) : tasks.length === 0 ? (
            <p className="empty">Nenhuma tarefa encontrada</p>
          ) : (
            <ul className="tasks-list">
              {tasks.map(task => (
                <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                  <div className="task-content">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => handleToggleTask(task.id, task.completed)}
                      className="task-checkbox"
                    />
                    <div className="task-info">
                      <h3>{task.title}</h3>
                      {task.description && <p>{task.description}</p>}
                      <span className="category-tag">{task.category.name}</span>
                    </div>
                  </div>
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteTask(task.id)}
                  >
                    🗑️
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  )
}

export default App
