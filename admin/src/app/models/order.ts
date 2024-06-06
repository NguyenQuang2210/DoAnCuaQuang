import { Ticket } from "./ticket"

export class Order {
    ticket: Ticket 
    idTour: number = 0
    timeStart: string = ''
    idBuses:number = 0
    idSeat: number = 0
 
     setRate(data:any){
        if(data?.Ticket?.id){
            const t = new Ticket()
            t.setRate(data.Ticket)
            this.ticket = t
        }
       this.idTour = data.id_tour
       this.timeStart = data.time_start
       this.idBuses = data.id_buses
       this.idSeat = data.id_seat
     }
 }