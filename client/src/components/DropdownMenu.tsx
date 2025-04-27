"use client";

import { useState, useRef, useEffect } from "react";
import LogoutButton from "./LogoutButton";
import { UserProfile } from "@/app/page";
import UserIcon from "./UserIcon";

const DropdownMenu: React.FC<{ data: UserProfile }> = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className="cursor-pointer hover:bg-blue-300 inline-flex rounded-full justify-center w-full  border border-gray-300 shadow-sm p-2 bg-white text-sm font-medium text-gray-700"
      >
        <UserIcon />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1  ring-opacity-5">
          <div className="py-1">
            <div className="block border-b-1 border-gray-200 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              <h3 className="text-lg font-bold">
                {data.name}{" "}
                <span className="text-sm font-light text-green-500">
                  {data.admin && "(Admin)"}
                </span>
              </h3>
              <p>{data.email}</p>
            </div>
            <LogoutButton />
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
