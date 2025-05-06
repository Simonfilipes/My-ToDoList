import React, { useRef, useState, useEffect } from 'react'
import TodoItem from '../components/TodoItem'
import todo_icon from '../assets/todo_icon.png'

const Todo = () => {
  const [todoList, setTodoList] = useState(
    localStorage.getItem("todos")
      ? JSON.parse(localStorage.getItem("todos"))
      : []
  );

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList));
  }, [todoList]);

  const inputRef = useRef();

  const add = () => {

    const inputText = inputRef.current.value.trim();

    if (inputText === "") {
      return null;
    }

    const newTodo = {
      id: Date.now(),
      text: inputText,
      isComplete: false
    }

    setTodoList((prevTodos) => [...prevTodos, newTodo]);
    inputRef.current.value = "";
    

    console.log({inputText})

  }

  const deleteTodo = (id) => {
    setTodoList(prevTodos => prevTodos.filter(todo => todo.id !== id));
  }

  const toggle = (id) => {
    setTodoList(prevTodos => prevTodos.map(todo => {
      if (todo.id === id) {
        return {...todo, isComplete: !todo.isComplete};
      }
      return todo;
    }))
  }

  return (
    <div className='bg-white border-1 rounded-2xl
     min-w-150 min-h-175
     flex flex-col m-10'>

      {/* ------- title ------- */}

      <div className='m-8 flex flex-row gap-4'>
        <img className='h-10' src={todo_icon} alt="" />
        <h1 className='text-4xl'>Todo List</h1>
      </div>

      {/* ------ input ------ */}
      
      <div className='flex flex-row gap-5'>

      <input onKeyDown={(e) => {
        if (e.key === 'Enter') {
          add()
        }
      }}
       ref={inputRef} type="text" className='border-1 ml-8 p-3 rounded-[5px] w-75
      hover:scale-102 transition-all'/>
      <button onClick={add} className='border-1 rounded-[5px] p-3 w-30 bg-black text-white
      hover:scale-105 transition-all'>Submit</button>

      </div>

      {/* ------- Todo -------- */}

      <div>
        {todoList.map((item, index) => {
          return <TodoItem key={index} text={item.text} id={item.id} isComplete={item.isComplete} deleteTodo={deleteTodo} toggle={toggle}/>
        })}
      </div>

     </div>
  )
}

export default Todo