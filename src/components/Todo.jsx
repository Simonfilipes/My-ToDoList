import React, { useEffect, useRef, useState } from "react";
import todo_icon from "../assets/todo_icon.png";
import TodoItem from "./TodoItem";

const Todo = () => {
    const [todoList, setTodoList] = useState(localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : []);

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todoList))
    },[todoList])

    const InputRef = useRef();

    const add = () => {
        const InputText = InputRef.current.value.trim();

        if (InputText === "") {
            return null;
        }

        const newTodo = {
            id: Date.now(),
            text: InputText,
            isComplete: false,
            reminder: ""
        }

        setTodoList((prev) => [...prev, newTodo]);
        InputRef.current.value = "";
        
    }

    const deleteTodo = (id) => {
        setTodoList((prevTodos) => {
            return (
                prevTodos.filter((todo) => todo.id !== id)
        )
        });

    };

    const toggle = (id) => {
        setTodoList((prevTodos) => {
            return prevTodos.map((todo) => {
                if (todo.id === id) {
                    return{...todo, isComplete: !todo.isComplete}
                }
                return todo;
            })
        })
    } 

    const updateReminder = (id, newReminder) =>{
        setTodoList((prevTodos) => {
            return prevTodos.map((todo) => {
                if (todo.id === id) {
                    return{...todo, reminder: newReminder};
                }
                return todo;
            })
        })
    }

  return (
    <div
      className="bg-white w-11/12 flex flex-col p-4 
    min-h-[550px] place-self-center max-w-md rounded-xl"
    >
      {/* ------ title ----- */}

      <div className="flex items-center mt-7 gap-2">
        <img className="w-8" src={todo_icon} alt="icon" />
        <h1 className="text-3xl font-semibold">To-Do List</h1>
      </div>

      {/* ------ input ------ */}

      <div className="flex items-centerr my-7 bg-gray-200 rounded-full">
        <input
          ref={InputRef}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
                add()
            }
          }}
          type="text"
          placeholder="Add Your Task"
          className="bg- border-1 rounded-l-full outline-none
            flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600"
        />
        <button
            onClick={add}
          className="rounded-r-full
            bg-rose-300 w-32 h-14 text-black text-lg
            border-black border-b-1 border-t-1 border-r-1
            transition-all font-medium cursor-pointer"
        >
          ADD +
        </button>
      </div>

      {/* --------- todo --------- */}

        <div>
            {todoList.map((item, index) => {
                return(<TodoItem
                    key={index}
                    text={item.text}
                    id={item.id}
                    deleteTodo={deleteTodo}
                    isComplete={item.isComplete}
                    toggle={toggle}
                    updateReminder={updateReminder}
                    reminder={item.reminder} />
                )
            })}
        </div>

    </div>
  );
};

export default Todo;
