"use client";
import fetchRequest from "@/utils/fetch-request";
import { useState } from "react";
import { useRouter } from "next/navigation";

export type LoginFormData = {
  email: string;
  password: string;
  remember: boolean;
};

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!email) newErrors.email = "Email is required";
    if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid";
    if (!password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      fetchRequest<LoginFormData, undefined>({
        url: `api/login`,
        body: { email, password, remember },
        method: "POST",
      })
        .then(() => {
          router.push("/");
        })
        .catch((err) => {
          setError(err.message);
        });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-9/10 max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            onChange={(e) => {
              setEmail(e.target.value)
              setErrors({ ...errors, password: "" })
            }}
            value={email}
            required={true}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your password"
            onChange={(e) => {
              setPassword(e.target.value)
              setErrors({ ...errors, password: "" })
            }}
            value={password}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>
        <div className="flex justify-around mb-2">
          {Boolean(error) && (
            <span className="w-full items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-red-600/10 ring-inset">
              {error}
            </span>
          )}
        </div>
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            id="rememberMe"
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            onChange={() => setRemember(!remember)}
            checked={remember}
          />
          <label
            htmlFor="rememberMe"
            className="ml-2 block text-sm text-gray-900"
          >
            Remember me
          </label>
        </div>
        <button
          type="submit"
          className=" cursor-pointer w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Submit
        </button>
        <p className="mt-4 text-sm text-center text-gray-600">
          Don&apos;t have an account?
          <a href="/register" className="text-blue-500 hover:underline">
            Sing Up
          </a>
        </p>
      </form>
    </div>
  );
}
