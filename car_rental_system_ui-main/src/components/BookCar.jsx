import { useEffect, useState } from "react";
import CarAudi from "../images/cars-big/audia1.jpg";
import CarGolf from "../images/cars-big/golf6.jpg";
import CarToyota from "../images/cars-big/toyotacamry.jpg";
import CarBmw from "../images/cars-big/bmw320.jpg";
import CarMercedes from "../images/cars-big/benz.jpg";
import CarPassat from "../images/cars-big/passatcc.jpg";

function BookCar() {
  const [modal, setModal] = useState(false); //  class - active-modal

  // booking car
  const [carType, setCarType] = useState("");
  const [pickUp, setPickUp] = useState("");
  const [dropOff, setDropOff] = useState("");
  const [pickTime, setPickTime] = useState("");
  const [dropTime, setDropTime] = useState("");
  const [carImg, setCarImg] = useState("");

  // modal infos
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipcode, setZipCode] = useState("");
  
  const isDisabled = () => {
    if (
      carType === "" ||
      pickUp === "" ||
      dropOff === "" ||
      pickTime === "" ||
      dropTime === "" ||
      name === "" ||
      lastName === "" ||
      phone === "" ||
      age === "" ||
      email === ""
    ) {
      return true;
    }
    
    return false;
  };

  // taking value of modal inputs
  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleLastName = (e) => {
    setLastName(e.target.value);
  };

  const handlePhone = (e) => {
    setPhone(e.target.value);
  };

  const handleAge = (e) => {
    setAge(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleAddress = (e) => {
    setAddress(e.target.value);
  };

  const handleCity = (e) => {
    setCity(e.target.value);
  };

  const handleZip = (e) => {
    setZipCode(e.target.value);
  };

  // open modal when all inputs are fulfilled
  const openModal = (e) => {
    e.preventDefault();
    const errorMsg = document.querySelector(".error-message");
    if (
      pickUp === "" ||
      dropOff === "" ||
      pickTime === "" ||
      dropTime === "" ||
      carType === ""
    ) {
      errorMsg.style.display = "flex";
    } else {
      setModal(!modal);
      const modalDiv = document.querySelector(".booking-modal");
      modalDiv.scroll(0, 0);
      errorMsg.style.display = "none";
    }
  };

  // disable page scroll when modal is displayed
  useEffect(() => {
    if (modal === true) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [modal]);

  // confirm modal booking
  const confirmBooking = (e) => {
    e.preventDefault();
    if (isDisabled()) return;
    setModal(!modal);
    const doneMsg = document.querySelector(".booking-done");
    doneMsg.style.display = "flex";

    // Redirect to the payment page
    window.location.href = "/payment-page"; // Replace with your payment page route or URL
  };

  // taking value of booking inputs
  const handleCar = (e) => {
    setCarType(e.target.value);
    setCarImg(e.target.value);
  };

  const handlePick = (e) => {
    setPickUp(e.target.value);
  };

  const handleDrop = (e) => {
    setDropOff(e.target.value);
  };

  const handlePickTime = (e) => {
    setPickTime(e.target.value);
  };

  const handleDropTime = (e) => {
    setDropTime(e.target.value);
  };

  // based on value name show car img
  let imgUrl;
  switch (carImg) {
    case "Audi A1 S-Line":
      imgUrl = CarAudi;
      break;
    case "VW Golf 6":
      imgUrl = CarGolf;
      break;
    case "Toyota Camry":
      imgUrl = CarToyota;
      break;
    case "BMW 320 ModernLine":
      imgUrl = CarBmw;
      break;
    case "Mercedes-Benz GLK":
      imgUrl = CarMercedes;
      break;
    case "VW Passat CC":
      imgUrl = CarPassat;
      break;
    default:
      imgUrl = "";
  }

  // hide message
  const hideMessage = () => {
    const doneMsg = document.querySelector(".booking-done");
    doneMsg.style.display = "none";
  };

  return (
    <>
      <section id="booking-section" className="book-section">
        {/* overlay */}
        <div
          onClick={openModal}
          className={`modal-overlay ${modal ? "active-modal" : ""}`}
        ></div>

        <div className="container">
          <div className="book-content">
            <div className="book-content__box">
              <h2>Book a car</h2>

              <p className="error-message">
                All fields required! <i className="fa-solid fa-xmark"></i>
              </p>

              <p className="booking-done">
                Check your email to confirm an order.{" "}
                <i onClick={hideMessage} className="fa-solid fa-xmark"></i>
              </p>

              <form className="box-form">
                <div className="box-form__car-type">
                  <label>
                    <i className="fa-solid fa-car"></i> &nbsp; Select Your Car
                    Type <b>*</b>
                  </label>
                  <select value={carType} onChange={handleCar}>
                    <option>Select your car type</option>
                    <option value="Audi A1 S-Line">Audi A1 S-Line</option>
                    <option value="VW Golf 6">VW Golf 6</option>
                    <option value="Toyota Camry">Toyota Camry</option>
                    <option value="BMW 320 ModernLine">
                      BMW 320 ModernLine
                    </option>
                    <option value="Mercedes-Benz GLK">Mercedes-Benz GLK</option>
                    <option value="VW Passat CC">VW Passat CC</option>
                  </select>
                </div>

                <div className="box-form__car-type">
                  <label>
                    <i className="fa-solid fa-location-dot"></i> &nbsp; Pick-up{" "}
                    <b>*</b>
                  </label>
                  <select value={pickUp} onChange={handlePick}>
                    <option>Select pick up location</option>
                    <option>Delhi</option>
                    <option>Kolkata</option>
                    <option>Bengaluru</option>
                    <option>Mumbai</option>
                    <option>Goa</option>
                  </select>
                </div>

                <div className="box-form__car-type">
                  <label>
                    <i className="fa-solid fa-location-dot"></i> &nbsp; Drop-off{" "}
                    <b>*</b>
                  </label>
                  <select value={dropOff} onChange={handleDrop}>
                    <option>Select drop off location</option>
                    <option>Indore</option>
                    <option>Kolkata</option>
                    <option>Bengaluru</option>
                    <option>Mumbai</option>
                    <option>Goa</option>
                  </select>
                </div>

                <div className="box-form__car-time">
                  <label htmlFor="picktime">
                    <i className="fa-regular fa-calendar-days "></i> &nbsp;
                    Pick-up <b>*</b>
                  </label>
                  <input
                    id="picktime"
                    value={pickTime}
                    onChange={handlePickTime}
                    type="date"
                  ></input>
                </div>

                <div className="box-form__car-time">
                  <label htmlFor="droptime">
                    <i className="fa-regular fa-calendar-days "></i> &nbsp;
                    Drop-off <b>*</b>
                  </label>
                  <input
                    id="droptime"
                    value={dropTime}
                    onChange={handleDropTime}
                    type="date"
                  ></input>
                </div>

                <button onClick={openModal} type="submit">
                  Search
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* modal ------------------------------------ */}

      <div className={`booking-modal ${modal ? "active-modal" : ""}`}>
        {/* title */}
        <div className="booking-modal__title">
          <h2>Complete Reservation</h2>
          <i onClick={openModal} className="fa-solid fa-xmark"></i>
        </div>

      <div
  className="booking-modal__content"
  style={{
    maxWidth: "700px",
    margin: "20px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    backgroundColor: "#fff",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
    fontFamily: "Arial, sans-serif",
  }}
>
  {/* Car Image */}
  <div
    className="modal__car-img"
    style={{
      textAlign: "center",
      marginBottom: "20px",
    }}
  >
    <img
      src={imgUrl}
      alt={carType}
      style={{
        width: "100%",
        maxWidth: "500px",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    />
  </div>

  {/* Location & Date Details */}
  <div
    className="modal__details"
    style={{
      marginBottom: "20px",
    }}
  >
    <p
      style={{
        fontSize: "18px",
        fontWeight: "bold",
        marginBottom: "15px",
      }}
    >
      Location & Date
    </p>

    <div style={{ marginBottom: "10px" }}>
      <span
        style={{
          fontSize: "14px",
          color: "#555",
          display: "block",
          marginBottom: "5px",
        }}
      >
        Pick-Up Date & Time
      </span>
      <p style={{ fontSize: "16px", color: "#333" }}>{pickTime} / 10:00 AM</p>
    </div>

    <div>
      <span
        style={{
          fontSize: "14px",
          color: "#555",
          display: "block",
          marginBottom: "5px",
        }}
      >
        Drop-Off Date & Time
      </span>
      <p style={{ fontSize: "16px", color: "#333" }}>{dropTime} / 10:00 AM</p>
    </div>
  </div>

  {/* Personal Information Form */}
  <div className="modal__contact-details">
    <p
      style={{
        fontSize: "18px",
        fontWeight: "bold",
        marginBottom: "15px",
      }}
    >
      Personal Information
    </p>

    <form
      className="contact-details__form"
      style={{
        display: "flex",
        flexDirection: "column",
      }}
      onSubmit={confirmBooking}
    >
      <div
        style={{
          display: "flex",
          gap: "15px",
          marginBottom: "15px",
        }}
      >
        <input
          type="text"
          value={name}
          onChange={handleName}
          placeholder="First Name *"
          style={{
            flex: 1,
            padding: "10px",
            fontSize: "14px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />
        <input
          type="text"
          value={lastName}
          onChange={handleLastName}
          placeholder="Last Name *"
          style={{
            flex: 1,
            padding: "10px",
            fontSize: "14px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          gap: "15px",
          marginBottom: "15px",
        }}
      >
        <input
          type="text"
          value={phone}
          onChange={handlePhone}
          placeholder="Phone Number *"
          style={{
            flex: 1,
            padding: "10px",
            fontSize: "14px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />
        <input
          type="text"
          value={age}
          onChange={handleAge}
          placeholder="Age *"
          style={{
            flex: 1,
            padding: "10px",
            fontSize: "14px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          gap: "15px",
          marginBottom: "15px",
        }}
      >
        <input
          type="email"
          value={email}
          onChange={handleEmail}
          placeholder="Email Address *"
          style={{
            flex: 1,
            padding: "10px",
            fontSize: "14px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />
        <input
          type="text"
          value={address}
          onChange={handleAddress}
          placeholder="Street Address"
          style={{
            flex: 1,
            padding: "10px",
            fontSize: "14px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          gap: "15px",
          marginBottom: "15px",
        }}
      >
        <input
          type="text"
          value={city}
          onChange={handleCity}
          placeholder="City"
          style={{
            flex: 1,
            padding: "10px",
            fontSize: "14px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />
        <input
          type="text"
          value={zipcode}
          onChange={handleZip}
          placeholder="Zip Code"
          style={{
            flex: 1,
            padding: "10px",
            fontSize: "14px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />
      </div>

      <button
        type="submit"
        style={{
          padding: "12px",
          fontSize: "16px",
          color: "#fff",
          backgroundColor: "#007bff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          transition: "background-color 0.3s ease",
        }}
      >
        Reserve Now
      </button>
    </form>
  </div>
</div>

      </div>
    </>
  );
}

export default BookCar;
