import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import CustomForm from './components/CustomForm';
import EditForm from './components/EditForm';
import TaskList from './components/TaskList';
import SearchBox from './components/Search';

import styles from './App.module.css';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function App() {
  const [tasks, setTasks] = useState([]);
  const [previousFocusEl, setPreviousFocusEl] = useState(null);
  const [editedTask, setEditedTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const query = useQuery();
  const navigate = useNavigate();
  const searchQuery = query.get('search') || '';

  const [searchInput, setSearchInput] = useState(searchQuery);

  useEffect(() => {
    setSearchInput(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    fetch('/tasks.json')
      .then(response => response.json())
      .then(data => setTasks(data))
      .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  const addTask = (task) => {
    setTasks(prevState => [...prevState, task]);
  };

  const deleteTask = (id) => {
    setTasks(prevState => prevState.filter(t => t.id !== id));
  };

  const toggleTask = (id) => {
    setTasks(prevState => prevState.map(t => (
      t.id === id
        ? { ...t, checked: !t.checked }
        : t
    )));
  };

  const updateTask = (task) => {
    setTasks(prevState => prevState.map(t => (
      t.id === task.id
        ? { ...t, name: task.name, description: task.description, lastUpdated: task.lastUpdated }
        : t
    )));
    closeEditMode();
  };

  const closeEditMode = () => {
    setIsEditing(false);
    if (previousFocusEl) previousFocusEl.focus();
  };

  const enterEditMode = (task) => {
    setEditedTask(task);
    setIsEditing(true);
    setPreviousFocusEl(document.activeElement);
  };

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchInput(value);
    navigate(`?search=${value}`);
  };

  const openPopup = (task) => {
    setSelectedTask(task);
  };

  const closePopup = () => {
    setSelectedTask(null);
  };

  const filteredTasks = tasks.filter(task =>
    task.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>TO DO LIST</h1>
      </header>
      <div className={styles.mainContent}>
        <div className={styles.leftPanel}>
          <SearchBox searchInput={searchInput} handleSearch={handleSearch} />
          <CustomForm addTask={addTask} />
        </div>
        <div className={styles.rightPanel}>
          {isEditing && (
            <EditForm
              editedTask={editedTask}
              updateTask={updateTask}
              closeEditMode={closeEditMode}
            />
          )}
          {filteredTasks && (
            <TaskList
              tasks={filteredTasks}
              deleteTask={deleteTask}
              toggleTask={toggleTask}
              enterEditMode={enterEditMode}
              openPopup={openPopup}
            />
          )}
        </div>
      </div>
      {selectedTask && (
        <div className={styles.popupOverlay} onClick={closePopup}>
          <div className={styles.popupContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closePopup} onClick={closePopup}>X</button>
            <div className={styles.popupTask}>
              <h2>{selectedTask.name}</h2>
              <p>{selectedTask.description}</p>
              <p>Last updated: {new Date(selectedTask.lastUpdated).toLocaleString()}</p>
              <button onClick={() => toggleTask(selectedTask.id)}>
                {selectedTask.checked ? 'Uncheck' : 'Check'}
              </button>
              <button onClick={() => deleteTask(selectedTask.id)}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
