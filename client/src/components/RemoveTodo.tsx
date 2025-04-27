"use client";

import { refreshHome } from "@/utils/actions";
import { BASE_URL } from "@/utils/constants";
import fetchRequest from "@/utils/fetch-request";

const RemoveTodo: React.FC<{ _id: string }> = ({ _id }) => {
  const removeTodo = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this todo?")) {
      return;
    }
    fetchRequest({ url: `${BASE_URL}todo/${id}`, method: "DELETE" }).then(
      () => {
        refreshHome();
      }
    );
  };

  return (
    <button
      onClick={() => removeTodo(_id)}
      className="bg-red-500 hover:bg-red-400 text-white px-3 py-1 rounded-full ml-auto cursor-pointer"
    >
      X
    </button>
  );
};

export default RemoveTodo;
