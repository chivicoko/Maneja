
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProjectTasks from './pages/ProjectTasks';

function App() {
  return (
    <Router>
      <div className="w-screen min-h-screen bg-gray-100">
        {/* <Navbar/> */}
        <main className="">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/project-tasks" element={<ProjectTasks />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
