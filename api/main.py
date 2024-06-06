# dinh nghia api
from datetime import datetime, date
from fastapi import Depends, FastAPI, File, Query, Body, Response, status, Form, HTTPException, Request, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional, Set
from pydantic import BaseModel, Field
from fastapi.responses import FileResponse, JSONResponse, PlainTextResponse
from starlette.exceptions import HTTPException as StarletteHTTPException
from sqlalchemy.orm import Session


from app import crud, models, schemas
from app.database import SessionLocal, engine 



models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
# Rate
@app.get("/")
def show():
    return "hello"

@app.get("/rating/")
def get_rating(db: Session = Depends(get_db)):
    return crud.check_rating(db)

@app.post("/create_rating/")
def create_rating(rate: schemas.Rating, db: Session = Depends(get_db)):
    return crud.add_rating(db, rate)

@app.post("/update_rating/{id}")
def update_rating(rate:schemas.Rating,id:int,db: Session=Depends(get_db)):
    return crud.update_rating(db,id,rate)

@app.delete("/delete_rating/{id}")
def delete_rating(id:int,db: Session = Depends(get_db)):
    return crud.delete_rating(db,id),

#Location
@app.get("/location/")
def get_location(db:Session = Depends(get_db)):
    return crud.check_location(db)

@app.post("/create_location/")
def create_location(loc: schemas.Location,db:Session = Depends(get_db)):
    return crud.add_location(db,loc)

@app.delete("/delete_location/{id}")
def delete_location(id:int,db:Session=Depends(get_db)):
    return crud.delete_location(db,id)

#Seat
@app.get("/seat/")
def get_seat(db:Session = Depends(get_db)):
    return crud.check_seat(db)

@app.post("/create_seat/")
def create_seat(seat: schemas.Seat,db:Session = Depends(get_db)):
    return crud.add_seat(db,seat)

@app.delete("/delete_seat/{id}")
def delete_seat(id:int,db:Session=Depends(get_db)):
    return crud.delete_seat(db,id)

#Service
@app.get("/service/")
def get_service(db:Session = Depends(get_db)):
    return crud.check_service(db)

@app.post("/create_service/")
def create_service(ser: schemas.Service,db:Session = Depends(get_db)):
    return crud.add_service(db,ser)

@app.delete("/delete_service/{id}")
def delete_service(id:int,db:Session=Depends(get_db)):
    return crud.delete_service(db,id)

#TypeOfvehicle
@app.get("/tov/")
def get_tov(db:Session = Depends(get_db)):
    return crud.check_tov(db)

@app.post("/create_tov/")
def create_tov(tov: schemas.TypeOfVehicle,db:Session = Depends(get_db)):
    return crud.add_tov(db,tov)

@app.delete("/delete_tov/{id}")
def delete_tov(id:int,db:Session=Depends(get_db)):
    return crud.delete_tov(db,id)

#Vehicle
@app.get("/vehicle/")
def get_vehicle(db: Session = Depends(get_db)):
    return crud.check_vehicle(db)

@app.post("/create_vehicle/")
def create_vehicle(data: schemas.Vehicle, db: Session = Depends(get_db)):
    return crud.add_vehicle(db, data)

@app.get("/vehicle/{id}")
def get_vehicle(id:int,db: Session = Depends(get_db)):
    return crud.get_vehicle_by_id(db,id)

@app.post("/update_vehicle/{id}")
def update_vehicle(rate:schemas.Vehicle,id:int,db: Session=Depends(get_db)):
    return crud.update_vehicle(db,id,rate)

@app.delete("/delete_vehicle/{id}")
def delete_vehicle(id:int,db: Session = Depends(get_db)):
    return crud.delete_vehicle(db,id),

#Driver
@app.get("/driver/")
def get_driver(db: Session = Depends(get_db)):
    return crud.check_driver(db)

@app.get("/driver/{id}")
def get_driver(id:int,db: Session = Depends(get_db)):
    return crud.get_driver_by_id(db,id)

@app.post("/create_driver/")
def create_driver(data: schemas.Driver, db: Session = Depends(get_db)):
    return crud.add_driver(db, data)

@app.post("/update_driver/{id}")
def update_driver(rate:schemas.Driver,id:int,db: Session=Depends(get_db)):
    return crud.update_driver(db,id,rate)

@app.delete("/delete_driver/{id}")
def delete_driver(id:int,db: Session = Depends(get_db)):
    return crud.delete_driver(db,id),

@app.get("/getdrivername/{id}")
def get_driver_name(id:int,db: Session = Depends(get_db)):
    return crud.get_driver_name(db,id)

#Tour
@app.get("/tour/")
def get_tour(db:Session = Depends(get_db)):
    return crud.check_tour(db)

@app.post("/create_tour/")
def create_tour(tov: schemas.Tour,db:Session = Depends(get_db)):
    return crud.add_tour(db,tov)

@app.delete("/delete_tour/{id}")
def delete_tour(id:int,db:Session=Depends(get_db)):
    return crud.delete_tour(db,id)

#Buses
@app.get("/buses/")
def get_buses(db:Session = Depends(get_db)):
    return crud.check_buses(db)

@app.post("/create_buses/")
def create_buses(tov: schemas.Buses,db:Session = Depends(get_db)):
    return crud.add_buses(db,tov)

@app.delete("/delete_buses/{id}")
def delete_buses(id:int,db:Session=Depends(get_db)):
    return crud.delete_buses(db,id)

