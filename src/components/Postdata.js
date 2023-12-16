// import React, { useState } from "react";

// import { Form, FormGroup, Label, Input, Button } from "reactstrap";
// import TenantDataService from './TenantData'

// const Postdata = () => {
//   const [tenantData, setTenantData] = useState({
//     RoomNo: "",
//     Name: "",
//     DateOfJoining: "",
//     TillOneMonth: "",
//     Rent: "",
//     PresentUnit: "",
//     PreviousUnit: "",
//     Unit: "",
//     Total: "",
//   });

//   const changeHandler = (e) => {
//     // e.preventDefault()
//     setTenantData({ ...tenantData, [e.target.name]: e.target.value });
//   };

//   const submitData = async (e) => {
//     e.preventDefault();

//     const  {
//       RoomNo,
//       Name,
//       DateOfJoining,
//       TillOneMonth,
//       Rent,
//       PresentUnit,
//       PreviousUnit,
//       Unit,
//       Total,
//     } = tenantData;
//     if (
//       RoomNo &&
//       Name &&
//       DateOfJoining &&
//       TillOneMonth &&
//       Rent &&
//       PresentUnit &&
//       PreviousUnit &&
//       Unit &&
//       Total
//     ) {

//       const res = fetch(
//         "https://tenant-a8edb-default-rtdb.firebaseio.com/tenantRecords.json",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             RoomNo,
//             Name,
//             DateOfJoining,
//             TillOneMonth,
//             Rent,
//             PresentUnit,
//             PreviousUnit,
//             Unit,
//             Total,
//           }),
//         }
//       );

//       if (res) {
//         setTenantData({
//           RoomNo: "",
//           Name: "",
//           DateOfJoining: "",
//           TillOneMonth: "",
//           Rent: "",
//           PresentUnit: "",
//           PreviousUnit: "",
//           Unit: "",
//           Total: "",
//         });
//         alert("Data stored");
//       } else {
//         alert("please fill the data");
//       }
//     } else {
//       alert("please fill the data");
//     }
//   };
//   return (
//     <div
//       className="container mx-2 my-3"
//       style={{
//         width: "100%",
//         justifyContent: "center",
//         backgroundColor: "#DCDCDC",
//         height: "100%",
//       }}
//     >
//       <Form>
//         {/* {success && <Alert color='success'>Login Successful</Alert>} */}

//         <FormGroup>
//           <Label for="exampleUsername"> RoomNo </Label>
//           <Input
//             id="RoomNo"
//             name="RoomNo"
//             placeholder="Room No"
//             type="number"
//             value={tenantData.RoomNo}
//             onChange={changeHandler}
//           />
//         </FormGroup>
//         <FormGroup>
//           <Label for="examplePassword"> Name </Label>
//           <Input
//             id="Name"
//             name="Name"
//             placeholder="Name"
//             type="text"
//             value={tenantData.Name}
//             onChange={changeHandler}
//           />
//         </FormGroup>

//         <FormGroup>
//           <Label for="examplePassword"> Date Of Joining </Label>
//           <Input
//             id="DateOfJoining"
//             name="DateOfJoining"
//             placeholder="DateOfJoining"
//             type="date"
//             value={tenantData.DateOfJoining}
//             onChange={changeHandler}
//           />
//         </FormGroup>

//         <FormGroup>
//           <Label for="examplePassword"> Till One Month </Label>
//           <Input
//             id="TillOneMonth"
//             name="TillOneMonth"
//             placeholder="TillOneMonth"
//             type="date"
//             value={tenantData.TillOneMonth}
//             onChange={changeHandler}
//           />
//         </FormGroup>

//         <FormGroup>
//           <Label for="examplePassword"> Rent </Label>
//           <Input
//             id="Rent"
//             name="Rent"
//             placeholder="Rent"
//             type="number"
//             value={tenantData.Rent}
//             onChange={changeHandler}
//           />
//         </FormGroup>

//         <FormGroup>
//           <Label for="examplePassword"> Present Unit </Label>
//           <Input
//             id="PresentUnit"
//             name="PresentUnit"
//             placeholder="PresentUnit"
//             type="number"
//             value={tenantData.PresentUnit}
//             onChange={changeHandler}
//           />
//         </FormGroup>

//         <FormGroup>
//           <Label for="examplePassword"> Previous Unit </Label>
//           <Input
//             id="PreviousUnit"
//             name="PreviousUnit"
//             placeholder="PreviousUnit"
//             type="number"
//             value={tenantData.PreviousUnit}
//             onChange={changeHandler}
//           />
//         </FormGroup>

//         <FormGroup>
//           <Label for="examplePassword"> Unit </Label>
//           <Input
//             id="Unit"
//             name="Unit"
//             placeholder="Unit"
//             type="number"
//             value={tenantData.Unit}
//             onChange={changeHandler}
//           />
//         </FormGroup>

//         <FormGroup>
//           <Label for="examplePassword"> Total </Label>
//           <Input
//             id="Total"
//             name="Total"
//             placeholder="Total"
//             type="number"
//             value={tenantData.Total}
//             onChange={changeHandler}
//           />
//         </FormGroup>

