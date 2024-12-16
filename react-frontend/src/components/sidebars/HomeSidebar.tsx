import { Add, KeyboardArrowDown, ShowChartOutlined } from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

interface SidebarProps {
    closeSidebar?: () => void;
    project?: string;
}

  
const HomeSidebar: React.FC<SidebarProps> = ({ closeSidebar = () => {} }) => {

    return (
    <div className="w-full flex flex-col justify-start items-center transition-transform duration-200">
        <button className='self-end mr-3 md:mr-8 mt-2 text-3xl lg:hidden bg-transparent' onClick={closeSidebar}>&times;</button>
            
        <div className="flex w-full flex-col justify-start items-center gap-8 lg:gap-12 pb-6 lg:py-6">
            <div className="flex items-center justify-end md:hidden">
                <span className="px-2 flex items-center justify-between gap-2">
                    <span className="text-[#333333]"><AccountCircleIcon /></span>
                    <button className="text-[#666666] flex items-center justify-between gap-1 text-sm">
                        Big Tech
                        <span className="text-[#333333]"><KeyboardArrowDown /></span>
                    </button>
                </span>
            </div>

            <div className='px-3 w-full flex flex-col justify-center items-center gap-1 transition-all duration-200'>
                <div className='w-full'>
                    <p className='text-black mb-3 font-semibold'>Dashboard</p>
                </div>

                <div className="card w-full mt-8 mb-3 border-2 border-[#afb6e190] py-4 px-4 rounded-lg flex flex-col items-start gap-4">
                    <p className="text-xs text-gray-800 font-semibold uppercase">total hours</p>
                    <p className="text-xl text-gray-800 font-bold">23.7 hours</p>
                    <p className="text-xs text-gray-800 font-semibold">
                        <span className='text-green-600 font-semibold'>
                            <ShowChartOutlined fontSize='small'/> 2.5%
                        </span> from last week
                    </p>
                </div>

                <button className="text-sm font-semibold w-full border-2 border-dashed border-blue-800 text-blue-800 hover:text-white bg-transparent hover:bg-blue-800 hover:border-transparent rounded-md py-2 px-6">
                    <Add/> Add Project
                </button>
            </div>
        </div>

    </div>
  );
};

export default HomeSidebar;
