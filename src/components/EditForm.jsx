import { useState, useEffect } from 'react';
import styles from './EditForm.module.css';

const EditForm = ({ editedTask, updateTask, closeEditMode }) => {
  // State to manage the form values  
  const [taskName, setTaskName] = useState(editedTask.name);
  const [description, setDescription] = useState(editedTask.description);

  useEffect(() => {
    setTaskName(editedTask.name);
    setDescription(editedTask.description);
  }, [editedTask]);
  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskName.trim() === '') return;
    updateTask({ ...editedTask, name: taskName, description, lastUpdated: Date.now() });
    closeEditMode();
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles['input-group']}>
            <label htmlFor="editTaskName" className={styles.label}>Edit Task Name</label>
            <input
              type="text"
              id="editTaskName"
              className={styles.input}
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />
          </div>
          <div className={styles['input-group']}>
            <label htmlFor="editDescription" className={styles.label}>Description</label>
            <textarea
              id="editDescription"
              className={styles.textarea}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className={styles.buttons}>
            <button type="submit" className={styles.button}>Update Task</button>
            <button type="button" className={styles.button} onClick={closeEditMode}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditForm;
