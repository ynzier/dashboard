import React, { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import {
  Col,
  Row,
  Form,
  Card,
  Breadcrumb,
  InputGroup,
} from '@themesberg/react-bootstrap';
import { Table } from 'antd';
import 'antd/dist/antd.css';

import CustomerDataService from '../services/customer.service';

const App = (props) => {
  const [record, setRecord] = useState([]);
  const [filterData, setfilterData] = useState();
  const tutorialsRef = useRef();
  tutorialsRef.current = record;

  const search = value => {
    const filterTable = record.filter(o =>
      Object.keys(o).some(k =>
        String(o[k]).toLowerCase().includes(value.toLowerCase()),
      ),
    );

    setfilterData(filterTable);
  };

  const openRecord = id => {
    console.log(id);
    props.history.push('/record/' + id);
  };

  useEffect(() => {
    document.title = 'รายการทั้งหมด';
    let mounted = true;
    CustomerDataService.getAll()
      .then(res => {
        if (mounted) {
          setRecord(res.data);
        }
      })
      .catch(e => {
        console.log(e);
      });
    return () => (mounted = false);
  }, []);

  const header = [
    {
      title: 'หมายเลขสินค้า',
      dataIndex: 'serialID',
      key: 'serialID',
      align: 'center',
    },
    {
      title: 'รุ่น',
      dataIndex: 'modelID',
      align: 'center',
      width: 300,
    },
    {
      title: 'ชื่อ',
      dataIndex: 'name',
      align: 'center',
      width: 300,
    },
    {
      title: 'เบอร์โทร',
      dataIndex: 'tel',
      align: 'center',
      width: 300,
    },
    {
      title: 'ที่อยู่',
      dataIndex: 'address',
      align: 'center',
      width: 600,
    },
    {
      title: 'วันที่ซื้อ',
      dataIndex: 'purchaseDate',
      align: 'center',
      width: 300,
      sorter: (a, b) => a.purchaseDate.localeCompare(b.purchaseDate),
    },
    {
      title: 'รับประกันถึง',
      dataIndex: 'expireDate',
      align: 'center',
      width: 300,
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
                openRecord(id);
              }}>
              <i className="far fa-edit action mr-2"></i>
            </span>
            <span>&nbsp;&nbsp;</span>
            <span
              onClick={() => {
                console.log(record);
              }}>
              <i className="fas fa-trash action"></i>
            </span>
          </div>
        );
      },
    },
  ];
  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <Breadcrumb
            className="d-none d-md-inline-block"
            listProps={{ className: 'breadcrumb-dark breadcrumb-transparent' }}>
            <Breadcrumb.Item>
              <FontAwesomeIcon icon={faHome} />
            </Breadcrumb.Item>
            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
            <Breadcrumb.Item active>Transactions</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      <Card>
        <Card.Header>
          <div className="table-settings mb-4">
            <Row className="justify-content-between align-items-center">
              <Col xs={8} md={6} lg={3} xl={4}>
                <InputGroup>
                  <InputGroup.Text>
                    <FontAwesomeIcon icon={faSearch} />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Search"
                    onChange={e => search(e.target.value)}
                  />
                </InputGroup>
              </Col>
            </Row>
          </div>
        </Card.Header>
        <Card.Body
          className="pt-0"
          style={{ marginTop: 30, height: '100%', width: '100%' }}>
          <Table
            dataSource={filterData == null ? record : filterData}
            columns={header}
            rowKey="serialID"
            pagination={{ pageSize: 20 }}
          />
        </Card.Body>
      </Card>
    </>
  );
};
export default App;
