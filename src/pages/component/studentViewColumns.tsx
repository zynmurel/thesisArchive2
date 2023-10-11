import { Image, Space, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { DataType } from "../dataType/types";
import { BsDownload } from "react-icons/bs";

export const studentViewColumns: ColumnsType<DataType> = [
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Course",
    dataIndex: "course",
    key: "course",
  },
  {
    title: "adviser",
    dataIndex: "adviser",
    key: "adviser",
  },

  {
    title: "images",
    key: "image",
    render: (_, record) => (
      <Space size="middle">
        <Image src={record.images} width={50} height={50} />
      </Space>
    ),
  },

  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space
        size="middle"
        className=" flex w-fit flex-row gap-2  rounded bg-blue-300 px-4"
      >
        <BsDownload />
        <a> Dowload </a>
      </Space>
    ),
  },
];
