using Car_Rental_System_New.Controllers;
using Car_Rental_System_New.Models;
using Car_Rental_System_New.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UnitTest
{
    internal class PaymentServiceTest
    {
        // private Mock<ApplicationDbContext> _mockContext;
        private Mock<DbSet<Payment>> _mockPaymentsDbSet;
        private Mock<IPaymentService> _mockPaymentService;
        private PaymentController _controller;
        private Mock<ILogger<PaymentController>> _mockLogger;
        //  private ApplicationDbContext _context;
        private Mock<DbSet<User>> _mockUsersDbSet;

        [SetUp]
        public void Setup()
        {
           // _mockContext = new Mock<MyContext>();


            _mockUsersDbSet = new Mock<DbSet<User>>();
            _mockPaymentsDbSet = new Mock<DbSet<Payment>>();

            // Set up the mock context to return the mock DbSet
           // _mockContext.Setup(c => c.Users).Returns(_mockUsersDbSet.Object);
          //  _mockContext.Setup(c => c.Payments).Returns(_mockPaymentsDbSet.Object);

            _mockPaymentService = new Mock<IPaymentService>();
            _mockLogger = new Mock<ILogger<PaymentController>>();
          //  _controller = new PaymentController(_context, _mockPaymentService.Object, _mockLogger.Object);
        }

        [Test]
        public void GetAlPaymentrs_ReturnsOkResult_WithListOfPayments()
        {
            // Arrange
            var Payments = new List<Payment> {
                new Payment { PaymentId = 1, Amount = 8999, PaymentStatus = "Pending" },
                new Payment { PaymentId = 2, Amount = 7999, PaymentStatus = "Completed" }
            };
            _mockPaymentService.Setup(service => service.ConfirmPayment()).Returns(Payments);

            // Act
            var result = _controller.ConfirmPayment();

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result);
            var okResult = result as OkObjectResult;
            Assert.Equals(Payments, okResult?.Value);
        }

        [Test]
        public void GetPaymentById_PaymentExists_ReturnsOkResult_WithPayment()
        {
            // Arrange
            var paymentId = 1;
            var Payment = new Payment { PaymentId = paymentId, Amount = 8999, PaymentStatus = "Pending" };
            _mockPaymentService.Setup(service => service.ConfirmPayment(paymentId)).Returns(Payment);

            // Act
            var result = _controller.ConfirmPayment(paymentId);

            // Assert
           // Assert.IsInstanceOf<OkObjectResult>(result);
           // var okResult = result as OkObjectResult;
            Assert.Equals(Payment, okResult?.Value);
        }


        [Test]
        public void AddPayment_ValidPayment_ReturnsCreatedAtAction()
        {
            // Arrange
            var newPayment = new Payment { Amount = 8999, PaymentStatus = "Pending" };
            _mockPaymentService.Setup(service => service.MakePayment(newPayment)).Returns(newPayment.PaymentId);

            // Act
            var result = _controller.Post(newPayment);

            // Assert
           // Assert.IsInstanceOf<CreatedAtActionResult>(result);
            var createdResult = result as CreatedAtActionResult;
            Assert.Equals(newPayment.PaymentId, createdResult?.RouteValues["id"]);
            Assert.Equals(newPayment, createdResult?.Value);
        }

        [Test]
        public void UpdatePayment_ValidIdAndPayment_ReturnsOkResult()
        {
            // Arrange
            var paymentId = 1;
            var updatedPayment = new Payment { PaymentId = paymentId, Amount = 8999, PaymentStatus = "Pending" };
            // _mockPaymentService.Setup(service => service.UpdatePayment(updatedPayment)).Returns("Payment updated successfully");




        }
    }
}

