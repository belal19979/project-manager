import { FaTrash } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { DELETE_CLIENT } from "../mutations/clientMutations";
import { GET_CLIENTS } from "../queries/clientQueries";

export default function ClientRow({ client }) {
  const [deleteClient, {}] = useMutation(DELETE_CLIENT, {
    variables: { id: client.id },
    // update the cache after the mutation
    update: (cache) => {
      const { clients } = cache.readQuery({ query: GET_CLIENTS });
      cache.writeQuery({
        query: GET_CLIENTS,
        data: {
          clients: clients.filter((c) => c.id !== client.id),
        },
      });
    },
  });
  return (
    <tr>
      <td>{client.name}</td>
      <td>{client.email}</td>
      <td>{client.phone}</td>
      <td>
        <button className="btn btn-danger" onClick={deleteClient}>
          <FaTrash />
        </button>
      </td>
    </tr>
  );
}
