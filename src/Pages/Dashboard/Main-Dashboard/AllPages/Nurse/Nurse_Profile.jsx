import React, { useState } from "react";
import "../Doctor/CSS/Doctor_Profile.css";
import { RiCompass2Fill } from "react-icons/ri";
import { RiNurseFill } from "react-icons/ri";
import { AiFillEdit } from "react-icons/ai";
import { RiDropFill,RiCake2Fill } from "react-icons/ri";
import { RiPhoneFill } from "react-icons/ri";
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

  const [data, setFormData] = useState({
    nurseName: user.nurseName,
    age: user.age,
    gender: user.gender,
    bloodGroup: user.bloodGroup,
    education: user.education,
    mobile: user.mobile,
    DOB: user.DOB,
    ID: user._id,
  });

  const [isOpen, setOpen] = useState(false);
  const [isLoading, setConfirmLoading] = useState(false);

  const isModal = () => {
    setOpen(true);
  };

  const isHandeled = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const [text, contextHolder] = message.useMessage();

  const isOk = (text) => {
    text.isOk(text);
  };

  const cancel = () => {
    setOpen(false);
  };

  const isChange = (e) => {
    setFormData({ ...data, [e.target.name]: e.target.value });
  };

  const Submit = () => {
    dispatch(UpdateNurse(data, user._id));
    isOk("user updated");
    isHandeled();
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
                <button onClick={isModal}>
                  {" "}
                  <AiFillEdit />
                  Edit
                </button>
              </div>

              <Modal
                title="Edit details"
                isOpen={isOpen}
                onOk={isHandeled}
                isLoading={isLoading}
                onCancel={cancel}
                footer={[
                  <Button key="back" onClick={cancel}>
                    Cancel
                  </Button>,
                  <Button key="submit" onClick={Submit}>
                    Edit
                  </Button>,
                ]}
              >
                <form className="NurseForm">
                  <input
                    name="nurseName"
                    value={data.nurseName}
                    onChange={isChange}
                    type="text"
                    placeholder="Full name"
                  />
                  <input
                    name="age"
                    value={data.age}
                    onChange={isChange}
                    type="number"
                    placeholder="Age"
                  />
                  <input
                    name="mobile"
                    value={data.mobile}
                    onChange={isChange}
                    type="number"
                    placeholder="mobile"
                  />
                  <select name="gender" onChange={isChange}>
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Others</option>
                  </select>
                  <input
                    name="bloodGroup"
                    value={data.bloodGroup}
                    onChange={isChange}
                    type="text"
                    placeholder="Blood Group"
                  />
                  <input
                    name="education"
                    value={data.education}
                    onChange={isChange}
                    type="text"
                    placeholder="education"
                  />
                  <input
                    name="DOB"
                    value={data.DOB}
                    onChange={isChange}
                    type="date"
                    placeholder="Date of birth"
                  />
                </form>
              </Modal>
            </div>
            
            <div className="two">
              <div className="insideTwo">
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
