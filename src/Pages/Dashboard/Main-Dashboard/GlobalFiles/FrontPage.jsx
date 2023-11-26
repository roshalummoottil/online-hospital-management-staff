import { Table } from "antd";
import React from "react";
import { RiDossierFill } from "react-icons/ri";
import { RiNurseFill } from "react-icons/ri";
import { RiAccountBoxFill } from "react-icons/ri";
import { FaBed } from "react-icons/fa";
import { MdOutlineBedroomParent } from "react-icons/md";
import { FaAmbulance } from "react-icons/fa";
import { RiArticleLine } from "react-icons/ri";
import { RiBarChartBoxFill } from "react-icons/ri";
import { RiAdminFill } from "react-icons/ri";
import Sidebar from "./Sidebar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetAllData, GetPatients } from "../../../../Redux/Datas/action";

const FrontPage = () => {
  const columns = [
    { title: "Name", dataIndex: "patientName", key: "patientName" },
    { title: "Age", dataIndex: "age", key: "age" },
    { title: "Disease", dataIndex: "disease", key: "disease" },
    { title: "Blood Group", dataIndex: "bloodGroup", key: "bloodGroup" },
    { title: "Department", dataIndex: "department", key: "department" }
  ];

  const { patients } = useSelector((store) => store.data.patients);
  const {
    dashboard: { data },
  } = useSelector((store) => store.data);
  const {
    data: { user },
  } = useSelector((state) => state.auth);

  console.log(data);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetPatients());
    dispatch(GetAllData());
  }, []);

  return (
    <div className="container">
      <Sidebar />
      <div className="AfterSideBar">
        {user?.userType === "admin" &&
        <> <h1 style={{ color: "rgb(44, 62, 80)" }}>Overview</h1>
        <div className="maindiv">
        <div className="one commondiv">
            {" "}
            <div>
              <h1>{data?.bed}</h1>
              <p>Beds</p>
            </div>
            <FaBed className="overviewIcon" />
          </div>
        
          <div className="two commondiv">
            {" "}
            <div>
              <h1>{data?.admin}</h1>
              <p>Admin</p>
            </div>
            <RiAdminFill className="overviewIcon" />
          </div>
        
          <div className="three commondiv">
            <div>
              <h1>{data?.patient}</h1>
              <p>Patient</p>
            </div>
            <RiAccountBoxFill className="overviewIcon" />
          </div>
          
          <div className="four commondiv">
            {" "}
            <div>
              <h1>{data?.nurse}</h1>
              <p>Nurse</p>
            </div>
            <RiNurseFill className="overviewIcon" />
          </div>
          
          <div className="five commondiv">
            <div>
              <h1>{data?.doctor}</h1>
              <p>Doctor</p>
            </div>
            <RiDossierFill className="overviewIcon" />
          </div>
          <div className="six commondiv">
            {" "}
            <div>
              <h1>{data?.appointment}</h1>
              <p>Appointment</p>
            </div>
            <RiArticleLine className="overviewIcon" />
          </div>
          <div className="seven commondiv">
            {" "}
            <div>
              <h1>{data?.report}</h1>
              <p>Reports</p>
            </div>
            <RiBarChartBoxFill className="overviewIcon" />
          </div>
        </div></>}
        {/* ************************************* */}
        <div className="patientDetails">
          <h1>Patient Info Table</h1>
          <div className="patientBox">
            <Table columns={columns} dataSource={patients} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrontPage;
