import { Link } from "react-router-dom";
import { useUserStore } from "../../Context/context";
import { ProjectType } from "../../TypeScript/Types/types";

interface CardItemProps {
  project: ProjectType;
  icon: React.ReactNode;
  role: string;
  pendingCount: number;
}

const ProjectList: React.FC<CardItemProps> = ({
  project,
  icon,
  pendingCount,
  role,
}) => {
  const setSelectedProjectsUid = useUserStore(
    (state) => state.setSelectedProjectsUid
  );
  const { selectedProjectsUid } = useUserStore();

  const handleClick = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (
      project &&
      typeof project.uid === "string" &&
      selectedProjectsUid !== project.uid
    ) {
      setSelectedProjectsUid(project.uid);
    }
  };

  return (
    <>
      <figure className="relative flex items-center p-4 shadow-md border border-gray-200  w-80  md:flex bg-slate-100 rounded-xl   md:p-0 dark:bg-slate-800">
        <div className="ml-2">{icon}</div>
        <div className="pt-4 md:p-2 text-center md:text-left space-y-4">
          <div className="absolute top-2   right-4 text-purple-600 text-sm font-medium">
            {pendingCount > 1 ? `${pendingCount} Pendientes `  : `${pendingCount} Pendiente` } 
          </div>

          <div className="flex items-center space-x-3 mt-2">
            <div
              onClick={handleClick}
              className="felex text-gray-700  mt-2 text-item-center text-base-center font-semibold"
            >
              <Link
                to={`/${role}/${encodeURIComponent(project.uid)}`}
              >
                <p>{project.projectTitle}</p>
              </Link>
            </div>
          </div>
        </div>
      </figure>
    </>
  );
};

export default ProjectList;