@app.get("/buses/{id}")
def get_buses(id:int,db: Session = Depends(get_db)):
    return crud.get_buses_by_id(db,id)

@app.post("/update_buses/{id}")
def update_buses(rate:schemas.Buses,id:int,db: Session=Depends(get_db)):
    return crud.update_buses(db,id,rate)

@app.get("/getbusestoday/")
def get_buses_today(db:Session = Depends(get_db)):
    return crud.check_buses_today(db)

@app.get("/searchbuses/")
def search_buses(id_tour: int, departure_date: str, db: Session = Depends(get_db)):
    buses = crud.check_buses_by_route_and_date(db, id_tour, departure_date)
    if not buses:
        raise HTTPException(status_code=404, detail="Buses not found")
    return buses

@app.get("/clientsearchbuses/")
def search_buses(id_tour: int, departure_date: str, db: Session = Depends(get_db)):
    buses = crud.check_buses_by_tour_and_date(db, id_tour, departure_date)
    if not buses:
        raise HTTPException(status_code=404, detail="Buses not found")
    return buses


@app.get("/empty_seats/{id}")
def get_empty_seats(id:int,db: Session = Depends(get_db)):
    return crud.get_empty_seats(db,id)


#Ticket
@app.get("/ticket/")
def get_ticket(db:Session = Depends(get_db)):
    return crud.check_ticket(db)

@app.post("/create_ticket/")
def create_ticket(data: schemas.Ticket, db: Session = Depends(get_db)):
    return crud.add_ticket(db, data)

@app.delete("/delete_ticket/{id}")
def delete_ticket(id:int,db:Session=Depends(get_db)):
    return crud.delete_ticket(db,id)

@app.get("/getticketlist/{id}")
def get_tickets_by_id_buses(id:int,db:Session = Depends(get_db)):
    return crud.get_tickets_by_buses_id(db,id)

@app.post("/update_ticket/{id}")
def update_ticket(rate:schemas.Ticket,id:int,db: Session=Depends(get_db)):
    return crud.update_ticket(db,id,rate)

@app.get("/ticket/{id}")
def get_ticket_by_id(id:int,db: Session = Depends(get_db)):
    return crud.get_ticket_by_id(db,id)

@app.get("/searchticket/{id}")
def search_ticket(id:int,phone: str, db: Session = Depends(get_db)):
    buses = crud.check_ticket_by_phone_number(db, phone,id)
    if not buses:
        raise HTTPException(status_code=404, detail="Buses not found")
    return buses

@app.get("/ticket_name/{id}")
def get_name_by_id_seatdetail(id:int,db:Session = Depends(get_db)):
    return crud.get_seat_name_by_seatdetail_id(db,id)

@app.post("/create_client_ticket/")
def  add_client_ticket(data: schemas.Ticket, db: Session = Depends(get_db)):
    return crud.add_client_ticket(db,data)

@app.get("/get_order/")
def get_order(db:Session = Depends(get_db)):
    return crud.get_order(db)

@app.get("/get_order/{id}")
def get_order_by_id(id:int,db:Session = Depends(get_db)):
    return crud.get_ticket_details_by_id(db,id)

@app.get("/access_order/{id}")
def access_order(id:int,message_text: Optional[str],db:Session = Depends(get_db)):
    return crud.acess_order(db,id,message_text)

@app.get("/deny_order/{id}")
def deny_order(id: int, message_text: Optional[str],db: Session = Depends(get_db)):
    return crud.deny_order(db, id,message_text)

@app.get("/receive_payment/{id}")
def receive_payment(id:int,db:Session = Depends(get_db)):
    return crud.sucess_bill(db,id)

@app.get("/tickets/")
def read_tickets(ids: List[int] = Query(None), db: Session = Depends(get_db)):
    if not ids:
        return []
    return crud.get_ticket_by_list_id(db, ids)

@app.get("/onlinetickets/")
def read_onlinetickets(db: Session = Depends(get_db)):
    return crud.count_online_tickets(db)

@app.get("/offlinetickets/")
def read_offlinetickets(db: Session = Depends(get_db)):
    return crud.count_offline_tickets(db)

@app.get("/get_revenue/{yeah}")
def get_revenue(yeah:int,db: Session = Depends(get_db)):
    return crud.get_ticket_counts_by_month(yeah,db)

@app.get("/searchticket/{id}")
def search_ticket(id:int,phone: str, db: Session = Depends(get_db)):
    buses = crud.search_order(db, phone,id)
    if not buses:
        raise HTTPException(status_code=404, detail="Buses not found")
    return buses

@app.get("/searchorder/")
def searchorder(id_tour:int,phone: str,date: str, db: Session = Depends(get_db)):
    order = crud.search_order(db, phone,id_tour,date)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order

@app.get("/get_chart_from_to_date/")
def get_chart_from_to_date(from_date: str, to_date: str, db: Session = Depends(get_db)):
    return crud.get_chart_fromdate_to_date(db, from_date, to_date)

#SeatDetail
@app.get("/seatdetail/{id}")
def get_seatdetail_by_id_buses(id:int,db:Session = Depends(get_db)):
    return crud.check_seatdetail_by_id_buses(db,id)


#Notification
@app.get("/notification/",response_model=List[schemas.NotificationWithTrip])
def get_notifications(db: Session = Depends(get_db)):
    return crud.check_notification(db)

@app.get("/seat_name_by_ticket_id/{ticket_id}")
def get_seat_name_ticket_id(ticket_id: int, db: Session = Depends(get_db)):
    return crud.get_seatname_by_ticket_id(db,ticket_id)