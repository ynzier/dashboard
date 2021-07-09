import React, { useState, useEffect } from 'react';
import GoodsDataService from '../services/goods.service';
import { Table } from 'antd';
import 'antd/dist/antd.css';

export const SettingForm = () => {
  const [modelData, setModelData] = useState();

  useEffect(() => {
    document.title = 'ตั้งค่าระบบ';
    let mounted = true;
    GoodsDataService.getAll()
      .then(res => {
        if (mounted) {
          setModelData(res.data);
        }
      })
      .catch(error => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        alert(resMessage);
      });
    return () => (mounted = false);
  }, []);

  const refreshList = () => {
    GoodsDataService.getAll()
      .then(res => {
        setModelData(res.data);
      })
      .catch(error => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        alert(resMessage);
      });
  };

  const deleteRecord = id => {
    GoodsDataService.remove(id)
      .then(response => {
        refreshList();
      })
      .catch(error => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        alert(resMessage);
      });
  };

  const header = [
    {
      title: 'รุ่นสินค้า',
      dataIndex: 'modelID',
      key: 'modelID',
      align: 'center',
    },
    {
      title: 'Action',
      key: 'key',
      dataIndex: 'key',
      render: (text, record) => {
        const id = record._id;

        return (
          <div>
            <span
              onClick={() => {
                deleteRecord(id);
              }}>
              <i className="fas fa-trash action"></i>
            </span>
          </div>
        );
      },
    },
  ];
  return (
    <Table
      dataSource={modelData ? modelData : null}
      columns={header}
      rowkey="_id"
    />
  );
};