//         <Button style={{ color: "danger" }} onClick={submitData}>
//           Submit
//         </Button>
//       </Form>
//     </div>
//   );
// };

// export default Postdata;

// // try {
// //   const docRef = await addDoc(collection(db, "TenantData"), {
// //     tenantData: tenantData,
// //   });
// //   console.log("Document written with ID: ", docRef.id);
// // } catch (e) {
// //   console.error("Error adding document: ", e);
// // }
// // }

import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import TenantDataService from "./TenantData";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import TenantData from "./TenantData";
import image from "../img/modern-residential-district-with-green-roof-balcony-generated-by-ai.jpg";

const Postdata = () => {
  const [tenantData, setTenantData] = useState({
    RoomNo: "",
    Name: "",
    DateOfJoining: "",
    TillOneMonth: "",
    Rent: "",
    PresentUnit: "",
    PreviousUnit: "",
    Unit: "",
    Total: "",
  });

  const changeHandler = (e) => {
    // e.preventDefault()
    setTenantData({ ...tenantData, [e.target.name]: e.target.value });
  };

  const submitData = async (e) => {
    e.preventDefault();
    const {
      RoomNo,
      Name,
      DateOfJoining,
      TillOneMonth,
      Rent,
      PresentUnit,
      PreviousUnit,
      Unit,
      Total,
    } = tenantData;
    if (
      RoomNo &&
      Name &&
      DateOfJoining &&
      TillOneMonth &&
      Rent &&
      PresentUnit &&
      PreviousUnit &&
      Unit &&
      Total
    ) {
      const dbRef = collection(db, "TenantData");
      console.log(tenantData);

      await TenantDataService.addTenant(dbRef, tenantData)
        .then((docRef) => {
          console.log("doc added");
          setTenantData({
            RoomNo: "",
            Name: "",
            DateOfJoining: "",
            TillOneMonth: "",
            Rent: "",
            PresentUnit: "",
            PreviousUnit: "",
            Unit: "",
            Total: "",
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log("Please fill the data");
      alert("plz fill the data");
    }
  };

  return (
    <div
      className="container mx-2 my-3"
      style={{
        width: "100%",
        justifyContent: "center",
        backgroundColor: "#DCDCDC",
        height: "100%",
        backgroundImage: `url(${image})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        height: "100%",
        width: "100%",
      }}
    >
      <Form action="#" onSubmit={submitData}>
        <FormGroup>
          <Label for="examplePassword"> RoomNo </Label>
          <Input
            id="RoomNo"
            name="RoomNo"
            placeholder="Room No"
            type="number"
            value={tenantData.RoomNo}
            onChange={changeHandler}
          />
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword"> Name </Label>
          <Input
            id="Name"
            name="Name"
            placeholder="Name"
            type="text"
            value={tenantData.Name}
            onChange={changeHandler}
          />
        </FormGroup>

        <FormGroup>
          <Label for="examplePassword"> Date Of Joining </Label>
          <Input
            id="DateOfJoining"
            name="DateOfJoining"
            placeholder="DateOfJoining"
            type="date"
            value={tenantData.DateOfJoining}
            onChange={changeHandler}
          />
        </FormGroup>

        <FormGroup>
          <Label for="examplePassword"> Till One Month </Label>
          <Input
            id="TillOneMonth"
            name="TillOneMonth"
            placeholder="TillOneMonth"
            type="date"
            value={tenantData.TillOneMonth}
            onChange={changeHandler}
          />
        </FormGroup>

        <FormGroup>
          <Label for="examplePassword"> Rent </Label>
          <Input
            id="Rent"
            name="Rent"
            placeholder="Rent"
            type="number"
            value={tenantData.Rent}
            onChange={changeHandler}
          />
        </FormGroup>

        <FormGroup>
          <Label for="examplePassword"> Present Unit </Label>
          <Input
            id="PresentUnit"
            name="PresentUnit"
            placeholder="PresentUnit"
            type="number"
            value={tenantData.PresentUnit}
            onChange={changeHandler}
          />
        </FormGroup>

        <FormGroup>
          <Label for="examplePassword"> Previous Unit </Label>
          <Input
            id="PreviousUnit"
            name="PreviousUnit"
            placeholder="PreviousUnit"
            type="number"
            value={tenantData.PreviousUnit}
            onChange={changeHandler}
          />
        </FormGroup>

        <FormGroup>
          <Label for="examplePassword"> Unit </Label>
          <Input
            id="Unit"
            name="Unit"
            placeholder="Unit"
            type="number"
            value={tenantData.Unit}
            onChange={changeHandler}
          />
        </FormGroup>

        <FormGroup>
          <Label for="examplePassword"> Total </Label>
          <Input
            id="Total"
            name="Total"
            placeholder="Total"
            type="number"
            value={tenantData.Total}
            onChange={changeHandler}
          />
        </FormGroup>

        <Button
          style={{ color: "danger" }}
          //onClick={submitData}
        >
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Postdata;
