"use client"

import React from 'react'

const TaskHead = ({ headname }: { headname: string }) => {
  return (
    <h1 className='flex justify-center text-[#000] font-serif text-bold mb-5'>{headname}</h1>
  )
}

export default TaskHead
