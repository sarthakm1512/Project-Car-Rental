using Car_Rental_System_New.Controllers;
using Car_Rental_System_New.Models;
using Car_Rental_System_New.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UnitTest
{
    internal class ReservationServiceTest
    {
        private Mock<IReservationService> _mockReservationService;
        private ReservationController _controller;
        private Mock<ILogger<ReservationController>> _mockLogger;
        private MyContext _context;

        [SetUp]
        public void Setup()
        {
            _mockReservationService = new Mock<IReservationService>();
            _mockLogger = new Mock<ILogger<ReservationController>>();
            // _controller = new ReservationController(_context, _mockReservationService.Object, _mockLogger.Object);
        }

        [Test]
        public void GetAllReservations_ReturnsOkResult_WithListOfReservations()
        {
            // Arrange
            var reservations = new List<Reservation> {
                new Reservation { ReservationId = 1, PickupDate = DateTime.Parse("2023-11-24"), DropoffDate = DateTime.Parse("2023-11-29"), TotalPrice = 9999 },
                new Reservation { ReservationId = 2, PickupDate = DateTime.Parse("2023-11-14"), DropoffDate = DateTime.Parse("2023-11-18"), TotalPrice = 7999 }
            };
            _mockReservationService.Setup(service => service.GetAllReservations()).Returns((IEnumerable<Car_Rental_System_New.DTOs.ReservationDTO>)reservations);



            [Test]
            public void UpdateReservation_ValidIdAndReservation_ReturnsOkResult()
            {
                // Arrange
                var ReservationId = 1;
                var updatedReservation = new Reservation { ReservationId = ReservationId, PickupDate = DateTime.Parse("2023-11-14"), DropoffDate = DateTime.Parse("2023-11-18"), TotalPrice = 7999 };
                _mockReservationService.Setup(service => service.UpdateReservation(updatedReservation)).Returns("Reservation updated successfully");

                // Act
                var result = _controller.Put(updatedReservation);

                // Assert
                Assert.IsInstanceOf<OkObjectResult>(result);
                var okResult = result as OkObjectResult;
                Assert.AreEqual("Reservation updated successfully", okResult?.Value?.ToString());
            }

            [Test]
            public void DeleteReservation_ValidId_ReturnsOkResult()
            {
                // Arrange
                var reservationId = 1;
                _mockReservationService.Setup(service => service.CancelReservation(reservationId));
                // Act
                var result = _controller.CancelReservation(reservationId);

                // Assert
                //Assert.IsInstanceOf<OkObjectResult>(result);
                var okResult = result as OkObjectResult;
                Assert.Equals("Reservation deleted successfully", okResult?.Value?.ToString());
            }
        }
    }
}
