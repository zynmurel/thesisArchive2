import React, { useState } from "react";
import { Button, Card, Checkbox, Form, Input, Modal } from "antd";
import { api } from "~/utils/api";

function AddCapstoneModal({
  showCapstoneModal,
  capstoneModalOK,
  capstoneModalCancel,
  onFinishCapstoneForm,
  onFinishFailedCapstoneForm,
  modalCapstone,
}: any) {
  type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
  };

  return (
    <>
      <Modal
        title="Basic Modal"
        open={true}
        onOk={capstoneModalOK}
        onCancel={capstoneModalCancel}
        centered
      >
        <Card>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinishCapstoneForm}
            onFinishFailed={onFinishFailedCapstoneForm}
            autoComplete="off"
          >
            <Form.Item<FieldType>
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item<FieldType>
              name="remember"
              valuePropName="checked"
              wrapperCol={{ offset: 8, span: 16 }}
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Modal>
    </>
  );
}

export default AddCapstoneModal;
