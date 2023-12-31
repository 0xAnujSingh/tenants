import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Container, FormGroup } from "reactstrap";
import { Input, Label } from "reactstrap";
import TenantDataService from "./TenantData";

const Balance = () => {
  const params = useParams();
  const [balance, setBalance] = useState({});

  useEffect(() => {
    getTenantById(params.id);
  }, []);

  const getTenantById = async (tenantId) => {
    const docSnap = await TenantDataService.getTenantById(tenantId);
    console.log(docSnap);
    if (!docSnap.exists()) {
      console.log("Not Found");
    } else {
      setBalance(Object.assign({ id: docSnap.id }, docSnap.data()));
    }
  };
  //   const onChangeHandler = (e) => {
  //     setBalance({ ...balance, [e.target.name]: e.target.value });
  //   };

  return (
    <div>
      {params.id}...
      <br />
      Balance
      <div>
        <Container>
          <FormGroup>
            <Label for="Room no">Room No</Label>
            <Input
              id="RoomNo"
              name="RoomNo"
              placeholder="RoomNo "
              type="text"
              value={balance.RoomNo || ""} //  || '' This is just for warning:This is likely caused by the value changing from undefined to a defined value, which should not happen.
              //   onChange={onChangeHandler}
            />
          </FormGroup>
          <FormGroup>
            <Label for="Name">Name</Label>
            <Input
              id="Name"
              name="Name"
              placeholder="Name"
              type="text"
              value={balance.Name || ""}
              //   onChange={onChangeHandler}
            />
          </FormGroup>
          <FormGroup>
            <Label for="Unit">Unit</Label>
            <Input
              id="Unit"
              name="Unit"
              placeholder="Unit "
              type="text"
              value={balance.Unit}
              //   onChange={onChangeHandler}
            />
          </FormGroup>
          <FormGroup>
            <Label for="Rent">Rent</Label>
            <Input
              id="Rent"
              name="Rent"
              placeholder="Rent "
              type="text"
              value={balance.Rent || ""}
              //   onChange={onChangeHandler}
            />
          </FormGroup>
          <FormGroup>
            <Label for="Total">Total</Label>
            <Input
              id="Total"
              name="Total"
              placeholder="Total "
              type="text"
              value={(balance.Total = balance.Rent + balance.Unit)}
              //   onChange={onChangeHandler}
            />
          </FormGroup>
        </Container>
      </div>
    </div>
  );
};

export default Balance;

// import React, { useState } from "react";
// import { Container, Table } from "react-bootstrap";
// import { useParams } from "react-router-dom";

// const Balance = () => {
//   const params = useParams();
//   const [balance, setBalance] = useState([]);

//   return (
//     <div
//       style={{
//         width: "100%",
//         height: "100%",
//       }}
//     >
//       {/* Balance
//       {params.id} */}
//       <div>
//         <Container>
//           <Table
//             striped
//             bordered
//             hover
//             style={{
//               marginTop: "2%",
//             }}
//           >
//             <thead>
//               <tr>RoomNo</tr>
//               <tr>Name</tr>
//               <tr>Unit</tr>
//               <tr>Rent</tr>
//               <tr>Total</tr>
//             </thead>
//             <tbody>
//               {balance.map((te) => {
//                 return (
//                   <tr
//                     style={{
//                       border: "1px solid black",
//                       padding: "8px",
//                       backgroundColor: "#f2f2f2",
//                       width: "65%",
//                       height: "65%",
//                     }}
//                   >
//                     {console.log(te)}
//                     {/* <td>{te.R}</td> */}
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </Table>
//         </Container>
//       </div>
//     </div>
//   );
// };

// export default Balance;
