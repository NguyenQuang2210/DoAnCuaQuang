# viet ham logic
from collections import namedtuple
from datetime import date, datetime, timedelta
from typing import List
from fastapi import HTTPException
from sqlalchemy import Interval, and_, asc, extract, false, or_, not_, desc, asc, func, true
from sqlalchemy.orm import Session
from . import models, schemas
from app.models import *
from twilio.rest import Client



# Tạo client Twilio
# client1 = Client(account_sid1, auth_token1)
# client2 = Client(account_sid2, auth_token2)
# 1. Rating

def check_rating(db: Session):
    rate = db.query(models.Rating).all()
    return rate

def add_rating(db: Session, rating : schemas.Rating):
    today = date.today()
    db_rate = models.Rating(name=rating.name, day_send=today, phone_number=rating.phone_number, content=rating.content)
    db.add(db_rate)
    db.commit()
    db.refresh(db_rate)
    return db_rate

def update_rating(db: Session, id: int, rating_update: schemas.Rating):
    rate = db.query(models.Rating).filter(models.Rating.id == id).first()

    if rate:
        db.query(models.Rating).filter(models.Rating.id == id).update({
            "id":id,
            "name": rating_update.name if rating_update.name != None else rate.name,
            "phone_number": rating_update.phone_number if rating_update.phone_number != None else rate.phone_number,
            "day_send": rating_update.day_send if rating_update.day_send != None else rate.day_send,
            "content": rating_update.content if rating_update.content != None else rate.content,
        })
        db.commit()
        db.refresh(rate)
        return rate
    else:
        return "rating not found"

def delete_rating(db: Session,id : int):
    db.query(models.Rating).filter(models.Rating.id == id).delete()
    db.commit()

# 2.Location

def check_location(db:Session):
    loc = db.query(models.Location).all()
    return loc

def add_location(db:Session,loc_create : schemas.Location):
    loc = models.Location(id=loc_create.id,name=loc_create.name)
    db.add(loc)
    db.commit()
    db.refresh(loc)
    return loc

def delete_location(db:Session,id:int):
    db.query(models.Location).filter(models.Location.id == id).delete()
    db.commit()

# 3.Agnecy
# 4.Seat
def check_seat(db:Session):
    seat = db.query(models.Seat).all()
    return seat

def add_seat(db:Session,seat_create : schemas.Seat):
    seat = models.Seat(id=seat_create.id,name=seat_create.name)
    db.add(seat)
    db.commit()
    db.refresh(seat)
    return seat

def delete_seat(db:Session,id:int):
    db.query(models.Seat).filter(models.Seat.id == id).delete()
    db.commit()

# 5.Service
def check_service(db:Session):
    ser = db.query(models.Service).all()
    return ser

def add_service(db:Session,service_create : schemas.Service):
    ser = models.Service(id=service_create.id,name=service_create.name)
    db.add(ser)
    db.commit()
    db.refresh(ser)
    return ser

def delete_service(db:Session,id:int):
    db.query(models.Service).filter(models.Service.id == id).delete()
    db.commit()

# 6.Type of vehicle
def check_tov(db:Session):
    tov = db.query(models.TypeOfVehicle).all()
    return tov

def add_tov(db:Session,tov_create : schemas.TypeOfVehicle):
    tov = models.TypeOfVehicle(id=tov_create.id,name=tov_create.name)
    db.add(tov)
    db.commit()
    db.refresh(tov)
    return tov

def delete_tov(db:Session,id:int):
    db.query(models.TypeOfVehicle).filter(models.TypeOfVehicle.id == id).delete()
    db.commit()

# 7.Vehicle

def check_vehicle(db:Session):
    vehicle = db.query(models.Vehicle).all()
    return vehicle

def add_vehicle(db:Session,vehicle_create : schemas.Vehicle):
    vehicle = models.Vehicle(license_plates=vehicle_create.license_plates,status=vehicle_create.status,id_type=vehicle_create.id_type)
    db.add(vehicle)
    db.commit()
    db.refresh(vehicle)
    return vehicle

def update_vehicle(db:Session,id:int,vehicle_update=schemas.Vehicle):
    vehicle = db.query(models.Vehicle).filter(models.Vehicle.id == id).first()

    if vehicle:
        db.query(models.Vehicle).filter(models.Vehicle.id == id).update({
            "license_plates": vehicle_update.license_plates if vehicle_update.license_plates != None else vehicle.license_plates,
            "status": vehicle_update.status if vehicle_update.status != None else vehicle.status,
            "id_type": vehicle_update.id_type if vehicle_update.id_type != None else vehicle.id_type,
        })
        db.commit()
        db.refresh(vehicle)
        return vehicle
    else:
        return "rating not found"

