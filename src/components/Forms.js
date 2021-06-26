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

export const GeneralInfoForm = () => {
  const [expireday, setExpireday] = useState('');
  const [modelID, setmodelID] = useState('');
  const [serialID, setserialID] = useState('');
  console.log(serialID);
  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <h5 className="mb-4">ข้อมูลสินค้า / Goods Info</h5>
        <Form>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="modelID">
                <Form.Label>รุ่นสินค้า</Form.Label>
                <Form.Select
                  required
                  onChange={e => setmodelID(e.target.value)}>
                  <option value="SKT-201T">SKT-201T</option>
                  <option value="SKT-202T">SKT-202T</option>
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
                  onChange={e => setserialID(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="align-items-center">
            <Col md={6} className="mb-3">
              <Form.Group id="birthday">
                <Form.Label>วันที่ส่งมอบสินค้า</Form.Label>
                <Datetime
                  timeFormat={false}
                  onChange={setExpireday}
                  renderInput={(props, openCalendar) => (
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faCalendarAlt} />
                      </InputGroup.Text>
                      <Form.Control
                        required
                        type="text"
                        value={
                          expireday ? moment(expireday).format('DD/MM/YYYY') : ''
                        }
                        placeholder="วัน/เดือน/ปี"
                        onFocus={openCalendar}
                        onChange={() => {}}
                      />
                    </InputGroup>
                  )}
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="gender">
                <Form.Label>ระยะเวลารับประกัน (ปี)</Form.Label>
                <Form.Select required defaultValue="1">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <h5 className="my-4">ข้อมูลลูกค้า / Customer Info</h5>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="address">
                <Form.Label>ชื่อ</Form.Label>
                <Form.Control required type="text" placeholder="ชื่อ" />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="address">
                <Form.Label>นามสกุล</Form.Label>
                <Form.Control required type="text" placeholder="นามสกุล" />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="phone">
                <Form.Label>เบอร์ติดต่อ</Form.Label>
                <Form.Control required type="text" placeholder="เบอร์ติดต่อ" />
              </Form.Group>
            </Col>
          </Row>
          <h5 className="my-4">ที่อยู่ / Address Info</h5>
          <Row>
            <Col sm={9} className="mb-4">
              <Form.Group id="address">
                <Form.Label>ที่อยู่</Form.Label>
                <Form.Control required type="text" placeholder="กรอกที่อยู่" />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm={4} className="mb-3">
              <Form.Group className="mb-2">
                <Form.Label>จังหวัด</Form.Label>
                <Form.Select id="province">
                  <option value="กรุงเทพมหานคร">กรุงเทพมหานคร</option>
                  <option value="กระบี่">กระบี่ </option>
                  <option value="กาญจนบุรี">กาญจนบุรี </option>
                  <option value="กาฬสินธุ์">กาฬสินธุ์ </option>
                  <option value="กำแพงเพชร">กำแพงเพชร </option>
                  <option value="ขอนแก่น">ขอนแก่น</option>
                  <option value="จันทบุรี">จันทบุรี</option>
                  <option value="ฉะเชิงเทรา">ฉะเชิงเทรา </option>
                  <option value="ชัยนาท">ชัยนาท </option>
                  <option value="ชัยภูมิ">ชัยภูมิ </option>
                  <option value="ชุมพร">ชุมพร </option>
                  <option value="ชลบุรี">ชลบุรี </option>
                  <option value="เชียงใหม่">เชียงใหม่ </option>
                  <option value="เชียงราย">เชียงราย </option>
                  <option value="ตรัง">ตรัง </option>
                  <option value="ตราด">ตราด </option>
                  <option value="ตาก">ตาก </option>
                  <option value="นครนายก">นครนายก </option>
                  <option value="นครปฐม">นครปฐม </option>
                  <option value="นครพนม">นครพนม </option>
                  <option value="นครราชสีมา">นครราชสีมา </option>
                  <option value="นครศรีธรรมราช">นครศรีธรรมราช </option>
                  <option value="นครสวรรค์">นครสวรรค์ </option>
                  <option value="นราธิวาส">นราธิวาส </option>
                  <option value="น่าน">น่าน </option>
                  <option value="นนทบุรี">นนทบุรี </option>
                  <option value="บึงกาฬ">บึงกาฬ</option>
                  <option value="บุรีรัมย์">บุรีรัมย์</option>
                  <option value="ประจวบคีรีขันธ์">ประจวบคีรีขันธ์ </option>
                  <option value="ปทุมธานี">ปทุมธานี </option>
                  <option value="ปราจีนบุรี">ปราจีนบุรี </option>
                  <option value="ปัตตานี">ปัตตานี </option>
                  <option value="พะเยา">พะเยา </option>
                  <option value="พระนครศรีอยุธยา">พระนครศรีอยุธยา </option>
                  <option value="พังงา">พังงา </option>
                  <option value="พิจิตร">พิจิตร </option>
                  <option value="พิษณุโลก">พิษณุโลก </option>
                  <option value="เพชรบุรี">เพชรบุรี </option>
                  <option value="เพชรบูรณ์">เพชรบูรณ์ </option>
                  <option value="แพร่">แพร่ </option>
                  <option value="พัทลุง">พัทลุง </option>
                  <option value="ภูเก็ต">ภูเก็ต </option>
                  <option value="มหาสารคาม">มหาสารคาม </option>
                  <option value="มุกดาหาร">มุกดาหาร </option>
                  <option value="แม่ฮ่องสอน">แม่ฮ่องสอน </option>
                  <option value="ยโสธร">ยโสธร </option>
                  <option value="ยะลา">ยะลา </option>
                  <option value="ร้อยเอ็ด">ร้อยเอ็ด </option>
                  <option value="ระนอง">ระนอง </option>
                  <option value="ระยอง">ระยอง </option>
                  <option value="ราชบุรี">ราชบุรี</option>
                  <option value="ลพบุรี">ลพบุรี </option>
                  <option value="ลำปาง">ลำปาง </option>
                  <option value="ลำพูน">ลำพูน </option>
                  <option value="เลย">เลย </option>
                  <option value="ศรีสะเกษ">ศรีสะเกษ</option>
                  <option value="สกลนคร">สกลนคร</option>
                  <option value="สงขลา">สงขลา </option>
                  <option value="สมุทรสาคร">สมุทรสาคร </option>
                  <option value="สมุทรปราการ">สมุทรปราการ </option>
                  <option value="สมุทรสงคราม">สมุทรสงคราม </option>
                  <option value="สระแก้ว">สระแก้ว </option>
                  <option value="สระบุรี">สระบุรี </option>
                  <option value="สิงห์บุรี">สิงห์บุรี </option>
                  <option value="สุโขทัย">สุโขทัย </option>
                  <option value="สุพรรณบุรี">สุพรรณบุรี </option>
                  <option value="สุราษฎร์ธานี">สุราษฎร์ธานี </option>
                  <option value="สุรินทร์">สุรินทร์ </option>
                  <option value="สตูล">สตูล </option>
                  <option value="หนองคาย">หนองคาย </option>
                  <option value="หนองบัวลำภู">หนองบัวลำภู </option>
                  <option value="อำนาจเจริญ">อำนาจเจริญ </option>
                  <option value="อุดรธานี">อุดรธานี </option>
                  <option value="อุตรดิตถ์">อุตรดิตถ์ </option>
                  <option value="อุทัยธานี">อุทัยธานี </option>
                  <option value="อุบลราชธานี">อุบลราชธานี</option>
                  <option value="อ่างทอง">อ่างทอง </option>
                  <option value="อื่นๆ">อื่นๆ</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col sm={4}>
              <Form.Group id="zip">
                <Form.Label>รหัสไปรษณีย์</Form.Label>
                <Form.Control required type="tel" placeholder="XXXXX" />
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
