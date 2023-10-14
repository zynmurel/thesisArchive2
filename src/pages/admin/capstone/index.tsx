/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useEffect, useState } from "react";
import DashboardLayout from "~/pages/component/DashboardLayout";
import PageHeader from "~/pages/component/PageHeader";
import { Card, Input, Table, Modal, Form, Button, Upload, message } from "antd";
import { BiSolidAddToQueue } from "react-icons/bi";
import { useRouter } from "next/router";
import { DataType } from "~/pages/dataType/types";
import { capstoneApprovalColumn } from "~/pages/component/capstoneApprovalColumn";
import { capstoneManagementColumn } from "~/pages/component/capstoneManagementColumn";
import { UploadOutlined } from "@ant-design/icons";

import { api } from "~/utils/api";
import App from "~/pages/sampleUpload";
import { storage } from "~/config/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

const { Search } = Input;

const tabList = [
  {
    key: "tab1",
    tab: "Capstone Approval",
  },
  {
    key: "tab2",
    tab: "Capstone Management",
  },
];

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

function AdminCapstone() {
  const [form] = Form.useForm();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTabKey1, setActiveTabKey1] = useState<string>("tab1");
  const { data } = api.example.notApprovedStudents.useQuery();
  const [modalCapstone, setModalCapstone] = useState(false);
  const [imageUpload, setImageUpload] = useState<any>(null);

  const adminCapstonTab: Record<string, React.ReactNode> = {
    tab1: (
      <div className="  flex  w-full flex-nowrap">
        <Table className=" w-full" dataSource={data}></Table>
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

  const onTab1Change = (key: string) => {
    setActiveTabKey1(key);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const capstoneModalOk = () => {
    setModalCapstone(false);
  };
  const capstoneModalCancel = () => {
    setModalCapstone(false);
  };
  const { mutate } = api.capstone.createCapstone.useMutation({
    onSuccess: (data) => {
      console.log(data);
      if (!data) {
        form.setFields([
          {
            name: "capstoneLeader",
            errors: ["Student Id not Found"],
          },
        ]);
      } else {
        form.resetFields();
        setModalCapstone(false);
      }
    },
  });
  const uploadImage = (e: any) => {
    if (!imageUpload) {
      form.setFields([
        {
          name: "capstoneFile",
          errors: ["Capstone File Required"],
        },
      ]);
    } else {
      const imageRef = ref(storage, `files/${imageUpload.name + v4()}`);
      uploadBytes(imageRef, imageUpload).then((data: any) => {
        getDownloadURL(data.ref).then((d) => {
          mutate({
            title: e.title,
            abstract: e.abstract,
            topic: e.topic,
            adviser: e.adviser,
            url: d,
            studentMembers: e.studentMembers,
            studentNo: e.capstoneLeader,
          });
        });
      });
    }
  };
  const onFinishCapstoneForm = (values: any) => {
    if (!imageUpload) {
      form.setFields([
        {
          name: "capstoneFile",
          errors: ["Capstone File Required"],
        },
      ]);
    }
  };

  const onFinishFailedCapstoneForm = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  const showCapstoneModal = () => {
    setModalCapstone(true);
  };

  const uploadProps = {
    action: "https://www.example.com/upload",
    accept: ".pdf,.doc,.docx",
    onChange(info: any) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  useEffect(() => {
    if (!localStorage.getItem("username")) {
      router.push("/admin/login");
    }
  });

  return (
    <DashboardLayout>
      <Modal
        title="ADD CAPSTONE"
        open={modalCapstone}
        onOk={capstoneModalOk}
        onCancel={capstoneModalCancel}
        centered
        width={400}
        footer={[]}
      >
        <Form
          name="basic"
          onFinish={uploadImage}
          onFinishFailed={onFinishFailedCapstoneForm}
          autoComplete="off"
          form={form}
        >
          <Form.Item
            name="capstoneLeader"
            rules={[
              {
                required: true,
                message: " Input  student leader",
              },
            ]}
          >
            <Input placeholder="student Leader" />
          </Form.Item>

          <Form.Item
            name="studentMembers"
            rules={[
              {
                required: true,
                message: " Input  student  members",
              },
            ]}
          >
            <Input placeholder="student Members" />
          </Form.Item>

          <Form.Item
            name="title"
            rules={[
              {
                required: true,
                message: "Please input your Capstone title",
              },
            ]}
          >
            <Input placeholder="Capstone Title" />
          </Form.Item>

          <Form.Item
            name="topic"
            rules={[{ required: true, message: "Please input Topic Name  " }]}
          >
            <Input placeholder="Your Capstone  Topic" />
          </Form.Item>

          <Form.Item
            name="abstract"
            rules={[{ required: true, message: "Please input Abstract  " }]}
          >
            <Input placeholder="Input Abstract" />
          </Form.Item>

          <Form.Item
            name="adviser"
            rules={[{ required: true, message: "Please input Adviser Name  " }]}
          >
            <Input placeholder=" Abstract" />
          </Form.Item>
          <App
            imageUpload={imageUpload}
            setImageUpload={setImageUpload}
            form={form}
          />
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button
              className="flex items-end bg-orange-400"
              type="primary"
              htmlType="submit"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <PageHeader showModal={showModal} />
      <div className="  mb-14 flex  justify-between ">
        <div>
          <Search
            placeholder="input search text"
            className=" rounded border border-solid border-gray-500 "
            style={{ width: 200 }}
          />
        </div>

        <div
          onClick={showCapstoneModal}
          className=" bg  flex cursor-pointer items-center  justify-center  gap-3  rounded  border border-solid border-gray-500 bg-[#ece7a2]  p-2 "
        >
          <p className="font-extrabold"> ADD CAPSTONE</p>
          <BiSolidAddToQueue className=" h-6 w-6" />
        </div>
      </div>{" "}
      <Card
        style={{ width: "100%" }}
        tabList={tabList}
        activeTabKey={activeTabKey1}
        onTabChange={onTab1Change}
      >
        {adminCapstonTab[activeTabKey1]}
      </Card>
    </DashboardLayout>
  );
}

export default AdminCapstone;
