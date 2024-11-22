import React from 'react'

const TaskCard = () => {
  return (
    <div className='flex w-full md:max-w-[20rem] rounded-md p-3 bg-[#00b037] shadow-lg shadow-indigo-500/40 justify-between'>
      <div>
        <span className='text-[12px] opacity-75'>done</span>
        <h1  className='text-blod'>Call a James</h1>
        <p className='text-[13px] opacity-75'>Call James for a meeting update</p>
        
      </div>
      <div>
        <input type="checkbox" name="" value="" />
      </div>
    </div>
  )
}

export default TaskCard
