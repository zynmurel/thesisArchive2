import { Image, Space, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { BsDownload } from "react-icons/bs";
import { BsCheckCircleFill } from "react-icons/bs";

interface DataType {
  key: string;
  name: string;
  images: string;
  course: string;
}

export const studentsApprovalColumn: ColumnsType<DataType> = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Course",
    dataIndex: "course",
    key: "course",
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
    title: <></>,
    key: "action",
    render: (_, record) => (
      <div className=" flex  items-start justify-end gap-4">
        <Space
          size="middle"
          className=" mr-24 flex w-fit cursor-pointer  gap-2 rounded bg-blue-600 px-4 py-1"
        >
          <BsCheckCircleFill className="  text-white" />
          <p className=" text-white"> APPROVE STUDENT </p>
        </Space>
      </div>
    ),
  },
];
