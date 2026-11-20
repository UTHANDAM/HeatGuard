import random
from datetime import datetime
from typing import List, Dict, Any
from backend.app.models.schemas import EnvironmentalTelemetry, WorkerProfile, LanguageEnum, TaskIntensity

class AbuDhabiIoTSimulator:
    """
    Simulates real-world environmental weather station feeds and active worker
    cohorts across Abu Dhabi's primary construction hubs.
    """

    SITE_PRESETS: Dict[str, Dict[str, Any]] = {
        "mussafah": {
            "station_id": "AD-MUSSAF-04",
            "location_name": "Mussafah Heavy Industrial Zone 4, Abu Dhabi",
            "base_temp_c": 44.5,
            "base_rh_pct": 42.0,
            "base_solar_w_m2": 920.0,
            "base_wind_m_s": 1.8
        },
        "al_reem": {
            "station_id": "AD-REEM-02",
            "location_name": "Al Reem Island Marine Tower Site, Abu Dhabi",
            "base_temp_c": 41.0,
            "base_rh_pct": 68.0,
            "base_solar_w_m2": 850.0,
            "base_wind_m_s": 3.2
        },
        "al_dhafra": {
            "station_id": "AD-DHAFRA-01",
            "location_name": "Al Dhafra Solar & Desert Logistics Hub, Abu Dhabi",
            "base_temp_c": 48.0,
            "base_rh_pct": 24.0,
            "base_solar_w_m2": 1050.0,
            "base_wind_m_s": 2.5
        }
    }

    @classmethod
    def generate_telemetry(cls, site_key: str = "mussafah", heat_wave_intensity: float = 1.0) -> EnvironmentalTelemetry:
        """Generates realistic live ambient environmental readings with slight atmospheric jitter."""
        preset = cls.SITE_PRESETS.get(site_key, cls.SITE_PRESETS["mussafah"])
        
        jitter_temp = random.uniform(-0.8, 0.8) + (heat_wave_intensity - 1.0) * 3.5
        jitter_rh = random.uniform(-2.5, 2.5)
        jitter_solar = random.uniform(-40.0, 40.0)
        jitter_wind = random.uniform(-0.4, 0.4)

        temp = round(preset["base_temp_c"] + jitter_temp, 1)
        rh = max(10.0, min(95.0, round(preset["base_rh_pct"] + jitter_rh, 1)))
        solar = max(100.0, min(1200.0, round(preset["base_solar_w_m2"] + jitter_solar, 1)))
        wind = max(0.5, round(preset["base_wind_m_s"] + jitter_wind, 1))

        return EnvironmentalTelemetry(
            station_id=preset["station_id"],
            location_name=preset["location_name"],
            ambient_temp_c=temp,
            relative_humidity_pct=rh,
            solar_radiation_w_m2=solar,
            wind_speed_m_s=wind,
            recorded_at=datetime.utcnow()
        )

    @classmethod
    def get_synthetic_worker_cohort(cls) -> List[WorkerProfile]:
        """
        Returns a realistic 6-worker cross-linguistic cohort representing the actual
        demographics and risk spectrum of Abu Dhabi construction sites.
        """
        return [
            WorkerProfile(
                worker_id="WRK-101",
                name="Tariq Khan",
                age=52,
                preferred_language=LanguageEnum.URDU,
                acclimatization_days=2,  # Arrived 2 days ago: high danger!
                bmi=31.2,
                has_cardiovascular_history=True,
                has_prior_heat_exhaustion=False,
                is_fasting=False,
                current_task_intensity=TaskIntensity.HEAVY,
                hydration_level_liters_today=1.2,
                last_rest_minutes_ago=65,
                shift_hours_worked=4.0
            ),
            WorkerProfile(
                worker_id="WRK-102",
                name="Rajesh Kumar",
                age=27,
                preferred_language=LanguageEnum.HINDI,
                acclimatization_days=60,  # Well-acclimatized veteran
                bmi=22.8,
                has_cardiovascular_history=False,
                has_prior_heat_exhaustion=False,
                is_fasting=False,
                current_task_intensity=TaskIntensity.MODERATE,
                hydration_level_liters_today=3.5,
                last_rest_minutes_ago=20,
                shift_hours_worked=3.0
            ),
            WorkerProfile(
                worker_id="WRK-103",
                name="Danilo Santos",
                age=38,
                preferred_language=LanguageEnum.TAGALOG,
                acclimatization_days=24,
                bmi=24.5,
                has_cardiovascular_history=False,
                has_prior_heat_exhaustion=False,
                is_fasting=False,
                current_task_intensity=TaskIntensity.LIGHT,
                hydration_level_liters_today=2.8,
                last_rest_minutes_ago=35,
                shift_hours_worked=4.5
            ),
            WorkerProfile(
                worker_id="WRK-104",
                name="Mohammad Faruk",
                age=44,
                preferred_language=LanguageEnum.BENGALI,
                acclimatization_days=5,  # Sub-acclimatized + fasting
                bmi=27.4,
                has_cardiovascular_history=False,
                has_prior_heat_exhaustion=True,
                is_fasting=True,
                current_task_intensity=TaskIntensity.HEAVY,
                hydration_level_liters_today=0.8,
                last_rest_minutes_ago=55,
                shift_hours_worked=3.5
            ),
            WorkerProfile(
                worker_id="WRK-105",
                name="Ahmed Al-Mansouri",
                age=33,
                preferred_language=LanguageEnum.ARABIC,
                acclimatization_days=180,
                bmi=25.2,
                has_cardiovascular_history=False,
                has_prior_heat_exhaustion=False,
                is_fasting=False,
                current_task_intensity=TaskIntensity.LIGHT,
                hydration_level_liters_today=2.5,
                last_rest_minutes_ago=15,
                shift_hours_worked=2.5
            ),
            WorkerProfile(
                worker_id="WRK-106",
                name="John Peterson",
                age=41,
                preferred_language=LanguageEnum.ENGLISH,
                acclimatization_days=12,
                bmi=26.8,
                has_cardiovascular_history=False,
                has_prior_heat_exhaustion=False,
                is_fasting=False,
                current_task_intensity=TaskIntensity.MODERATE,
                hydration_level_liters_today=2.0,
                last_rest_minutes_ago=40,
                shift_hours_worked=5.0
            )
        ]
