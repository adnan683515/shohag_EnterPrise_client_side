import { useForm } from "react-hook-form";
import Button from "../../shared/Button";
import { Link } from "react-router";
import Label from "../../shared/Label";
import { axiosUrl } from "../../axois/axiosUrl";
import axios from "axios";

type TSignupForm = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Signup = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TSignupForm>();

  const onSubmit = async (data: TSignupForm) => {
    const payload = {
      name: data.name,
      email: data.email,
      password: data.password,
    };

    try {
      const signUPResponse = await axiosUrl.post(
        "/api/user/register",
        payload
      );

      console.log("SUCCESS:", signUPResponse.data);

    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data?.msg);
      } else {
        console.log("Unexpected error");
      }
    }
  };


  const password = watch("password");

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
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl p-6 sm:p-8">

        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#025964]">
            Sign Up
          </h2>
          <p className="text-gray-500 mt-2 text-sm">
            Please fill in the details
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

          {/* Name */}
          <div>
            <Label text="Full Name" htmlFor="name" required />
            <input
              type="text"
              placeholder="Hasan (Rajshahi)"
              {...register("name", {
                required: "Full name is required",
              })}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#025964]
                ${errors.name ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <Label text="Email Address" htmlFor="email" required />
            <input
              type="email"
              placeholder="you@example.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#025964]
                ${errors.email ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <Label text="Password" htmlFor="password" required />
            <input
              type="password"
              placeholder="••••••••"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#025964]
                ${errors.password ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <Label text="Confirm Password" htmlFor="confirmPassword" required />
            <input
              type="password"
              placeholder="••••••••"
              {...register("confirmPassword", {
                required: "Confirm password is required",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#025964]
                ${errors.confirmPassword ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
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