def delete_vehicle(db:Session,id:int):
    db.query(models.Vehicle).filter(models.Vehicle.id == id).delete()
    db.commit()

def get_vehicle_by_id(db:Session,id:int):
    vehicle = db.query(models.Vehicle).filter(models.Vehicle.id == id).first()
    return vehicle

# 8.Driver

def check_driver(db:Session):
    driver = db.query(models.Driver).all()
    return driver

def add_driver(db:Session,driver_create : schemas.Driver):
    driver = models.Driver(name=driver_create.name,phone_number=driver_create.phone_number,date_start=driver_create.date_start,driver_license=driver_create.driver_license,status=driver_create.status)
    db.add(driver)
    db.commit()
    db.refresh(driver)
    return driver

def get_driver_by_id(db:Session,id:int):
    driver = db.query(models.Driver).filter(models.Driver.id == id).first()
    return driver

def update_driver(db:Session,id:int,driver_update=schemas.Driver):
    driver = db.query(models.Driver).filter(models.Driver.id == id).first()

    if driver:
        db.query(models.Driver).filter(models.Driver.id == id).update({
            "name": driver_update.name if driver_update.name != None else driver.name,
            "phone_number": driver_update.phone_number if driver_update.phone_number != None else driver.phone_number,
            "date_start": driver_update.date_start if driver_update.date_start != None else driver.date_start,
            "driver_license": driver_update.driver_license if driver_update.driver_license != None else driver.driver_license,
            "status": driver_update.status if driver_update.status != None else driver.status,
        })
        db.commit()
        db.refresh(driver)
        return driver
    else:
        return "rating not found"

def delete_driver(db:Session,id:int):
    db.query(models.Driver).filter(models.Driver.id == id).delete()
    db.commit()

def get_driver_name(db: Session, driver_id: int):
    driver = db.query(models.Driver).filter(models.Driver.id == driver_id).first()
    if driver:
        return driver.name
    else:
        return None

# 9.Type of vehicle
def check_tour(db:Session):
    tour = db.query(models.Tour).all()
    return tour

def add_tour(db:Session,tour_create : schemas.Tour):
    tour = models.Tour(id=tour_create.id,id_des_start=tour_create.id_des_start,id_des_end=tour_create.id_des_end)
    db.add(tour)
    db.commit()
    db.refresh(tour)
    return tour

def delete_tour(db:Session,id:int):
    db.query(models.Tour).filter(models.Tour.id == id).delete()
    db.commit()

#10.Service Detail
def check_servicedetail(db:Session):
    servicedetail = db.query(models.ServiceDetail).all()
    return servicedetail

def add_servicedetail(db:Session,sd_create : schemas.ServiceDetail):
    servicedetail = models.ServiceDetail(id=sd_create.id,id_buses=sd_create.id_buses,id_service=sd_create.id_service)
    db.add(servicedetail)
    db.commit()
    db.refresh(servicedetail)
    return servicedetail

def delete_servicedetail(db:Session,id:int):
    db.query(models.ServiceDetail).filter(models.ServiceDetail.id == id).delete()
    db.commit()

#11.Seat Detail
def check_seatdetail(db:Session,id:int):
    servicedetail = db.query(models.SeatDetail).filter(models.SeatDetail.id_buses == id).all()
    return servicedetail

def add_seatdetail(db:Session,sd_create : schemas.SeatDetail):
    seatdetail = models.SeatDetail(id=sd_create.id,id_buses=sd_create.id_buses,id_seat=sd_create.id_seat)
    db.add(seatdetail)
    db.commit()
    db.refresh(seatdetail)
    return seatdetail

def delete_seatdetail(db:Session,id:int):
    db.query(models.SeatDetail).filter(models.SeatDetail.id == id).delete()
    db.commit()

def check_seatdetail_by_id_buses(db:Session,id:int):    
    seatdetail = db.query(models.SeatDetail).filter(models.SeatDetail.id_buses == id).all()
    return seatdetail

