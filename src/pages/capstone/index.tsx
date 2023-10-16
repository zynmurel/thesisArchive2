/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useEffect } from "react";
import DashboardLayout from "../component/DashboardLayout";
import {
  Dropdown,
  Form,
  Modal,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Space,
  Table,
  Button,
  Upload,
  message,
} from "antd";
import { DownOutlined } from "@ant-design/icons";
import type { RadioChangeEvent } from "antd";
import { useState } from "react";
import ModalComponent from "../component/ModalComponent";
import { DataType } from "../dataType/types";
import { Input } from "antd";
import { BiSolidAddToQueue } from "react-icons/bi";
import { UploadOutlined } from "@ant-design/icons";
import PageHeader from "../component/PageHeader";
import { studentsViewColumn } from "../component/studentViewColumns";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "~/config/firebase";
import { v4 } from "uuid";
import App from "../sampleUpload";
const { Search } = Input;

function Capstone() {
  const [form] = Form.useForm();
  let id: any = null;
  if (typeof window !== "undefined") {
    id = localStorage.getItem("id");
  }
  const { data: studentData, refetch } = api.example.studentDetails.useQuery({
    id: id,
  });

  const { data: approvedCapstone } =
    api.capstone.ApprovedCapstoneDetails.useQuery();
  const [imageUpload, setImageUpload] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalCapstone, setModalCapstone] = useState(false);
  const router = useRouter();

  const [value, setValue] = useState(1);
  const [course, setCourse] = useState("");

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };
  const handleChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  const showCapstoneModal = () => {
    setModalCapstone(true);
  };

  const capstoneModalOk = () => {
    setModalCapstone(false);
  };

  const capstoneModalCancel = () => {
    setModalCapstone(false);
  };

  const onFinishCapstoneForm = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailedCapstoneForm = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  useEffect(() => {
    form.setFieldValue("capstoneLeader", studentData?.studentNo);
    form.setFieldValue("studentCourse", studentData?.Course?.coursename);

    if (typeof window !== "undefined" && !localStorage.getItem("username")) {
      router.push("/");
    }
  });

  // Search functionality
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (e: any) => {
    setSearchValue(e.target.value);
  };
  const { mutate } = api.capstone.notApprovedCapstone.useMutation({
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
            studentCourse: e.studentCourse,
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
  return (
    <>
      <DashboardLayout>
        <ModalComponent
          isModalOpen={isModalOpen}
          handleOk={handleOk}
          refetch={refetch}
          handleCancel={handleCancel}
          onFinish={onFinish}
          onChange={handleChange}
        />
        <Modal
          title="ADD CAPSTONE"
          open={modalCapstone}
          onOk={capstoneModalOk}
          onCancel={capstoneModalCancel}
          centered
          width={600}
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
              className="bg-gray-200"
            >
              <Input placeholder="student Leader" disabled />
            </Form.Item>

            <Form.Item
              name="studentCourse"
              rules={[
                {
                  required: true,
                  message: " Input  student Course",
                },
              ]}
              className="bg-gray-200"
            >
              <Input placeholder="student Leader" disabled />
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
              rules={[
                { required: true, message: "Please input Adviser Name  " },
              ]}
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
        ;
        <div className='   className="border " h-full  w-full border-solid  border-gray-500'>
          <PageHeader studentData={studentData} showModal={showModal} />
          <div className="  mb-14 flex  justify-between ">
            <div>
              <Search
                placeholder="input search text"
                className="rounded border border-solid border-gray-500"
                style={{ width: 200 }}
                onChange={handleSearchChange}
                value={searchValue}
              />
            </div>

            {studentData?.capstone ? (
              studentData.capstone.status === "approved" ? (
                <button
                  onClick={showCapstoneModal}
                  disabled
                  className="bg flex cursor-pointer items-center justify-center gap-3 rounded border border-solid border-gray-500 bg-[#ece7a2] p-2"
                >
                  <p className="font-extrabold">Capstone Approved</p>
                </button>
              ) : (
                <button
                  onClick={showCapstoneModal}
                  disabled
                  className="bg flex cursor-pointer items-center justify-center gap-3 rounded border border-solid border-gray-500 bg-[#ece7a2] p-2"
                >
                  <p className="font-extrabold">Added Capstone is Pending</p>
                </button>
              )
            ) : studentData?.status ? (
              <button
                onClick={showCapstoneModal}
                className="bg flex cursor-pointer items-center justify-center gap-3 rounded border border-solid border-gray-500 bg-[#ece7a2] p-2"
              >
                <p className="font-extrabold">ADD CAPSTONE</p>
                <BiSolidAddToQueue className="h-6 w-6" />
              </button>
            ) : (
              <button
                onClick={showCapstoneModal}
                disabled
                className="bg flex cursor-pointer items-center justify-center gap-3 rounded border border-solid border-gray-500 bg-gray-200 p-2"
              >
                <p className="font-extrabold">Student not Approved</p>
                <BiSolidAddToQueue className="h-6 w-6" />
              </button>
            )}
          </div>

          <Table
            columns={studentsViewColumn(studentData)}
            dataSource={approvedCapstone?.filter(
              (item: any) =>
                item.title.toLowerCase().includes(searchValue.toLowerCase()) ||
                item.date.toLowerCase().includes(searchValue.toLowerCase()) ||
                item.adviser.toLowerCase().includes(searchValue.toLowerCase()),
            )}
          />
        </div>
      </DashboardLayout>
    </>
  );
}

export default Capstone;
