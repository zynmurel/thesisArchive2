import { Table, Input } from "antd";
import { capstoneApprovalColumn } from "./capstoneApprovalColumn";
import { DataType } from "../dataType/types";
import { BsCheckCircleFill } from "react-icons/bs";
import { capstoneManagementColumn } from "./capstoneManagementColumn";
import React, { useState } from "react";
import PageHeader from "~/pages/component/PageHeader";
import { BiSolidAddToQueue } from "react-icons/bi";

const { Search } = Input;

const approvalCapstoneData: DataType[] = [
  {
    key: "1",
    title: "John Brown",
    date: "3/23/2018",
    adviser: "Ervin rodriguez",
    course: "CCIS",
    images: "/ccis-logo.png",
  },
  {
    key: "1",
    title: "John Brown",
    date: "3/23/2018",
    adviser: "Ervin rodriguez",
    course: "CCIS",
    images: "/ccis-logo.png",
  },
  {
    key: "1",
    title: "John Brown",
    date: "3/23/2018",
    adviser: "Ervin rodriguez",
    course: "CCIS",
    images: "/ccis-logo.png",
  },
];

const managementCapstoneData: DataType[] = [
  {
    key: "1",
    title: "John Brown",
    date: "3/23/2018",
    adviser: "Ervin rodriguez",
    course: "CCIS",
    images: "/ccis-logo.png",
  },
  {
    key: "1",
    title: "John Brown",
    date: "3/23/2018",
    adviser: "Ervin rodriguez",
    course: "CCIS",
    images: "/ccis-logo.png",
  },
  {
    key: "1",
    title: "John Brown",
    date: "3/23/2018",
    adviser: "Ervin rodriguez",
    course: "CCIS",
    images: "/ccis-logo.png",
  },
];

export const adminCapstonTab: Record<string, React.ReactNode> = {
  tab1: (
    <div className="  flex  w-full flex-nowrap">
      <Table
        className=" w-full"
        columns={capstoneApprovalColumn}
        dataSource={approvalCapstoneData}
      ></Table>
    </div>
  ),
  tab2: (
    <div className="  flex  w-full flex-nowrap">
      <Table
        className=" w-full"
        columns={capstoneManagementColumn}
        dataSource={managementCapstoneData}
      ></Table>
    </div>
  ),
};
