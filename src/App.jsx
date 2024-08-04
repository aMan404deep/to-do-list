import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// custom components
import CustomForm from './components/CustomForm';
import EditForm from './components/EditForm';
import TaskList from './components/TaskList';
import SearchBox from './components/Search';

// styles
import styles from './App.module.css';

// Custom hook to get query parameters
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function App() {
  // State to manage tasks
  const [tasks, setTasks] = useState([]);
  // State to keep track of the previously focused element  
  const [previousFocusEl, setPreviousFocusEl] = useState(null);
  // State for the task being edited
  const [editedTask, setEditedTask] = useState(null);
  // State to manage edit mode
  const [isEditing, setIsEditing] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const query = useQuery();
  const navigate = useNavigate();
  const searchQuery = query.get('search') || '';

  // State for the search input
  const [searchInput, setSearchInput] = useState(searchQuery);

  useEffect(() => {
    setSearchInput(searchQuery);
  }, [searchQuery]);
  // Update search input when the query changes
  useEffect(() => {
    fetch('/tasks.json')
      .then(response => response.json())
      .then(data => setTasks(data))
      .catch(error => console.error('Error fetching tasks:', error));
  }, []);
  // Function to add a new task
  const addTask = (task) => {
    setTasks(prevState => [...prevState, task]);
  };
  // Function to delete a task
  const deleteTask = (id) => {
    setTasks(prevState => prevState.filter(t => t.id !== id));
  };
  // Function to toggle task completion
  const toggleTask = (id) => {
    setTasks(prevState => prevState.map(t => (
      t.id === id
        ? { ...t, checked: !t.checked }
        : t
    )));
  };
  // Function to update a task
  const updateTask = (task) => {
    setTasks(prevState => prevState.map(t => (
      t.id === task.id
        ? { ...t, name: task.name, description: task.description, lastUpdated: task.lastUpdated }
        : t
    )));
    closeEditMode();
  };
  // Function to close edit mode
  const closeEditMode = () => {
    setIsEditing(false);
    if (previousFocusEl) previousFocusEl.focus();
  };
  // Function to enter edit mode
  const enterEditMode = (task) => {
    setEditedTask(task);
    setIsEditing(true);
    setPreviousFocusEl(document.activeElement);
  };
  // Function to handle search input changes
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
  // Filter tasks based on the search input
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
