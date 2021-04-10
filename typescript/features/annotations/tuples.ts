const drink = {
  color: "brown",
  carbonated: true,
  sugar: 40,
};

// tuple version of the above object
// 1.
const pepsi: [string, boolean, number] = ["brown", true, 40];
// 2.
type Drink = [string, boolean, number]; // Type alias
const sprite: Drink = ["clear", true, 40];

// Tuples in action (why use tuples)
const carSpecs: [number, number] = [400, 3354]; // meaning of the numbers are unclear

const carStats = {
  // meaning is clear
  horsepower: 400,
  weight: 3354,
};
