"use client";

import { refreshHome } from "@/utils/actions";
import { BASE_URL } from "@/utils/constants";
import fetchRequest from "@/utils/fetch-request";

const CheckTodo: React.FC<{ _id: string; done: boolean }> = ({ _id, done }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    fetchRequest({
      url: `${BASE_URL}todo/${_id}`,
      method: "PATCH",
      body: { done: event.target.checked },
    }).then(() => {
      refreshHome();
    });
  };

  return (
    <input
      type="checkbox"
      id="rememberMe"
      onChange={handleChange}
      checked={done}
      className="cursor-pointer text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
    />
  );
};

export default CheckTodo;
