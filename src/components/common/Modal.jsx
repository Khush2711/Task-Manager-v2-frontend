import React from 'react';
import MulitpleSelectList from './MulitpleSelectList';

function Modal({ register, handleSubmit, formState: { errors }, getValues, setOpenModal, setValue, onSubmit, editTask }) {

  // const { title, description, dueDate, users }

  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto backdrop-blur-sm">
      <div className="w-11/12 max-w-[350px] rounded-lg p-6 bg-white shadow-2xl">

        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-y-2'>
          <div className='flex flex-col gap-y-1'>
            <label htmlFor="title">Title  </label>
            <input
              type="text"
              id="title"
              className='border border-blue-500 rounded-full px-5 py-2'
              {...register("title", {
                required: "title is required"
              })}
            />
            {errors.title && <p className='text-xs text-red-600'>{errors.title.message}</p>}
          </div>

          <div className='flex flex-col gap-y-1'>
            <label htmlFor="description">Description </label>
            <textarea
              type="text"
              id="description"
              className='border border-blue-500 rounded-full px-5 py-2'
              {...register("description", {
                required: "description is required"
              })}
            />
            {errors.description && <p className='text-xs text-red-600'>{errors.description.message}</p>}
          </div>

          <div className='flex flex-col gap-y-1'>
            <label htmlFor="due_date">Due Date </label>
            <input
              type="date"
              id="due_date"
              className='border border-blue-500 rounded-full px-5 py-2'
              {...register("due_date")}
            />
            {/* {errors.title && <p className='text-xs text-red-600'>{errors.title.message}</p>} */}
          </div>

          <MulitpleSelectList {...{ register, getValues, setValue }} />

          <div className="flex justify-between mt-2">
            <button
            className='bg-indigo-500 shadow-lg hover:cursor-pointer hover:shadow-cyan-500/50 shadow-indigo-500/50 px-4 font-semibold uppercase py-2 rounded-4xl transition-all duration-300 text-white text-md'
              onClick={() => {
                setOpenModal(false);
              }}>
              cancel
            </button>

            <button
            className='hover:shadow-lg hover:cursor-pointer bg-indigo-500 hover:shadow-cyan-500/50 shadow-lg shadow-indigo-500/50 px-4 font-semibold uppercase py-2 rounded-4xl transition-all duration-300 text-white text-md'
              type='submit'>
               {editTask ? "Update Task" : "Create Task"}
            </button>
          </div>
        </form>

      </div>
    </div>
  )
}

export default Modal