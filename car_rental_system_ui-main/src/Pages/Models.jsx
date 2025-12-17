import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from "../components/Footer";
import HeroPages from "../components/HeroPages";

function Models() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch car data from the API
  useEffect(() => {
    fetch('https://localhost:7257/api/Car/GetAllCars')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setCars(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching car data:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading car models...</div>;
  }

  if (error) {
    return <div>Error loading car models: {error}</div>;
  }

  return (
    <>
      <section className="models-section">
        <HeroPages name="Vehicle Models" />
        <div className="container">
          <div className="models-div">
            {cars.map(car => (
              <div key={car.carId} className="models-div__box">
                <div className="models-div_box_img">
                  <img
                    src={car.imageUrl || "https://via.placeholder.com/300"}
                    alt={`${car.make} ${car.model}`}
                  />
                  <div className="models-div_box_descr">
                    <div className="models-div_boxdescr_name-price">
                      <div className="models-div_boxdescrname-price_name">
                        <p>{car.make} {car.model}</p>
                        <span>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                        </span>
                      </div>
                      <div className="models-div_boxdescrname-price_price">
                        <h4>${car.pricePerDay.toFixed(2)}</h4>
                        <p>per day</p>
                      </div>
                    </div>
                    <div className="models-div_boxdescrname-price_details">
                      <span>
                        <i className="fa-solid fa-car-side"></i> &nbsp; {car.make}
                      </span>
                      <span style={{ textAlign: "right" }}>
                        {car.year} &nbsp; <i className="fa-solid fa-calendar"></i>
                      </span>
                      <span>
                        <i className="fa-solid fa-cogs"></i> &nbsp; {car.specification || "N/A"}
                      </span>
                      <span style={{ textAlign: "right" }}>
                        {car.availabilityStatus || "Unknown"} &nbsp; <i className="fa-solid fa-check"></i>
                      </span>
                    </div>
                    <div className="models-div_boxdescrname-price_btn">
                      <Link onClick={() => window.scrollTo(0, 0)} to="/">
                        Book Ride
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </section>
    </>
  );
}

export default Models;