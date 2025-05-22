import { createBrowserClient } from "~/database";
import { Link } from "@remix-run/react";

export default () => {
  const supabase = createBrowserClient();
  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
  };
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-800 text-white">
      <h1 className="text-4xl mb-4">Login</h1>
      <form className="flex flex-col mb-4" onSubmit={handleLogin}>
        <label htmlFor="email">Email</label>
        <input
          name="email"
          className="border border-gray-200 bg-transparent mb-4 px-2"
          placeholder="steve.zissou@example.com"
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          className="border border-gray-200 bg-transparent mb-8 px-2"
          placeholder="password"
        />
        <button className="bg-gray-700 py-2">Go!</button>
      </form>
      <p>
        Don't have an account? <Link to="/register">Register 👉</Link>
      </p>
    </div>
  );
};
