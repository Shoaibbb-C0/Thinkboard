import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useAuth } from "../context/AuthContext";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      await register(formData);
      toast.success("Account created successfully");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-base-200 p-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <form className="card-body" onSubmit={handleSubmit}>
          <h1 className="card-title justify-center text-3xl">
            Create your account
          </h1>

          <input
            name="name"
            type="text"
            placeholder="Your name"
            className="input input-bordered mt-4"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email address"
            className="input input-bordered"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password — minimum 8 characters"
            className="input input-bordered"
            value={formData.password}
            onChange={handleChange}
            minLength={8}
            required
          />

          <button
            type="submit"
            className="btn btn-primary mt-4"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "Creating account..."
              : "Create Account"}
          </button>

          <p className="mt-3 text-center">
            Already registered?{" "}
            <Link to="/login" className="link link-primary">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;