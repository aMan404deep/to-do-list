import { useState } from 'react';
import styles from './CustomForm.module.css';

const CustomForm = ({ addTask }) => {
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskName.trim() === '') return;
    addTask({ id: Date.now().toString(), name: taskName, description, checked: false, lastUpdated: Date.now() });
    setTaskName('');
    setDescription('');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles['input-group']}>
        <label htmlFor="taskName" className={styles.label}>Task Name</label>
        <input
          type="text"
          id="taskName"
          className={styles.input}
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
      </div>
      <div className={styles['input-group']}>
        <label htmlFor="description" className={styles.label}>Description</label>
        <textarea
          id="description"
          className={styles.textarea}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
      <button type="submit" className={styles.button}>Add Task</button>
    </form>
  );
};

export default CustomForm;
