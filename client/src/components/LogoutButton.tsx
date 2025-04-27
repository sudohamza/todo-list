"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    fetch("/api/logout", { method: "GET" }).then(() => {
      router.push("/login");
    });
  };

  return (
    <button
      className="cursor-pointer bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
}
