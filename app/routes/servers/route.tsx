import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { supabase } from "~/database";

export const loader = async () => {
  const { data: servers, error } = await supabase.from("server").select("*");
  if (error) throw error;
  return {
    servers,
  };
};

export default () => {
  const { servers } = useLoaderData<typeof loader>();
  return (
    <div className="flex flex-row gap-4 m-8">
      <div className="flex flex-col gap-4">
        {servers.map((server) => {
          return (
            <Link
              className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              to={`/servers/${server.id}`}
              key={server.id}
            >
              {server.name}
            </Link>
          );
        })}
      </div>
      <Outlet />
    </div>
  );
};
