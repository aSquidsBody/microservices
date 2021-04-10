{
  const oldCivic = {
    name: "civic",
    year: 2000,
    broken: true,
  };

  // Annotate without interfaces
  const printVehicle = (vehicle: {
    name: string;
    year: number;
    broken: boolean;
  }): void => {
    console.log(`Name ${vehicle.name}`);
    console.log(`Year ${vehicle.year}`);
    console.log(`Broken ${vehicle.broken}`);
  };

  printVehicle(oldCivic);
}

// WITH INTERFACE
{
  interface Vehicle {
    name: string;
    year: Date;
    broken: boolean;
    summary(): string; // a function value
  }

  const oldF150 = {
    name: "f150",
    year: new Date(),
    broken: true,
    summary(): string {
      return `Name: ${this.name}`;
    },
  };

  // Annotate without interfaces
  const printVehicle = (vehicle: Vehicle): void => {
    console.log(vehicle.summary());
  };

  printVehicle(oldF150);
}

// WITH INTERFACE (BARE MINIMUM DEFINITION TO MAKE FUNCTION WORK)
{
  interface Reportable {
    summary(): string;
  }

  const oldF150 = {
    name: "f150",
    year: new Date(),
    broken: true,
    summary(): string {
      return `Name: ${this.name}`;
    },
  };

  // A VERY different object from oldF150, but shares the same type of Reportable
  const drink = {
    color: "brown",
    carbonated: true,
    suage: 40,
    summary(): string {
      return `My drink has ${this.sugar} grams of sugar`;
    },
  };

  // Annotate without interfaces
  const printSummary = (item: Reportable): void => {
    console.log(item.summary());
  };

  printSummary(oldF150);
  printSummary(drink); // this wouldn't work with two classes (like Car & Drink)
}
