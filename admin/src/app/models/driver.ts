export class Driver {
    id: number = 0;
    name: string = "";
    phoneNumber: string = "";
    driveLicense: string = "";
    dateStart:Date = new Date();
    status:boolean;
 
     setRate(data:any){
         this.id = data.id
         this.name = data.name
         this.driveLicense = data.driver_license
         this.status = data.status
         this.phoneNumber = data.phone_number
         this.dateStart = new Date(data.date_start)
     }
 }