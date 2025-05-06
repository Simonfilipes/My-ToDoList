import React from 'react'
import delete_icon from '../assets/delete.png'

const TodoItem = ({text, id, isComplete, deleteTodo, toggle}) => {
  return (
    <div onClick={() => {
      toggle(id);
    }}  
    className='cursor-pointer m-8 flex flex-row justify-between border-b border-gray-400 p-3
    hover:scale-101 transition-all'>

    <div 
    className='flex flex-row items-center gap-3'>
    {isComplete ? <i className="bi bi-check-square-fill text-xl"></i> : <i className="bi bi-square text-xl"></i>}
    <p className={`text-xl ${isComplete ? "line-through" : ""}`}>{text}</p>
    </div>

    <div>
      <img onClick={() => {
        deleteTodo(id);
      }}
      className='w-7 cursor-pointer' src={delete_icon} alt="" />
    </div>

    </div>
  )
}

export default TodoItem