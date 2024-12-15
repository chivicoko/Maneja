
import { Link, useLocation } from 'react-router-dom';
import ProjectSidebar from './ProjectSidebar';
import { CalendarMonthOutlined, DashboardOutlined, HelpOutline, InsertChartOutlinedOutlined, LogoutOutlined, MessageOutlined, SettingsOutlined, ShareOutlined, WorkHistoryOutlined } from '@mui/icons-material';
import HomeSidebar from './HomeSidebar';

interface SidebarProps {
  show?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ show = 'hidden'}) => {
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [modalMode, setModalMode] = useState<'view' | 'edit'>('view');
  
  const location = useLocation();
  const pathName = location.pathname;

  const menuItems = [
    {id: 1, icon: <DashboardOutlined />, path: '/' },
    {id: 2, icon: <WorkHistoryOutlined />, path: '/projects' },
    {id: 3, icon: <MessageOutlined />, path: '/messages' },
    {id: 4, icon: <CalendarMonthOutlined />, path: '/calendar' },
    {id: 5, icon: <InsertChartOutlinedOutlined />, path: '/charts' },
    {id: 6, icon: <HelpOutline />, path: '/help' },
  ];

  const isActivePath = (route: string | null) => {
      if (!route) return false;

      if (route === '/') {
          return pathName === route;
      } else {
          return pathName.startsWith(route);
      }
  };


    return (
      <nav className={`overflow-auto ${show === 'block' ? 'fixed lg:hidden' : 'hidden'} lg:block top-0 left-0 z-50 lg:z-auto w-4/5 sm:w-3/5 lg:w-1/5 min-h-screen bg-[#F0F4F4] `}>
        <div className="h-full flex">
          <div className="h-full py-5 flex flex-col items-center border-r-2">
              <Link to="/" className="">
                  <img src="/images/logo.jpg" alt="Users profile picture" className='w-[42px] h-[42px] rounded-xl' />
              </Link>
              <div className="flex w-full h-full flex-col items-center justify-between mt-8">
                  <ul className='p-0 w-full flex flex-col gap-5'>
                      {menuItems.map(item => 
                          <li key={item.id} className={`${isActivePath(item.path) ? "text-blue-800 border-blue-600 bg-[#afb6e190]" : "text-[#455454]"} py-2 px-4 border-l-4 border-transparent hover:border-blue-600 transition-all duration-200`}>
                              <Link to={item.path} className="flex items-center gap-3">
                                  <span className="">{item.icon}</span>
                              </Link>
                          </li>
                      )}
                  </ul>
                  <ul className='p-0 w-full flex flex-col gap-4 pb-3'>
                      <li className='py-2 px-4 border-l-4 border-transparent hover:border-blue-600 transition-all duration-300'><SettingsOutlined/></li>
                      <li className='py-2 px-4 border-l-4 border-transparent hover:border-blue-600 transition-all duration-300'><LogoutOutlined/></li>
                      <li className='py-2 px-4 border-l-4 border-transparent hover:border-blue-600 transition-all duration-300'><ShareOutlined/></li>
                  </ul>
              </div>
          </div>

          {pathName === '/' && <HomeSidebar/>}
          {pathName === '/projects' && <ProjectSidebar/>}
        </div>
        
        {/* {isModalOpen && (
            <ProductModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            product={selectedProduct}
            onSave={handleSaveProduct}
            mode={modalMode}
            />
        )} */}

      </nav>
  );
};

export default Sidebar;
