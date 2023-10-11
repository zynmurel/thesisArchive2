import React, { useEffect } from "react";
import DashboardLayout from "../component/DashboardLayout";
import {
  Dropdown,
  Form,
  Modal,
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
import { studentViewColumns } from "../component/studentViewColumns";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
const { Search } = Input;

const data: DataType[] = [
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



function Capstone() {
  let id:any = null
  if (typeof window !== 'undefined') {
    id = localStorage.getItem("id")  
  }
  const {data:studentData} =  api.example.studentDetails.useQuery({id:id})
  console.log(studentData);
  

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalCapstone, setModalCapstone] = useState(false);
  const router = useRouter()

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

  const courseChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setCourse(e.target.value);
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
  const uploadProps = {
    action: "https://www.example.com/upload", // Specify the URL where you want to handle file upload
    accept: ".pdf,.doc,.docx", // Allow only PDF and Word files
    onChange(info: any) {
      // Define the type for the 'info' parameter
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
  useEffect(()=>{
    console.log("useE")
    if (!localStorage.getItem("username")
    
  ){  
    router.push("/")
    console.log("some")
  } 
    


  })


  

  return (
    <>
      <DashboardLayout>
        <ModalComponent
          isModalOpen={isModalOpen}
          handleOk={handleOk}
          handleCancel={handleCancel}
          onFinish={onFinish}
          onChange={handleChange}
          courseChange={courseChange}
        />
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
            onFinish={onFinishCapstoneForm}
            onFinishFailed={onFinishFailedCapstoneForm}
            autoComplete="off"
          >
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
              name="adviser"
              rules={[
                { required: true, message: "Please input Adviser Name  " },
              ]}
            >
              <Input placeholder="Your Capstone Adviser" />
            </Form.Item>

            <Form.Item
              name="uploadFiles"
              rules={[
                { required: true, message: "Please Upload Your Files  " },
              ]}
            >
              <Upload {...uploadProps}>
                <Button icon={<UploadOutlined />}>
                  Upload PDF or Word Files
                </Button>
              </Upload>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button
                className=" flex items-end bg-orange-400"
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
              <p className="  font-extrabold"> ADD CAPSTONE </p>
              <BiSolidAddToQueue className=" h-6 w-6" />
            </div>
          </div>

          <Table columns={studentViewColumns} dataSource={data} />
        </div>
      </DashboardLayout>
    </>
  );
}

export default Capstone;
