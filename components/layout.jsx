import Sidebar from "./Sidebar";
import Creategestbtn from "./creategestbtn";
import Header from "./header";
import Mobilenav from "./mobilenav";

export default function Layout({ children }) {
  return (
    <section className=" h-screen w-full flex">
      <Mobilenav />
      <Creategestbtn />
      <aside
        className={` w-[22%] hidden lg:flex fixed
        flex-col h-screen bg-[#0B1B36] text-white overflow-y-auto`}
      >
        <Sidebar />
      </aside>
      <div
        className={` right-0 flex-col flex-1  bg-slate-300 w-screen  overflow-y-scroll lg:ml-[22%]
        `}
      >
        <Header />
        {children}
      </div>
    </section>
  );
}
