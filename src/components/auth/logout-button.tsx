"use client";

import { logout } from "@/actions/logout";

function LogoutButton({ children }: { children: React.ReactNode }) {
  const handleClick = () => {
    logout();
    //   or signOut(); from "next-auth/react"
  };

  return (
    <span onClick={handleClick} className="cursor-pointer">
      {children}
    </span>
  );
}

export default LogoutButton;
