import React, { ReactNode } from "react";
import { Layout, Menu } from "antd";
import { useRouter } from "next/router";
import Link from "next/link";

const { Header, Sider, Content } = Layout;

interface DashboardLayoutProps {
  children: ReactNode; // Define the type of 'children' prop
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const router = useRouter();

  const path = router.pathname;

  const changeRoute = (route: any) => {
    router.push(route);
  };

  let id: any = null;
  if (typeof window !== "undefined") {
    id = localStorage.getItem("username");
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider className="flex   min-h-screen  border-r-2 border-solid  shadow-lg">
        <div
          style={{ width: "200px" }}
          className="flex min-h-screen    flex-col bg-[#fff9b5] p-5 pt-0"
        >
          <div className=" mt-3 flex items-center   gap-1">
            {" "}
            <img className="  my-4 h-14  w-16 " src="/ccis-logo.png " />{" "}
            <h1 className="      gray-red-600 text-3xl"> CCIS</h1>
          </div>
          <div className=" mt-10 flex  flex-col gap-2  ">
            <div
              onClick={() => changeRoute("/capstone")}
              className={` ${id == "admin" ? "hidden" : ""} ${
                path === "/capstone" ? " bg-[#ffee36] " : " bg-[#fff9b5] "
              }  rounded p-1       text-xl      font-bold  hover:brightness-90     `}
            >
              {" "}
              Capstone List{" "}
            </div>
            {/* <div  onClick={()=>changeRoute("/thesisList")} className={`${path === "/thesisList"?  ' bg-[#ffee36] ':" bg-[#fff9b5] "}  font-bold text-xl       p-1      hover:brightness-90  rounded     `} >Thesis List</div> */}
            <div
              onClick={() => changeRoute("/accountSettings")}
              className={` ${id == "admin" ? "hidden" : ""} ${
                path === "/accountSettings"
                  ? " bg-[#ffee36] "
                  : " bg-[#fff9b5] "
              }  rounded p-1       text-xl      font-bold  hover:brightness-90     `}
            >
              Account Setting
            </div>{" "}
            <div
              onClick={() => changeRoute("/admin/capstone")}
              className={` ${id !== "admin" ? "hidden" : ""}  ${
                path === "/admin/capstone" ? " bg-[#ffee36] " : " bg-[#fff9b5] "
              }  rounded p-1       text-xl      font-bold  hover:brightness-90     `}
            >
              Capstone
            </div>{" "}
            <div
              onClick={() => changeRoute("/admin/students")}
              className={` ${id !== "admin" ? "hidden" : ""} ${
                path === "/admin/students" ? "bg-[#ffee36]" : "bg-[#fff9b5]"
              } rounded p-1 text-xl font-bold hover:brightness-90`}
            >
              Students
            </div>
          </div>
        </div>
      </Sider>
      <Layout>
        <Header className="  h-18  flex  min-w-full  items-center justify-center bg-[#fff9b5] p-3">
          <h1 className="  mt-4 font-mono   text-xl  font-bold text-gray-500 ">
            {" "}
            THESIS MANAGEMENT SYSTEM
          </h1>
        </Header>
        <Content className=" my-8   mr-8 p-4  ">{children}</Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
