'use client';

import { Add, ArrowDropDownOutlined, KeyboardArrowDown, MoreVert, ShowChartOutlined, Tungsten } from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
// import ProductModal from './ProductModal';
import { Link, useLocation } from 'react-router-dom';
import { Project, User } from '../../utils/types';

interface SidebarProps {
    closeSidebar?: () => void;
    project?: string;
}

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  
  
const ProjectSidebar: React.FC<SidebarProps> = ({ closeSidebar = () => {}, project = {} }) => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [availableTeamMembers, setAvailableTeamMembers] = useState<User[]>([]);
    const [projectTeamMembers, setProjectTeamMembers] = useState<User[]>([]);

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


    const handleProjectSelect = (id: number) => {
        const currentProject = projects.filter((project) => project.id === id);
        // console.log(currentProject);
        
        const filteredTeamMembers = availableTeamMembers.filter(teamMember => currentProject[0].team_members.includes(teamMember.id));
        // console.log(filteredTeamMembers);
        setProjectTeamMembers(filteredTeamMembers);
    }


  // Get the Current Project
    const query = useQuery();
    const productId = query.get('id');

    return (
            <div className="flex flex-col justify-start items-center transition-transform duration-200">
                <button className='self-end mr-3 md:mr-8 mt-2 text-3xl lg:hidden bg-transparent' onClick={closeSidebar}>&times;</button>
                    
                <div className="flex flex-col justify-start items-center gap-8 lg:gap-12 pb-6 lg:py-6">
                    <div className="flex items-center justify-end md:hidden">
                        <span className="px-2 flex items-center justify-between gap-2">
                            <span className="text-[#333333]"><AccountCircleIcon /></span>
                            <button className="text-[#666666] flex items-center justify-between gap-1 text-sm">
                                Big Tech
                                <span className="text-[#333333]"><KeyboardArrowDown /></span>
                            </button>
                        </span>
                    </div>

                    <div className='px-3 flex flex-col justify-center items-center gap-1 transition-all duration-200'>
                        <div className='w-full'>
                            <p className='text-black mb-3 font-semibold'>Projects</p>
                            <div className='w-full flex flex-col gap-2'>
                                {projects.map(project => 
                                <Link to={`/projects?id=${project.id}`} key={project.id} className={`'dd' ? "text-white bg-blue-800" : "text-[#455454]"} w-full flex items-center justify-between text-[#455454] hover:text-white hover:bg-blue-800 border-2 border-gray-300 hover:border-transparent rounded-md text-sm font-semibold group transition-all duration-200 ease-linear`}>
                                    <button onClick={() => handleProjectSelect(project.id)} className="w-full py-2 pr-1 pl-2 text-sm flex items-center justify-between gap-2">
                                        <span className='flex items-center gap-1'>
                                            <span className=""><Tungsten fontSize='small' /></span>
                                            <span className="font-semibold">{project.name.slice(0, 20)}</span>
                                        </span>
                                        <MoreVert/>
                                    </button>
                                </Link>
                                )}
                            </div>
                        </div>

                        <div className='w-full mt-6'>
                            <p className='text-black mb-3 font-semibold'>Team members</p>
                            {productId ? 
                            <ul className="flex flex-col items-center gap-3 w-full">
                                {projectTeamMembers.map(projectTeamMember => 
                                    <li key={projectTeamMember.id} className={`'dd' ? "text-white bg-blue-800" : "text-[#455454]"} w-full flex items-center justify-between text-[#455454] border-2 border-gray-300 hover:border-gray-500 py-1 pr-1 pl-2 rounded-md text-sm font-semibold group transition-all duration-300 ease-linear`}>
                                        <Link to={'projectTeamMember'} className="w-full flex items-center justify-between gap-2">
                                            <span className='flex items-center gap-2'>
                                                <img src={projectTeamMember.avatar} alt={`${projectTeamMember.full_name}'s avatar`} className='w-6 h-6 rounded-full' />
                                                <span className='flex flex-col items-start gap-1'>
                                                    <span className="font-semibold text-xs text-black">{projectTeamMember.full_name}</span>
                                                    <span className='flex items-center gap-1 text-xs text-gray-400'>
                                                        <span className='w-1 h-1 bg-green-500 rounded-full'></span>
                                                        <span>Online - 11:54:30</span>
                                                    </span>
                                                </span>
                                            </span>
                                            <ArrowDropDownOutlined/>
                                        </Link>
                                    </li>
                                )}
                            </ul>
                            : <p className='text-xs'>Select a project above</p>
                            }
                        </div>

                        <div className="card w-full mt-8 mb-3 border-2 border-[#afb6e190] py-4 px-4 rounded-lg flex flex-col items-start gap-4">
                            <p className="text-xs text-gray-800 font-semibold uppercase">total hours</p>
                            <p className="text-xl text-gray-800 font-bold">23.7 hours</p>
                            <p className="text-xs text-gray-800 font-semibold"><span className='text-green-600 font-semibold'><ShowChartOutlined fontSize='small'/> 2.5%</span> from last week</p>
                        </div>

                        <button className="text-xs font-semibold w-full border-2 border-dashed border-blue-800 text-blue-800 hover:text-white bg-transparent hover:bg-blue-800 hover:border-transparent rounded-md py-2 px-6">
                            <Add/> Add Project
                        </button>
                    </div>
                </div>

            </div>
  );
};

export default ProjectSidebar;
