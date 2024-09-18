"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  MdEmail,
  MdLock,
  MdPerson,
  MdVisibility,
  MdVisibilityOff,
} from "react-icons/md";
import car from "../../assets/car1.png";
import google from "../../assets/google.png";
import facebook from "../../assets/facebook.png";
import { signUp } from "@/api";
import { useGlobalContext } from "../ContextProvider";
import { useRouter } from "next/navigation";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const { user } = useGlobalContext();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signUp(firstName, lastName, email, password, router);
    } catch (error) {
      console.error("Sign-up error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  return (
    <div className="w-full h-screen flex justify-between items-center bg-white">
      <div
        className="w-2/5 h-full gradient-background flex flex-col justify-between items-center p-4"
        style={{
          borderRadius: "30px",
          borderTopLeftRadius: "0px",
          borderBottomLeftRadius: "0px",
        }}
      >
        <div className="flex justify-center items-center py-4">
          <Image
            src="/logo-main.png"
            className="w-20"
            width={80}
            height={80}
            alt="CSB LOGO"
            priority
          />
          <h1 className="font-bold text-white text-2xl tracking-wider">
            CARSALESBOOST
          </h1>
        </div>
        <div>
          <h2 className="font-bold text-2xl text-white text-left">
            Effortlessly{" "}
            <span className="border-b border-white pb-1">Boost🚀</span>
            <br />
            Your Car Listings
          </h2>
          <p className="text-gray-200 mt-2">
            Welcome back to Carsalesboost! Seamlessly manage and automate your
            car listings. Sign in to continue!
          </p>
        </div>
        <div className="relative">
          <Image
            src={car}
            alt="Car Listings"
            width={900}
            height={300}
            className="object-cover"
            priority
          />
        </div>
      </div>
      <div className="w-3/5 h-full flex justify-center items-center">
        <div className="flex flex-col items-center gap-4 w-80">
          <h2 className="font-bold text-3xl">Sign Up to CarSalesBoost!</h2>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex items-center bg-gray-200 p-2 rounded-full">
              <MdPerson className="text-xl" />
              <input
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                type="text"
                placeholder="First Name"
                className="w-full bg-transparent border-none text-lg outline-none"
              />
            </div>
            <div className="flex items-center bg-gray-200 p-2 rounded-full">
              <MdPerson className="text-xl" />
              <input
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                type="text"
                placeholder="Last Name"
                className="w-full bg-transparent border-none text-lg outline-none"
              />
            </div>
            <div className="flex items-center bg-gray-200 p-2 rounded-full">
              <MdEmail className="text-xl" />
              <input
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email"
                className="w-full bg-transparent border-none text-lg outline-none"
              />
            </div>
            <div className="flex items-center bg-gray-200 p-2 rounded-full">
              <MdLock className="text-xl" />
              <input
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full bg-transparent border-none text-lg outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <MdVisibilityOff className="text-lg" />
                ) : (
                  <MdVisibility className="text-lg" />
                )}
              </button>
            </div>
            <button
              disabled={loading}
              type="submit"
              className="button-gradient w-full h-12 rounded-md text-white font-semibold text-lg"
            >
              {loading ? "Loading..." : "Sign Up"}
            </button>
          </form>
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center w-60">
              <div className="bg-gray-400 h-px w-1/4"></div>
              <span className="w-1/2 text-center text-sm font-medium">
                Or Register with
              </span>
              <div className="bg-gray-400 h-px w-1/4"></div>
            </div>
            <div className="flex gap-4">
              <button className="border border-black w-10 h-10 rounded-full flex justify-center items-center">
                <Image
                  src={google}
                  width={30}
                  height={30}
                  className="object-cover"
                  alt="Google"
                />
              </button>
              <button className="border border-black w-10 h-10 rounded-full flex justify-center items-center">
                <Image
                  src={facebook}
                  width={30}
                  height={30}
                  className="object-cover"
                  alt="Facebook"
                />
              </button>
            </div>
          </div>
          <div className="text-center">
            <span className="font-medium">Already have an Account? </span>
            <Link className="text-[#E36C40] font-medium" href="/login">
              Sign In now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
