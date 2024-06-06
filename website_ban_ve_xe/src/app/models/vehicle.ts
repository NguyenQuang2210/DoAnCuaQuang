export class Vehicle {
   id: number = 0;
   licensePlate: string = "";
   status:boolean;
   idType: number = 0;

    setRate(data:any){
        this.id = data.id
        this.licensePlate = data.license_plates
        this.status = data.status
        this.idType = data.id_type
    }
}