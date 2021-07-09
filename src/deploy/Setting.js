import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPlus } from '@fortawesome/free-solid-svg-icons';
import {
  Col,
  Row,
  Breadcrumb,
  Form,
  Card,
  InputGroup,
  Button,
} from '@themesberg/react-bootstrap';
import { SettingForm } from '../components/SettingForm';
import GoodsDataService from '../services/goods.service';

const App = () => {
  const [input, setInput] = useState();
  useEffect(() => {
    document.title = 'ตั้งค่าระบบ';
  }, []);
  const sendData = () => {
    var data = {
      modelID: input,
    };
    GoodsDataService.add(data)
      .then(response => {
        alert('เพิ่มรุ่นสินค้าเรียบร้อย');
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
  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <Breadcrumb
            className="d-none d-md-inline-block"
            listProps={{ className: 'breadcrumb-dark breadcrumb-transparent' }}>
            <Breadcrumb.Item active>
              <FontAwesomeIcon icon={faHome} />
            </Breadcrumb.Item>
            <Breadcrumb.Item href="/dashboard">Dashboard</Breadcrumb.Item>
            <Breadcrumb.Item active>Setting</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      <Row>
        <Col xs={12} xl={9}>
          <Card border="light" className="shadow-sm">
            <Card.Header className="border-bottom border-light d-flex justify-content-between">
              <h5 className="mb-0">เพิ่ม / ลบ รุ่นสินค้า</h5>
              <InputGroup className="mb-md-0" style={{ width: '30%' }}>
                <InputGroup.Text>
                  <FontAwesomeIcon icon={faPlus} />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="ชื่อรุ่นสินค้า"
                  onChange={e => setInput(e.target.value)}
                />
                <Button onClick={sendData}>เพิ่ม</Button>
              </InputGroup>
            </Card.Header>
            <Card.Body
              className="pt-0"
              style={{ marginTop: 30, height: '100%', width: '100%' }}>
              <SettingForm />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};
export default App;
