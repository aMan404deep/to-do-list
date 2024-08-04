import { useState } from 'react';
import styles from './TaskItem.module.css';

import { CheckIcon } from '@heroicons/react/24/outline';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { TrashIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

const TaskItem = ({ task, deleteTask, toggleTask, enterEditMode }) => {
  const [isChecked, setIsChecked] = useState(task.checked);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleCheckboxChange = (e) => {
    setIsChecked(!isChecked);
    toggleTask(task.id);
  }

  const handleExpandClick = () => {
    setIsExpanded(!isExpanded);
  }

  return (
    <li className={styles.task}>
      <div className={styles["task-group"]}>
        <input
          type="checkbox"
          className={styles.checkbox}
          checked={isChecked}
          onChange={handleCheckboxChange}
          name={task.name}
          id={task.id}
        />
        <label
          htmlFor={task.id}
          className={styles.label}
        >
          {task.name}
        </label>
      </div>
      <div className={styles["task-group"]}>
        <button
          className='btn'
          aria-label={`Update ${task.name} Task`}
          onClick={() => enterEditMode(task)}
        >
          <PencilSquareIcon width={24} height={24} />
        </button>

        <button
          className={`btn ${styles.delete}`}
          aria-label={`Delete ${task.name} Task`}
          onClick={() => deleteTask(task.id)}
        >
          <TrashIcon width={24} height={24} />
        </button>

        <button
          className='btn'
          aria-label={`Expand ${task.name} Task`}
          onClick={handleExpandClick}
        >
          {isExpanded ? <ChevronUpIcon width={24} height={24} /> : <ChevronDownIcon width={24} height={24} />}
        </button>
      </div>
      {isExpanded && (
        <div className={styles.details}>
          <p>{task.description}</p>
          <p>Last updated: {new Date(task.lastUpdated).toLocaleString()}</p>
        </div>
      )}
    </li>
  );
}
export default TaskItem;
