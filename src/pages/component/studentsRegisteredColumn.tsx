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

export const studentsRegisteredColumn: ColumnsType<DataType> = [
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
];
