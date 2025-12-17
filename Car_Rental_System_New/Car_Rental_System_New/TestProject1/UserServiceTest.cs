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
    internal class UserServiceTest
    {
        private Mock<IUserService> _mockUserService;
        private UserController _controller;
        private Mock<ILogger<UserController>> _mockLogger;

        [SetUp]
        public void Setup()
        {
            _mockUserService = new Mock<IUserService>();
            _mockLogger = new Mock<ILogger<UserController>>();
            _controller = new UserController(_mockUserService.Object, _mockLogger.Object);
        }

        [Test]
        public void GetAllusers_ReturnsOkResult_WithListOfUsers()
        {
            // Arrange
            var users = new List<User> {
                new User { UserId = 1, UserName = "Chris", Email = "chris@example.com", Role = "User" },
                new User { UserId = 2, UserName = "Joe", Email = "joe@example.com", Role = "Admin" }
            };
            _mockUserService.Setup(service => service.Register()).Returns(users);

            // Act
            var result = _controller.GetAll();

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result);
            var okResult = result as OkObjectResult;
            Assert.AreEqual(users, okResult?.Value);
        }

        [Test]
        public void GetUserById_UserExists_ReturnsOkResult_WithUser()
        {
            // Arrange
            var userId = 1;
            var user = new User { UserId = userId, UserName = "Chris", Email = "chris@example.com", Role = "User" };
            _mockUserService.Setup(service => service.GetUserById(userId)).Returns(user);

            // Act
            var result = _controller.GetUserById(userId);

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result);
            var okResult = result as OkObjectResult;
            Assert.AreEqual(user, okResult?.Value);
        }

        [Test]
        public void AddUser_ValidUser_ReturnsCreatedAtAction()
        {
            // Arrange
            var newUser = new User { UserName = "Sam", Email = "sam@example.com", Role = "User" };
            object value = _mockUserService.Setup(service => service.Register(newUser)).Returns(newUser.UserId);

            // Act
            var result = _controller.Register(newUser);

            // Assert
            Assert.IsInstanceOf<CreatedAtActionResult>(result);
            var createdResult = result as CreatedAtActionResult;
            Assert.AreEqual(newUser.UserId, createdResult?.RouteValues["id"]);
            Assert.AreEqual(newUser, createdResult?.Value);
        }

        [Test]
        public void UpdateUser_ValidIdAndUser_ReturnsOkResult()
        {
            // Arrange
            var userId = 1;
            var updatedUser = new User { UserId = userId, UserName = "Chris", Email = "chris@example.com", Role = "User" };
           // _mockUserService.Setup(service => service.UpdateUserp(updatedUser)).Returns("User updated successfully");

            // Act
           // var result = _controller.Put(updatedUser);

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result);
            var okResult = result as OkObjectResult;
            Assert.Equals("User updated successfully", okResult?.Value?.ToString());
        }

        [Test]
        public void DeleteUser_ValidId_ReturnsOkResult()
        {
            // Arrange
            var UserId = 1;
           // _mockUserService.Setup(service => service.DeleteUser(UserId)).Returns("User deleted successfully");

            // Act
           // var result = _controller.Delete(UserId);

            // Assert
           // Assert.IsInstanceOf<OkObjectResult>(result);
           // var okResult = result as OkObjectResult;
           // Assert.AreEqual("User deleted successfully", okResult?.Value?.ToString());
        }

    }
}
