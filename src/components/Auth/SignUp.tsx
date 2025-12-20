import React, { useState } from "react";
import Button from "../../shared/Button";
import { Link } from "react-router";
import Label from "../../shared/Label";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Password & Confirm Password do not match!");
      return;
    }

    const payload = {
      name: form.name,
      email: form.email,
      password: form.password,
    };

    console.log("Signup Data:", payload);
    // এখানে API call দিবে
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#025964] to-[#013a3f] px-4">

      {/* Header */}
      <div className="text-center mb-8 text-white">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-wide">
          Shohag Enterprise
        </h1>
        <p className="mt-2 text-lg opacity-90">Create your account</p>
      </div>

      {/* Card */}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 sm:p-8">

        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#025964]">
            Sign Up
          </h2>
          <p className="text-gray-500 mt-2 text-sm">
            Please fill in the details
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>

     
          <div>
           
           <Label text="Full Name" htmlFor="username" required></Label>


            <input
              name="name"
              type="text"
              placeholder="Hasan (Rajshahi)"
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#025964]"
              required
            />
          </div>

        
          <div>
        
            <Label text="Email Address" htmlFor="email" required></Label>

            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#025964]"
              required
            />
          </div>

          {/* Password */}
          <div>
           <Label text="Password" htmlFor="password" required></Label>

            <input
              name="password"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#025964]"
              required
            />
          </div>

          {/* Confirm Password */}
          <div>
           
           <Label text="Confirm Password" htmlFor="confirm password" required></Label>
            <input
              name="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#025964]"
              required
            />
          </div>

          <Button type="submit" text="Create Account" />
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <Link to="/" className="text-[#025964] font-semibold hover:underline">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Signup;
