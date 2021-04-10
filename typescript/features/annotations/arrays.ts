// Inference in action
const carMakers = ["ford", "toyota", "chevy"];
const dates = [new Date(), new Date()];

// Inference of arrays of arrays (string[][])
const carsByMake = [["f150"], ["corolla"], ["camaro"]];

// Help with inference when extracting values
const car = carMakers[0]; // infers string
const myCar = carMakers.pop(); // infers string

// Prevent incompatible values
// carMakers.push(100);

// Help with map
carMakers.map((car: string): string => {
  return car; // autocomplete lists out expected values
});

// Flexible types
const importantDates: (Date | string)[] = [new Date(), "2030-10-10"];
importantDates.push("2030-10-10");
importantDates.push(new Date());