def get_seatname_by_ticket_id(db:Session,id:int):
    ticket = db.query(models.Ticket).filter(models.Ticket.id == id).first()
    seat_detail = db.query(models.SeatDetail).filter(models.SeatDetail.id == ticket.id_seatdetail).first()
    seat = db.query(models.Seat).filter(models.Seat.id == seat_detail.id_seat).first()
    return seat.name

#12.Buses
def check_buses(db:Session):
    buses = db.query(models.Buses).all()
    return buses

def calculate_arrival_time(departure_time_str, hours):
    departure_time = datetime.strptime(departure_time_str, '%Y-%m-%d %H:%M:%S')
    arrival_time = departure_time + timedelta(hours=hours)
    return arrival_time.strftime('%Y-%m-%d %H:%M:%S')

def add_buses(db:Session,buses_create : schemas.Buses):
    departure_time_str = buses_create.time_start.strftime('%Y-%m-%d %H:%M:%S')
    time_end_str = calculate_arrival_time(departure_time_str, 6)
    driver = db.query(models.Driver).filter(models.Driver.id == buses_create.id_driver).first()
    if driver:
        driver_name = driver.name
    else:
        driver_name = None
    busses = models.Buses(time_start =departure_time_str,time_end = time_end_str,price = buses_create.price,id_vehicle = buses_create.id_vehicle,id_tour = buses_create.id_tour,id_driver = buses_create.id_driver)
    db.add(busses)
    db.commit()
    for i in range(1,25):
        seatdetail = models.SeatDetail(id_buses=busses.id,id_seat=i,status=0)
        db.add(seatdetail)
    db.commit()
    db.refresh(busses)
    return busses

def delete_buses(db:Session,id:int):
    db.query(models.SeatDetail).filter(models.SeatDetail.id_buses == id).delete()
    db.query(models.Buses).filter(models.Buses.id == id).delete()
    db.commit()
    return "delete success"


def get_buses_by_id(db:Session,id:int):
    Buses = db.query(models.Buses).filter(models.Buses.id == id).first()
    return Buses

def update_buses(db: Session, id: int, buses_update: schemas.Buses):
    rate = db.query(models.Buses).filter(models.Buses.id == id).first()
    if rate:
        db.query(models.Buses).filter(models.Buses.id == id).update({
            "time_start": buses_update.time_start if buses_update.time_start != None else rate.time_start,
            "price": buses_update.price if buses_update.price != None else rate.price,
            "id_driver": buses_update.id_driver if buses_update.id_driver != None else rate.id_driver,
            "id_tour": buses_update.id_tour if buses_update.id_tour!= None else rate.id_tour,
            "id_vehicle": buses_update.id_vehicle if buses_update.id_vehicle != None else rate.id_vehicle,
        })
        db.commit()
        db.refresh(rate)
        return rate
    else:
        return "rating not found"

def check_buses_today(db: Session):
    today = datetime.now().date()
    return db.query(models.Buses).filter(models.Buses.time_start >= today).all()



def check_buses_by_route_and_date(db: Session, route: int, departure_date: str):
    departure_date = datetime.strptime(departure_date, '%Y-%m-%d')
    return db.query(models.Buses).filter(
        models.Buses.time_start >= departure_date,
        models.Buses.id_tour == route
    ).order_by(models.Buses.time_start.asc()).all()

def check_buses_by_tour_and_date(db: Session, id_tour: int, departure_date: str):
    departure_date = datetime.strptime(departure_date, '%Y-%m-%d').date()
    start_of_day = datetime.combine(departure_date, datetime.min.time())
    end_of_day = start_of_day + timedelta(days=1) - timedelta(seconds=1)
    
    return db.query(models.Buses).filter(
        models.Buses.time_start.between(start_of_day, end_of_day),
        models.Buses.id_tour == id_tour
    ).order_by(models.Buses.time_start.asc()).all()

def get_empty_seats(db: Session, id_buses: int):
    return db.query(models.SeatDetail).filter(models.SeatDetail.id_buses == id_buses, models.SeatDetail.status == 0).count()

#13.Ticket
def check_ticket(db:Session):
    ticket = db.query(models.Ticket).all()
    return ticket

