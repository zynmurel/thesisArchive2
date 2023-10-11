/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import {
  Modal,
  Form,
  Radio,
  Select,
  Image,
  Upload,
  Button,
  message,
} from "antd";
import { RadioChangeEvent } from "antd/lib/radio/interface";
import { api } from "~/utils/api";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import { UploadOutlined } from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";
import type { UploadChangeParam } from "antd/es/upload";

const ModalComponent = ({
  isModalOpen,
  handleOk,
  handleCancel,
  onFinish,
  courseChange,
  handleChange,
}: any) => {
  let id: any = null;

  if (typeof window !== "undefined") {
    id = localStorage.getItem("id");
  }

  const [form] = Form.useForm();
  const { data: studentData } = api.example.studentDetails.useQuery({ id: id });
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setImageUrl(studentData?.image || "");
  }, [studentData]);

  console.log(imageUrl);

  const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };

  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: studentData?.image || "",
    },
  ]);
  const handleChanges: UploadProps["onChange"] = (
    info: UploadChangeParam<UploadFile>,
  ) => {
    console.log(info.file.status);
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
    <Modal
      centered
      title="EDIT PROFILE"
      open={isModalOpen}
      onOk={handleOk}
      className=" p-5   "
      bodyStyle={{ height: "500px" }}
      width={1000}
      onCancel={handleCancel}
    >
      <div className=" flex   h-full  w-full  flex-row p-5  ">
        <div className=" flex h-full flex-1  flex-col items-center justify-center ">
          <Upload
            maxCount={1}
            className=" flex flex-row  bg-orange-200 "
            beforeUpload={(file) => {
              const isPNG = file.type === "image/png";

              if (!isPNG) {
                message.error(`${file.name} is not a png file`);
              }
              return isPNG || Upload.LIST_IGNORE;
            }}
            onChange={handleChanges}
          >
            <Button icon={<UploadOutlined />}>Upload png only</Button>
          </Upload>
          <Image src={imageUrl} width={380} height={265} className="pt-2 " />
        </div>
        <div className="  flex  h-full flex-1 flex-col p-3 ">
          <Form
            name="normal_login"
            className="login-form"
            onFinish={onFinish}
            form={form}
          >
            <div className=" flex flex-row gap-2">
              <Form.Item
                name="firstname"
                rules={[
                  { required: true, message: "Please input your First Name!" },
                ]}
                className=" items-center"
              >
                <input
                  className=" flex h-8  w-full border border-solid border-gray-500 bg-white text-center"
                  placeholder={studentData?.firstname}
                />
              </Form.Item>
              <Form.Item
                name="lastname"
                rules={[
                  { required: true, message: "Please input your Lastname!" },
                ]}
                className=" items-center"
              >
                <input
                  className=" flex h-8  w-full border border-solid border-gray-500 bg-white text-center"
                  placeholder={studentData?.lastname}
                />
              </Form.Item>
            </div>
            <div className=" flex flex-row gap-2">
              <Form.Item
                name="username"
                rules={[
                  { required: true, message: "Please input your Username!" },
                ]}
                className=" items-center"
              >
                <input
                  className=" flex h-8  w-full border border-solid border-gray-500 bg-white text-center"
                  placeholder={studentData?.username}
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your Password!" },
                ]}
                className=" items-center"
              >
                <input
                  className=" flex h-8  w-full border border-solid border-gray-500 bg-white text-center"
                  placeholder={studentData?.password}
                />
              </Form.Item>
            </div>
            <Form.Item
              name="address"
              rules={[
                { required: true, message: "Please input your Full Address!" },
              ]}
              className=" items-center"
            >
              <input
                className=" flex h-8  w-full border border-solid border-gray-500 bg-white text-center"
                placeholder={studentData?.address}
              />
            </Form.Item>

            <div className=" flex flex-row gap-2">
              <Form.Item
                name="gender"
                rules={[
                  { required: true, message: "Please input your Password!" },
                ]}
                className=" w-1/2  items-center"
              >
                <Select
                  className=" flex h-8  text-center    "
                  defaultValue={studentData?.gender}
                  onChange={handleChange}
                  options={[
                    {
                      options: [
                        { label: "Male", value: "male" },
                        { label: "Female", value: "female" },
                      ],
                    },
                  ]}
                />
              </Form.Item>

              <Form.Item
                name="studentId"
                rules={[
                  { required: true, message: "Please input your Student-ID!" },
                ]}
                className=" min-w-1/2 items-center"
              >
                <input
                  className=" flex h-8  border  border-solid border-gray-500 bg-white text-center"
                  placeholder={studentData?.studentNo}
                />
              </Form.Item>
            </div>
            <Form.Item
              name="course"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
              className=" items-center"
            >
              <Select
                className=" flex h-8  min-w-full pl-4  text-center"
                defaultValue={studentData?.Course?.coursename}
                style={{ width: 200 }}
                onChange={courseChange}
                options={[
                  {
                    label: "List Of Course",
                    options: [
                      {
                        label: "Bachelor Science in Information Technology",
                        value: "BSIT",
                      },
                      {
                        label: "Bachelor Science in Computer  Science",
                        value: "BSCS",
                      },
                      {
                        label: "Bachelor Science in Information  System",
                        value: "BSIS",
                      },
                      {
                        label:
                          "Bachelor of Science in Entertainment and Multimedia Computing",
                        value: "BSEM",
                      },
                    ],
                  },
                ]}
              />
            </Form.Item>
          </Form>
        </div>
      </div>
    </Modal>
  );
};

export default ModalComponent;
