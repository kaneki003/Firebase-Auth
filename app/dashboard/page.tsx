'use client'
import React from "react";
import { getAuth,signOut } from "firebase/auth";
import { app } from "../firebase/config";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const auth = getAuth(app);
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/");
  };

  console.log(auth.currentUser);

  return (
    <main>
      <h1>Dashboard</h1>
      <button onClick={handleLogout}>Sign Out</button>
    </main>
  );
}