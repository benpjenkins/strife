import { Form, Link, Outlet, useLoaderData, useSubmit } from "@remix-run/react";
import { createServerClient } from "~/database";
import { Modal } from "~/components/Modal";
import { useState } from "react";
import { Button } from "~/components/Button";
import { Input } from "~/components/Input";

export const loader = async ({ request }: { request: Request }) => {
  const supabase = createServerClient(request);
  const { data: servers, error } = await supabase.from("server").select("*");
  if (error) throw error;
  return {
    servers,
  };
};

export const action = async ({ request }: { request: Request }) => {
  const supabase = createServerClient(request);
  const formData = await request.formData();
  const serverName = formData.get("serverName") as string;

  const { error } = await supabase.from("server").insert({ name: serverName });

  if (error) console.log(error.message);
  return null;
};

export default () => {
  const { servers } = useLoaderData<typeof loader>();
  const submit = useSubmit();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = () => {
    setIsModalOpen(false);
    submit(new FormData(), { method: "post" });
  };

  return (
    <div className="flex flex-row  h-screen w-screen">
      <div className="flex flex-col gap-4 bg-gray-900 px-4 py-8">
        <Modal isOpen={isModalOpen}>
          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
            <h3
              className="text-base font-semibold text-gray-900"
              id="modal-title"
            >
              Create Server
            </h3>
            <div className="mt-2">
              <Form onSubmit={handleSubmit} method="post">
                <div className="w-full">
                  <Input
                    name="serverName"
                    placeholder="Server Name"
                    className="w-full mb-4"
                  />
                </div>

                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 justify-between">
                  <Button type="submit">Confirm</Button>
                  <Button
                    onClick={() => setIsModalOpen(false)}
                    type="button"
                    variant="secondary"
                  >
                    Cancel
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </Modal>
        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-1 flex-col">
            {servers.map((server) => {
              return (
                <Link
                  className="font-medium text-white dark:text-blue-500 hover:underline pt-2"
                  to={`/servers/${server.id}`}
                  key={server.id}
                >
                  {server.name}
                </Link>
              );
            })}
          </div>
          <div>
            <Button onClick={() => setIsModalOpen(true)}>Create Server</Button>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
};
