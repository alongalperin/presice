import React, { FunctionComponent, useState } from 'react';

import DatePicker from 'react-datepicker';
import Modal from '../UI/Modal';

import { POST_TASK } from '../../Utils/data/taskData';

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
      await POST_TASK(employeeId, dueDate, taskTitle);
    };
    postTask();
    handleModalClose();
    reset();
  };

  const handleTitleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setTaskTitle(e.currentTarget.value);
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
          <label>Task Title</label>
          <br />
          <input
            type="text"
            id="taskName"
            name="taskName"
            value={taskTitle}
            onChange={handleTitleChange}
          />
        </div>
        <div className="Input__Group">
          <label>Due Date</label>
          <br />
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
