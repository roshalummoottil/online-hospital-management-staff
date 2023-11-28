import React, { useState } from "react";
import { Radio } from "antd";
import introduction from "../../../img/Intro.jpeg";
import administrator from "../../../img/Administator.png";
import "./DLogin.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  AdminLogin,
  DoctorLogin,
  forgotPassword,
  NurseLogin,
} from "../../../Redux/auth/action";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Drawer } from "antd";
const alert = (text) => toast(text);

const DLogin = () => {
  const [open, setOpen] = useState(false);

  const isShow = () => {
    setOpen(true);
  };

  const isclose = () => {
    setOpen(false);
  };

  // ************************************************
  const [Loading, setLoading] = useState(false);
  const [placement, SetPlacement] = useState("Nurse");
  const [formvalue, setFormvalue] = useState({
    ID: "",
    password: "",
  });
  const dispatch = useDispatch();

  const isChange = (e) => {
    setFormvalue({ ...formvalue, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();
  const isSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (formvalue.ID !== "" && formvalue.password !== "") {
      if (placement === "Nurse") {
        let data = {
          ...formvalue,
          nurseID: formvalue.ID,
        };
        dispatch(NurseLogin(data)).then((res) => {
          if (res.message === "Successful") {
            alert("Nurse Login is Successful");
            setLoading(false);
            return navigate("/dashboard");
          }
          if (res.message === "Wrong credentials") {
            setLoading(false);

            alert("Please check your credentials");
          }
          if (res.message === "Error") {
            setLoading(false);

            alert("Something seems odd, Please Try Again");
          }
        });
      } else if (placement === "Doctor") {
        let data = {
          ...formvalue,
          docID: formvalue.ID,
        };
        console.log(data);
        dispatch(DoctorLogin(data)).then((res) => {
          if (res.message === "Successful") {
            alert("Doctor Login is Successful");
            setLoading(false);

            return navigate("/dashboard");
          }
          if (res.message === "Wrong credentials") {
            setLoading(false);

            alert("Please check your credentials");
          }
          if (res.message === "Error") {
            setLoading(false);

            alert("Something seems odd, Please Try Again");
          }
        });
      } else if (placement === "Admin") {
        let data = {
          ...formvalue,
          adminID: formvalue.ID,
        };
        dispatch(AdminLogin(data)).then((res) => {
          if (res.message === "Successful") {
            alert("Admin Login is Successful");
            setLoading(false);

            return navigate("/dashboard");
          }
          if (res.message === "Wrong credentials") {
            setLoading(false);

            alert("Please check your credentials");
          }
          if (res.message === "Error") {
            setLoading(false);

            alert("Something seems odd, Please Try Again");
          }
        });
      }
    }
  };

  const isPChange = (e) => {
    SetPlacement(e.target.value);
  };

  const [Forgotpassword, setForgetPassword] = useState({
    type: "",
    email: "",
  });

  const HandleForgetPassword = (e) => {
    setForgetPassword({ ...Forgotpassword, [e.target.name]: e.target.value });
  };

  const [forgetLoading, setforgetLoading] = useState(false);

  const HandleChangePassword = () => {
    if (Forgotpassword.type === "") {
      return alert("Please enter all Details");
    }
    setforgetLoading(true);
    dispatch(forgotPassword(Forgotpassword)).then((res) => {
      if (res.message === "User not found") {
        setforgetLoading(false);
        return alert("User doesn't look familiar");
      }
      setForgetPassword({
        type: "",
        email: "",
      });
      isclose();
      setforgetLoading(false);
      return alert("Send Account Details");
    });
  };

  return (
    <>
      <ToastContainer />

      <div className="homeaddDoc">
        <div className="left">
          <img src={introduction} alt="Intro.jpeg" />
        </div>
        <div className="right">
          <h1>Login</h1>
          <div>
            <Radio.Group
              value={placement}
              onChange={isPChange}
              className={"radiogroup"}
            >
              <Radio.Button value="Nurse" className={"radiobutton"}>
                Nurse
              </Radio.Button>
              <Radio.Button value="Doctor" className={"radiobutton"}>
                Doctor
              </Radio.Button>
              <Radio.Button value="Admin" className={"radiobutton"}>
                Admin
              </Radio.Button>
            </Radio.Group>
          </div>
          <div className="Profileimg">
            <img src={administrator} alt="profile" />
          </div>
          <div>
            <form onSubmit={isSubmit}>
              <h3>{placement} ID</h3>
              <input
                type="number"
                name="ID"
                value={formvalue.ID}
                onChange={isChange}
                required
              />
              <h3>Password</h3>
              <input
                type="password"
                name="password"
                value={formvalue.password}
                onChange={isChange}
                required
              />
              <button type="submit">{Loading ? "Loading..." : "Submit"}</button>
              <p style={{ marginTop: "10px" }}>
                
                <span
                  style={{ color: "blue", cursor: "pointer" }}
                  onClick={isShow}
                >
                  Forgot Password!
                </span>
              </p>

              {/* *********************Seperation************************* */}
              <Drawer
                title="Forgot Password"
                placement="left"
                isclose={isclose}
                open={open}
              >
                <div>
                  <label style={{ fontSize: "18px" }}>Choose Type</label>

                  <select
                    name="type"
                    value={Forgotpassword.type}
                    onChange={HandleForgetPassword}
                    required
                  >
                    <option value="">User Type</option>
                    <option value="nurse">Nurse</option>
                    <option value="doctor">Doctor</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "18px" }}>
                    Enter  your Email
                  </label>
                  <input
                    type="email"
                    placeholder="example@mail.com"
                    name="email"
                    value={Forgotpassword.email}
                    onChange={HandleForgetPassword}
                    required
                    style={{
                      width: "100%",
                      height: "3rem",
                      borderRadius: "5px",
                      border: "none",
                      backgroundColor: "#bce0fb",
                      fontSize: "18px",
                      marginTop: "10px",
                      paddingLeft: "10px",
                    }}
                  />
                </div>

                <button
                  style={{
                    width: "50%",
                    margin: " 20px auto",
                    display: "flex",
                    padding: "10px",
                    fontSize: "18px",
                    backgroundColor: "#ff9f9f",
                    border: "none",
                    borderRadius: "7px",
                    cursor: "pointer",
                    justifyContent: "center",
                  }}
                  onClick={HandleChangePassword}
                >
                  {forgetLoading ? "Loading..." : " Send Mail"}
                </button>
              </Drawer>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default DLogin;
