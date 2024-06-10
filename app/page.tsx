"use client";
import Image from "next/image";
import SignIn from "./signin";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "./firebase/config";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const auth = getAuth(app);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/dashboard");
      }
    });
  }, [auth, router]);

  return (
    <main>
      <h1>Sign IN</h1>
      <SignIn />
    </main>
  );
}
