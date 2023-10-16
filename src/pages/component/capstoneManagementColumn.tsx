import { Button, Image, Space, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { DataType } from "../dataType/types";
import { BsDownload } from "react-icons/bs";
import { BsCheckCircleFill } from "react-icons/bs";

export const capstoneManagementColumn: ColumnsType<any> = [
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
    render: (text) => <a>{text}</a>,
  },

  {
    title: "Course",
    dataIndex: "studentCourse",
    key: "course",
    render: (text) => <a>{text}</a>,
  },

  {
    title: "adviser",
    dataIndex: "adviser",
    key: "adviser",
  },

  {
    title: " Published date",
    dataIndex: "date",
    key: "date",
  },

  {
    title: <></>,
    key: "action",
    width: "25%",
    render: (_, record) => (
      <div className=" flex  items-start justify-end gap-4">
        <Button
          href={_.url}
          size="middle"
          className=" flex w-fit flex-row gap-2  rounded bg-blue-300 px-4"
        >
          <BsDownload />
          <a> Dowload </a>
        </Button>
      </div>
    ),
  },
];
