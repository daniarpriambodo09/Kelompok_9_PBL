from fastapi import APIRouter, Depends, HTTPException, Query
from fastapi.responses import HTMLResponse
from sqlalchemy.orm import Session
from .database import SessionLocal
from . import models, schemas
from sqlalchemy import func

from ml.predict_weather import run_weather_prediction

import pytz
from datetime import datetime, timedelta

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Ambil semua data cuaca berdasarkan Id_City
@router.get("/cuaca/{id_city}", response_model=list[schemas.CuacaSchema])
def get_cuaca_by_city(id_city: int, db: Session = Depends(get_db)):
    return db.query(models.Cuaca).filter(models.Cuaca.Id_City == id_city).all()

# Ambil rata-rata suhu berdasarkan Id_City
@router.get("/rata_suhu/{id_city}", response_model=schemas.RataSuhuSchema)
def get_avg_temp_by_city(id_city: int, db: Session = Depends(get_db)):
    result = db.query(
        models.Cuaca.Id_City,
        func.avg(models.Cuaca.TAVG).label("RataRataTAVG")
    ).filter(models.Cuaca.Id_City == id_city).group_by(models.Cuaca.Id_City).first()

    if result:
        return {"Id_City": result.Id_City, "RataRataTAVG": result.RataRataTAVG}
    raise HTTPException(status_code=404, detail="Data tidak ditemukan")

@router.get("/prediksi_cuaca/{id_city}", response_model=list[schemas.CuacaForecasting])
def get_prediksi_cuaca_by_id(id_city : int, db : Session = Depends(get_db)):
    return db.query(models.Forecasting_Data).filter(models.Forecasting_Data.Id_Kota == id_city).all()

@router.get("/prediksi_cuaca/{id_city}/7day", response_model=list[schemas.forecast_day_7])
def get_prediksi_7(id_city: int, db: Session = Depends(get_db)):
    # Zona waktu Jakarta
    zona_jakarta = pytz.timezone('Asia/Jakarta')
    sekarang = datetime.now(zona_jakarta)

    # Tanggal besok
    besok = sekarang + timedelta(days=1)

    # 7 hari dari besok
    tujuh_hari_ke_depan = besok + timedelta(days=6)  # Total 7 hari (termasuk besok)

    # Ambil data dari tabel prediksi cuaca
    hasil = db.query(models.Forecasting_Data).filter(
        models.Forecasting_Data.Id_Kota == id_city,
        models.Forecasting_Data.TANGGAL >= besok.date(),
        models.Forecasting_Data.TANGGAL <= tujuh_hari_ke_depan.date()
    ).order_by(models.Forecasting_Data.TANGGAL).all()

    return hasil

@router.get("/data_hari_ini/{id_city}", response_model=schemas.dataToday)
def get_data_today(id_city: int, db : Session = Depends(get_db)):
    zona_jakarta = pytz.timezone('Asia/Jakarta')
    sekarang = datetime.now(zona_jakarta).date()

    hasil = db.query(models.Forecasting_Data).filter(
        models.Forecasting_Data.Id_Kota == id_city,
        models.Forecasting_Data.TANGGAL == sekarang
    ).first()

    return hasil

@router.get("/search_kota", response_model=list[schemas.KotaOut])
def search_kota(query: str = Query(..., min_length=2), db: Session = Depends(get_db)):
    hasil = db.query(models.Kota).filter(
        models.Kota.Kota.ilike(f"%{query}%")
    ).all()

    return [{"id": kota.Id_City, "nama": kota.Kota} for kota in hasil]

@router.get("/peringatan", response_model=schemas.CuacaAlert)
def get_peringatan(idCity: int = Query(...), db: Session = Depends(get_db)):
    from datetime import date

    today = date.today()
    result = (
        db.query(models.Forecasting_Data)
        .filter(models.Forecasting_Data.Id_Kota == idCity)
        .filter(func.date(models.Forecasting_Data.TANGGAL) == today)
        .first()
)
    
    if not result:
        raise HTTPException(status_code=404, detail="Data tidak ditemukan")

    return result

@router.get("/weather/{city_name}")
async def get_weather(city_name: str):
    try:
        result = run_weather_prediction(city_name)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# @router.get("/", response_class=HTMLResponse)
# def home():
#     return "<h1>Hello World</h1>"