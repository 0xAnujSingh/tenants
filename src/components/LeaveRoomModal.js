import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Input } from "reactstrap";

function LeaveRoomModal(props) {
  const { show, handleClose, handleSave } = props;
  const [endDateStr, setEndDate] = useState("");

  function validateAndSave() {
    const endDate = new Date(Date.parse(endDateStr));
    const currentDate = new Date();

    if (endDate <= currentDate) {
        alert('End date cannot be in past');

        return;
    }

    handleSave(endDate);
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>When Will You Leave The Room</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Enter a end date
        <br />
        <Input
          id="LeaveRoomModal"
          name="LeaveRoomModal"
          placeholder="LeaveRoomModal"
          type="date"
          value={endDateStr}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={validateAndSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default LeaveRoomModal;
