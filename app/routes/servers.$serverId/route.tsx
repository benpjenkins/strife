import { Form, Link, Outlet, useLoaderData } from "@remix-run/react";
import { createServerClient } from "~/database";
import { Modal } from "~/components/Modal";
import { useState } from "react";
import { Button } from "~/components/Button";
import { Input } from "~/components/Input";

type LoaderParams = {
  serverId: string;
};

type LoaderArgs = {
  request: Request;
  params: LoaderParams;
};

export const loader = async ({ request, params }: LoaderArgs) => {
  const { serverId } = params;
  console.log("serverId", serverId);

  const supabase = createServerClient(request);
  const { data: channels, error } = await supabase
    .from("channel")
    .select("*")
    .eq("server_id", serverId);

  if (error) throw error;

  return {
    channels,
    serverId,
  };
};

export const action = async ({ request }: { request: Request }) => {
  const supabase = createServerClient(request);
  const formData = await request.formData();
  const channelName = formData.get("channelName") as string;
  const serverId = formData.get("serverId") as string;
  const description = formData.get("description") as string;

  const { error } = await supabase
    .from("channel")
    .insert({ name: channelName, server_id: serverId, description });

  if (error) console.log(error.message);
  return null;
};

export default () => {
  const { channels, serverId } = useLoaderData<typeof loader>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-row gap-4  h-screen w-screen">
      <div className="flex flex-col gap-4 bg-gray-800  w-40 p-8">
        <Modal isOpen={isModalOpen}>
          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
            <h3
              className="text-base font-semibold text-gray-900"
              id="modal-title"
            >
              Create Server
            </h3>
            <div className="mt-2">
              <Form method="post">
                <div className="w-full">
                  <Input
                    name="channelName"
                    placeholder="Channel Name"
                    className="w-full mb-4"
                  />
                  <Input
                    name="description"
                    placeholder="Channel Description"
                    className="w-full mb-4"
                  />
                  <input type="hidden" name="serverId" value={serverId} />
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
            {channels.map((channel) => {
              return (
                <Link
                  className="pt-2 text-white"
                  key={channel.id}
                  to={`/servers/${serverId}/${channel.id}`}
                >
                  <span className="text-gray-400 mr-1">#</span>
                  {channel.name}
                </Link>
              );
            })}
          </div>
          <div>
            <Button onClick={() => setIsModalOpen(true)}>Create Channel</Button>
          </div>
        </div>
      </div>
      <div className="p-8 flex-1 flex flex-col ">
        <Outlet />
      </div>
    </div>
  );
};
