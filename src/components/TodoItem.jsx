import React from "react";
import tick from "../assets/tick.png";
import not_tick from "../assets/not_tick.png";
import delete_icon from "../assets/delete.png";

const TodoItem = ({ id, text, isComplete, deleteTodo, toggle, reminder, updateReminder}) => {
    const handleReminderChange = (e) => {
        updateReminder(id, e.target.value)
    }

  return (
    <div className="flex items-center my-3 gap-2">
      <div className="flex flex-1 items-center cursor-pointer gap-4">
        <img
          onClick={() => {
            toggle(id);
          }}
          className="w-7"
          src={isComplete ? tick : not_tick}
          alt="tick"
        />
        <p>{text}</p>
        <div className="ml-auto mr-2">
          <textarea
            maxLength={23}
            placeholder="Lembrete..."
            className="
                    w-30 h-10 px-3 py-2
                    text-center
                    text-sm text-slate-700
                    border border-slate-300 rounded-lg
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                    transition-all duration-200
                    resize-none
                    placeholder-slate-400
                    hover:border-slate-400
                    shadow-sm
                    "
            onChange={handleReminderChange}
            value={reminder || ""}
          />
        </div>
      </div>
      <div>
        <img
          src={delete_icon}
          onClick={() => {
            deleteTodo(id);
          }}
          alt="delete"
          className="w-5 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default TodoItem;
