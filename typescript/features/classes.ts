{
  class Vehicle {
    constructor(public color: string) {
      // public, private, or protected marks how the field can be accessed
      // the 'public color' means it is a set as a public field
      this.color = color;
    }

    // Not allowed to be accessed by children
    // private honk(): void {
    //   console.log("beep");
    // }

    // Private, with the exception that it can be accessed by children clases
    protected honk(): void {
      console.log("beep");
    }
  }

  class Car extends Vehicle {
    constructor(public wheels: number, color: string) {
      // Notice no 'public' in front of color. This is because we don't want a new field 'color' for Car since it
      // goes to Vehicle
      super(color);
    }

    private drive(): void {
      console.log("vroom");
    }

    startDrivingProcess(): void {
      this.drive();
      this.honk();
    }
  }

  const car = new Car(4, "red");
  car.startDrivingProcess();

  const vehicle = new Vehicle("red");
  console.log(vehicle.color);
}
