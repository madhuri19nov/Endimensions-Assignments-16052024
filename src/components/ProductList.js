// ProductList.js

import React, { useContext, useState } from 'react';
import { Table, Button, Input, Select, Modal, notification } from 'antd';
import { ProductContext } from '../context/ProductContext';
import ProductForm from './ProductForm';

const { Search } = Input;
const { Option } = Select;

const ProductList = () => {
  const { products, deleteProduct } = useContext(ProductContext);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState(null);

  const uniqueCategories = Array.from(new Set(products.map(p => p.category)));

 
  const allCategories = [...uniqueCategories];

  const filteredProducts = products.filter(product => {
    const productName = product.name.toLowerCase();
    const productDescription = product.description.toLowerCase();
    const searchQuery = search.toLowerCase();

    return (
      (productName.includes(searchQuery) || productDescription.includes(searchQuery)) &&
      (!categoryFilter || product.category === categoryFilter)
    );
  });

  const handleDeleteConfirm = () => {
    deleteProduct(deleteProductId);
    notification.success({ message: 'Product deleted successfully' });
    setDeleteConfirmVisible(false);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <span>
          <Button onClick={() => { setCurrentProduct(record); setModalVisible(true); }}>Edit</Button>
          <Button onClick={() => { setDeleteProductId(record.id); setDeleteConfirmVisible(true); }} danger>Delete</Button>
        </span>
      ),
    },
  ];

  const getRowClassName = (record) => {
    switch (record.category) {
      case 'Electronics': return 'row-category1';
      case 'Clothings': return 'row-category2';
      case 'Sports': return 'row-category3';
      default: return '';
    }
  };

  return (
    <div>
      <div className="statistics">
        <span>Total Products: {products.length}</span>
        <span>Unique Categories: {uniqueCategories.length}</span>
      </div>
      <div className="filters">
        <Search placeholder="Search by name or description" onSearch={setSearch} style={{ width: 200 }} />
        <Select
          placeholder="Filter by category"
          onChange={setCategoryFilter}
          style={{ width: 200, marginLeft: 10 }}
        >
          <Option value="">All Categories</Option>
          {allCategories.map(category => (
            <Option key={category} value={category}>{category}</Option>
          ))}
        </Select>
        <Button type="primary" style={{ marginLeft: 10 }} onClick={() => { setCurrentProduct(null); setModalVisible(true); }}>Add Product</Button>
      </div>
      <Table
        columns={columns}
        dataSource={filteredProducts}
        rowClassName={getRowClassName}
        rowKey="id"
        style={{ marginTop: 20 }}
      />
      <ProductForm
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        product={currentProduct}
      />
      <Modal
        title="Confirmation"
        visible={deleteConfirmVisible}
        onOk={handleDeleteConfirm}
        onCancel={() => setDeleteConfirmVisible(false)}
      >
        <p>Are you sure you want to delete this product?</p>
      </Modal>
    </div>
  );
};

export default ProductList;
