import AddTodoForm from "@/components/AddTodoForm";
import CheckTodo from "@/components/CheckTodo";
import LogoutButton from "@/components/LogoutButton";
import RemoveTodo from "@/components/RemoveTodo";
import { BASE_URL } from "@/utils/constants";
import fetchRequest from "@/utils/fetch-request";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type UserProfile = {
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
    url: `${BASE_URL}user/profile`,
    method: "GET",
    token,
  }).catch(() => {
    redirect("/login");
  });

  const todos = await fetchRequest<undefined, Array<Todo>>({
    url: `${BASE_URL}todo`,
    method: "GET",
    token,
  }).catch((err) => {
    console.log(err);
    redirect("/login");
  });

  return (
    <div>
      <header className="bg-blue-500 text-white p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-lg md:text-2xl font-bold flex items-center gap-2">
            {profile.name.toUpperCase()}
            {profile.admin && <span className="text-xs">( Admin )</span>}
          </h1>
          <h1 className="text-lg md:text-2xl  font-bold">My Todo App</h1>
          <LogoutButton />
        </div>
      </header>
      <div className="container mx-auto">
        <AddTodoForm />
      </div>
      <div>
        <div className="px-4">
          {todos.map((item) => (
            <div className="flex gap-5 max-w-3xl mx-auto my-2 p-2 bg-white rounded-xl shadow-md items-center">
              <CheckTodo _id={item._id} done={item.done} />
              <div className={item.done ? "opacity-50" : ""}>
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
