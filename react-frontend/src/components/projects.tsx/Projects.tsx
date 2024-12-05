import { DescriptionOutlined, ForumOutlined, LinkOutlined, MoreHoriz, OutlinedFlag } from "@mui/icons-material";
import { useEffect, useState } from "react";
import axios from "axios";
import { Project, User } from "../../utils/types";
import AdminSidebar from "../admin/AdminSidebar";
import AdminNavbar from "../admin/AdminNavbar";
import TaskForm from "../kanban/tasks/TaskForm";
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";

const Projects = () => {
  const [openModal, setOpenModal] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [availableTeamMembers, setAvailableTeamMembers] = useState<User[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const [tasksResponse, projectsResponse, usersResponse] = await Promise.all([
          axios.get("http://127.0.0.1:8000/api/tasks/"),
          axios.get("http://127.0.0.1:8000/api/projects/"),
          axios.get("http://127.0.0.1:8000/api/users/")
        ]);

        setProjects(projectsResponse.data);  // Store the fetched projects
        setAvailableTeamMembers(usersResponse.data);  // Store the fetched users as team members
      } catch (e) {
        console.error(e);
      }
    };

    getData();
  }, []);

  const dateFormatter = (date: string) => {
    const newDate = new Date(date);

    // Format the date to '02 Nov 2023' format
    const formattedDate = new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(newDate);

    return formattedDate;
  };


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
              <h1 className="text-[#064f38] text-xl font-bold">Projects</h1>
              <p className="text-xs">This is the project for my getting the Indian job. In no time.</p>
            </div>
            <div className="flex items-center flex-col md:flex-row justify-between gap-2 md:gap-3 text-xs mt-3 md:mt-auto">
              lorem
              <button
                className="w-full md:w-auto flex items-center justify-center border-0 gap-2 text-[#064f38] hover:text-white bg-[#F0F4F4] hover:bg-[#064f38] rounded-[4px] py-[10px] px-[32px]"
                onClick={handleOpenModal}
              >
                Add project
              </button>
            </div>
          </div>

            <div className="mt-6 flex items-center justify-between gap-6 flex-wrap md:flex-nowrap">
            {
                projects.length > 0 ? (
                    projects.map((project) => {
                        const assignedMembers = availableTeamMembers.filter(member => project.team_members.includes(member.id));
                        return(
                          <div key={project.id} className="bg-gray-100 px-1 shadow-sm rounded-xl">
                            <div className="px-2 w-full flex items-center justify-between">
                                <Link to={`/project-tasks?id=${project.id}`} className="font-semibold text-sm">{project.name}</Link>
                                <div className="flex">
                                    <IconButton color="default">
                                        <MoreHoriz fontSize="small" />
                                    </IconButton>
                                </div>
                            </div>
                    
                            <div className="bg-white w-full p-3 shadow-sm rounded-xl flex justify-between items-center">
                                <div className="h-full w-full flex flex-col justify-between items-start gap-3">
                                    <p className="justify-between text-xs">{project.description.slice(0, 100)}...</p>
                                    
                                    {/* Team Members Section */}
                                    <div className="w-full flex items-center justify-between text-gray-600">
                                      <p className="text-xs">Assignees:</p>
                                      <div className="relative flex">
                                          {assignedMembers.slice(0, 3).map((member, index) => (
                                          <img
                                              key={member.id}
                                              src={member.avatar}
                                              alt={`${member.full_name}'s avatar`}
                                              className="rounded-full h-6 w-6"
                                              style={{ left: `-${index * 11}px`, zIndex: index, position: 'relative' }}
                                          />
                                          ))}
                                          {assignedMembers.length > 3 && (
                                          <div className="rounded-full h-6 w-6 bg-gray-200 flex items-center justify-center z-20 text-xs text-gray-600" style={{ left: `-${3 * 11}px`, position: 'relative' }}>
                                              +{assignedMembers.length - 3}
                                          </div>
                                          )}
                                      </div>
                                    </div>
                        
                                    {/* Due date and priority */}
                                    <div className="w-full flex items-center justify-between gap-3">
                                        <div className="flex items-center text-gray-600">
                                            <OutlinedFlag className="text-gray-500" fontSize="small" />
                                            <p className='flex items-center py-1 px-3 h-fit w-fit rounded-full text-xs'>{dateFormatter(project.start_date)}</p>
                                        </div>
                                        -
                                        <p className='flex items-center py-1 px-3 h-fit w-fit rounded-full text-xs'>{dateFormatter(project.end_date)}</p>
                                    </div>
                        
                                    {/* Footer with comments, links, and tasks */}
                                    <div className="flex items-center justify-between border-t-2 text-xs w-full pt-3 text-gray-600">
                                    <span><ForumOutlined className="text-gray-500" fontSize="small" /> 12 comments</span>
                                    <span><LinkOutlined className="transform -rotate-45 text-gray-500" fontSize="small" /> 1 links</span>
                                    <span><DescriptionOutlined className="text-gray-500" fontSize="small" /> 0/3</span>
                                    </div>
                                </div>
                            </div>
                          </div>
                        )
                    })
                ) : (
                    <div className="text-gray-500 text-sm">No tasks available</div>
                )}
            </div>

          {/* Task Form */}
          <TaskForm
            openModal={openModal}
            handleOpenModal={handleOpenModal}
            handleCloseModal={handleCloseModal}
          />
        </section>
      </div>
    </section>
  );
};

export default Projects;
