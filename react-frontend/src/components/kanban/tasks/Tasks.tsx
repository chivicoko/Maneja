import Navbar from "../../admin/Navbar";
import { useEffect, useState } from "react";
import KanbanBars from "../taskkanban/KanbanBars";
import axios from "axios";
import { Project, User } from "../../../utils/types";
import { useLocation } from "react-router-dom";
import { Add, Person } from "@mui/icons-material";
import Sidebar from "../../sidebars/Sidebar";
import TaskList from "../tasktable/TaskList";


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
  const projectId = query.get('id');
  const parsedProjectId = projectId ? Number(projectId) : null;
  const currentProject = projects.find((project) => project.id === parsedProjectId);
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
    setTaskKanban(true);
    setProjectOverview(false);
    setTaskTable(false);
  };
  
  const handleTaskTableDisplayFormatToggle = () => {
    setTaskTable(true);
    setProjectOverview(false);
    setTaskKanban(false);
  };
  
  const dateFormatter = (date: string) => {
    const newDate = new Date(date);
    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(newDate);
  };


  return (
    <section className="relative m-0 flex bg-white">
      <Sidebar project={currentProject?.name} />
      <div className="w-full lg:w-4/5 min-h-screen pb-16">
        <Navbar />
        <section className="pt-8">
          <div className="headArea flex flex-col gap-6">
            <div className="headArea px-4 md:px-8 flex flex-col md:flex-row items-center justify-between">
              <div className="desc w-2/3">
                <h1 className="text-blue-800 text-xl font-bold">{currentProject ? `${currentProject?.name}` : "Project Page"}</h1>
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
                {currentProject ? 
                  <button
                    className="w-full mr-5 whitespace-nowrap md:w-auto flex items-center justify-center border-0 gap-2 text-blue-800 font-semibold hover:text-white bg-[#F0F4F4] hover:bg-blue-800 rounded-md py-[10px] px-[15px]"
                  >
                    <Person style={{fontSize: '15px'}}/> Invite Member
                  </button>
                : null}
              </div>
            </div>

            {currentProject ?
            <div className="px-4 md:px-8 flex items-center justify-between">
              <div className="">
                <ul className="flex items-center gap-6">
                  <li className={`${projectOverview ? 'text-blue-800' : ''} "text-sm font-bold hover:text-blue-800 pr-5 pb- mb-0 border-r border-r-black"`}>
                    <button onClick={handleOverviewToggle} className="px-3 py-1 mb-0">Project Overview</button>
                  </li>
                  <li>
                    <button onClick={handleTaskKanbanDisplayFormatToggle} className={`${taskKanban ? 'border-blue-800' : 'border-transparent'} "text-sm font-semibold border-b-2 md:hover:border-blue-800 px-2 py-1 mb-0"`}>
                      Tasks Kanban
                    </button>
                  </li>
                  <li>
                    <button onClick={handleTaskTableDisplayFormatToggle} className={`${taskTable ? 'border-blue-800' : 'border-transparent'} "text-sm font-semibold border-b-2 md:hover:border-blue-800 px-2 py-1 mb-0"`}>
                      Tasks Table
                    </button>
                  </li>
                </ul>
              </div>
              <button className="mr-5 text-xs font-semibold border-2 border-dashed border-blue-800 text-blue-800 md:hover:text-white bg-transparent md:hover:bg-blue-800 md:hover:border-transparent rounded-md px-2 py-1 mb-0">
                  <Add style={{fontSize: '15px'}} /> Add Task
              </button>
            </div>
            :
            <div className="px-4 md:px-8 w-full h-[60vh] flex items-center justify-center border-t">
              <div>
                <img src="/images/pagePlaceholder-tablet.png" alt="Page placeholder image" className="w-[25rem]" />
                <p className="text-center mt-12 text-xl font-semibold">Select a Project from the sidebar</p>
              </div>
            </div>
            }

          </div>

          {
            currentProject ?
              projectOverview ?
                // Project Overview
                <div className="headArea pt-8 px-4 md:px-8 flex flex-col gap-6 border-t">
                  <div className="flex flex-col md:flex-row gap-16">
                    <div className="w-1/2 self-center flex flex-col gap-6">
                      <h3 className="text-xl font-semibold underline">{currentProject.name}</h3>
                      <h3 className="">{currentProject.description}</h3>
                      {/* <h3 className="">{currentProject.created_by}</h3> */}
                      <div className="w-fit self-stretch flex items-center justify-start gap-6 bg-red-100 py-2 px-4 rounded-lg">
                        <p>{dateFormatter(currentProject.start_date)}</p>
                        <span>-</span>
                        <p>{dateFormatter(currentProject.end_date)}</p>
                      </div>
                    </div>
                    <div className="w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4 pr-5">
                      {filteredTeamMembers.map(member => {
                        return (
                          <div key={member.id} className="h-[80px] rounded-lg relative bg-cover bg-center transform transition-transform duration-300 hover:-rotate-3 shadow-md hover:shadow-xl border">
                            <img src="/images/2.jpeg" alt="search icon" className="rounded-lg h-full w-full relative" />
                              
                            <div className="bg-white shadow-md flex items-center justify-center gap-3 py-4 px-4 rounded-lg absolute w-full h-full top-0 left-0 bg-opacity-90">
                              <img src={member.avatar} alt={`${member.full_name}'s image`} className="w-14 h-14 rounded-full" />
                              <div>
                                <p className="font-bold">{member.full_name}</p>
                                <p className="text-sm font-semibold">{member.email}</p>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              :
                // Project Task Kanban
                taskKanban ?
                  <KanbanBars />
                :
                  // Project Task Table
                  <TaskList/>
            : null
          }
        </section>
      </div>
    </section>
  );
};

export default Tasks;
