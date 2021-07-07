import React, { useState, useEffect } from 'react';
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
  Modal,
  Alert,
} from '@themesberg/react-bootstrap';
import CustomerDataService from '../services/customer.service';

var record = [];

export const EditForm = props => {
  const [modalShow, setModalShow] = useState(false);
  const [name, setName] = useState();
  const [tel, setTel] = useState();
  const [warrantyTime, setWarrantyTime] = useState();
  const [address, setAddress] = useState();
  const [serialID, setSerialID] = useState();
  const [invoiceID, setInvoiceID] = useState();
  const [modelID, setModelID] = useState();
  const [purchaseDate, setPurchaseDate] = useState();
  const [status, setStatus] = useState();

  useEffect(() => {
    if (props.data) {
      record = props.data;
      setName(record.name);
      setModelID(record.modelID);
      setPurchaseDate(record.purchaseDate);
      setSerialID(record.serialID);
      setTel(record.tel);
      setWarrantyTime(record.warrantyTime);
      setInvoiceID(record.invoiceID);
      setStatus(record.status);
      setAddress(record.address);
    }
  }, [props.data]);

  const MyVerticallyCenteredModal = props => {
    return (
      <Modal {...props}>
        <Modal.Header closeButton>
          <Modal.Title>ข้อมูลการรับประกัน</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>ชื่อ - นามสกุล: {name}</p>
          <p>เบอร์ติดต่อ: {tel}</p>
          <p>ที่อยู่: {address}</p>
          <p>รุ่นสินค้า: {modelID}</p>
          <p>รหัสสินค้า: {serialID}</p>
          <p>วันที่ซื้อ: {moment(purchaseDate).format('DD/MM/YYYY')}</p>
          <p>ระยะเวลารับประกัน: {warrantyTime} ปี</p>
          <p>
            วันที่สิ้นสุดการรับประกัน:{' '}
            {moment(purchaseDate).add(warrantyTime, 'y').format('DD/MM/YYYY')}
          </p>
          <p>หมายเลขบิล: {invoiceID}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={updateCustomer}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  const handleSubmit = e => {
    e.preventDefault();
    setModalShow(true);
  };

  const updateCustomer = () => {
    var data = {
      name: name,
      tel: tel,
      address: address,
      modelID: modelID,
      serialID: serialID,
      purchaseDate: moment(purchaseDate).format('DD/MM/YYYY'),
      warrantyTime: warrantyTime,
      expireDate: moment(purchaseDate)
        .add(warrantyTime, 'y')
        .format('DD/MM/YYYY'),
      invoiceID: invoiceID,
    };
    CustomerDataService.update(props.data._id, data)
      .then(response => {
        console.log(response.data);
        console.log('The tutorial was updated successfully!');
        setModalShow(false);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        {record !== '' && (
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
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col sm={10} className="mb-3">
                <Form.Group id="address">
                  <Form.Label>ที่อยู่</Form.Label>
                  <Form.Control
                    required
                    as="textarea"
                    rows={3}
                    placeholder="กรอกที่อยู่"
                    style={{ resize: 'none' }}
                    value={address}
                    onChange={e => setAddress(e.target.value)}
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
                    value={tel}
                    onChange={e => setTel(e.target.value)}
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
                    value={modelID}
                    onChange={e => setModelID(e.target.value)}>
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
                    value={serialID}
                    onChange={e => setSerialID(e.target.value)}
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
                    closeOnSelect={true}
                    renderInput={(props, openCalendar) => (
                      <InputGroup>
                        <InputGroup.Text>
                          <FontAwesomeIcon icon={faCalendarAlt} />
                        </InputGroup.Text>
                        <Form.Control
                          required
                          type="text"
                          value={moment(purchaseDate, 'DD.MM.YYYY').format(
                            'DD/MM/YYYY',
                          )}
                          name="purchaseDate"
                          placeholder="วัน/เดือน/ปี"
                          onFocus={openCalendar}
                          onChange={e => {
                            setPurchaseDate(
                              moment(e.target.value).format('DD/MM/YYYY'),
                            );
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
                    value={warrantyTime}
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
                    <InputGroup.Text style={{ backgroundColor: '#F5F8FB' }}>
                      <FontAwesomeIcon icon={faCalendarAlt} />
                    </InputGroup.Text>
                    <Form.Control
                      disabled
                      type="text"
                      placeholder="วัน/เดือน/ปี"
                      value={moment(purchaseDate, 'DD.MM.YYYY')
                        .add(warrantyTime, 'y')
                        .format('DD/MM/YYYY')}
                      onChange={e => {}}
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
                    value={invoiceID}
                    onChange={e => setInvoiceID(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <div className="mt-3">
              <Button variant="primary" type="submit">
                Save
              </Button>
            </div>
            {status === 1 ? (
              <Alert
                variant="success"
                style={{ marginTop: 20 }}
                onClose={() => setStatus(0)}
                dismissible>
                บันทึกข้อมูลเรียบร้อยแล้ว !
              </Alert>
            ) : (
              ''
            )}
          </Form>
        )}

        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => {
            setModalShow(false);
          }}
        />
      </Card.Body>
    </Card>
  );
};
