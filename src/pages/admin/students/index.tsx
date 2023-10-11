import React, { useState } from "react";
import DashboardLayout from "~/pages/component/DashboardLayout";
import PageHeader from "~/pages/component/PageHeader";
import { Card, Input } from "antd";
import { adminCapstonTab } from "~/pages/component/adminCastoneTab";
import { BiSolidAddToQueue } from "react-icons/bi";
import { adminStudentsTab } from "~/pages/component/adminStudentsTab";

const { Search } = Input;

const tabList = [
  {
    key: "tab1",
    tab: "Students Approval",
  },
  {
    key: "tab2",
    tab: "Students Registered",
  },
];

function AdminCapstone() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTabKey1, setActiveTabKey1] = useState<string>("tab1");

  const onTab1Change = (key: string) => {
    setActiveTabKey1(key);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  return (
    <DashboardLayout>
      <PageHeader showModal={showModal} />
      <div className="  mb-14 flex  justify-between ">
        <div>
          <Search
            placeholder="input search text"
            className=" rounded border border-solid border-gray-500 "
            style={{ width: 200 }}
          />
        </div>

        <div className=" bg  flex cursor-pointer items-center  justify-center  gap-3  rounded  border border-solid border-gray-500 bg-[#ece7a2]  p-2 ">
          <p className="  font-extrabold"> ADD CAPSTONE </p>
          <BiSolidAddToQueue className=" h-6 w-6" />
        </div>
      </div>{" "}
      <Card
        style={{ width: "100%" }}
        tabList={tabList}
        activeTabKey={activeTabKey1}
        onTabChange={onTab1Change}
      >
        {adminStudentsTab[activeTabKey1]}
      </Card>
    </DashboardLayout>
  );
}

export default AdminCapstone;
