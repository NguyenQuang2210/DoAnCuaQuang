export class SeatDetail {
    id: number = 0;
    id_buses:number = 0;
    id_seat:number = 0;
    status:number = 0;
    selected:boolean=false;
 
    setRate(data:any){
        this.id = data.id
        this.id_buses = data.id_buses
        this.id_seat = data.id_seat
        this.status = data.status
    }
 }