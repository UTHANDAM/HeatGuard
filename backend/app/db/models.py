from sqlalchemy import Column, String, Float, Integer, Boolean, DateTime, Text
from datetime import datetime, timezone
import hashlib
import json
from backend.app.db.database import Base

class DBWorker(Base):
    __tablename__ = "workers"

    worker_id = Column(String(50), primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    task_intensity = Column(String(50), default="heavy")
    age = Column(Integer, default=35)
    bmi = Column(Float, default=24.5)
    acclimatization_days = Column(Integer, default=30)
    is_fasting = Column(Boolean, default=False)
    preferred_language = Column(String(50), default="urdu")
    consent_granted = Column(Boolean, default=True)
    last_rest_minutes_ago = Column(Integer, default=45)
    hydration_level_liters_today = Column(Float, default=2.0)
    shift_hours_worked = Column(Float, default=3.5)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

class DBEnvironmentalReading(Base):
    __tablename__ = "environmental_readings"

    id = Column(Integer, primary_key=True, autoincrement=True)
    site_key = Column(String(50), index=True)
    ambient_temp_c = Column(Float, nullable=False)
    relative_humidity_pct = Column(Float, nullable=False)
    calculated_wbgt_c = Column(Float, nullable=False)
    solar_radiation_wm2 = Column(Float, default=900.0)
    wind_speed_mps = Column(Float, default=2.5)
    recorded_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

class DBRiskAssessment(Base):
    __tablename__ = "risk_assessments"

    id = Column(Integer, primary_key=True, autoincrement=True)
    worker_id = Column(String(50), index=True)
    site_key = Column(String(50))
    predicted_core_temp_c = Column(Float, nullable=False)
    allowable_work_minutes = Column(Integer, nullable=False)
    required_rest_minutes = Column(Integer, nullable=False)
    severity = Column(String(50), nullable=False)
    risk_score = Column(Float, nullable=False)
    primary_risk_driver = Column(String(100))
    xai_factors_json = Column(Text)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

class DBSupervisorDispatch(Base):
    __tablename__ = "supervisor_dispatches"

    dispatch_id = Column(String(50), primary_key=True, index=True)
    action_type = Column(String(100), nullable=False)
    target_crew = Column(String(100), nullable=False)
    status = Column(String(50), default="BROADCASTED")
    timestamp = Column(DateTime, default=lambda: datetime.now(timezone.utc))

class DBAuditLog(Base):
    __tablename__ = "audit_logs"

    event_id = Column(String(50), primary_key=True, index=True)
    event_type = Column(String(100), nullable=False)
    details_json = Column(Text, nullable=False)
    crypto_hash = Column(String(64), nullable=False)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    @staticmethod
    def generate_hash(event_id: str, event_type: str, details_dict: dict, dt: datetime) -> str:
        payload = f"{event_id}|{event_type}|{json.dumps(details_dict, sort_keys=True)}|{dt.isoformat()}"
        return hashlib.sha256(payload.encode('utf-8')).hexdigest()
