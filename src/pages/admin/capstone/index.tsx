/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useEffect, useState ,useRef} from "react";
import DashboardLayout from "~/pages/component/DashboardLayout";
import PageHeader from "~/pages/component/PageHeader";
import {
  Card,
  Input,
  Table,
  Modal,
  Form,
  Button,
  Upload,
  message,
  DatePicker,
  Select,
} from "antd";
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
import dayjs from "dayjs";
import PageHeaderAdmin from "~/pages/component/pageHeaderAdmin";
import { useReactToPrint } from "react-to-print";


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

function AdminCapstone() {


  const [totalCapstone, setTotalCapstone] = useState(0);

 
  const [form] = Form.useForm();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [capstoneData, setCapstoneData] = useState<string>();
  const [pickerDate, setPickerDate] = useState<any>("");
  const [searchValue, setSearchValue] = useState("");
  const componentRef =  useRef<HTMLDivElement>(null); // Specify the type of the ref

  const { data: courseData } = api.example.courseData.useQuery();

  const [approvalModal, setApproveModal] = useState(false);

  const [activeTabKey1, setActiveTabKey1] = useState<string>("tab1");
  const { data, refetch } = api.capstone.notApprovedCapstoneDetails.useQuery();

  const { data: approveData, refetch: refetchApprovedCapstone } =
    api.capstone.ApprovedCapstoneDetails.useQuery();
  const { mutate: mutateApprovalCapstone } =
    api.capstone.approveCapstone.useMutation({
      onSuccess: () => {
        refetch();
        refetchApprovedCapstone();
      },
    });

  const [modalCapstone, setModalCapstone] = useState(false);
  const [imageUpload, setImageUpload] = useState<any>(null);
  useEffect(() => {
    // Update the totalCapstone count when the capstone data or searchValue changes
    if (approveData) {
      const filteredCapstones = approveData.filter((item: any) => {
        return (
          item.title.toLowerCase().includes(searchValue.toLowerCase()) ||
          item.date.toLowerCase().includes(searchValue.toLowerCase()) ||
          item.adviser.toLowerCase().includes(searchValue.toLowerCase()) ||
          item?.Students?.[0]?.Course?.coursename
            .toLowerCase()
            .includes(searchValue.toLowerCase())
        );
      });
      setTotalCapstone(filteredCapstones.length);
    }
  }, [approveData, searchValue]);
  
  const handlePrint = useReactToPrint({
    content: () =>  componentRef.current,
  });

  const adminCapstonTab: Record<string, React.ReactNode> = {
    tab1: (

      
      <div className="  flex  w-full flex-nowrap">

        
        
     
        <Table
          className=" w-full"
          columns={capstoneApprovalColumn(setApproveModal, setCapstoneData)}
          dataSource={data?.filter((item: any) => {
            console.log(item?.Students?.[0]?.Course?.coursename.toLowerCase());
            return (
              item.title.toLowerCase().includes(searchValue.toLowerCase()) ||
              item.date.toLowerCase().includes(searchValue.toLowerCase()) ||
              item.adviser.toLowerCase().includes(searchValue.toLowerCase()) ||
              item?.Students?.[0]?.Course?.coursename
                .toLowerCase()
                .includes(searchValue.toLowerCase())
            );
          })}
        ></Table>
      </div>
    ),
    tab2: (
      <div ref={componentRef}  >
        <div  className=" flex  justify-between  p-10 "   > 
          <p className="   "  >  Total Capstone: {totalCapstone}</p>


            <button  onClick={handlePrint}  className="  exclude-in-print  p-2 bg-gray-500 rounded-md" >Print</button>
          </div>
      <div className="  flex  w-full flex-nowrap">
        
        <Table
          className=" w-full"
          columns={capstoneManagementColumn}
          dataSource={approveData?.filter((item: any) => {
            console.log(item?.Students?.[0]?.Course?.coursename.toLowerCase());
            return (
              item.title.toLowerCase().includes(searchValue.toLowerCase()) ||
              item.date.toLowerCase().includes(searchValue.toLowerCase()) ||
              item.adviser.toLowerCase().includes(searchValue.toLowerCase()) ||
              item?.Students?.[0]?.Course?.coursename
                .toLowerCase()
                .includes(searchValue.toLowerCase())
            );
          })}
        ></Table>
      </div>
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

  const approvalModalOkay = (values: any) => {
    mutateApprovalCapstone({
      id: capstoneData ?? "",
    });

    setApproveModal(false);
  };

  const approvalModalCancel = () => {
    setApproveModal(false);
    setCapstoneData(undefined);
  };
  const handleSearchChange = (e: any) => {
    setSearchValue(e.target.value);
  };
  const { mutate } = api.capstone.createAdminCapstone.useMutation({
    onSuccess: (data) => {
      if (!data) {
        window.alert("Student not Registered or Already submitted a Capstone");

        form.setFields([
          {
            name: "capstoneLeader",
            errors: ["Student not Registered or Already submitted a Capstone"],
          },
        ]);
      } else {
        form.resetFields();
        setModalCapstone(false);
      }
      refetch();
      refetchApprovedCapstone();
    },
  });
  const uploadImage = (e: any) => {
    console.log("VAAALUES", e.date);

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
          const course = courseData?.find((data) => data.id === e.course);
          mutate({
            studentNo: e.capstoneLeader,
            course: course?.coursename || "",
            studentMembers: e.studentMembers,
            title: e.title,
            topic: e.topic,
            abstract: e.abstract,
            adviser: e.adviser,
            url: d,
            date: pickerDate,
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

  const handleDateChange = (date: any, dateString: any) => {
    const formattedDate = dayjs(dateString).format("MM/DD/YYYY");
    setPickerDate(formattedDate);
  };

  return (
    <DashboardLayout>
      <Modal
        title="Basic Modal"
        open={approvalModal}
        onOk={approvalModalOkay}
        onCancel={approvalModalCancel}
        footer={
          <div>
            <Button key="Cancel" onClick={approvalModalCancel}>
              Cancel
            </Button>
            <Button className=" bg-blue-300" onClick={approvalModalOkay}>
              OK
            </Button>
          </div>
        }
      >
        Are you sure you want to approve this capstone?
      </Modal>
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
            name="course"
            rules={[{ required: true, message: "Please Choose Course" }]}
            className=" items-center"
          >
            {courseData && (
              <Select
                className="flex h-8 min-w-full text-center"
                defaultValue="Choose Your Course"
                style={{ width: 200 }}
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
            <Input placeholder=" Adviser Name" />
          </Form.Item>

          <Form.Item
            name="date"
            rules={[{ required: true, message: "Please  Select date  " }]}
            label="Date of Submission"
          >
            <DatePicker onChange={handleDateChange} />
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
      <PageHeaderAdmin />
      <div className="  mb-14 flex  justify-between ">
        <div>
          <Search
            placeholder="input search text"
            className=" rounded border border-solid border-gray-500 "
            style={{ width: 200 }}
            onChange={handleSearchChange}
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
