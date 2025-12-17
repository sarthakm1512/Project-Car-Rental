import React, { useEffect, useState } from "react";
import { Table, Form, Button, Alert, Container } from "react-bootstrap";
import "../components/adminNavbar.css";

const ManageCars = () => {
  const [cars, setCars] = useState([]);
  const [error, setError] = useState("");
  const [newCar, setNewCar] = useState({
    make: "",
    model: "",
    year: "",
    location: "",
    pricePerDay: "",
    availabilityStatus: "Available",
    imageUrl: "",
    specification: "",
  });
  const [editingCar, setEditingCar] = useState(null);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const response = await fetch("https://localhost:7257/api/Car/GetAllCars");
      if (!response.ok) throw new Error("Failed to fetch cars");
      const data = await response.json();
      setCars(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const addCar = async () => {
    try {
      const response = await fetch("https://localhost:7257/api/Car", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCar),
      });
      if (!response.ok) throw new Error("Failed to add car");
      const data = await response.json();
      setCars((prev) => [...prev, data]);
      setNewCar({
        make: "",
        model: "",
        year: "",
        location: "",
        pricePerDay: "",
        availabilityStatus: "Available",
        imageUrl: "",
        specification: "",
      });
    } catch (err) {
      setError(err.message);
    }
  };

  const updateCar = async () => {
    try {
      const response = await fetch("https://localhost:7257/api/Car", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editingCar),
      });
      if (!response.ok) throw new Error("Failed to update car");

      setCars((prev) =>
        prev.map((car) =>
          car.carId === editingCar.carId ? { ...editingCar } : car
        )
      );
      setEditingCar(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteCar = async (carId) => {
    try {
      const response = await fetch(`https://localhost:7257/api/Car/${carId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete car");
      setCars((prev) => prev.filter((car) => car.carId !== carId));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container>
      <div className="managercar-con">
        <h1 className="text-center my-4">Manage Cars</h1>
        {error && <Alert variant="danger">{error}</Alert>}

        <h2>Add New Car</h2>
        <Form>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Make"
              value={newCar.make}
              onChange={(e) => setNewCar({ ...newCar, make: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Model"
              value={newCar.model}
              onChange={(e) => setNewCar({ ...newCar, model: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="number"
              placeholder="Year"
              value={newCar.year}
              onChange={(e) => setNewCar({ ...newCar, year: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Location"
              value={newCar.location}
              onChange={(e) =>
                setNewCar({ ...newCar, location: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="number"
              placeholder="Price Per Day"
              value={newCar.pricePerDay}
              onChange={(e) =>
                setNewCar({ ...newCar, pricePerDay: e.target.value })
              }
            />
          </Form.Group>
          <Button variant="primary" onClick={addCar}>
            Add Car
          </Button>
        </Form>

        <h2 className="text-center mt-5">Cars List</h2>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>CarId</th>
              <th>Make</th>
              <th>Model</th>
              <th>Year</th>
              <th>Location</th>
              <th>Price Per Day</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car) => (
              <tr key={car.carId}>
                <td>{car.carId}</td>
                <td>{car.make}</td>
                <td>{car.model}</td>
                <td>{car.year}</td>
                <td>{car.location}</td>
                <td>${car.pricePerDay}</td>
                <td>
                  <Button
                    variant="primary"
                    className="me-2"
                    onClick={() => setEditingCar(car)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    className="me-2"
                    onClick={() => deleteCar(car.carId)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {editingCar && (
          <div className="edit-car-form">
            <h2>Edit Car</h2>
            <Form>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Make"
                  value={editingCar.make}
                  onChange={(e) =>
                    setEditingCar({ ...editingCar, make: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Model"
                  value={editingCar.model}
                  onChange={(e) =>
                    setEditingCar({ ...editingCar, model: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="number"
                  placeholder="Year"
                  value={editingCar.year}
                  onChange={(e) =>
                    setEditingCar({ ...editingCar, year: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Location"
                  value={editingCar.location}
                  onChange={(e) =>
                    setEditingCar({ ...editingCar, location: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="number"
                  placeholder="Price Per Day"
                  value={editingCar.pricePerDay}
                  onChange={(e) =>
                    setEditingCar({
                      ...editingCar,
                      pricePerDay: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Button variant="success" onClick={updateCar}>
                Update Car
              </Button>
              <Button
                variant="secondary"
                className="ms-2"
                onClick={() => setEditingCar(null)}
              >
                Cancel
              </Button>
            </Form>
          </div>
        )}
      </div>
    </Container>
  );
};

export default ManageCars;
