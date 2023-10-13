/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable jsx-a11y/alt-text */
import { Image, Space, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { BsDownload } from "react-icons/bs";
import { BsCheckCircleFill } from "react-icons/bs";
import { RouterOutputs } from "~/utils/api";

interface DataType {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
  gender: string;
  studentNo: string;
  image: string;
  address: string;
}

export const studentsRegisteredColumn: ColumnsType<any> = [
  {
    title: "firstname",
    dataIndex: "firstname",
    key: "firstname",
  },

  {
    title: "course",
    key: "course",
    render: (_, record) => {
      console.log("RECORD", record);

      return (
        <Space size="middle">
          <p> {_.Course?.coursename} </p>
        </Space>
      );
    },
  },

  {
    title: "images",
    key: "image",
    render: (_) => (
      <Space size="middle">
        <Image src={_.image} width={50} height={50} />
      </Space>
    ),
  },
];
