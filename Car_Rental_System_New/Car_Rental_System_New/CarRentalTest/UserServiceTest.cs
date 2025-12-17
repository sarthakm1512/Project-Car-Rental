using Car_Rental_System_New.Models;
using Car_Rental_System_New.Repositories;
using Car_Rental_System_New.Authentication;
using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using NUnit.Framework;
using System;
using System.Linq;

namespace Car_Rental_System_New.Tests
{
    [TestFixture]
    public class UserServiceTests
    {
        private DbContextOptions<MyContext> _dbContextOptions;
        private MyContext _context;
        private UserService _userService;
        private JwtTokenGenerator _jwtTokenGenerator;

        [SetUp]
        public void SetUp()
        {
            // Set up in-memory database for testing
            _dbContextOptions = new DbContextOptionsBuilder<MyContext>()
                .UseInMemoryDatabase("Car_Rental_System_New_User_Test_DB")  // Ensure a unique name for each test run
                .Options;

            _context = new MyContext(_dbContextOptions);
            _context.Database.EnsureDeleted();  // Delete any existing in-memory data
            _context.Database.EnsureCreated(); // Recreate the database

            // Seed test data
            SeedTestData();

            var jwtSettings = Options.Create(new JwtSettings { SecretKey = "TestSecretKey" });
            _jwtTokenGenerator = new JwtTokenGenerator(jwtSettings);

            _userService = new UserService(_context, jwtSettings, _jwtTokenGenerator);
        }

        // Seed some test data for users
        private void SeedTestData()
        {
            _context.User.Add(new User { UserId = 1, UserName = "testuser1", PasswordHash = "hashedPassword1", Role = "User", Email = "testuser1@example.com" });
            _context.SaveChanges();
        }

        [Test]
        public void Register_ShouldReturnUser_WhenUserDoesNotExist()
        {
            // Arrange
            var username = "newuser";
            var password = "password123";
            var role = "Admin";
            var email = "newuser@example.com";

            // Act
            var result = _userService.Register(username, password, role, email);

            // Assert
            result.Should().NotBeNull();
            result.UserName.Should().Be(username);
            result.Role.Should().Be(role);
            result.Email.Should().Be(email);
        }

        [Test]
        public void Register_ShouldReturnNull_WhenUserAlreadyExists()
        {
            // Arrange
            var existingUsername = "testuser1";
            var password = "newPassword123";
            var role = "Admin";
            var email = "newuser@example.com";

            // Act
            var result = _userService.Register(existingUsername, password, role, email);

            // Assert
            result.Should().BeNull();
        }

      
        [Test]
        public void Authenticate_ShouldReturnNull_WhenUsernameDoesNotExist()
        {
            // Arrange
            var username = "nonexistentuser";
            var password = "password123";

            // Act
            var token = _userService.Authenticate(username, password);

            // Assert
            token.Should().BeNull();
        }

        [Test]
        public void DeactivateUser_ShouldRemoveUser_WhenUserExists()
        {
            // Arrange
            var userId = 1;

            // Act
            _userService.DeactivateUser(userId);

            // Assert
            var user = _context.User.SingleOrDefault(u => u.UserId == userId);
            user.Should().BeNull();
        }

        [Test]
        public void DeactivateUser_ShouldThrowArgumentException_WhenUserDoesNotExist()
        {
            // Arrange
            var nonExistentUserId = 999;

            // Act & Assert
            Action act = () => _userService.DeactivateUser(nonExistentUserId);
            act.Should().Throw<ArgumentException>().WithMessage("User not found.");
        }

        [Test]
        public void GetAllUsers_ShouldReturnAllUsers()
        {
            // Act
            var result = _userService.GetAllUsers();

            // Assert
            result.Should().HaveCount(1); // We only seeded one user, so it should return 1 user.
            result.First().UserName.Should().Be("testuser1");
        }
    }
}
