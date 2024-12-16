import { useEffect, useState } from "react";
import AdminNavbar from "./admin/Navbar"
import Sidebar from "./sidebars/Sidebar";
import axios from "axios";
import { Project, Task, User } from "../utils/types";
import { Link, useLocation } from "react-router-dom";
import { MoreVert, Tungsten } from "@mui/icons-material";
import UsageChart from "./UsageChart";
import { diagnosisHistory } from "../utils/data";


const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Homeview = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [availableTeamMembers, setAvailableTeamMembers] = useState<User[]>([]);
  const [projectTeamMembers, setProjectTeamMembers] = useState<User[]>([]);
  
  useEffect(() => {
    const getData = async () => {
      try {
        const [projectsResponse, tasksResponse, usersResponse] = await Promise.all([
          axios.get("http://127.0.0.1:8000/api/projects/"),
          axios.get("http://127.0.0.1:8000/api/tasks/"),
          axios.get("http://127.0.0.1:8000/api/users/")
        ]);
        setProjects(projectsResponse.data);
        setTasks(tasksResponse.data);
        setAvailableTeamMembers(usersResponse.data);
      } catch (e) {
        console.error(e);
      }
    };
    getData();
  }, []);

  // console.log(projects);
  // console.log(availableTeamMembers);

  
  const handleProjectSelect = (id: number) => {
    const currentProject = projects.filter((project) => project.id === id);
    // console.log(currentProject);
    
    const filteredTeamMembers = availableTeamMembers.filter(teamMember => currentProject[0].team_members.includes(teamMember.id));
    // console.log(filteredTeamMembers);
    setProjectTeamMembers(filteredTeamMembers);
}


// Get the Current Project
const query = useQuery();
const productQueryId = query.get('id');

const isProject = (productId: number | null) => {
    if (!productId) return false;

    if (productQueryId) 
        if (productId === +productQueryId) {
            // console.log(productQueryId);
        return +productQueryId === productId;
    } else {
        return +productQueryId === productId;
    }
};


  return (
  <section className="relative m-0 flex bg-white">
    <Sidebar />
    <div className="w-full lg:w-4/5 min-h-screen pb-16">
      <AdminNavbar />
      <section className="flex flex-col space-y-8 px-4 md:px-8 pt-8">
        <div className="pr-5 grid grid-cols-4 gap-6">
          <div className="p-6 bg-red-100 rounded-lg w-full h-[10rem]">
            <h3 className="text-3xl">Total Projects</h3>
            <p className="font-bold text-5xl pt-4 text-blue-900">{projects.length}</p>
          </div>
          <div className="p-6 bg-purple-100 rounded-lg w-full h-[10rem]">
            <h3 className="text-3xl">Total Tasks</h3>
            <p className="font-bold text-5xl pt-4 text-blue-900">{tasks.length}</p>
          </div>
          <div className="p-6 bg-amber-100 rounded-lg w-full h-[10rem]">
            <h3 className="text-3xl">Total Users</h3>
            <p className="font-bold text-5xl pt-4 text-blue-900">{availableTeamMembers.length}</p>
          </div>
          <div className="p-6 bg-lime-100 rounded-lg w-full h-[10rem]">
            <h3 className="text-3xl">Efficiency</h3>
            <p className="font-bold text-5xl pt-4 text-blue-900">70%</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 pr-5">
              <UsageChart data={diagnosisHistory}/>
          {/* <div className="w-full p-4 pr-1 border rounded-lg">
            <div className='w-full flex flex-col gap-2 h-[18rem]'>
            </div>
          </div> */}
          
          <div className="w-full p-4 pr-1 border rounded-lg">
            <div className='w-full flex flex-col gap-2 h-[18rem] overflow-auto custom-scrollbar pr-4'>
              {projects.map(project => 
              <Link to={`/projects?id=${project.id}`} key={project.id} className={`${isProject(project.id) ? "text-white bg-blue-800" : "text-[#455454]"} w-full flex items-center justify-between text-[#455454] hover:text-white hover:bg-blue-800 border-2 border-gray-300 hover:border-transparent rounded-md text-sm font-semibold group transition-all duration-200 ease-linear`}>
                  <span onClick={() => handleProjectSelect(project.id)} className="w-full py-2 pr-1 pl-2 text-sm flex items-center justify-between gap-2">
                      <span className='flex items-center gap-1'>
                          <span className=""><Tungsten fontSize='small' /></span>
                          <span className="font-semibold">{project.name.slice(0, 20)}</span>
                      </span>
                      <MoreVert/>
                  </span>
              </Link>
              )}
              <div>&nbsp;</div>
              <div>&nbsp;</div>
              <div>&nbsp;</div>
              <div>&nbsp;</div>
              <div>&nbsp;</div>
              <div>&nbsp;</div>
              <div>&nbsp;</div>
              <div>&nbsp;</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </section>
  )
}

export default Homeview;