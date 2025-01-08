import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { DELETE_PROJECT } from "../mutations/projectMutations";
import { GET_PROJECTS } from "../queries/projectQueries";
import { FaTrash } from "react-icons/fa";

export default function DeleteProjectButton({ projectId }) {
  const navigate = useNavigate();
  const [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: { id: projectId },
    refetchQueries: [{ query: GET_PROJECTS }],
    onCompleted: () => {
      navigate("/");
    },

    // TODO : To ask Remi about this
    // update: (cache) => {
    //   console.log("cache", cache);
    //   console.log(
    //     "cache.readQuery({ query: GET_PROJECTS }",
    //     cache.readQuery({ query: GET_PROJECTS })
    //   );
    //   const { projects } = cache.readQuery({ query: GET_PROJECTS });
    //   cache.writeQuery({
    //     query: GET_PROJECTS,
    //     data: {
    //       projects: projects.filter((project) => project.id !== projctId),
    //     },
    //   });
    // },
  });

  return (
    <div className="d-flex mt-5 ms-auto">
      <button className="btn btn-danger m-2" onClick={deleteProject}>
        <FaTrash />
      </button>
    </div>
  );
}
