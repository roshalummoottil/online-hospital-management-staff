import React, { useState } from "react";
import "../Doctor/CSS/Doctor_Profile.css";
import { RiCompass2Fill } from "react-icons/ri";
import { RiNurseFill } from "react-icons/ri";
import { AiFillCalendar, AiFillEdit } from "react-icons/ai";
import { RiDropFill,RiCake2Fill } from "react-icons/ri";
import { RiPhoneFill } from "react-icons/ri";
import { BsHouseFill, BsGenderAmbiguous } from "react-icons/bs";
import { MdOutlineCastForEducation } from "react-icons/md";
import { FaRegHospital, FaMapMarkedAlt, FaBirthdayCake } from "react-icons/fa";
import { RiMapPin2Fill } from "react-icons/ri";
import { RiDoorOpenFill } from "react-icons/ri";
import Sidebar from "../../GlobalFiles/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { Button, message, Modal } from "antd";
import { UpdateNurse } from "../../../../../Redux/auth/action";
import userimg from "../../../../../img/User.jpg";
import "./CSS/Profiles.css";

const Nurse_Profile = () => {
  const {
    data: { user },
  } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    nurseName: user.nurseName,
    age: user.age,
    gender: user.gender,
    bloodGroup: user.bloodGroup,
    education: user.education,
    mobile: user.mobile,
    DOB: user.DOB,
    ID: user._id,
  });

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const [messageApi, contextHolder] = message.useMessage();

  const success = (text) => {
    messageApi.success(text);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = () => {
    dispatch(UpdateNurse(formData, user._id));
    success("user updated");
    handleOk();
  };

  return (
    <>
      {contextHolder}
      <div className="container">
        <Sidebar />
        <div className="AfterSideBar">
          <div className="maindoctorProfile">
            <div className="firstBox doctorfirstdiv">
              <div>
                <img src={user?.image} alt="userimg" />
              </div>
              <hr />
              <div className="singleitemdiv">
                <RiNurseFill  />
                <p>{user?.nurseName}</p>
              </div>
              <div className="singleitemdiv">
                <RiDropFill  />
                <p>{user?.bloodGroup}</p>
              </div>
              <div className="singleitemdiv">
                <RiCake2Fill  />
                <p>{user?.DOB}</p>
              </div>
              <div className="singleitemdiv">
                <RiPhoneFill />
                <p>{user?.mobile}</p>
              </div>
              <div className="singleitemdiv">
                <button onClick={showModal}>
                  {" "}
                  <AiFillEdit />
                  Edit
                </button>
              </div>

              <Modal
                title="Edit details"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                footer={[
                  <Button key="back" onClick={handleCancel}>
                    Cancel
                  </Button>,
                  <Button key="submit" onClick={handleFormSubmit}>
                    Edit
                  </Button>,
                ]}
              >
                <form className="inputForm">
                  <input
                    name="nurseName"
                    value={formData.nurseName}
                    onChange={handleFormChange}
                    type="text"
                    placeholder="Full name"
                  />
                  <input
                    name="age"
                    value={formData.age}
                    onChange={handleFormChange}
                    type="number"
                    placeholder="Age"
                  />
                  <select name="gender" onChange={handleFormChange}>
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Others</option>
                  </select>
                  <input
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleFormChange}
                    type="text"
                    placeholder="Blood Group"
                  />
                  <input
                    name="education"
                    value={formData.education}
                    onChange={handleFormChange}
                    type="text"
                    placeholder="education"
                  />
                  <input
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleFormChange}
                    type="number"
                    placeholder="mobile"
                  />
                  <input
                    name="DOB"
                    value={formData.DOB}
                    onChange={handleFormChange}
                    type="date"
                    placeholder="Date of birth"
                  />
                </form>
              </Modal>
            </div>
            
            <div className="SecondBox">
              {/* <div className="subfirstbox">
                <h2 style={{ textAlign: "center", marginTop: "10px" }}>
                  Other Info
                </h2>
                <div className="singleitemdiv">
                  <BsGenderAmbiguous className="singledivicons" />
                  <p>{user?.gender}</p>
                </div>
                <div className="singleitemdiv">
                  <AiFillCalendar className="singledivicons" />
                  <p>{user?.age}</p>
                </div>

                <div className="singleitemdiv">
                  <MdOutlineCastForEducation className="singledivicons" />
                  <p>{user?.education}</p>
                </div>
                <div className="singleitemdiv">
                  <BsHouseFill className="singledivicons" />
                  <p>{user?.address}</p>
                </div>
              </div> */}
              {/* ***********  Third Div ******************** */}
              <div className="subSecondBox">
                <h2 style={{ textAlign: "center", marginTop: "10px" }}>
                  Shift Information
                </h2>
                <div className="singleitemdiv">
                  <RiCompass2Fill  />
                  <p>6:00 AM - 9:00 PM</p>
                </div>
                <div className="singleitemdiv">
                  <RiDoorOpenFill  />
                  <p>Atrium</p>
                </div>
                <div className="singleitemdiv">
                  <RiMapPin2Fill  />
                  <p>
                    Charlotte NC
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Nurse_Profile;