def add_ticket(db:Session,ticket_create : schemas.Ticket):
    ticket = models.Ticket(name=ticket_create.name,
                           phone_number = ticket_create.phone_number,
                           note = ticket_create.note,
                           pick_up_loc=ticket_create.pick_up_loc,
                           drop_down_loc=ticket_create.drop_down_loc,
                           id_agency=1,
                           id_seatdetail=ticket_create.id_seatdetail,
                           status = 2,
                           date_book=datetime.now(),                         
                           )
    db.add(ticket)
    db.query(models.SeatDetail).filter(models.SeatDetail.id == ticket_create.id_seatdetail).update({models.SeatDetail.status:1})
    db.commit()
    db.refresh(ticket)
    return ticket

def add_client_ticket(db:Session,ticket_create : schemas.Ticket):
    ticket = models.Ticket(name=ticket_create.name,
                           phone_number = ticket_create.phone_number,
                           note = ticket_create.note,
                           pick_up_loc=ticket_create.pick_up_loc,
                           drop_down_loc=ticket_create.drop_down_loc,
                           id_agency=None,
                           id_seatdetail=ticket_create.id_seatdetail,
                           status=1,
                           date_book=datetime.now(),                         
                           )
    db.add(ticket)
    db.query(models.SeatDetail).filter(models.SeatDetail.id == ticket_create.id_seatdetail).update({models.SeatDetail.status:1})
    db.commit()
    noti = models.Notification( message=None,
                           ticket_id = ticket.id,
                           create_at=datetime.now(),
                           )
    db.add(noti)
    db.commit()
    db.refresh(noti)
    db.refresh(ticket)
    return ticket

def delete_ticket(db:Session,id:int):
    id_seat = db.query(models.Ticket.id_seatdetail).filter(models.Ticket.id == id).scalar()
    db.query(models.SeatDetail).filter(models.SeatDetail.id == id_seat).update({models.SeatDetail.status:0})
    db.query(models.Ticket).filter(models.Ticket.id == id).delete()
    db.commit()
    return "delete success"

def get_tickets_by_buses_id(db: Session, buses_id: int):
    tickets = db.query(models.Ticket).join(models.SeatDetail).filter(models.SeatDetail.id_buses == buses_id).filter(models.Ticket.status != 1).order_by(models.Ticket.status).all()
    return tickets

def get_ticket_by_id(db:Session,id:int):
    Ticket = db.query(models.Ticket).filter(models.Ticket.id == id).first()
    return Ticket
    
def get_ticket_by_list_id(db: Session, ids: List[int]):
    tickets = []
    if ids:
        tickets = db.query(Ticket).filter(Ticket.id.in_(ids)).all()
    return tickets

def get_order(db:Session):
    ticket_info = db.query(models.Ticket, models.SeatDetail.id_seat, models.SeatDetail.id_buses, models.Buses.time_start,models.Buses.id_tour). \
        join(models.SeatDetail, models.Ticket.id_seatdetail == models.SeatDetail.id). \
        join(models.Buses, models.SeatDetail.id_buses == models.Buses.id). \
        filter(models.Ticket.status == 1).order_by(Ticket.id.desc()).all()
    if ticket_info:
        # Process and structure the data
        ticket_data = [
            {
                "Ticket": ti[0],      # Ticket ID
                "id_seat": ti[1],        # Seat ID
                "id_buses": ti[2],       # Bus ID
                "time_start": ti[3],     # Start Time
                "id_tour": ti[4]         # Tour ID
            }
            for ti in ticket_info
        ]
        return {"tickets": ticket_data}
    else:
        return {"message": "Ticket not found"}
    
def search_order(db: Session, phone_number: str, id_tour: int, departure_date_str: str):
    try:
        # Parse the date string to a datetime object
        departure_date = datetime.strptime(departure_date_str, '%Y-%m-%d').date()
    except ValueError as e:
        return {"message": f"Invalid date format: {e}"}

    # Query the database for ticket information
    ticket_info = db.query(
        models.Ticket, 
        models.SeatDetail.id_seat, 
        models.SeatDetail.id_buses, 
        models.Buses.time_start, 
        models.Buses.id_tour
    ).join(
        models.SeatDetail, 
        models.Ticket.id_seatdetail == models.SeatDetail.id
    ).join(
        models.Buses, 
        models.SeatDetail.id_buses == models.Buses.id
    ).filter(
        models.Ticket.status == 1,
        models.Ticket.phone_number == phone_number,
        models.Buses.id_tour == id_tour,
        extract('year', models.Buses.time_start) == departure_date.year,
        extract('month', models.Buses.time_start) == departure_date.month,
        extract('day', models.Buses.time_start) == departure_date.day
    ).order_by(
        models.Ticket.id.desc()
    ).all()

    if ticket_info:
        # Process and structure the data
        ticket_data = [
            {
                "Ticket": ti[0],       # Ticket object
                "id_seat": ti[1],      # Seat ID
                "id_buses": ti[2],     # Bus ID
                "time_start": ti[3],   # Start Time
                "id_tour": ti[4]       # Tour ID
            }
            for ti in ticket_info
        ]
        return {"tickets": ticket_data}
    else:
        return {"message": "Ticket not found"}

