"use client";

import React, { useState, useEffect } from "react";
import {
  ConfirmationResult,
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signInWithPopup,
  User,
} from "firebase/auth";

import { app } from "../firebase/config";
import { useRouter } from "next/navigation";
import { set } from "firebase/database";
import { unsubscribe } from "diagnostics_channel";
import { get } from "http";
import { GoogleAuthProvider } from "firebase/auth";
import Dashboard from "../dashboard/page";

/**
 * Represents the SignUp component.
 * This component handles user sign up using Google authentication.
 */
export default function SignUp() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth(app);

    /**
     * Subscribes to the authentication state changes.
     * If a user is authenticated, sets the user state.
     * If no user is authenticated, sets the user state to null.
     */
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    // Clean up the subscription when the component is unmounted
    return () => {
      // unsubscribe("authStateChanged");
    };
  }, []);

  /**
   * Handles sign in with Google authentication.
   * If sign in is successful, redirects to the dashboard page.
   * If an error occurs, logs the error code to the console.
   */
  const signInWithGoogle = async () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push("/dashboard");
    } catch (error: any) {
      console.error(error.code);
    }
  };

  return (
    <div>
      {user ? (
        <Dashboard />
      ) : (
        <button
          onClick={signInWithGoogle}
          className="bg-blue-500 text-white p-2"
        >
          Sign in with google
        </button>
      )}
    </div>
  );
}
