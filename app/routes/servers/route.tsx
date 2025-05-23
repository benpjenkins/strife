import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { type LoaderFunctionArgs } from "@remix-run/node";
import { createServerClient } from "~/database";

export const loader = async ({ request }: { request: Request }) => {
  const supabase = createServerClient(request);
  const { data: servers, error } = await supabase.from("server").select("*");
  if (error) throw error;
  return {
    servers,
  };
};

export default () => {
  const { servers } = useLoaderData<typeof loader>();
  return (
    <div className="flex flex-row  h-screen w-screen">
      <div className="flex flex-col gap-4 bg-gray-900 px-4 py-8">
        {servers.map((server) => {
          return (
            <Link
              className="font-medium text-white dark:text-blue-500 hover:underline"
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
