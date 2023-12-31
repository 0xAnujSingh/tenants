import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import TenantDataService from "./TenantData";
import TenantData from "./TenantData";
import { Link, useNavigate } from "react-router-dom";
import { ButtonGroup } from "reactstrap";
import Balance from "./Balance";
import { onSnapshot } from "firebase/firestore";

const Data = () => {
  const [tenants, setTenants] = useState([]);
  const navigate = useNavigate();

  //const Unit = (tenant.PresentUnit - tenant.PreviousUnit) * 9;

  useEffect(() => {
    getTenant();
  }, []);

  const getTenant = async () => {
    onSnapshot(TenantDataService.ref(), (snapshot) => {
      // if (!snapshot) { return; }
      // console.log(snapshot.docs);
      setTenants(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }) ;
    // const data = await TenantDataService.getAllTenants();
    
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

  const getBalance = async (id) => {
    getTenantById(id);
    //const data = await TenantDataService.getTenantById(id);
    navigate(`/balance/${id}`);
  };

  function handleUpdateUnit(tenant) {

    // This is updateUnit button here we want to update our new unit to the old unit(or replace our old unit with new unit)
     
    const newUnit = Number(prompt("Enter New Unit"));
    //alert(newUnit)
    // (newUnit - Unit) *10 + Balance
    const newBalance = (newUnit - tenant.Unit) * 10 + tenant.Balance;

    // newData = tenant ..ye humne is liye kara hai kyu hume kuch properties he update karna hai(jaise Unit) to  
    // humne kya kara tenant ke ander jo bhi data tha usko tenant ke ander dal diya taki jab bhi hum change kare 
    // to direct tenant(useState) me na hote hui vo sirf locally newData me hi ho.
    const newData = Object.assign({}, tenant); 
    
    
    delete newData.id; // delete humne isliye kari taki id same hi rahe or ched chad na ho
    newData.Balance = newBalance;
    newData.Unit = newUnit;
    console.log(newData)
    TenantDataService.updateTenant(tenant.id, newData);
  }

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      {/* <pre>{JSON.stringify(tenant, undefined, 2)}</pre> */}
      <Container>
        <Table
          striped
          bordered
          hover
          id="RoomNo"
          style={{
            marginTop: "2%",
          }}
        >
          <thead>
            <tr>
              {/* <th>ID</th> */}
              <th>RoomNo.</th>
              <th>Name</th>
              <th>Date of joining(mm/dd/yyyy)</th>

              <th>Rent</th>

              <th>Unit</th>
              <th>Balance</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tenants.map((te, index) => {
              return (
                <tr
                  key={te.RoomNo}
                  style={{
                    border: "1px solid black",
                    padding: "8px",
                    backgroundColor: "#f2f2f2",
                    width: "65%",
                    height: "65%",
                  }}
                >
                  {/* <td>{te.id}</td> */}
                  <td>{te.RoomNo}</td>

                  <td>{te.Name}</td>

                  <td>{te.DateOfJoining}</td>

                  <td>
                    {/* <Button color="success"></Button> */}
                    {te.Rent}
                  </td>

                  <td>{te.Unit}</td>

                  <td>{te.Balance}</td>

                  {/* <td>
                    <button onClick={(e) => handleDelete(te.id)}>Delete</button>
                  </td> */}
                  <td>
                    {/* <button>
                      <Link to={`/update/${te.id}`}>Update</Link>
                    </button> */}
                    <ButtonGroup>
                      <button
                        variant="primary"
                        className="button"
                        onClick={() => handleUpdateUnit(te)}
                      >
                        Update Unit
                      </button>
                      <button
                        variant="primary"
                        onClick={(e) => handleDelete(te.id)}
                      >
                        Delete
                      </button>
                      <button variant="primary">Transaction</button>
                      <button
                        variant="primary"
                        onClick={(e) => getBalance(te.id)}
                      >
                        Balance
                      </button>
                    </ButtonGroup>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default Data;
