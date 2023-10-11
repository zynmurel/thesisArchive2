import { Table, Input } from "antd";
import { capstoneApprovalColumn } from "./capstoneApprovalColumn";
import { BsCheckCircleFill } from "react-icons/bs";
import { capstoneManagementColumn } from "./capstoneManagementColumn";
import React, { useState } from "react";
import PageHeader from "~/pages/component/PageHeader";
import { BiSolidAddToQueue } from "react-icons/bi";
import { studentViewColumns } from "./studentViewColumns";
import { studentsRegisteredColumn } from "./studentsRegisteredColumn";
import { studentsApprovalColumn } from "./studentsApprovalColumn";

const { Search } = Input;

interface DataType {
  key: string;
  name: string;
  images: string;
  course: string;
}
const approvalStudentsData: DataType[] = [
  {
    key: "1",
    name: "John Brown",
    course: "CCIS",
    images: "/ccis-logo.png",
  },
  {
    key: "1",
    name: "John Brown",
    course: "CCIS",
    images: "/ccis-logo.png",
  },
  {
    key: "1",
    name: "John Brown",
    course: "CCIS",
    images: "/ccis-logo.png",
  },
];

const studentsRegisteredData: DataType[] = [
  {
    key: "1",
    name: "John Brown",
    course: "CCIS",
    images: "/ccis-logo.png",
  },
  {
    key: "1",
    name: "John Brown",
    course: "CCIS",
    images: "/ccis-logo.png",
  },
  {
    key: "1",
    name: "John Brown",
    course: "CCIS",
    images: "/ccis-logo.png",
  },
];

export const adminStudentsTab: Record<string, React.ReactNode> = {
  tab1: (
    <div className="  flex  w-full flex-nowrap">
      <Table
        className=" w-full"
        columns={studentsApprovalColumn}
        dataSource={approvalStudentsData}
      ></Table>
    </div>
  ),
  tab2: (
    <div className="  flex  w-full flex-nowrap">
      <Table
        className=" w-full"
        columns={studentsRegisteredColumn}
        dataSource={studentsRegisteredData}
      ></Table>
    </div>
  ),
};
