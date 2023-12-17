import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import TenantDataService from "./TenantData";
import TenantData from "./TenantData";
import { Link, useNavigate } from "react-router-dom";

const Data = () => {
  const [tenant, setTenant] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getTenant();
  }, []);

  const getTenant = async () => {
    const data = await TenantDataService.getAllTenants();
    console.log(data.docs);
    setTenant(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const getTenantById = async (id) => {
    const data = await TenantDataService.getTenantById(id);
    console.log(data.data());
    

    navigate(`/update/${id}`, { state: { tenant: data.data() } }); 
    // console.log(data.docs)
  };

  const handleDelete = async (id) => {
    await TenantDataService.deleteTenant(id);
    getTenant();
  };
  return (
    <>
      {/* <pre>{JSON.stringify(tenant, undefined, 2)}</pre> */}
      <Container key={tenant.RoomNo}>
        <Table
          id="RoomNo"
          style={{
            textIndent: "30px",
            display: "inline-block",
            fontFamily: "Arial, Helvetica, sans-serif",
            borderCollapse: "collapse",
            width: "100%",
            border: "1px solid black",
          }}
        >
          <thead>
            <tr
              style={{
                paddingTop: "12px",
                paddingBottom: "12px",
                textAlign: "centre",
                backgroundColor: "#04AA6D",
                color: "white",
                border: "1px solid black",
              }}
            >
              {/* <th>ID</th> */}
              <th>RoomNo.</th>
              <th>Name</th>
              <th>Date of joining(mm/dd/yyyy)</th>
              <th>Till one month(mm/dd/yyyy)</th>
              <th>Rent</th>
              <th>Present unit</th>
              <th>Previous unit</th>
              <th>Unit</th>
              <th>Overall total(Rent+Unit T)</th>
            </tr>
          </thead>
          <tbody>
            {tenant.map((te, index) => {
              return (
                <tr
                  key={te.RoomNo}
                  style={{
                    border: "1px solid black",
                    padding: "8px",
                    backgroundColor: "#f2f2f2",
                  }}
                >
                  {/* <td>{te.id}</td> */}
                  <td>{te.RoomNo}</td>

                  <td>{te.Name}</td>

                  <td>{te.DateOfJoining}</td>
                  <td>{te.TillOneMonth}</td>
                  <td>
                    {/* <Button color="success"></Button> */}
                    {te.Rent}
                  </td>
                  <td>{te.PresentUnit}</td>
                  <td>{te.PreviousUnit}</td>
                  <td>{te.Unit}</td>
                  <td>{te.Total}</td>
                  <td>
                    <button onClick={(e) => handleDelete(te.id)}>Delete</button>
                  </td>
                  <td>
                    {/* <button>
                      <Link to={`/update/${te.id}`}>Update</Link>
                    </button> */}
                    <button onClick={(e) => getTenantById(te.id)}>
                      Update
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
    </>
  );
};

export default Data;

// const getData = async () => {
//   const data = await fetch(
//     `http://localhost:5000/tenant`
//     //"https://tenant-a8edb-default-rtdb.firebaseio.com/tenantRecords.json"
//     //https://tenant-a8edb-default-rtdb.firebaseio.com
//     );
//   const parsedData = await data.json();
//   //console.log(parsedData)
//   setTenant(parsedData);
// };

// const getData = () => {
//   const getFromFirebase = FireBase.firestore().collection("tenant");
//   getFromFirebase.onSnapshot((querySnapShot) => {
//     const saveFirebaseTenant = [];
//     querySnapShot.forEach((doc) => {
//       saveFirebaseTenant.push(doc.data());
//     });
//     setTenant(saveFirebaseTenant);
//   });
// };
