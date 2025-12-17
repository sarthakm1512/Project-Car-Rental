using NUnit.Framework;
using Car_Rental_System_New.Repositories;
using Car_Rental_System_New.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using FluentAssertions;

[TestFixture]
public class CarServiceTests
{
    private DbContextOptions<MyContext> _dbContextOptions;
    private MyContext _context;
    private CarService _carService;

    [SetUp]
    public void SetUp()
    {
        // Create an in-memory database with the name "Car_Rental_System_New"
        _dbContextOptions = new DbContextOptionsBuilder<MyContext>()
                                .UseInMemoryDatabase(databaseName: "Car_Rental_System_New")
                                .Options;

        // Create the context using the in-memory database
        _context = new MyContext(_dbContextOptions);
        _context.Database.EnsureCreated(); // Ensure the database is created

        // Add test data for the Car entity
        _context.Car.AddRange(new List<Car>
{
    new Car
    {
        CarId = 1,
        Make = "Toyota",
        Model = "Corolla",
        Year = 2020,
        PricePerDay = 50,
        Location = "New York",
        AvailabilityStatus = "Available",
        ImageUrl = "https://example.com/car1.jpg",  // Provide a value for ImageUrl
        Specification = "Automatic, 4-door sedan"  // Provide a value for Specification
    },
    new Car
    {
        CarId = 2,
        Make = "Honda",
        Model = "Civic",
        Year = 2021,
        PricePerDay = 60,
        Location = "Los Angeles",
        AvailabilityStatus = "Available",
        ImageUrl = "https://example.com/car2.jpg",  // Provide a value for ImageUrl
        Specification = "Manual, 2-door coupe"  // Provide a value for Specification
    }
});

        _context.SaveChanges(); // Save changes to the in-memory database

        // Initialize the CarService with the in-memory context
        _carService = new CarService(_context);
    }

    [TearDown]
    public void TearDown()
    {
        // Clean up after each test
        _context.Database.EnsureDeleted(); // Delete the in-memory database
        _context.Dispose(); // Dispose the context
    }

    [Test]
    public void GetAllCars_ShouldReturnAllCars()
    {
        // Act
        var cars = _carService.GetAllCars();

        // Assert
        Assert.That(cars, Is.Not.Null);
        Assert.That(cars.Count, Is.EqualTo(2));  // Verify that two cars are present
    }


    [Test]
    public void AddNewCar_ShouldAddCarAndReturnCarId()
    {
        // Arrange
        var newCar = new Car
        {
            Make = "Toyota",
            Model = "Camry",
            Year = 2022,
            Location = "New York",
            PricePerDay = 50.00m,
            AvailabilityStatus = "Available",
            ImageUrl = "http://example.com/car-image.jpg",
            Specification = "V6 Engine, Automatic Transmission" 
        };

        // Act
        var carId = _carService.AddNewCar(newCar);

        // Assert
        carId.Should().BeGreaterThan(0);  // The CarId should be greater than 0 if successfully added
        var addedCar = _context.Car.FirstOrDefault(c => c.CarId == carId);  // Fetch the car from the context
        addedCar.Should().NotBeNull();  // The car should exist in the database
        addedCar.Make.Should().Be(newCar.Make);  // Ensure the Make matches
        addedCar.Model.Should().Be(newCar.Model);  // Ensure the Model matches
    }

    [Test]
    public void DeleteCar_ShouldRemoveCar()
    {
        // Act
        var result = _carService.DeleteCar(1);  // Attempt to delete the car with ID 1

        // Assert
        Assert.That(result, Is.EqualTo("the given Car id 1 Removed"));
        Assert.That(_context.Car.Count(), Is.EqualTo(1));  // Verify that there is only one car left in the database
    }

    [Test]
    public void DeleteCar_ShouldReturnError_WhenCarDoesNotExist()
    {
        // Act
        var result = _carService.DeleteCar(99);  // Attempt to delete a non-existent car with ID 99

        // Assert
        Assert.That(result, Is.EqualTo("Something went wrong with deletion")); // Ensure error message is returned
    }

    [Test]
    public void GetCarById_ShouldReturnCar_WhenCarExists()
    {
        // Act
        var car = _carService.GetCarById(1);  // Attempt to get the car with ID 1

        // Assert
        Assert.That(car, Is.Not.Null);  // Verify the car is not null
        Assert.That(car.Make, Is.EqualTo("Toyota"));  // Verify the make of the car is Toyota
    }

    [Test]
    public void GetCarById_ShouldReturnNull_WhenCarDoesNotExist()
    {
        // Act
        var car = _carService.GetCarById(99);  // Attempt to get a non-existent car with ID 99

        // Assert
        Assert.That(car, Is.Null);  // Verify the car is null
    }

    [Test]
    public void UpdateCar_ShouldModifyExistingCar()
    {
        // Arrange
        var updatedCar = new Car { CarId = 1, Make = "Tesla", Model = "Model S", Year = 2022, PricePerDay = 100, Location = "San Francisco", AvailabilityStatus = "Available" };

        // Act
        var result = _carService.UpdateCar(updatedCar);

        // Assert
        Assert.That(result, Is.EqualTo("Record Updated successfully"));  // Ensure the update message is returned
        var car = _context.Car.FirstOrDefault(c => c.CarId == 1);  // Retrieve the updated car from the database
        Assert.That(car.Make, Is.EqualTo("Tesla"));  // Verify the make of the car was updated to Tesla
    }

    [Test]
    public void UpdateCar_ShouldReturnError_WhenCarDoesNotExist()
    {
        // Arrange
        var nonExistentCar = new Car { CarId = 99, Make = "Fake", Model = "Car", Year = 2023 };  // Car with ID 99 doesn't exist

        // Act
        var result = _carService.UpdateCar(nonExistentCar);

        // Assert
        Assert.That(result, Is.EqualTo("something went wrong while update"));  // Ensure the error message is returned
    }
}
