import React, { useState } from "react";
import { CommonProblem } from "./MixedObjectData";
import "./CSS/Book_appointment.css";
import { useDispatch } from "react-redux";
import { AddPatients, CreateBooking } from "../../../../../Redux/Datas/action";
import Sidebar from "../../GlobalFiles/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const alert = (text) => toast(text);

const Book_Appointment = () => {
  const dispatch = useDispatch();
  const [load, setLoading] = useState(false);

  const isValue = {
    patientName: "",
    age: "",
    gender: "",
    mobile: "",
    disease: "",
    address: "",
    email: "",
    department: "",
    date: "",
    time: "",
  };

  const [makeAppointment, setBookAppoint] = useState(isValue);

  const HandleAppointment = (e) => {
    setBookAppoint({ ...makeAppointment, [e.target.name]: e.target.value });
  };

  const HandleOnsubmitAppointment = (e) => {
    e.preventDefault();

    if (makeAppointment.gender === "" || makeAppointment.department === "") {
      return alert("Please fill all the Details");
    }
    setLoading(true);
    dispatch(AddPatients({ ...makeAppointment, patientId: Date.now() })).then(
      (res) => {
        let data = {
          ...makeAppointment,
          patientId: res.id,
        };
        dispatch(CreateBooking(data));
        alert("Appointment Booked");
        setLoading(false);
        setBookAppoint(isValue);
      }
    );
  };

  return (
    <>
      <ToastContainer />
      <div className="well">
        <Sidebar />
        <div className="besidenavigationmenu">
          <div className="homeaddDoc">
            <h1>Book an Appointment</h1>
            <form onSubmit={HandleOnsubmitAppointment}>
              {/*This is Name section */}
              <div>
                <label> Name</label>
                <div className="inputdiv">
                  <input
                    type="text"
                    placeholder="First Name"
                    name="patientName"
                    value={makeAppointment.patientName}
                    onChange={HandleAppointment}
                    required
                  />
                </div>
              </div>
              {/*This is Email section */}
              <div>
                <label>Email</label>
                <div className="inputdiv">
                  <input
                    type="email"
                    placeholder="example@email.com"
                    name="email"
                    value={makeAppointment.email}
                    onChange={HandleAppointment}
                    required
                  />
                </div>
              </div>
              {/*This is Age section */}
              <div>
                <label>Age</label>
                <div className="inputdiv">
                  <input
                    type="number"
                    placeholder="Age"
                    name="age"
                    value={makeAppointment.age}
                    onChange={HandleAppointment}
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
                    value={makeAppointment.gender}
                    onChange={HandleAppointment}
                    required
                  >
                    <option value="Choose Blood Group">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              {/*This is Phone no section */}
              <div>
                <label>Contact Number</label>
                <div className="inputdiv">
                  <input
                    type="number"
                    placeholder="Number"
                    name="mobile"
                    value={makeAppointment.mobile}
                    onChange={HandleAppointment}
                    required
                  />
                </div>
              </div>
              
              {/*This is Disease section */}
              <div>
                <label>Type of Disease</label>
                <div className="inputdiv">
                  <select
                    name="disease"
                    value={makeAppointment.disease}
                    onChange={(e) => {
                      HandleAppointment(e);
                    }}
                    required
                  >
                    <option value="Choose Blood Group">Select Disease</option>
                    {CommonProblem.map((ele, i) => {
                      return (
                        <option key={i} value={ele.title}>
                          {ele.title}
                        </option>
                      );
                    })}
                  </select>
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
                    value={makeAppointment.address}
                    onChange={HandleAppointment}
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
                    value={makeAppointment.department}
                    onChange={HandleAppointment}
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
              {/*This is Appointment section */}
              <div className="dateofAppointment">
                <p>Date and Time </p>
                <div className="inputdiv">
                  <input
                    type={"date"}
                    placeholder="Choose Date"
                    name="date"
                    value={makeAppointment.date}
                    onChange={HandleAppointment}
                    required
                  />
                  <input
                    type={"time"}
                    placeholder="Choose Time"
                    name="time"
                    value={makeAppointment.time}
                    onChange={HandleAppointment}
                    required
                  />
                </div>
              </div>
              {/*This is Submit button section */}
              <button type="submit" className="book_formsubmitbutton">
                {load ? "load..." : "Book Appointment"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Book_Appointment;
