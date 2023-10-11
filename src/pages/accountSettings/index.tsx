import { Button, Checkbox, Form, Input } from "antd";
import Head from "next/head";
import Link from "next/link";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import DashboardLayout from "../component/DashboardLayout";
import PageHeader from "../component/PageHeader";
import ModalComponent from "../component/ModalComponent";
import { useState } from "react";
import type { RadioChangeEvent } from "antd";

export default function Home() {
  const router = useRouter();
  const hello = api.example.hello.useQuery({ text: "from tRPC" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [course, setCourse] = useState("");
  const [value, setValue] = useState(1);

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };

  const courseChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setCourse(e.target.value);
  };
  const handleChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  const showModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <DashboardLayout>
        <div className=" flex h-screen w-full flex-col items-center    bg-green-50  ">
          <ModalComponent
            isModalOpen={isModalOpen}
            handleOk={handleOk}
            handleCancel={handleCancel}
            onFinish={onFinish}
            onChange={handleChange}
            courseChange={courseChange}
            showModal={showModal}
          />

          <PageHeader showModal={showModal}></PageHeader>

          <div className="  mt-48 rounded border-2  border-zinc-100 bg-[#fff9b5] p-14  shadow-2xl shadow-orange-500 ">
            <div className=" flex  h-full w-full  flex-col items-center pt-10 ">
              <div className=" flex flex-col items-center justify-center">
                <p className="pb-8   font-bold"> CHANGE PASSWORD</p>

                <Form
                  name="normal_login"
                  className="login-form"
                  initialValues={{ remember: true }}
                  onFinish={onFinish}
                >
                  <Form.Item
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Username!",
                      },
                    ]}
                    className=" items-center"
                  >
                    <input
                      className=" flex h-8  w-full border-2   border-gray-400 text-center"
                      placeholder="Username"
                    />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Password!",
                      },
                    ]}
                  >
                    <input
                      className=" flex   h-8 w-72 border-2     border-gray-400 text-center"
                      type="password"
                      placeholder="Password"
                    />
                  </Form.Item>

                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Password!",
                      },
                    ]}
                  >
                    <input
                      className=" flex   h-8 w-72 border-2     border-gray-400 text-center"
                      type="password"
                      placeholder=" Confirm Password"
                    />
                  </Form.Item>

                  <Form.Item className="  ">
                    <div className=" flex  justify-center gap-5">
                      <button className="      rounded bg-yellow-200 p-4 py-1   font-bold  text-black">
                        {" "}
                        Submit Changes{" "}
                      </button>
                    </div>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
}
