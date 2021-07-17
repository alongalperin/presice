import React, { FunctionComponent } from 'react';

import { TaskType } from '../../types/task';

type Props = {
  tasks: TaskType[];
};

const TasksList: FunctionComponent<Props> = ({ tasks }: Props) => {
  return (
    <div className="Section__Container">
      {tasks.length ? (
        <>
          <span>My tasks</span>
          <div className="Section__List">
            {tasks.map((task) => (
              <div key={task.id} className="TasksList__ListItem">
                <span className="TasksList__ListItem__Title">
                  {task.title}{' '}
                </span>
                <span className="TasksList__ListItem__Date">
                  {task.due_date.toLocaleDateString('en-GB')}
                </span>
              </div>
            ))}
          </div>
        </>
      ) : (
        <span>My Tasks: You don't have any tasks assigned to you</span>
      )}
    </div>
  );
};

export default TasksList;
