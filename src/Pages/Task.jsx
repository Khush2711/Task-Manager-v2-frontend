import React, { useEffect, useState } from 'react';
import {
  createTask,
  deleteTaskByID,
  fetchTask,
  updateTaskAPI,
  updateTaskStatus
} from '../services/taskApisCall';
import { useDispatch, useSelector } from 'react-redux';
import {
  addTask,
  deleteTask,
  setTasks,
  updateTask
} from '../Store/Slices/task';
import Card from '../components/common/Card';
import Modal from '../components/common/Modal';
import { useForm } from 'react-hook-form';
import { getUsers } from '../services/UserApiCall';
import { setUserList } from '../Store/Slices/user';
import toast from 'react-hot-toast';
import TaskFilter from '../components/common/TaskFilter';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

function Task() {
  const { token, user, userList } = useSelector((state) => state.user);
  const { tasks } = useSelector((state) => state.task);
  const [openModal, setOpenModal] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const { register, handleSubmit, formState: { errors }, getValues, setValue, reset } = useForm();
  const dispatch = useDispatch();



  useEffect(() => {

    const getTaskList = async () => {
      try {
        let res = await fetchTask(token);
        dispatch(setTasks(res?.data?.tasks));
      } catch (error) {
        //console.log("Error fetching tasks:", error);
      }
    };

    const fetchUsers = async () => {
      let res = await getUsers(token);
      dispatch(setUserList(res?.data?.usersList));
    };

    getTaskList();
    fetchUsers();
  }, []);

  const handleStatusChange = async (_id, status) => {
    try {
      const updatedTask = await updateTaskStatus({ _id, status }, token);
      dispatch(updateTask({
        _id: updatedTask?.tasks?._id,
        updatedTask: { ...updatedTask?.tasks }
      }));
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const onSubmit = async (data) => {
    try {
      const creatorId = user._id;
      let assignedTo = [...data.assignedTo];

      if (assignedTo.length === 0) {
        assignedTo.push({
          userId: creatorId,
          userLabel: user.email,
          permission: 'edit'
        });
      } else {
        const creatorIndex = assignedTo.findIndex(
          (u) => u.userId === creatorId
        );
        if (creatorIndex >= 0) {
          assignedTo[creatorIndex].permission = 'edit';
        }
      }

      if (editTask) {
        let res = await updateTaskAPI({
          title: data.title,
          description: data.description,
          dueDate: data.due_date,
          users: assignedTo,
          taskId: data.taskId
        }, token);

        dispatch(updateTask({ _id: res?.task?._id, updatedTask: { ...res?.task } }));
      } else {
        let res = await createTask(token, {
          title: data.title,
          description: data.description,
          dueDate: data.due_date,
          assignedTo,
        });
        dispatch(addTask(res.data.task));
      }
    } catch (error) {
      //console.log("Error submitting task:", error);
    } finally {
      setOpenModal(false);
      setEditTask(null);
      reset();
    }
  };

  const handleOnEdit = (task) => {
    const loggedInUserId = user?._id;
    const hasEditPermission = task.users.some(
      (u) => u.user._id === loggedInUserId && u.permission === 'edit'
    );

    if (!hasEditPermission) {
      toast.error("You do not have permission to edit this task");
      return;
    }

    setEditTask(task);
    setOpenModal(true);
    setValue("title", task.title);
    setValue("description", task.description);
    setValue("due_date", task.dueDate ? task.dueDate.split("T")[0] : "");
    setValue("taskId", task?._id);

    const prefillPermissions = task.users.map(({ user, permission }) => ({
      userId: user._id,
      userLabel: user.email,
      permission,
    }));
    setValue("assignedTo", prefillPermissions);
  };

  const handleOnDelete = async (_id) => {
    try {
      let res = await deleteTaskByID({ taskId: _id }, token);
      if (res?.data?.success) dispatch(deleteTask(_id));
    } catch (error) {
      //console.log("Error deleting task:", error);
    }
  };

  const onDragEnd = async (result) => {
    const { source, destination, draggableId } = result;
    // //console.log("{ source, destination, draggableId }", { source, destination, draggableId });
    if (!destination || source.droppableId === destination.droppableId) return;
    const newStatus = destination.droppableId;
    await handleStatusChange(draggableId, newStatus);
  };

  const statusTypes = ['Not Started', 'Inprogress', 'Finished'];

  const groupedTasks = {
    'Not Started': [],
    'Inprogress': [],
    'Finished': [],
  };

  tasks.forEach(task => {
    if (groupedTasks[task.status]) {
      groupedTasks[task.status].push(task);
    }
  });

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <h1 className='text-xl font-semibold'>Tasks</h1>
        <button
          className='px-4 py-2 font-semibold rounded-md text-white bg-blue-500 hover:shadow-lg'
          onClick={() => {
            setEditTask(null);
            reset();
            setOpenModal(true);
          }}
        >
          Create Task
        </button>
      </div>

      <div className="flex justify-end mb-4">
        <TaskFilter
          users={userList}
        />
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {statusTypes.map((status) => (
            <Droppable droppableId={status} key={status}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="bg-gray-100 rounded-md p-4 min-h-[400px]"
                >
                  <h2 className="text-lg text-center font-semibold mb-3">{status}</h2>
                  {groupedTasks[status].map((task, index) => (
                    <Draggable
                      draggableId={task._id}
                      index={index}
                      key={task._id}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="mb-4 select-none"
                        >
                          <Card
                            task={task}
                            handleOnDelete={handleOnDelete}
                            handleOnEdit={handleOnEdit}
                            handleStatusChange={handleStatusChange}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>

      {openModal && (
        <Modal
          {...{
            register,
            handleSubmit,
            formState: { errors },
            getValues,
            setOpenModal,
            setValue,
            onSubmit,
            editTask,
          }}
        />
      )}
    </div>
  );
}

export default Task;
