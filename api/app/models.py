# khai bao du lieu cac bang trong database
from datetime import datetime
import enum
from pydantic import BaseModel
from sqlalchemy import Boolean, Column, BigInteger, Enum, Float, Integer, String, DateTime, ForeignKey, Text, UniqueConstraint,Date
from sqlalchemy.orm import relationship
from .database import Base

class Rating(Base):
    __tablename__ = "Rating"

    id = Column(Integer, primary_key=True)
    name = Column(String)
    phone_number = Column(String)
    day_send = Column(Date)
    content = Column(String)

class Location(Base):
    __tablename__ = "location"

    id = Column(Integer, primary_key=True)
    name = Column(String)


class Agency(Base):
    __tablename__ = "agency"

    id = Column(Integer, primary_key=True)
    account = Column(String)
    password = Column(String)
    name = Column(String)

class Seat(Base):
    __tablename__="seat"

    id = Column(Integer, primary_key=True)
    name = Column(String)

class Service(Base):
    __tablename__="service"

    id = Column(Integer, primary_key=True)
    name = Column(String)

class TypeOfVehicle(Base):
    __tablename__="typeofvehicle"

    id = Column(Integer, primary_key=True)
    name = Column(String)

class Vehicle(Base):
    __tablename__="vehicle"

    id = Column(Integer,primary_key=True)
    license_plates = Column(String)
    status = Column(Boolean)
    id_type = Column(Integer,ForeignKey("typeofvehicle.id"))

class Driver(Base):
    __tablename__="driver"

    
    id = Column(Integer, primary_key=True)
    name = Column(String)
    phone_number = Column(String)
    date_start = Column(Date)
    driver_license = Column(String)
    status = Column(Boolean)



class Tour(Base):
    __tablename__="tour"

    id = Column(Integer, primary_key=True)
    id_des_start = Column(Integer,ForeignKey("location.id"))
    id_des_end = Column(Integer,ForeignKey("location.id"))

class Buses(Base):
    __tablename__="buses"

    id = Column(Integer, primary_key=True)
    time_start = Column(DateTime)
    time_end = Column(DateTime)
    price = Column(BigInteger)
    id_tour = Column(Integer,ForeignKey("tour.id"))
    id_vehicle=Column(Integer,ForeignKey("vehicle.id"))
    id_driver=Column(Integer,ForeignKey("driver.id"))


   

class ServiceDetail(Base):
    __tablename__ ="servicedetail"

    id = Column(Integer,primary_key=True)
    id_service = Column(Integer,ForeignKey("service.id"))
    id_buses = Column(Integer,ForeignKey("buses.id"))

class SeatDetail(Base):
    __tablename__ ="seatdetail"

    id = Column(Integer,primary_key=True)
    status = Column(Integer)
    id_seat = Column(Integer,ForeignKey("seat.id"))
    id_buses = Column(Integer,ForeignKey("buses.id"))

class Ticket(Base):
    __tablename__ ="ticket"

    id = Column(Integer,primary_key=True)
    name = Column(String)
    phone_number = Column(String)
    note = Column(String)
    date_book= Column(Date)
    pick_up_loc = Column(String)
    drop_down_loc = Column(String)
    date_book = Column(Date)
    status = Column(Integer)
    id_seatdetail = Column(Integer,ForeignKey("seatdetail.id"))
    id_agency =Column(Integer,ForeignKey("agency.id"))

class Notification(Base):  
    __tablename__ ="notification"

    id = Column(Integer,primary_key=True)
    message = Column(String)
    ticket_id = Column(Integer,ForeignKey("ticket.id"))
    create_at = Column(Date)