/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Button, Image, Space, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { DataType } from "../dataType/types";
import { BsDownload } from "react-icons/bs";

export const studentViewColumns: ColumnsType<any> = [
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
    dataIndex: "Students",
    key: "course",
    render: (_) => {
      console.log(_);
      return (
        <Space size="middle">
          <span>{_?.[0]?.Course?.coursename}</span>
        </Space>
      );
    },
  },
  {
    title: "adviser",
    dataIndex: "adviser",
    key: "adviser",
  },

  {
    title: "images",
    key: "image",
    render: (_) => {
      console.log(_);
      return (
        <Space size="middle">
          <Image
            src={_.Students?.[0]?.image}
            alt="sgerf"
            width={50}
            height={50}
          />
        </Space>
      );
    },
  },

  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Button
        href={_.url}
        size="middle"
        className=" flex w-fit flex-row gap-2  rounded bg-blue-300 px-4"
      >
        <BsDownload />
        <a> Dowload </a>
      </Button>
    ),
  },
];
