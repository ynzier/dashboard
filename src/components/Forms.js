import React, { useState } from 'react';
import moment from 'moment-timezone';
import Datetime from 'react-datetime';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import {
  Col,
  Row,
  Card,
  Form,
  Button,
  InputGroup,
} from '@themesberg/react-bootstrap';
import CustomerDataService from '../services/customer.service';

export const GeneralInfoForm = () => {
  const initialRecordState = {
    name: '',
    tel: '',
    address: '',
    modelID: '',
    serialID: '',
    invoiceID: '',
  };
  const [purchaseDate, setPurchaseDate] = useState('');
  const [expireday, setExpireday] = useState('');

  const [warrantyTime, setWarrantyTime] = useState(1);

  const [record, setRecord] = useState(initialRecordState);
  const handleInputChange = event => {
    const { name, value } = event.target;
    setRecord({ ...record, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    var data = {
      name: record.name,
      tel: record.tel,
      address: record.address,
      modelID: record.modelID,
      serialID: record.serialID,
      purchaseDate: moment(purchaseDate).format('DD/MM/YYYY'),
      expireDate: moment(purchaseDate)
        .add(warrantyTime, 'y')
        .format('DD/MM/YYYY'),
      invoiceID: record.invoiceID,
    };

    CustomerDataService.create(data)
      .then(res => console.log(res))
      .catch(e => console.log(e));
  };

  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <Form onSubmit={handleSubmit}>
        <h5 className="my-4">ข้อมูลลูกค้า / Customer Info</h5>
        <Row>
          <Col md={6} className="mb-3">
            <Form.Group id="address">
              <Form.Label>ชื่อ - นามสกุล</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="ชื่อ"
                name="name"
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6} className="mb-3">
            <Form.Group id="phone">
              <Form.Label>เบอร์ติดต่อ</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="เบอร์ติดต่อ"
                name="tel"
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <h5 className="my-4">ที่อยู่ / Address Info</h5>
        <Row>
          <Col sm={10} className="mb-4">
            <Form.Group id="address">
              <Form.Label>ที่อยู่</Form.Label>
              <Form.Control
                required
                as="textarea"
                rows={3}
                placeholder="กรอกที่อยู่"
                style={{ resize: 'none' }}
                name="address"
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <h5 className="mb-4">ข้อมูลสินค้า / Goods Info</h5>
      
          <Row>
            <Col md={4} className="mb-3">
              <Form.Group id="modelID">
                <Form.Label>รุ่นสินค้า</Form.Label>
                <Form.Select
                  required
                  name="modelID"
                  onChange={handleInputChange}>
                  <option value="SKT-201T">SKT-201T</option>
                  <option value="SKT-202T">SKT-202T</option>
                  <option value="SKT-203F">SKT-203F</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="ItemNo">
                <Form.Label>รหัสสินค้า (Serial No.)</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="รหัสสินค้า"
                  name="serialID"
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="align-items-center">
            <Col md={3} className="mb-3">
              <Form.Group id="birthday">
                <Form.Label>วันที่ซื้อ</Form.Label>
                <Datetime
                  timeFormat={false}
                  onChange={setPurchaseDate}
                  renderInput={(props, openCalendar) => (
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faCalendarAlt} />
                      </InputGroup.Text>
                      <Form.Control
                        required
                        type="text"
                        value={
                          purchaseDate
                            ? moment(purchaseDate).format('DD/MM/YYYY')
                            : ''
                        }
                        name="purchaseDate"
                        placeholder="วัน/เดือน/ปี"
                        onFocus={openCalendar}
                        onChange={e => {
                          setPurchaseDate(e.target.value);
                        }}
                      />
                    </InputGroup>
                  )}
                />
              </Form.Group>
            </Col>
            <Col md={4} className="mb-3">
              <Form.Group id="gender">
                <Form.Label>ระยะเวลารับประกัน (ปี)</Form.Label>
                <Form.Select
                  required
                  defaultValue="1"
                  onChange={e => setWarrantyTime(e.target.value)}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={3} className="mb-3">
              <Form.Group id="birthday">
                <Form.Label>วันที่สิ้นสุดการรับประกัน</Form.Label>
                <InputGroup>
                  <InputGroup.Text style={{backgroundColor:'#F5F8FB'}}>
                    <FontAwesomeIcon icon={faCalendarAlt} />
                  </InputGroup.Text>
                  <Form.Control
                    disabled
                    type="text"
                    value={
                      purchaseDate
                        ? moment(purchaseDate)
                            .add(warrantyTime, 'y')
                            .format('DD/MM/YYYY')
                        : ''
                    }
                    placeholder="วัน/เดือน/ปี"
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="ItemNo">
                <Form.Label>หมายเลขบิล (Invoice No.)</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="รหัสสินค้า"
                  name="invoiceID"
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <div className="mt-3">
            <Button variant="primary" type="submit">
              Add
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};
