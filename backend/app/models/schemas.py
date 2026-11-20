from enum import Enum
from typing import List, Dict, Optional, Any
from pydantic import BaseModel, Field
from datetime import datetime

class AlertSeverity(str, Enum):
    GREEN = "GREEN"         # Normal: Standard hydration & surveillance
    YELLOW = "YELLOW"       # Caution: Increased water intake, hourly checks
    AMBER = "AMBER"         # Warning: Mandatory 15-min rest in shade, hydration
    RED = "RED"             # Danger: Cease high-exertion tasks, active cooling
    EMERGENCY = "EMERGENCY" # Critical: Clinical heat stroke protocol, immediate medical team

class LanguageEnum(str, Enum):
    URDU = "urdu"
    HINDI = "hindi"
    TAGALOG = "tagalog"
    BENGALI = "bengali"
    ARABIC = "arabic"
    ENGLISH = "english"

class TaskIntensity(str, Enum):
    LIGHT = "light"         # 150-200 W (Inspection, light painting, driving)
    MODERATE = "moderate"   # 200-350 W (Bricklaying, light framing, pipework)
    HEAVY = "heavy"         # 350-550 W (Rebar tying, trenching, manual lifting)

class EnvironmentalTelemetry(BaseModel):
    station_id: str = "AD-MUSSAF-01"
    location_name: str = "Mussafah Industrial Site Zone 4, Abu Dhabi"
    ambient_temp_c: float = Field(..., ge=20.0, le=60.0, description="Dry-bulb temperature in °C")
    relative_humidity_pct: float = Field(..., ge=5.0, le=100.0, description="Relative humidity %")
    solar_radiation_w_m2: float = Field(default=850.0, ge=0.0, le=1400.0, description="Direct solar irradiance")
    wind_speed_m_s: float = Field(default=2.5, ge=0.0, le=30.0, description="Wind speed in m/s")
    calculated_wbgt_c: Optional[float] = Field(None, description="Wet Bulb Globe Temperature in °C")
    recorded_at: datetime = Field(default_factory=datetime.utcnow)

class WorkerProfile(BaseModel):
    worker_id: str
    name: str
    age: int = Field(..., ge=18, le=70)
    preferred_language: LanguageEnum = LanguageEnum.URDU
    acclimatization_days: int = Field(default=14, ge=1, le=365, description="Consecutive days worked on UAE summer sites")
    bmi: float = Field(default=24.5, ge=15.0, le=45.0)
    has_cardiovascular_history: bool = False
    has_prior_heat_exhaustion: bool = False
    is_fasting: bool = False  # Critical during Ramadan or religious observance
    current_task_intensity: TaskIntensity = TaskIntensity.HEAVY
    hydration_level_liters_today: float = Field(default=2.0, ge=0.0, le=10.0)
    last_rest_minutes_ago: int = Field(default=45, ge=0)
    shift_hours_worked: float = Field(default=3.5, ge=0.0, le=14.0)

class XAIFactor(BaseModel):
    factor_name: str
    impact_score: float  # Positive = adds risk, Negative = reduces risk
    contribution_pct: float
    explanation: str

class HeatRiskAssessment(BaseModel):
    assessment_id: str
    worker_id: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    severity: AlertSeverity
    overall_risk_score: float = Field(..., ge=0.0, le=100.0)
    predicted_core_temp_c: float = Field(..., ge=36.0, le=43.0)
    sweat_rate_liters_per_hr: float
    max_allowable_continuous_work_mins: int
    required_rest_in_shade_mins: int
    recommended_water_intake_ml_hr: int
    lead_time_minutes_before_heat_strain: int
    xai_breakdown: List[XAIFactor]
    primary_risk_driver: str

class MultilingualAlertPayload(BaseModel):
    alert_id: str
    worker_id: str
    severity: AlertSeverity
    language: LanguageEnum
    voice_script_phonetic: str
    localized_headline: str
    localized_body_text: str
    localized_action_instructions: List[str]
    english_headline: Optional[str] = None
    english_body_text: Optional[str] = None
    english_action_instructions: Optional[List[str]] = None
    tts_audio_data_uri: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    acknowledged: bool = False
    worker_response: Optional[str] = None  # "RESTING", "NEED_WATER", "EMERGENCY"

class SupervisorCrewSummary(BaseModel):
    site_id: str
    total_workers_monitored: int
    green_count: int
    yellow_count: int
    amber_count: int
    red_count: int
    emergency_count: int
    ambient_wbgt_c: float
    ambient_temp_c: float
    high_risk_workers: List[Dict[str, Any]]
    active_crew_advisories: List[str]
    compliance_score_pct: float
