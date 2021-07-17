import React, { FunctionComponent, useState } from 'react';
import axios from 'axios';

import DatePicker from 'react-datepicker';

import Modal from '../UI/Modal';

import 'react-datepicker/dist/react-datepicker.css';
import './EmployeeReport.scss';

type Props = {
  handleModalClose: () => void;
  visible: boolean;
  employeeId: number | null;
};

const AssignTaskModal: FunctionComponent<Props> = ({
  visible,
  handleModalClose,
  employeeId,
}: Props) => {
  const [startDate, setStartDate] = useState(new Date());
  const [taskTitle, setTaskTitle] = useState<string>('');

  const submitTask = () => {
    const postTask = async () => {
      const dueDate = startDate.toDateString();
      await axios.post('http://localhost:5001/task', {
        employeeId,
        dueDate,
        taskTitle,
      });
    };
    postTask();
    handleModalClose();
    reset();
  };

  const handleTitleChange = (e: any) => {
    // TODO: add type to e
    setTaskTitle(e.target.value);
  };

  const reset = () => {
    setStartDate(new Date());
    setTaskTitle('');
  };

  return (
    <Modal
      saveButtonText={'Save'}
      cancelButtonText={'Cancel'}
      cancelButtonHandler={handleModalClose}
      visible={visible}
      saveButtonHandler={submitTask}
    >
      <div className="AssignTaskModal__Form">
        <div className="Input__Group">
          <label>Task Title:</label>
          <input
            type="text"
            id="taskName"
            name="taskName"
            value={taskTitle}
            onChange={handleTitleChange}
          />
        </div>
        <div className="Input__Group">
          <label>Due:</label>
          <DatePicker
            selected={startDate}
            onChange={(date: any) => setStartDate(date)}
          />
        </div>
      </div>
    </Modal>
  );
};

export default AssignTaskModal;
