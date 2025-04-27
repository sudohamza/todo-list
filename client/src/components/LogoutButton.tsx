"use client";

export default function LogoutButton() {
  const handleLogout = async () => {
    fetch("/api/logout", { method: "GET" }).then(() => {
      window.location.href = "/login";
    });
  };

  return (
    <a
      className="cursor-pointer block px-4 py-2 text-sm text-red-500 text-lg hover:bg-gray-100"
      onClick={handleLogout}
    >
      Logout
    </a>
  );
}
