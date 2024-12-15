import Navbar from "../../admin/Navbar";
import { useEffect, useState } from "react";
import KanbanBars from "../KanbanBars";
import axios from "axios";
import { Project, User } from "../../../utils/types";
import { useLocation } from "react-router-dom";
import { Add, Person } from "@mui/icons-material";
import Sidebar from "../../sidebars/Sidebar";


const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Tasks = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [availableTeamMembers, setAvailableTeamMembers] = useState<User[]>([]);
  const [projectOverview, setProjectOverview] = useState<boolean>(true);
  const [taskKanban, setTaskKanban] = useState<boolean>(false);
  const [taskTable, setTaskTable] = useState<boolean>(false);

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

  // Get the Current Project
  const query = useQuery();
  const productId = query.get('id');
  const parsedProductId = productId ? Number(productId) : null;
  const currentProject = projects.find((project) => project.id === parsedProductId);
  // console.log(currentProject);

  
  // Get the team members of the current project
  const filteredTeamMembers = availableTeamMembers.filter(teamMember => currentProject?.team_members.includes(teamMember.id));
  // console.log(filteredTeamMembers);

  const handleOverviewToggle = () => {
    setProjectOverview(true);
    setTaskTable(false);
    setTaskKanban(false);
  };
  
  const handleTaskKanbanDisplayFormatToggle = () => {
    setProjectOverview(false);
    setTaskTable(false);
    setTaskKanban(true);
  };
  
  const handleTaskTableDisplayFormatToggle = () => {
    setProjectOverview(false);
    setTaskKanban(false);
    setTaskTable(true);
  };

  return (
    <section className="relative m-0 flex bg-white">
      <Sidebar project={currentProject?.name} />
      <div className="w-full lg:w-4/5 min-h-screen pb-16">
        <Navbar />
        <section className="pt-8">
          <div className="headArea px-4 md:px-8 flex flex-col gap-6">
            <div className="headArea flex flex-col md:flex-row items-center justify-between">
              <div className="desc w-2/3">
                <h1 className="text-blue-800 text-xl font-bold">{currentProject ? `Tasks of "${currentProject?.name}"` : "Project Page"}</h1>
                <p className="text-xs">
                  {currentProject ? `${currentProject?.description.slice(0,130)}...` : "Click a project on the sidebar to display its content here"}
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
                <button
                  className="w-full mr-5 whitespace-nowrap md:w-auto flex items-center justify-center border-0 gap-2 text-blue-800 font-semibold hover:text-white bg-[#F0F4F4] hover:bg-blue-800 rounded-md py-[10px] px-[15px]"
                >
                  <Person style={{fontSize: '15px'}}/> Invite Member
                </button>
              </div>
            </div>

            {currentProject ?
            <div className="flex items-center justify-between">
              <div className="">
                <ul className="flex items-center gap-6">
                  <li className={`${projectOverview ? 'text-blue-800' : ''} "text-sm font-bold hover:text-blue-800 pr-5 pb- mb-0 border-r border-r-black"`}>
                    <button onClick={handleOverviewToggle} className="px-3 py-1 mb-0">Project Overview</button>
                  </li>
                  <li>
                    <button onClick={handleTaskKanbanDisplayFormatToggle} className={`${taskKanban ? 'border-blue-800' : ''} "text-sm font-semibold border-b-2 border-transparent md:hover:border-blue-800 px-2 py-1 mb-0"`}>Tasks Kanban</button>
                  </li>
                  <li>
                    <button onClick={handleTaskTableDisplayFormatToggle} className={`${taskTable ? 'border-blue-800' : ''} "text-sm font-semibold border-b-2 border-transparent md:hover:border-blue-800 px-2 py-1 mb-0"`}>Tasks Table</button>
                  </li>
                </ul>
              </div>
              <button className="mr-5 text-xs font-semibold border-2 border-dashed border-blue-800 text-blue-800 hover:text-white bg-transparent hover:bg-blue-800 hover:border-transparent rounded-md px-2 py-1 mb-0">
                  <Add style={{fontSize: '15px'}} /> Add Task
              </button>
            </div>
            :
            'Select Project'
            }

          </div>


          {
            currentProject ?
            projectOverview ?
              // Project Overview
                <section className="pt-8">
                  <div className="headArea px-4 md:px-8 flex flex-col gap-6">
                    Project Overview
                  </div>
                </section>
            :
              // Project Task Kanban
              taskKanban ?
                <KanbanBars />
              :
                // Project Task Table
                <section className="pt-8">
                  <div className="headArea px-4 md:px-8 flex flex-col gap-6">
                    Project tasks table
                  </div>
                </section>
            : null
          }
        </section>
      </div>
    </section>
  );
};

export default Tasks;
