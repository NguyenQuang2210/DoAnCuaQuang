export class Buses {
    id: number = 0;
    timeStart: Date = new Date();
    timeEnd:  Date = new Date();
    price :number=0;
    idVehicle: number = 0;
    idTour:number=0;
    idDriver:number=0;
     setRate(data:any){
      this.id=data.id
      this.timeStart=new Date(data.time_start)
      this.timeEnd=new Date(data.time_end)
      this.price=data.price
      this.idVehicle=data.id_vehicle
      this.idTour=data.id_tour
      this.idDriver=data.id_driver
     }
 }