def get_ticket_details_by_id(db: Session, id: int):
    ticket_info = db.query(models.Ticket, models.SeatDetail.id_seat, models.SeatDetail.id_buses, models.Buses.time_start,models.Buses.id_tour). \
        join(models.SeatDetail, models.Ticket.id_seatdetail == models.SeatDetail.id). \
        join(models.Buses, models.SeatDetail.id_buses == models.Buses.id). \
        filter(models.Ticket.id == id).first()

    if ticket_info:
        ticket_data = {
            "Ticket": ticket_info[0],  # Truy cập vào phần tử đầu tiên của tuple và lấy thuộc tính id
            "id_seat": ticket_info[1],  # Lấy giá trị id_seat từ tuple
            "id_buses": ticket_info[2],  # Lấy giá trị id_buses từ tuple
            "time_start": ticket_info[3] , # Lấy giá trị time_start từ tuple
            "id_tour": ticket_info[4]
            # Add more fields if needed
        }
        return ticket_data
    else:
        return {"message": "Ticket not found"}

def update_ticket(db: Session, id: int, ticket_update: schemas.Ticket):
    rate = db.query(models.Ticket).filter(models.Ticket.id == id).first()

    if rate:
        db.query(models.Ticket).filter(models.Ticket.id == id).update({
            "name": ticket_update.name if ticket_update.name != None else rate.name,
            "phone_number":  ticket_update.phone_number if  ticket_update.phone_number != None else rate.phone_number,
            "note":  ticket_update.note if  ticket_update.note != None else rate.note,
            "pick_up_loc":  ticket_update.pick_up_loc if  ticket_update.pick_up_loc != None else rate.pick_up_loc,
            "drop_down_loc": ticket_update.drop_down_loc if  ticket_update.drop_down_loc != None else rate.drop_down_loc,
            "id_seatdetail":  ticket_update.id_seatdetail if  ticket_update.id_seatdetail != None else rate.id_seatdetail,
            "id_agency":  ticket_update.id_agency ,
        })
        db.commit()
        db.refresh(rate)
        return rate
    else:
        return "rating not found"
    

def check_ticket_by_phone_number(db: Session, phone_number: str,id :int):
    tickets = db.query(models.Ticket).join(models.SeatDetail).filter(
        models.SeatDetail.id_buses == id,
        models.Ticket.phone_number == phone_number).all()
    return tickets

def get_seat_name_by_seatdetail_id(db: Session, seatdetail_id: int):
    seatdetail = db.query(models.SeatDetail).filter(models.SeatDetail.id == seatdetail_id).first()
    if seatdetail:
        seat = db.query(models.Seat).filter(models.Seat.id == seatdetail.id_seat).first()
        if seat:
            return seat.name
    return None

def acess_order(db:Session,id:int,message:str):
    ticket = db.query(models.Ticket).filter(models.Ticket.id == id).first()
    ticket.status = 3
    db.query(models.Notification).filter(models.Notification.ticket_id == id).delete()
    db.commit()
    db.refresh(ticket)
    customer_phone = ticket.phone_number
    if(customer_phone == "+84967882965"):
        try:
            message = client1.messages.create(
                body=message,
                from_=twilio_phone_number1,
                to=customer_phone
            )
            print (message.sid)
        except Exception as e:
            print(e)
            raise HTTPException(status_code=500, detail=str(e))
    elif(customer_phone == "+84968266490"):
        try:
            message = client2.messages.create(
                body=message,
                from_=twilio_phone_number2,
                to=customer_phone
            )
            print (message.sid)
        except Exception as e:
            print(e)
            raise HTTPException(status_code=500, detail=str(e))
    return "access success"

