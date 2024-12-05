import AdminNavbar from "../../admin/AdminNavbar";
import AdminSidebar from "../../admin/AdminSidebar";
import TaskForm from "./TaskForm";
import { useEffect, useState } from "react";
import KanbanBars from "../KanbanBars";
import axios from "axios";
import { Project, User } from "../../../utils/types";


const Tasks = () => {
  const [openModal, setOpenModal] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [availableTeamMembers, setAvailableTeamMembers] = useState<User[]>([]);
  const [teamMembers, setTeamMembers] = useState<User[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null); // Track the current project

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

  useEffect(() => {
    if (selectedProject) {
      const projectMembers = availableTeamMembers.filter((member) =>
        selectedProject.team_members.includes(member.id)
      );
      setTeamMembers(projectMembers);
    }
  }, [selectedProject, availableTeamMembers]);

  useEffect(() => {
    const huntProject = projects.find(
      (project) => project.name === "Maneja - Event Management App"
      // (project) => project.name === "Hunt - Job Application Assistant"
      // (project) => project.name === "Lovell - Relationship Coach-Assistant"
    );
    if (huntProject) {
      setSelectedProject(huntProject);
    }
  }, [projects]);


  // Function to open the modal
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setOpenModal(false);
  };


  return (
    <section className="relative flex bg-white">
      <AdminSidebar />
      <div className="w-full lg:w-4/5 min-h-screen pb-16">
        <AdminNavbar />
        <section className="px-4 md:px-12 pt-8">
          <div className="headArea flex flex-col md:flex-row items-center justify-between">
            <div className="desc">
              <h1 className="text-[#064f38] text-xl font-bold">Tasks</h1>
              <p className="text-xs">
                This is the project for my getting the Indian job. In no time.
              </p>
            </div>
            <div className="flex items-center flex-col md:flex-row text-xs mt-3 md:mt-auto">
              {/* Team Members Section */}
              <div className="w-full flex items-center justify-between text-gray-600">
                <div className="relative flex">
                  {teamMembers.slice(0, 3).map((member, index) => (
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
                  {teamMembers.length > 3 && (
                    <div
                      className="rounded-full h-6 w-6 bg-gray-200 flex items-center justify-center z-20 text-xs text-gray-600"
                      style={{ left: `-${3 * 11}px`, position: "relative" }}
                    >
                      +{teamMembers.length - 3}
                    </div>
                  )}
                </div>
              </div>
              <button
                className="w-full whitespace-nowrap md:w-auto flex items-center justify-center border-0 gap-2 text-[#064f38] hover:text-white bg-[#F0F4F4] hover:bg-[#064f38] rounded-[4px] py-[10px] px-[32px]"
                onClick={handleOpenModal}
              >
                Add Task
              </button>
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
