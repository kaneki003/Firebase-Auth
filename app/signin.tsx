"use client";

import React, { useState, useEffect } from "react";
import {
  ConfirmationResult,
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

import { app } from "./firebase/config";
import { useRouter } from "next/navigation";
import { set } from "firebase/database";

declare global {
  interface Window {
    recaptchaVerifier: RecaptchaVerifier;
  }
}

/**
 * Component for handling user sign-in.
 */
export default function SignIn() {
  /**
   * State for storing the phone number input value.
   */
  const [phoneNumber, setPhoneNumber] = useState("");

  /**
   * State for storing the OTP input value.
   */
  const [otp, setOtp] = useState("");

  /**
   * State for storing the confirmation result of the phone number verification.
   */
  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult | null>(null);

  /**
   * State for tracking whether OTP has been sent or not.
   */
  const [otpSent, setOtpSent] = useState(false);

  /**
   * Firebase authentication instance.
   */
  const auth = getAuth(app);

  /**
   * Next.js router instance.
   */
  const router = useRouter();

  /**
   * Effect hook for initializing the reCAPTCHA verifier.
   */
  useEffect(() => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "normal",
        callback: () => {
          // console.log('recaptcha resolved');
        },
        "expired-callback": () => {
          // console.log('recaptcha expired');
        },
      }
    );
  }, [auth]);

  /**
   * Event handler for phone number input change.
   * @param e - The change event object.
   */
  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  /**
   * Event handler for sending OTP.
   */
  const handleSendOtp = async () => {
    try {
      const formattedPhoneNumber = `+${phoneNumber.replace(/\D/g, "")}`;
      console.log(formattedPhoneNumber);
      const confirmation = await signInWithPhoneNumber(
        auth,
        formattedPhoneNumber,
        window.recaptchaVerifier
      );
      setConfirmationResult(confirmation);
      setOtpSent(true);
      setPhoneNumber("");
      alert("OTP sent");
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * Event handler for OTP input change.
   * @param e - The change event object.
   */
  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value);
  };

  /**
   * Event handler for OTP submission.
   */
  const handleOtpSubmit = async () => {
    try {
      await confirmationResult?.confirm(otp);
      setOtp("");
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {!otpSent ? <div id="recaptcha-container"></div> : null}
      <input
        type="tel"
        value={phoneNumber}
        onChange={handlePhoneNumberChange}
        placeholder="Enter phone number"
        className="border border-gray-500 p-2 rounded-md text-black"
      />
      <input
        type="text"
        value={otp}
        onChange={handleOtpChange}
        placeholder="Enter OTP"
        className="border border-gray-500 p-2 rounded-md text-black"
      />

      <button
        onClick={otpSent ? handleOtpSubmit : handleSendOtp}
        className="bg-blue-500 text-white p-2 rounded-md"
        style={{ backgroundColor: otpSent ? "green" : "blue" }}
      >
        {otpSent ? "Submit OTP" : "Send OTP"}
      </button>
    </div>
  );
}
