export class Ticket {
    id: number = 0;
    name: string = "";
    phoneNumber: string = "";
    note: string = "";
    totalPrice: number = 0;
    pickUpLoc: string = "";
    dropDownLoc: string = "";
    dateBook: Date = new Date();    
    idAgency: number = 0;
    status:number = 0;
    idSeatdetail: number = 0;
 
     setRate(data:any){
        this.id = data.id
        this.name = data.name
        this.phoneNumber = data.phone_number
        this.note = data.note
        this.totalPrice = data.total_price
        this.pickUpLoc = data.pick_up_loc
        this.dropDownLoc = data.drop_down_loc
        this.dateBook = new Date(data.date_book)
        this.idAgency = data.id_agency
        this.idSeatdetail = data.id_seatdetail
        this.status = data.status
     }
 }