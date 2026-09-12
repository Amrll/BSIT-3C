import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, password });
    navigate("/");
  };

  useEffect(() => {}, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm bg-white p-8 rounded-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign in to your account</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>

          <button
            type="submit"
            className="mt-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-[100%]"
          >
            Sign in
          </button>

          <Link to="/" className="mt-6 block text-center text-sm text-gray-500 hover:text-blue-500">
            Back to landing page
          </Link>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
