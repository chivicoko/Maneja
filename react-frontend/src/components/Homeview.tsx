import AdminNavbar from "./admin/Navbar"
import Sidebar from "./sidebars/Sidebar";

const Homeview = () => {
  return (
  <section className="relative m-0 flex bg-white">
    <Sidebar />
    <div className="w-full lg:w-4/5 min-h-screen pb-16">
      <AdminNavbar />
      <section className="px-4 md:px-8 pt-8">
        <div>Homeview</div>
      </section>
    </div>
  </section>
  )
}

export default Homeview;