def deny_order(db:Session,id:int,message:str):
        ticket = db.query(models.Ticket).filter(models.Ticket.id == id).first()
        id_seat = ticket.id_seatdetail
        customer_phone = ticket.phone_number
        db.query(models.SeatDetail).filter(models.SeatDetail.id == id_seat).update({models.SeatDetail.status: 0})
        db.query(models.Notification).filter(models.Notification.ticket_id == id).delete()
        db.delete(ticket)
        db.commit()
        if(customer_phone == "+84967882965"):
            try:
                message = client1.messages.create(
                    body=message,
                    from_=twilio_phone_number1,
                    to=customer_phone
                )
            except Exception as e:
                print(e)
                raise HTTPException(status_code=500, detail=str(e))
        elif(customer_phone == "+84968266490"):
            try:
                message = client2.messages.create(
                    body=message,
                    from_=twilio_phone_number2,
                    to=customer_phone
                )
            except Exception as e:
                print(e)
                raise HTTPException(status_code=500, detail=str(e))
            
        return "delete success"


def sucess_bill(db:Session,id:int):
    Ticket = db.query(models.Ticket).filter(models.Ticket.id == id).update({models.Ticket.status:3})
    db.commit()
    db.refresh(Ticket)
    return "bill sucess"

def count_online_tickets(db: Session):
    count = db.query(models.Ticket).filter(models.Ticket.id_agency.is_(None)).count()
    return count

def count_offline_tickets(db: Session):
    count = db.query(models.Ticket).filter(models.Ticket.id_agency.isnot(None)).count()
    return count

def get_ticket_counts_by_month(year: int, db: Session ):
    ticket_counts = []
    for month in range(1, 13):  # Loop through each month
        start_date = datetime(year, month, 1)
        end_date = datetime(year, month + 1, 1) if month < 12 else datetime(year + 1, 1, 1)
        count = (
            db.query(Ticket)
            .filter(Ticket.status == 3)
            .filter(Ticket.date_book >= start_date)
            .filter(Ticket.date_book < end_date)
            .count()
        )
        ticket_counts.append(count * 380000)
    return ticket_counts


TicketInfo = namedtuple('TicketInfo', ['date', 'revenue'])

def get_chart_fromdate_to_date(db: Session, from_date: str, to_date: str):
    if from_date is None or to_date is None:
        raise HTTPException(status_code=400, detail="Invalid date format")
    
    from_date = datetime.strptime(from_date, "%Y-%m-%d")
    to_date = datetime.strptime(to_date, "%Y-%m-%d") + timedelta(days=1)
    num_days = (to_date - from_date).days
    results = []
    for i in range(num_days):
        date = from_date + timedelta(days=i)
        count = (
            db.query(Ticket)
            .filter(Ticket.status == 3)
            .filter(Ticket.date_book >= date)
            .filter(Ticket.date_book < date + timedelta(days=1))
            .count()
        )
        revenue = count * 380000
        ticket_info = TicketInfo(date.strftime("%Y-%m-%d"),revenue) 
        results.append(ticket_info)

    return results

#Notification
from sqlalchemy.orm import Session
from sqlalchemy import desc
from typing import List

from . import models, schemas

# crud.py
from sqlalchemy.orm import Session
from sqlalchemy import desc
from typing import List

from . import models, schemas

def check_notification(db: Session) -> List[schemas.NotificationWithTrip]:
    stmt = (
        db.query(
            models.Notification.id,
            models.Notification.message,
            models.Notification.create_at,
            models.Buses.id_tour,
            models.Buses.time_start,
            models.Ticket.phone_number,
        )
        .join(models.Ticket, models.Notification.ticket_id == models.Ticket.id)
        .join(models.SeatDetail, models.Ticket.id_seatdetail == models.SeatDetail.id)
        .join(models.Buses, models.SeatDetail.id_buses == models.Buses.id)
        .order_by(desc(models.Notification.create_at))
    )

    results = stmt.all()

    return [
        schemas.NotificationWithTrip(
            notification=schemas.NotificationSchema(
                id=notification_id,
                message=message,
                timestamp=create_at
            ),
            id_tour=id_tour,
            time_start=time_start,
            phone_number = phone_number
        )
        for notification_id, message, create_at, id_tour, time_start,phone_number in results
    ]



def add_notification(db:Session,nofication_create : schemas.Notification,id:int):
    data = models.Notification(
                           content=nofication_create.content,
                           ticket_id = id,
                           create_at=datetime.now(),                         
                           )
    db.add(data)
    db.commit()
    db.refresh(data)
    return data