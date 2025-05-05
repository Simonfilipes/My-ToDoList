import React from "react";
import tick from "../assets/tick.png";
import not_tick from "../assets/not_tick.png";
import delete_icon from "../assets/delete.png";

const TodoItem = ({text, id, isComplete, deleteTodo, toggle}) => {

  return (
    <div className="flex items-center my-3 gap-2">
      <div className={`flex flex-1 items-center 
        cursor-pointer gap-4 ${isComplete ? "line-through" : ""}`}>
        <img
        onClick={() => {
          toggle(id);
        }}
          className="w-7"
          src={isComplete ? tick : not_tick}
          alt="tick"
        />
        <p>{text}</p>
      </div>
      <div>
        <img
        onClick={() => {
          deleteTodo(id);
        }}
          src={delete_icon}
          alt="delete"
          className="w-5 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default TodoItem;
