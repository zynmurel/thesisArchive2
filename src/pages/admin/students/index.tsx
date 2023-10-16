/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import React, { useState } from "react";
import DashboardLayout from "~/pages/component/DashboardLayout";
import PageHeader from "~/pages/component/PageHeader";
import {
  Button,
  Card,
  Input,
  Modal,
  Table,
  Form,
  Radio,
  Select,
  Upload,
  message,
} from "antd";
import { BiSolidAddToQueue } from "react-icons/bi";
import { studentsApprovalColumn } from "~/pages/component/studentsApprovalColumn";
import { studentsRegisteredColumn } from "~/pages/component/studentsRegisteredColumn";
import { UploadOutlined } from "@ant-design/icons";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import type { MenuProps, RadioChangeEvent } from "antd";
import type { UploadChangeParam } from "antd/es/upload";

import { api } from "~/utils/api";
import { useRouter } from "next/navigation";
import PageHeaderAdmin from "~/pages/component/pageHeaderAdmin";

const { Search } = Input;

const tabList = [
  {
    key: "tab1",
    tab: "Students Approval",
  },
  {
    key: "tab2",
    tab: "Students Registered",
  },
];

interface DataType {
  key: string;
  name: string;
  images: string;
  course: string;
}

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

function AdminCapstone() {
  const [value, setValue] = useState(1);
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [registerStudentModal, setRegisterStudentModal] = useState<any>(false);
  const [studentsData, setStudentsData] = useState<string>();
  const [activeTabKey1, setActiveTabKey1] = useState<string>("tab1");
  const { data: notApproved, refetch } =
    api.example.notApprovedStudents.useQuery();
  const { data: approved, refetch: refetchApproved } =
    api.example.approvedStudents.useQuery();
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>("");
  const { data: courseData } = api.example.courseData.useQuery();

  const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };

  const { mutate } = api.example.verifyStudents.useMutation({
    onSuccess: () => {
      return refetch(), refetchApproved();
    },
  });
  const { mutate: mutateStudent } = api.example.signupStudentAdmin.useMutation({
    onSuccess: () => {
      form.resetFields();
      return refetch(), refetchApproved();
    },
  });

  const onChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const openStudentsRegistrationModal = () => {
    setRegisterStudentModal(true);
  };

  const handleSearchChange = (e: any) => {
    setSearchValue(e.target.value);
  };
  const adminStudentsTab: Record<string, React.ReactNode> = {
    tab1: (
      <div className="  flex  w-full flex-nowrap">
        <Table
          className=" w-full"
          columns={studentsApprovalColumn(setOpenModal, setStudentsData)}
          dataSource={notApproved?.filter(
            (item) =>
              item.firstname
                .toLowerCase()
                .includes(searchValue.toLowerCase()) ||
              item.Course?.coursename
                .toLowerCase()
                .includes(searchValue.toLowerCase()) ||
              item.studentNo.toLowerCase().includes(searchValue.toLowerCase()),
          )}
        ></Table>
      </div>
    ),
    tab2: (
      <div className="  flex  w-full flex-nowrap">
        <Table
          className=" w-full"
          columns={studentsRegisteredColumn}
          dataSource={approved?.filter(
            (item) =>
              item.firstname
                .toLowerCase()
                .includes(searchValue.toLowerCase()) ||
              item.Course?.coursename
                .toLowerCase()
                .includes(searchValue.toLowerCase()) ||
              item.studentNo.toLowerCase().includes(searchValue.toLowerCase()),
          )}
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

  const addStudent = (values: any) => {
    mutateStudent({
      firstName: values.firstName,
      lastName: values.lastName,
      username: values.username,
      password: values.password,
      gender: values.gender,
      studentNo: values.studentNo,
      image: imageUrl,
      address: values.address,
      course: values.course,
    });

    setRegisterStudentModal(false);
  };

  const handleOk = (values: any) => {
    mutate({
      id: studentsData ?? "",
    });

    setOpenModal(false);
  };

  const handleChanges: UploadProps["onChange"] = (
    info: UploadChangeParam<UploadFile>,
  ) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  return (
    <DashboardLayout>
      <Modal
        open={openModal}
        onCancel={() => {
          setOpenModal(false);
          setStudentsData(undefined);
        }}
        footer={[
          <Button key="cancel" onClick={() => setOpenModal(false)}>
            Cancel
          </Button>,
          <Button
            htmlType="submit"
            key="ok"
            type="primary"
            className="  bg-blue-400"
            onClick={handleOk}
          >
            OK
          </Button>,
        ]}
      >
        {" "}
        <p> Are you sure want to register this account</p>
      </Modal>
      <Modal
        width={800}
        open={registerStudentModal}
        title=" STUDENT'S REGISTRATION "
        onCancel={() => {
          setRegisterStudentModal(false);
          form.resetFields();
        }}
        footer={[]}
      >
        <div className=" flex flex-col items-center justify-center">
          <Form form={form} onFinish={addStudent} className="pt-24">
            <div className=" flex flex-row gap-2">
              <Form.Item
                name="firstName"
                rules={[
                  {
                    required: true,
                    message: "Please input First Name!",
                  },
                ]}
                className=" w-full  items-center"
              >
                <input
                  className=" flex h-8  w-full text-center"
                  placeholder="Firstname"
                />
              </Form.Item>
              <Form.Item
                name="lastName"
                rules={[
                  {
                    required: true,
                    message: "Please input Lastname!",
                  },
                ]}
                className=" w-full  items-center"
              >
                <input
                  className=" flex h-8  w-full  text-center"
                  placeholder="Input Lastname"
                />
              </Form.Item>
            </div>
            <div className=" flex flex-row gap-2">
              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input Username!",
                  },
                ]}
                className=" w-full  items-center"
              >
                <input
                  className=" flex h-8  w-full  text-center"
                  placeholder="Username"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input Password!",
                  },
                ]}
                className=" w-full  items-center"
              >
                <input
                  className=" flex h-8    w-full  text-center  text-black"
                  placeholder="Input Password"
                  type="password"
                />
              </Form.Item>
            </div>
            <Form.Item
              name="address"
              rules={[
                {
                  required: true,
                  message: "Please input Full Address!",
                },
              ]}
              className=" items-center"
            >
              <input
                className=" flex h-8  w-full  text-center text-black"
                placeholder="Please Input Full Address"
              />
            </Form.Item>
            <div className=" flex flex-row gap-2">
              <Form.Item
                name="gender"
                rules={[{ required: true, message: "Choose Gender!" }]}
                className=" w-full  items-center"
              >
                <Radio.Group onChange={onChange} value={value}>
                  <Radio value={"Male"}>Male</Radio>
                  <Radio value={"Female"}>Female</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                name="studentNo"
                rules={[
                  {
                    required: true,
                    message: "Please input Student-ID!",
                  },
                ]}
                className=" w-full  items-center"
              >
                <input
                  className=" flex h-8  w-full text-center"
                  placeholder=" Student Number"
                />
              </Form.Item>
            </div>
            <Form.Item
              name="course"
              rules={[{ required: true, message: "Please Choose Course" }]}
              className=" items-center"
            >
              {courseData && (
                <Select
                  className="flex h-8 min-w-full text-center"
                  defaultValue="Choose Your Course"
                  style={{ width: 200 }}
                  onChange={handleChange}
                  options={[
                    {
                      label: "List Of Course",
                      options: courseData.map((data) => ({
                        label: data.coursename,
                        value: data.id,
                      })),
                    },
                  ]}
                />
              )}
            </Form.Item>
            <Form.Item
              name="image"
              rules={[{ required: true, message: "Please input Photo" }]}
              className=" w-full  items-center justify-center"
            >
              <Upload
                className=" flex w-fit   flex-row  bg-orange-200 "
                beforeUpload={(file) => {
                  const isImage =
                    file.type === "image/png" ||
                    file.type === "image/jpeg" ||
                    file.type === "image/jpg" ||
                    file.type === "image/jfif";
                  if (!isImage) {
                    message.error(
                      `${file.name} is not a valid image file (png, jpeg, jpg, or jfif)`,
                    );
                  }
                  return isImage ? true : Upload.LIST_IGNORE;
                }}
                maxCount={1}
                onChange={handleChanges}
              >
                <Button icon={<UploadOutlined />}>Upload png only</Button>
              </Upload>
            </Form.Item>
            <div className="  flex justify-center">
              <Button
                key="ok"
                className=" w-3/4  bg-orange-600"
                htmlType="submit"
              >
                Register Student
              </Button>
            </div>
            ,
            <div
              className=" flex flex-col gap-0  "
              style={{ marginTop: -15 }}
            ></div>
          </Form>
        </div>{" "}
      </Modal>
      <PageHeaderAdmin />
      <div className="  mb-14 flex  justify-between ">
        <div>
          <Search
            placeholder="input search text"
            className=" rounded border border-solid border-gray-500 "
            style={{ width: 200 }}
            onChange={handleSearchChange}
            value={searchValue}
          />
        </div>

        <div
          className=" bg  flex cursor-pointer items-center  justify-center  gap-3  rounded  border border-solid border-gray-500 bg-[#ece7a2]  p-2 "
          onClick={openStudentsRegistrationModal}
        >
          <p className="  font-extrabold"> ADD STUDENT </p>
          <BiSolidAddToQueue className=" h-6 w-6" />
        </div>
      </div>{" "}
      <Card
        style={{ width: "100%" }}
        tabList={tabList}
        activeTabKey={activeTabKey1}
        onTabChange={onTab1Change}
      >
        {adminStudentsTab[activeTabKey1]}
      </Card>
    </DashboardLayout>
  );
}

export default AdminCapstone;
