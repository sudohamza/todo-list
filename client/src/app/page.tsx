import AddTodoForm from "@/components/AddTodoForm";
import CheckTodo from "@/components/CheckTodo";
import DropdownMenu from "@/components/DropdownMenu";
import RemoveTodo from "@/components/RemoveTodo";
import {  INTERNAL_URL } from "@/utils/constants";
import fetchRequest from "@/utils/fetch-request";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export type UserProfile = {
  _id: string;
  name: string;
  email: string;
  admin: boolean;
};

type Todo = {
  _id: string;
  title: string;
  done: boolean;
  description?: string;
};

export default async function Home() {
  const token = (await cookies()).get("token")?.value;

  const profile = await fetchRequest<undefined, UserProfile>({
    url: `${INTERNAL_URL}user/profile`,
    method: "GET",
    token,
  }).catch(() => {
    redirect("/login");
  });

  const todos = await fetchRequest<undefined, Array<Todo>>({
    url: `${INTERNAL_URL}todo`,
    method: "GET",
    token,
  }).catch(() => {
    redirect("/login");
  });

  return (
    <div>
      <header className="bg-blue-500 text-white p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-lg md:text-2xl  font-bold">My Todo App</h1>
          <DropdownMenu data={profile} />
        </div>
      </header>
      <div className="container mx-auto">
        <AddTodoForm />
      </div>
      <div>
        <div className="px-4">
          {todos.map((item) => (
            <div
              key={item._id}
              className="flex gap-5 max-w-3xl mx-auto my-2 p-2 bg-white rounded-xl shadow-md items-center"
            >
              <CheckTodo _id={item._id} done={item.done} />
              <div className={item.done ? "opacity-25" : ""}>
                <h1 className="font-bold text-xl">{item.title}</h1>
                <p className="text-sm">{item.description}</p>
              </div>
              <RemoveTodo _id={item._id} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
