from sqlalchemy import Column, Integer, String, Float, BigInteger, DateTime
from .database import Base

class Kota(Base):
    __tablename__ = "Tabel_Kota"
    Id_City = Column(BigInteger, primary_key=True, index=True)
    Kota = Column(String)

class Cuaca(Base):
    __tablename__ = "Tabel Cuaca"
    Id_City = Column(BigInteger, primary_key=True)
    TANGGAL = Column(String, primary_key=True)

    Kota = Column(String)
    Tahun = Column(BigInteger)
    Bulan = Column(BigInteger)
    TN = Column(Float)
    TX = Column(Float)
    TAVG = Column(Float)
    RH_AVG = Column(Float)
    RR = Column(BigInteger)
    SS = Column(BigInteger)
    FF_X = Column(Float)
    DDD_X = Column(Float)
    FF_AVG = Column(Float)
    DDD_CAR = Column(String)

class Forecasting_Data(Base):
    __tablename__ = "forecasting_data_cuaca"

    Id_Kota = Column(BigInteger, primary_key=True)
    TANGGAL = Column(DateTime, primary_key=True)

    Kota = Column(String)
    TN = Column(Float)
    TX = Column(Float)
    TAVG = Column(Float)
    RH_AVG = Column(Float)
    RR = Column(Float)
    SS = Column(Float)
    WindDir_sin = Column(Float)
    WindDir_cos = Column(Float)
    Cuaca = Column(String)

