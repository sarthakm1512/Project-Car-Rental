using Car_Rental_System_New.Models;
using Car_Rental_System_New.Repositories;
using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using FluentAssertions;
using System;
using System.Linq;
using System.Collections.Generic;

namespace Car_Rental_System_New.Tests
{
    [TestFixture]
    public class PaymentServiceTests
    {
        private DbContextOptions<MyContext> _dbContextOptions;
        private MyContext _context;
        private PaymentService _paymentService;

        [SetUp]
        public void SetUp()
        {
            // Set up in-memory database for testing
            _dbContextOptions = new DbContextOptionsBuilder<MyContext>()
                .UseInMemoryDatabase("Car_Rental_System_New_Test_DB")  // Ensure a unique name for each test run
                .Options;

            _context = new MyContext(_dbContextOptions);
            _context.Database.EnsureDeleted();  // Delete any existing in-memory data
            _context.Database.EnsureCreated(); // Recreate the database

            _paymentService = new PaymentService(_context);

            // Seed data with a unique ReservationId (using a random value to avoid conflicts)
            if (!_context.Reservation.Any(r => r.ReservationId == 1)) // Check if the reservation already exists
            {
                _context.Reservation.Add(new Reservation { ReservationId = 1, Status = "Pending" });
                _context.SaveChanges();
            }
        }

        [Test]
        public void MakePayment_ShouldCreatePayment()
        {
            // Arrange
            var reservationId = 1;

            // Act
            var payment = _paymentService.MakePayment(reservationId, 100.00m);

            // Assert
            payment.Should().NotBeNull();
            payment.ReservationId.Should().Be(reservationId);
            payment.Amount.Should().Be(100.00m);
            payment.PaymentStatus.Should().Be("Pending");
            payment.PaymentDate.Should().BeCloseTo(DateTime.UtcNow, TimeSpan.FromSeconds(1));  // Check date close to current UTC time
        }

        [Test]
        public void ConfirmPayment_ShouldUpdatePaymentStatusAndReservationStatus()
        {
            // Arrange
            var payment = _paymentService.MakePayment(1, 100.00m);

            // Act
            var confirmedPayment = _paymentService.ConfirmPayment(payment.PaymentId);

            // Assert
            confirmedPayment.PaymentStatus.Should().Be("Completed");
            confirmedPayment.Reservation.Status.Should().Be("Confirmed");
        }

        [Test]
        public void IssueRefund_ShouldUpdatePaymentStatusToRefunded()
        {
            // Arrange
            var payment = _paymentService.MakePayment(1, 100.00m);
            _paymentService.ConfirmPayment(payment.PaymentId);  // Confirm the payment to make it eligible for refund

            // Act
            var refundedPayment = _paymentService.IssueRefund(payment.PaymentId, 50.00m);

            // Assert
            refundedPayment.PaymentStatus.Should().Be("Refunded");
            refundedPayment.Amount.Should().Be(50.00m);
        }

        [Test]
        public void GetAllPayments_ShouldReturnAllPayments()
        {
            // Arrange
            var payment1 = _paymentService.MakePayment(1, 100.00m);
            var payment2 = _paymentService.MakePayment(1, 200.00m);

            // Act
            var payments = _paymentService.GetAllPayments().ToList();

            // Assert
            payments.Should().HaveCount(2);
            payments.Should().Contain(p => p.PaymentId == payment1.PaymentId);
            payments.Should().Contain(p => p.PaymentId == payment2.PaymentId);
        }

        [Test]
        public void ConfirmPayment_ShouldThrowExceptionForInvalidPaymentId()
        {
            // Act & Assert
            Action act = () => _paymentService.ConfirmPayment(999); // Invalid payment ID
            act.Should().Throw<ArgumentException>().WithMessage("Invalid Payment ID.");
        }

        [Test]
        public void IssueRefund_ShouldThrowExceptionForNonCompletedPayments()
        {
            // Arrange
            var payment = _paymentService.MakePayment(1, 100.00m);

            // Act & Assert
            Action act = () => _paymentService.IssueRefund(payment.PaymentId, 50.00m);
            act.Should().Throw<InvalidOperationException>().WithMessage("Refunds can only be issued for completed payments.");
        }
    }
}
