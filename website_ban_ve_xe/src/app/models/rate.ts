export class Rate {
    daySend: Date = new Date();
    id: number = 0;
    name: string = "";
    phoneNumber: string = "";
    content: string = "";

    setRate(data:any){
        this.id = data.id
        this.daySend = new Date(data.day_send);
        this.name = data.name
        this.content = data.content
        this.phoneNumber = data.phone_number
    }
}