import { MdModeEdit, MdDelete } from "react-icons/md";

function Card({ task, handleOnDelete, handleOnEdit, handleStatusChange }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg m-5 w-fit hover:scale-110 transition-all duration-200">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">{task.title}</h2>
        <span className="text-sm text-gray-500">
          {new Date(task.createdAt).toLocaleDateString()}
        </span>
      </div>

      <p className="text-gray-600">{task.description}</p>

      <div className="flex items-center gap-3 mt-3">
        <img
          src={task.assignedBy?.image}
          alt={task.assignedBy?.firstName}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <p className="font-semibold">
            Assigned By: {task.assignedBy?.firstName} {task.assignedBy?.lastName}
          </p>
          <p className="text-sm text-gray-500">{task.assignedBy?.email}</p>
        </div>
      </div>

      <div className="mt-5">
        <p className="font-semibold mb-2">Assigned Users:</p>
        <div className="flex flex-col gap-3">
          {task.users.map(({ user, permission }) => (
            <div key={user._id} className="flex items-center gap-2 bg-gray-100 p-2 rounded-md">
              <img
                src={user.image}
                alt={user.firstName}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className="text-sm">
                <p className="font-medium">{user.firstName} {user.lastName}</p>
                <p className="text-gray-500">Permission: {permission}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex justify-between gap-x-4 items-center">
        <button className={`inline-block  text-xs font-semibold px-3 py-1 rounded-full cursor-pointer hover:scale-105 transition-all duration-300  ${task.status === "Inprogress" ? 'bg-blue-100 text-blue-800 hover:bg-blue-500 hover:text-white' : task.status === "Not Started" ? 'bg-red-100 text-red-800 hover:bg-red-500 hover:text-white' : (task.status === "Finished" && 'bg-green-100 text-green-800 hover:bg-green-500 hover:text-white')} transition-colors duration-200`}
          onClick={() => { handleStatusChange(task._id, task.status) }}>
          {task.status}
        </button>

        <div className="flex gap-x-2">
          <button
            className='bg-green-400 hover:bg-green-500 hover:scale-105 transition-all duration-200 px-2 py-0 text-white rounded-full cursor-pointer'
            onClick={() => handleOnEdit(task)}
          >
            <MdModeEdit size={20} />
          </button>
          <button
            className='bg-red-400 p-2 text-white hover:bg-red-500 rounded-full cursor-pointer hover:scale-105 transition-all duration-200'
            onClick={() => handleOnDelete(task._id)}
          >
            <MdDelete size={20}/>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
