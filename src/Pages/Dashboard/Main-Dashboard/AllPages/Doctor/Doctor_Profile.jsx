import React, { useEffect, useState } from "react";
import "../Doctor/CSS/Doctor_Profile.css";
import { BiTime } from "react-icons/bi";
import { RiDropFill,RiCake2Fill } from "react-icons/ri";
import { GiMeditation } from "react-icons/gi";
import { RiPhoneFill } from "react-icons/ri";
import { AiFillCalendar, AiFillEdit } from "react-icons/ai";
import { RiCalendarCheckFill } from "react-icons/ri";
import { RiHome2Fill } from "react-icons/ri";
import { MdBloodtype } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";
import { BsHouseFill, BsGenderAmbiguous } from "react-icons/bs";
import { MdOutlineCastForEducation } from "react-icons/md";
import { RiMapPin2Fill } from "react-icons/ri";
import { RiCompass2Fill } from "react-icons/ri";
import { RiDoorOpenFill } from "react-icons/ri";
import { FaRegHospital, FaMapMarkedAlt, FaBirthdayCake } from "react-icons/fa";
import Sidebar from "../../GlobalFiles/Sidebar";
import { RiMedicineBottleFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Button, message, Modal } from "antd";
import { UpdateDoctor, UpdateNurse } from "../../../../../Redux/auth/action";
import { GetDoctorDetails } from "../../../../../Redux/Datas/action";
import { Navigate } from "react-router-dom";
import "./CSS/Doctor_Profile.css";

// *********************************************************
const Doctor_Profile = () => {
  const { data } = useSelector((store) => store.auth);
  const {
    data: { user },
  } = useSelector((state) => state.auth);
  const disptach = useDispatch();

  useEffect(() => {
    disptach(GetDoctorDetails());
  }, []);

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

  const [formData, setFormData] = useState({
    docName: data.user.docName,
    age: data.user.age,
    gender: data.user.gender,
    bloodGroup: data.user.bloodGroup,
    education: data.user.education,
    mobile: data.user.mobile,
    DOB: data.user.DOB,
  });

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = () => {
    disptach(UpdateDoctor(formData, data.user._id));
    success("user updated");
    handleOk();
  };

  if (data?.isAuthticated === false) {
    return <Navigate to={"/"} />;
  }

  if (data?.user.userType !== "doctor") {
    return <Navigate to={"/dashboard"} />;
  }

  return (
    <>
      {contextHolder}
      <div className="container">
        <Sidebar />
        <div className="AfterSideBar">
          <div className="maindoctorProfile">
            <div className="firstBox">
            <div className="icon">
                  <RiMedicineBottleFill className="mainIcon" />
                </div>
              <hr />
              <div className="singleitemdiv">
                <RiMedicineBottleFill  />
                <p>{data?.user?.docName}</p>
              </div>
              <div className="singleitemdiv">
                <RiDropFill  />
                <p>{data?.user?.bloodGroup}</p>
              </div>
              <div className="singleitemdiv">
                <RiCake2Fill />
                <p>{data?.user?.DOB}</p>
              </div>
              <div className="singleitemdiv">
                <RiPhoneFill  />
                <p>{data?.user?.mobile}</p>
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
                    value={formData.docName}
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
            {/* ***********  Second Div ******************** */}
            <div className="SecondBox">
              <div className="subfirstbox">
                <h2 style={{ textAlign: "center", marginTop: "10px" }}>
                  Personal Info
                </h2>
                <div className="singleitemdiv">
                  <BsGenderAmbiguous  />
                  <p>{data?.user?.gender}</p>
                </div>
                <div className="singleitemdiv">
                  <RiCalendarCheckFill  />
                  <p>{data?.user?.age}</p>
                </div>

                <div className="singleitemdiv">
                  <MdOutlineCastForEducation c />
                  <p>{data?.user?.education}</p>
                </div>
                <div className="singleitemdiv">
                  <RiHome2Fill  />
                  <p>{data?.user?.address}</p>
                </div>
              </div>
              {/* ***********  Third Div ******************** */}
              <div className="subSecondBox">
                <h2 style={{ textAlign: "center", marginTop: "10px" }}>
                  Hospital Details
                </h2>
                <div className="singleitemdiv">
                  <RiCompass2Fill  />
                  <p>08:00 AM - 7:00 PM</p>
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

export default Doctor_Profile;
