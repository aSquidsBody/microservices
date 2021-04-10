const profile = {
  name: "alex",
  age: 20,
  coords: {
    lat: 0,
    lon: 15,
  },
  // NOTE, the is the ES2015 syntax
  setAge(age: number): void {
    this.age = age;
  },
};

// Annotating a destructured object
const { age }: { age: number } = profile;

// Annotating destructured objects in destructured objects
var {
  coords: { lat, lon },
} = profile; // standard syntax

var {
  coords: { lat, lon },
}: { coords: { lat: number; lon: number } } = profile; // standard syntax
