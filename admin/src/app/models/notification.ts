export class Notifiation {
    phone_number(phone_number: any) {
      throw new Error('Method not implemented.');
    }
    id: number = 0;
    message: string = "";
    ticketId:number = 0;
    createAt:Date = new Date();
    idTour: number = 0;
    timeStart: Date = new Date();
    phoneNumber: string = "";

    setRate(data: any) {
        this.id = data.notification.id;
        this.message = data.notification.message || "";  // Đảm bảo không phải là null
        this.createAt = new Date(data.notification.timestamp);
        this.idTour = data.id_tour;
        this.timeStart = new Date(data.time_start);
        this.phoneNumber = data.phone_number;
    }
}