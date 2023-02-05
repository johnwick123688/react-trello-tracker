import React, { useState } from "react";
import { Modal, Form, Input, Select, Avatar } from "antd";
//context
import { useAppContext } from "../context/AppContext";

const { TextArea } = Input;
const { Option } = Select;
const options = [];
for (let i = 10; i < 36; i++) {
  options.push({
    label: i.toString(36) + i,
    value: i.toString(36) + i,
  });
}
const AddModel = ({ whichId, onCloseModal, open, isEdit }) => {
  const [form] = Form.useForm();

  const [confirmLoading, setConfirmLoading] = useState(false);
  const { addAndEditCard } = useAppContext();
  const handleSubmit = (values) => {
    // console.log('values: ', values)
    addAndEditCard(values, whichId, isEdit);

    setConfirmLoading(true);
    onCloseModal();
  };

  const handleCancel = () => {
    onCloseModal();
  };
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  return (
    <Modal
      title="Add Card"
      open={open}
      onOk={form.submit}
      onCancel={handleCancel}
      confirmLoading={confirmLoading}
    >
      <br />
      <Form
        name="basic"
        form={form}
        initialValues={{ status: "new" }}
        onFinish={handleSubmit}
        autoComplete="off"
        labelCol={{ flex: "110px" }}
        labelAlign="left"
        wrapperCol={{ flex: 1 }}
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please input your title!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[
            { required: true, message: "Please input your description!" },
          ]}
        >
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item
          label="Member"
          name="member"
          rules={[
            { required: true, message: "Please input your description!" },
          ]}
        >
          <Select
            mode="multiple"
            allowClear
            style={{ width: "100%" }}
            placeholder="Please select"
            optionLabelProp="label"
            onChange={handleChange}
          >
            <Option value="tony123" label="tony 123">
              <div className="selectField">
                <Avatar src="https://picsum.photos/id/237/200/300" />
                <span>Tony Nguyen</span>
              </div>
            </Option>
            <Option value="phuong123" label="phuong 123">
              <div className="selectField">
                <Avatar src="https://picsum.photos/id/237/200/300" />
                <span>Phuong Nguyen</span>
              </div>
            </Option>
          </Select>
        </Form.Item>

        <Form.Item label="Status" name="status">
          <Select
            style={{ width: 120 }}
            onChange={handleChange}
            options={[
              {
                value: "new",
                label: "New",
              },
              {
                value: "inprocess",
                label: "In process",
              },
              {
                value: "done",
                label: "Done",
              },
            ]}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddModel;
