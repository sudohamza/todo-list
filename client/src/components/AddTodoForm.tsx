"use client";
import { refreshHome } from "@/utils/actions";
import { BASE_URL } from "@/utils/constants";
import fetchRequest from "@/utils/fetch-request";
import { useState } from "react";

type TodoFormData = {
  title: string;
  description?: string;
  done: boolean;
};

const AddTodoForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const validate = () => {
    if (!title) {
      setError("Title is required");
      return false;
    }
    if (title.length < 4) {
      setError("Title must be at least 4 characters");
      return false;
    }
    return true;
  };

  const addTodo = async (event: React.FormEvent) => {
    event.preventDefault();
    if (validate()) {
      await fetchRequest<TodoFormData, undefined>({
        url: `${BASE_URL}todo`,
        method: "POST",
        body: { title, done: false, description },
      });
      setTitle("");
      setDescription("");
      refreshHome();
    }
  };

  return (
    <div>
      <form
        onSubmit={addTodo}
        className=" w-3/4 lg:w-2/4 mx-auto space-x-2 mt-4"
      >
        <input
          type="text"
          name="content"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setError("");
          }}
          placeholder="Add a new todo"
          className="border border-gray-300 rounded px-4 py-2 my-2 w-full"
        />
        {error && <p className="-mt-2 ml-1 text-red-500">{error}</p>}

        <textarea
          name="description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            setError("");
          }}
          placeholder="Description is optional."
          className="border border-gray-300 rounded px-4 py-2 my-2 w-full"
        />
        <div className="flex justify-center">
          <button
            type="submit"
            className="min-w-32 cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTodoForm;
