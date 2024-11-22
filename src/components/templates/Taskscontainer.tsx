import React from 'react'
import TaskHead from '../atoms/TaskHead'
import TaskCard from '../organisms/TaskCard'

const Taskscontainer = ({ headname }: { headname: string }) => {
  return (
    <div className='border-dashed border-2 border-b-white border-x-white border-t-gray-300 py-3'>
      <TaskHead headname={headname}/>
      <TaskCard/>
    </div>
  )
}

export default Taskscontainer
