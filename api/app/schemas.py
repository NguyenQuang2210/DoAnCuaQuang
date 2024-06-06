# dinh nghia shemas cua body khi goi api
from typing import Optional
from .models import Rating
from pydantic import BaseModel
from datetime import date,datetime

class Rating(BaseModel):
   name : str = None
   phone_number : str = None
   content : str = None

class Location(BaseModel):
   id: int
   name : str = None   

class Agency(BaseModel):
   id: int
   account : str = None
   password : str = None
   name : str = None   

class Seat(BaseModel):
   id: int
   name : str = None      

class Service(BaseModel):
   id: int
   name : str = None   

class TypeOfVehicle(BaseModel):
   id: int
   name : str = None

class Vehicle(BaseModel):
   license_plates:str = None
   status : bool
   id_type : int   

class Driver(BaseModel):
   name:str = None
   phone_number:str = None
   date_start: date
   driver_license:str = None  
   status: bool

class Buses(BaseModel):
   time_start:datetime
   price:int
   id_vehicle:int
   id_tour:int
   id_driver:int

class Tour(BaseModel):
   id_des_start : int
   id_des_end : int   

class SeatDetail(BaseModel):  
   status:int
   id_buses:int
   id_seat:int

class ServiceDetail(BaseModel):
   id_service :int
   id_buses:int

class Ticket(BaseModel):
   name:str = None
   phone_number : str =None
   note:str = None
   pick_up_loc:str = None
   drop_down_loc:str = None
   id_agency: Optional[int] = None
   id_seatdetail:int
   # status:int
   # date_book:date

class Notification(BaseModel):
   message:str = None
   ticket_id:int
   create_at:date   


class NotificationSchema(BaseModel):
    id: int
    message: Optional[str]  # Cho phép giá trị None
    timestamp: datetime

    class Config:
        orm_mode = True

class NotificationWithTrip(BaseModel):
    notification: NotificationSchema
    id_tour: int
    time_start: datetime
    phone_number : str =None
    class Config:
        orm_mode = True   