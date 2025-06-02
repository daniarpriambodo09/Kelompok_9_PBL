from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime, date

class KotaSchema(BaseModel):
    Id_City: int
    Kota: str

    class Config:
        orm_mode = True

class CuacaSchema(BaseModel):
    Id_City: int
    Kota: str
    TANGGAL: str
    TN : float
    TX : float
    TAVG : float
    RH_AVG : float
    RR : float
    SS : float
    FF_X : float
    DDD_X : float
    FF_AVG : float
    DDD_CAR : str

    class Config:
        orm_mode = True

class RataSuhuSchema(BaseModel):
    Id_City: int
    RataRataTAVG: float

class CuacaForecasting(BaseModel):
    TANGGAL : datetime
    Id_Kota : int
    Kota : str
    TN : float
    TX : float
    TAVG : float
    RH_AVG : float
    RR : float
    SS : float
    Cuaca : str

    class Config:
        orm_mode = True

class forecast_day_7(BaseModel):
    TANGGAL : datetime
    Id_Kota : int
    TN : float
    TX : float
    Cuaca : str

    class Config:
        orm_mode = True

class dataToday(BaseModel):
    TANGGAL : date
    Kota : str
    TAVG : float
    TN : float
    TX : float
    RH_AVG : float
    Cuaca : str

    class Config:
        orm_mode = True

class KotaOut(BaseModel):
    id: int
    nama: str

    class Config:
        orm_mode = True

class CuacaAlert(BaseModel):
    TANGGAL: datetime
    Kota: str
    Cuaca: str

    class Config:
        orm_mode = True
