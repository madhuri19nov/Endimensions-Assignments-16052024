// ProductForm.js

import React, { useContext, useEffect } from 'react';
import { Modal, Form, Input, Select, notification } from 'antd';
import { ProductContext } from '../context/ProductContext';

const { Option } = Select;

const ProductForm = ({ visible, onClose, product }) => {
  const { addProduct, updateProduct } = useContext(ProductContext);
  const [form] = Form.useForm();

  useEffect(() => {
    if (product) {
      form.setFieldsValue(product);
    } else {
      form.resetFields();
    }
  }, [product, form]);

  const onFinish = (values) => {
    if (product) {
      updateProduct({ ...product, ...values });
      notification.success({ message: 'Product updated successfully' });
    } else {
      addProduct({ ...values, id: Date.now() });
      notification.success({ message: 'Product added successfully' });
    }
    onClose();
  };

  return (
    <Modal
      visible={visible}
      title={product ? 'Edit Product' : 'Add Product'}
      onCancel={onClose}
      onOk={() => form.submit()}
    >
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: 'Please enter the product name' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: 'Please enter the product description' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="category"
          label="Category"
          rules={[{ required: true, message: 'Please select a category' }]}
        >
          <Select>
            <Option value="Electronics">Electronics</Option>
            <Option value="Clothings">Clothings</Option>
            <Option value="Sports">Sports</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ProductForm;
