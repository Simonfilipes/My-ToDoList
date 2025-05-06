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
    <div className='
    bg-white border border-gray-200 rounded-2xl
    w-[85vw] max-w-[600px]  // Mobile: ocupa 85% da tela, mas não passa de 400px
    sm:w-[550px]            // Tablet: largura fixa de 300px
    md:w-[850px]            // Desktop médio: 350px
    lg:w-[800px]            // Desktop grande: 400px
    min-h-[150px]           // Altura mínima mobile
    sm:min-h-[175px]        // Altura mínima maior em telas maiores
    flex flex-col
    mx-auto my-4            // Centraliza no mobile
    sm:mx-6 sm:my-6         // Tablet: margem maior
    md:mx-8 md:my-8         // Desktop médio: margem maior
    lg:mx-10 lg:my-10       // Desktop grande: margem máxima
'>

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
      hover:scale-105 transition-all mr-5'>Submit</button>

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