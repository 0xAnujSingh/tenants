import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import TenantDataService from "./TenantData";
import TenantData from "./TenantData";
import { Link, useNavigate } from "react-router-dom";
import { ButtonGroup } from "reactstrap";

const Data = () => {
  const [tenant, setTenant] = useState([]);
  const navigate = useNavigate();

  
  const Unit = (tenant.PresentUnit - tenant.PresentUnit)

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
    <div
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      {/* <pre>{JSON.stringify(tenant, undefined, 2)}</pre> */}
      <Container key={tenant.RoomNo}>
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
              <th>Till one month(mm/dd/yyyy)</th>
              <th>Rent</th>
              {/* <th>Present unit</th>
              <th>Previous unit</th> */}
              <th>Unit</th>
              <th>Overall total(Rent+Unit T)</th>
              <th>Action</th>
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
                    width: "65%",
                    height: "65%",
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
                  {/* <td>{te.PresentUnit}</td>
                  <td>{te.PreviousUnit}</td> */}
                  <td>{(te.Unit) * 9}</td>
                  <td>{te.Total}</td>
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
                        onClick={(e) => getTenantById(te.id)}
                      >
                        Update
                      </button>
                      <button
                        variant="primary"
                        onClick={(e) => handleDelete(te.id)}
                      >
                        Delete
                      </button>
                      <button variant="primary">Transaction</button>
                      <button variant="primary">Balance</button>
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
