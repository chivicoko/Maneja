import { useLocation } from "react-router-dom";
import Homeview from "../components/Homeview"
import Tasks from "../components/kanban/tasks/Tasks";

const Home = () => {
  const location = useLocation();
  const pathName = location.pathname;

  return (
    <>
    {pathName === '/' && <Homeview/>}
    {pathName === '/projects' && <Tasks/>}
    </>
  )
}

export default Home;