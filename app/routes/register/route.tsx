import { supabase } from "~/database";
import { Link } from "@remix-run/react";

export default () => {
  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const userName = formData.get("userName") as string;

    console.log({ email, password });

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          userName,
        },
      },
    });

    console.log({ data, error });
  };
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-800 text-white">
      <h1 className="text-4xl mb-4">Register</h1>
      <form className="flex flex-col mb-4" onSubmit={handleRegister}>
        <label htmlFor="email">Email</label>
        <input
          name="email"
          className="border border-gray-200 bg-transparent mb-4 px-2"
          placeholder="steve.zissou@example.com"
        />
        <label htmlFor="userName">User Name</label>
        <input
          name="userName"
          className="border border-gray-200 bg-transparent mb-4 px-2"
          placeholder="Steve Zissou"
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
        Already have an account? <Link to="/login">Login 👉</Link>
      </p>
    </div>
  );
};
