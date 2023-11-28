import React, { useState } from "react";
import { message, Upload } from "antd";
import doctor from "../../../../../img/doctoravatar.png";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  AddPatients,
  CreateBeds,
  EditSingleBed,
  GetSingleBed,
} from "../../../../../Redux/Datas/action";
import Sidebar from "../../GlobalFiles/Sidebar";
import { Navigate } from "react-router-dom";

const alert = (text) => toast(text);

const Addpatient = () => {
  const getBase64 = (img, callback) => {
    const rr = new FileReader();
    rr.addEventListener("load", () => callback(rr.result));
    rr.readAsDataURL(img);
  };

  const [load, setLoading] = useState(false);

  const dispatch = useDispatch();

  const { data } = useSelector((store) => store.auth);

  const bef_upload = (file) => {
    const jpgorpng = file.type === "image/jpeg" || file.type === "image/png";
    if (!jpgorpng) {
      message.error("Sorry! You can only upload either JPG or PNG file.");
    }
    const morethan2 = file.size / 1024 / 1024 < 2;
    if (!morethan2) {
      message.error("Image must be smaller than 2MB.");
    }
    return jpgorpng && morethan2;
  };

  const isBed = {
    bedNumber: "",
    roomNumber: "",
  };
  const [bedInfo, setbedDetails] = useState(isBed);

  const ChangeBed = (e) => {
    setbedDetails({ ...bedInfo, [e.target.name]: e.target.value });
  };

  const isData = {
    patientName: "",
    patientID: Date.now(),
    age: "",
    email: "",
    gender: "",
    mobile: "",
    disease: "",
    address: "",
    department: "",
    date: "",
    bloodGroup: "",
    DOB: "",
    password: "",
    nurseID: data?.user._id,
    docID: "",
    details: "",
  };
  const [AddPatient, setAddPatient] = useState(isData);

  const makeAppointment = (e) => {
    setAddPatient({ ...AddPatient, [e.target.name]: e.target.value });
  };

  const makeSubmit = (e) => {
    e.preventDefault();

    if (
      AddPatient.gender === "" ||
      AddPatient.department === "" ||
      AddPatient.docID === "" ||
      AddPatient.bloodGroup === ""
    ) {
      return alert("Please Enter All the Requried Feilds");
    }
    try {
      setLoading(true);
      dispatch(GetSingleBed(bedInfo)).then((ans) => {
        if (ans.message === "Bed not found") {
          setLoading(false);
          return alert("Bed not found");
        }
        if (ans.message === "Occupied") {
          setLoading(false);
          return alert("Bed already occupied");
        }
        if (ans.message === "No Bed") {
          setLoading(false);
          return alert("Bed not found");
        }
        if (ans.message === "Available") {
          dispatch(AddPatients(AddPatient)).then((item) => {
            if (item.message === "Patient already exists") {
              setLoading(false);
              return alert("Patient already exists");
            }
            let data = {
              patientID: item._id,
              occupied: "occupied",
            };
            alert("Patient Added");

            dispatch(EditSingleBed(data, ans.id)).then((ele) =>
              console.log(ele)
            );
            alert("Bed updated");
            setLoading(false);
            setAddPatient(isData);
            setbedDetails(isBed);
          });
        } else {
          setLoading(false);
          console.log("error");
        }
      });
      //
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  if (data?.isAuthticated === false) {
    return <Navigate to={"/"} />;
  }

  if (data?.user.userType !== "nurse") {
    return <Navigate to={"/dashboard"} />;
  }

  return (
    <>
      <ToastContainer />
      <div className="container">
        <Sidebar />
        <div className="AfterSideBar">
          <div className="Main_Add_Doctor_div">
            <h1>Register New Patient</h1>
            <img src={doctor} alt="doctor" className="avatarimg" />

            <form onSubmit={makeSubmit}>
              {/* This is Name section */}
              <div>
                <label> Name</label>
                <div className="inputdiv">
                  <input
                    type="text"
                    placeholder="Full Name"
                    name="patientName"
                    value={AddPatient.patientName}
                    onChange={makeAppointment}
                    required
                  />
                </div>
              </div>
              {/* This is Email section */}
              { <div>
                <label>Email</label>
                <div className="inputdiv">
                  <input
                    type="email"
                    placeholder="abc@abc.com"
                    name="email"
                    value={AddPatient.email}
                    onChange={makeAppointment}
                    required
                  />
                </div>
              </div> }
              {/* This is Phone number section */}
              <div>
                <label>Contact Number</label>
                <div className="inputdiv">
                  <input
                    type="number"
                    placeholder="Number"
                    name="mobile"
                    value={AddPatient.mobile}
                    onChange={makeAppointment}
                    required
                  />
                </div>
              </div>
              {/* This is Age section  */}
              <div>
                <label>Age</label>
                <div className="inputdiv">
                  <input
                    type="number"
                    placeholder="Age"
                    name="age"
                    value={AddPatient.age}
                    onChange={makeAppointment}
                    required
                  />
                </div>
              </div>
              {/* This is DoB section  */}
              <div className="dateofAppointment">
                <p>Birth Date</p>
                <div className="inputdiv">
                  <input
                    type={"date"}
                    placeholder="Choose Date"
                    name="DOB"
                    value={AddPatient.DOB}
                    onChange={makeAppointment}
                    required
                  />
                </div>
              </div>
              {/*This is Gender section */}
              <div>
                <label>Gender</label>
                <div className="inputdiv">
                  <select
                    name="gender"
                    value={AddPatient.gender}
                    onChange={makeAppointment}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              {/*This is Blood group section */}
              <div>
                <label>Patient Blood Group</label>
                <div className="inputdiv">
                  <select
                    name="bloodGroup"
                    onChange={makeAppointment}
                    required
                  >
                    <option value="">Select</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>
              </div>
              {/*This is Date section */}
              <div>
                <label>Date</label>
                <div className="inputdiv">
                  <input
                    type="date"
                    placeholder="abc@abc.com"
                    name="date"
                    value={AddPatient.date}
                    onChange={makeAppointment}
                    required
                  />
                </div>
              </div>
              {/*This is Details section */}
              <div>
                <label>Details</label>
                <div className="inputdiv">
                  <input
                    type="text"
                    placeholder="Details"
                    name="details"
                    value={AddPatient.details}
                    onChange={makeAppointment}
                    required
                  />
                </div>
              </div>
              {/*This is Disease section */}
              <div>
                <label>Disease</label>
                <div className="inputdiv">
                  <input
                    type="text"
                    placeholder="Disease"
                    name="disease"
                    value={AddPatient.disease}
                    onChange={makeAppointment}
                    required
                  />
                </div>
              </div>
              {/*This is Address section */}
              <div>
                <label>Address</label>
                <div className="inputdiv">
                  <input
                    type="text"
                    placeholder="Address line 1"
                    name="address"
                    value={AddPatient.address}
                    onChange={makeAppointment}
                    required
                  />
                </div>
              </div>
              {/*This is Beds info section */}
              <div>
                <label>Bed Number</label>
                <div className="inputdiv">
                  <input
                    type="number"
                    placeholder="bed No"
                    name="bedNumber"
                    value={bedInfo.bedNumber}
                    onChange={ChangeBed}
                    required
                  />
                </div>
              </div>
              {/*This is Room info section */}
              <div>
                <label>Room Number</label>
                <div className="inputdiv">
                  <input
                    type="number"
                    placeholder="room no"
                    name="roomNumber"
                    value={bedInfo.roomNumber}
                    onChange={ChangeBed}
                    required
                  />
                </div>
              </div>
              {/*This is Department section */}
              <div>
                <label>Department</label>
                <div className="inputdiv">
                  <select
                    name="department"
                    value={AddPatient.department}
                    onChange={makeAppointment}
                    required
                  >
                    <option value="">Select</option>
                    <option value="Cardiology">Cardiology</option>
                    <option value="Neurology">Neurology</option>
                    <option value="ENT">ENT</option>
                    <option value="Ophthalmologist">Ophthalmologist</option>
                    <option value="Anesthesiologist">Anesthesiologist</option>
                    <option value="Dermatologist">Dermatologist</option>
                    <option value="Oncologist">Oncologist</option>
                    <option value="Psychiatrist">Psychiatrist</option>
                  </select>
                </div>
              </div>
              {/*This is Doctor section */}
              <div>
                <label>Doctor</label>
                <div className="inputdiv">
                  <select
                    name="docID"
                    value={AddPatient.docID}
                    onChange={makeAppointment}
                    required
                  >
                    <option value="">Select doctor</option>
                    <option value="63d228df1742e138a3727857">
                      Piyush Agrawal
                    </option>
                    <option value="63d2270dfe66e89c9be342f9">
                      Rajendra Patel
                    </option>
                  </select>
                </div>
              </div>
              {/*This is Password section */}
              <div className="dateofAppointment">
                <p>Password</p>
                <div className="inputdiv">
                  <input
                    type={"text"}
                    placeholder="Password"
                    name="password"
                    value={AddPatient.password}
                    onChange={makeAppointment}
                    required
                  />
                </div>
              </div>
              {/*This is Submit button section */}
              <button
                type="submit"
                className="formsubmitbutton"
                style={{ width: "20%" }}
              >
                {load ? "load..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Addpatient;
