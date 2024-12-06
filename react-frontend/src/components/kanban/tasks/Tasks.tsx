import AdminNavbar from "../../admin/AdminNavbar";
import AdminSidebar from "../../admin/AdminSidebar";
import TaskForm from "./TaskForm";
import { useEffect, useState } from "react";
import KanbanBars from "../KanbanBars";
import axios from "axios";
import { Project, User } from "../../../utils/types";
import { useLocation } from "react-router-dom";
import { Add, Person } from "@mui/icons-material";


const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Tasks = () => {
  const [openModal, setOpenModal] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [availableTeamMembers, setAvailableTeamMembers] = useState<User[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const [projectsResponse, usersResponse] = await Promise.all([
          axios.get("http://127.0.0.1:8000/api/projects/"),
          axios.get("http://127.0.0.1:8000/api/users/")
        ]);
        setProjects(projectsResponse.data);
        setAvailableTeamMembers(usersResponse.data);
      } catch (e) {
        console.error(e);
      }
    };
    getData();
  }, []);


  // Function to open the modal
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setOpenModal(false);
  };


  // Get the Current Project
  const query = useQuery();
  const productId = query.get('id');
  const parsedProductId = productId ? Number(productId) : null;
  const currentProject = projects.find((project) => project.id === parsedProductId);
  // console.log(currentProject);

  
  // Get the team members of the current project
  const filteredTeamMembers = availableTeamMembers.filter(teamMember => currentProject?.team_members.includes(teamMember.id));
  // console.log(filteredTeamMembers);

  return (
    <section className="relative flex bg-white">
      <AdminSidebar />
      <div className="w-full lg:w-4/5 min-h-screen pb-16">
        <AdminNavbar />
        <section className="px-4 md:px-8 pt-8">
          <div className="headArea flex flex-col md:flex-row items-center justify-between">
            <div className="desc w-2/3">
              <h1 className="text-[#064f38] text-xl font-bold">Tasks of "{currentProject?.name}"</h1>
              <p className="text-xs">
                {currentProject?.description}
              </p>
            </div>
            <div className="flex items-center w-1/3 flex-col md:flex-row text-xs mt-3 md:mt-auto">
              {/* Team Members Section */}
              <div className="w-full flex items-center justify-end text-gray-600">
                <div className="relative flex">
                  {filteredTeamMembers.slice(0, 3).map((member, index) => (
                    <img
                      key={member.id}
                      src={member.avatar}
                      alt={`${member.full_name}'s avatar`}
                      className="rounded-full h-6 w-6"
                      style={{
                        left: `-${index * 11}px`,
                        zIndex: index,
                        position: "relative"
                      }}
                    />
                  ))}
                  {filteredTeamMembers.length > 3 && (
                    <div
                      className="rounded-full h-6 w-6 bg-gray-200 flex items-center justify-center z-20 text-xs text-gray-600"
                      style={{ left: `-${3 * 11}px`, position: "relative" }}
                    >
                      +{filteredTeamMembers.length - 3}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="w-full whitespace-nowrap md:w-auto flex items-center justify-center border-0 gap-2 text-[#064f38] font-semibold hover:text-white bg-[#F0F4F4] hover:bg-[#064f38] rounded-[4px] py-[10px] px-[15px]"
                >
                  <Person style={{fontSize: '15px'}}/> Invite Member
                </button>
                <button
                  className="w-full whitespace-nowrap md:w-auto flex items-center justify-center border-0 gap-2 text-[#064f38] font-semibold hover:text-white bg-[#F0F4F4] hover:bg-[#064f38] rounded-[4px] py-[10px] px-[15px]"
                  onClick={handleOpenModal}
                >
                  <Add style={{fontSize: '15px'}}/> Add Task
                </button>
              </div>
            </div>
          </div>

          {/* Task Form */}
          <TaskForm
            openModal={openModal}
            handleOpenModal={handleOpenModal}
            handleCloseModal={handleCloseModal}
          />

          {/* Task List */}
          <KanbanBars />
        </section>
      </div>
    </section>
  );
};

export default Tasks;
