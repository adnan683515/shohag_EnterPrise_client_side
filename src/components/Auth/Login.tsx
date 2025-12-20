
import Button from "../../shared/Button";
import { Link } from "react-router";
import Label from "../../shared/Label";

const Login = () => {



    
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#025964] to-[#013a3f] px-4 sm:px-6 lg:px-8">

      {/* Header */}
      <div className="text-center mb-8 text-white">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-wide">
          Shohag Enterprise
        </h1>
        <p className="mt-2 text-lg sm:text-xl opacity-90">
          Welcome
        </p>
      </div>

      {/* Card */}
      <div className="w-full max-w-md sm:max-w-lg bg-white rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-10">

        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#025964]">
            Login Page
          </h2>
          <p className="text-gray-500 mt-2 text-sm sm:text-base">
            Login to continue
          </p>
        </div>

        <form className="space-y-5">

          {/* Email */}
          <div>
          <Label text="Email Address" htmlFor="email" required />
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#025964]"
            />
          </div>

          {/* Password */}
          <div>
           
           <Label text="Password" htmlFor="password" required></Label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#025964]"
            />
          </div>

          {/* Remember */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-gray-600">
              <input
                type="checkbox"
                className="rounded text-[#025964] focus:ring-[#025964]"
              />
              Remember me
            </label>

            <a href="#" className="text-[#025964] font-medium hover:underline">
              Forgot?
            </a>
          </div>

          {/* Button */}
          <Button type="submit" text="Login" />
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-[#025964] font-semibold hover:underline">
            Sign up
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;
