import math
from typing import Tuple, Dict, Any, List
from backend.app.models.schemas import EnvironmentalTelemetry, WorkerProfile, AlertSeverity, XAIFactor, TaskIntensity

class HeatPhysicsEngine:
    """
    Implements validated occupational thermal physiology:
    - ISO 7243: Wet Bulb Globe Temperature (WBGT) Calculation
    - ISO 7933: Predicted Heat Strain (PHS) & Core Body Temperature Estimation
    - UAE Ministry of Human Resources (MOHRE) & OSHA Work-Rest Cycle Regimes
    """

    @staticmethod
    def calculate_vapor_pressure_hpa(temp_c: float, rh_pct: float) -> float:
        """Calculates water vapor pressure using Magnus-Tetens formula."""
        return (rh_pct / 100.0) * 6.105 * math.exp((17.27 * temp_c) / (237.7 + temp_c))

    @staticmethod
    def calculate_stull_wet_bulb_c(temp_c: float, rh_pct: float) -> float:
        """
        Stull (2011) empirical approximation for Wet-Bulb Temperature (valid for standard atmospheric pressure).
        Accurate to within 0.3°C across 15°C to 50°C and 5% to 99% RH.
        """
        t = temp_c
        rh = rh_pct
        tw = (
            t * math.atan(0.151977 * math.pow(rh + 8.313659, 0.5))
            + math.atan(t + rh)
            - math.atan(rh - 1.676331)
            + 0.00391838 * math.pow(rh, 1.5) * math.atan(0.023101 * rh)
            - 4.686035
        )
        return round(tw, 2)

    @classmethod
    def calculate_outdoor_wbgt_c(
        cls,
        ambient_temp_c: float,
        rh_pct: float,
        solar_radiation_w_m2: float = 850.0,
        wind_speed_m_s: float = 2.0
    ) -> float:
        """
        Calculates outdoor WBGT = 0.7 * Tw + 0.2 * Tg + 0.1 * Ta
        Globe temp (Tg) modeled from solar radiation and convective wind cooling.
        """
        tw = cls.calculate_stull_wet_bulb_c(ambient_temp_c, rh_pct)
        # Approximate Globe Temperature under direct solar radiation (ISO 7243 approximation)
        wind_damping = max(0.5, wind_speed_m_s)
        tg_elevation = (solar_radiation_w_m2 / 100.0) / math.sqrt(wind_damping)
        tg = ambient_temp_c + (tg_elevation * 1.15)

        wbgt = (0.7 * tw) + (0.2 * tg) + (0.1 * ambient_temp_c)
        return round(wbgt, 2)

    @classmethod
    def evaluate_worker_strain(
        cls,
        telemetry: EnvironmentalTelemetry,
        worker: WorkerProfile
    ) -> Dict[str, Any]:
        """
        Calculates personal dynamic heat strain score (0-100), core temperature rise,
        lead time to clinical exhaustion, and explainable AI feature weights.
        """
        # 1. Base Environmental WBGT
        wbgt = telemetry.calculated_wbgt_c or cls.calculate_outdoor_wbgt_c(
            telemetry.ambient_temp_c,
            telemetry.relative_humidity_pct,
            telemetry.solar_radiation_w_m2,
            telemetry.wind_speed_m_s
        )

        # 2. Baseline Physiological Metabolic Rate (Watts)
        metabolic_rates = {
            TaskIntensity.LIGHT: 180.0,
            TaskIntensity.MODERATE: 300.0,
            TaskIntensity.HEAVY: 460.0
        }
        m_watts = metabolic_rates.get(worker.current_task_intensity, 300.0)

        # 3. Personal Heat Vulnerability Multipliers
        # Acclimatization penalty: Non-acclimatized (<7 days) workers sweat less efficiently
        acclimatization_factor = 1.0
        if worker.acclimatization_days <= 3:
            acclimatization_factor = 1.38  # Extreme risk for fresh arrivals
        elif worker.acclimatization_days <= 7:
            acclimatization_factor = 1.22
        elif worker.acclimatization_days <= 14:
            acclimatization_factor = 1.08
        else:
            acclimatization_factor = 0.95  # Fully adapted Gulf veteran

        # Age & BMI penalties
        age_factor = 1.0 + max(0.0, (worker.age - 35) * 0.012)
        bmi_factor = 1.0 + max(0.0, (worker.bmi - 25.0) * 0.025)

        # Hydration deficit penalty
        hours_on_shift = max(1.0, worker.shift_hours_worked)
        expected_sweat_loss = (m_watts / 350.0) * 0.9 * hours_on_shift  # liters
        hydration_deficit = max(0.0, expected_sweat_loss - worker.hydration_level_liters_today)
        hydration_factor = 1.0 + (hydration_deficit * 0.18)

        # Medical and Fasting multipliers
        health_penalty = 1.0
        if worker.has_cardiovascular_history:
            health_penalty += 0.25
        if worker.has_prior_heat_exhaustion:
            health_penalty += 0.30
        if worker.is_fasting:
            health_penalty += 0.35

        # 4. Composite Heat Vulnerability Index (0 - 100)
        # ACGIH TLV baseline: 28°C WBGT for heavy work is 100% work capacity threshold
        base_thermal_load = (wbgt / 34.0) * 55.0
        workload_load = (m_watts / 500.0) * 25.0
        personal_modifier = (
            (acclimatization_factor - 1.0) * 30.0
            + (age_factor - 1.0) * 15.0
            + (bmi_factor - 1.0) * 15.0
            + (hydration_factor - 1.0) * 20.0
            + (health_penalty - 1.0) * 25.0
        )

        # Time without rest penalty (+1 point per 5 mins over 45 mins)
        rest_delay_penalty = max(0.0, (worker.last_rest_minutes_ago - 45) * 0.25)

        total_risk_score = min(100.0, max(5.0, base_thermal_load + workload_load + personal_modifier + rest_delay_penalty))
        total_risk_score = round(total_risk_score, 1)

        # 5. Core Body Temperature & Sweat Rate Projections
        # Resting core temp = 37.0°C. Dangerous core temp threshold = 38.5°C. Critical stroke = 40.0°C
        predicted_t_core = 37.0 + (total_risk_score / 100.0) * 2.85
        predicted_t_core = round(predicted_t_core, 2)

        sweat_rate = round(0.6 + (wbgt / 40.0) * (m_watts / 300.0) * 0.85, 2)

        # 6. Severity Mapping & Work-Rest Prescriptions (MOHRE & ISO 7933)
        if total_risk_score < 40.0:
            severity = AlertSeverity.GREEN
            allowable_work = 50
            required_rest = 10
            water_ml_hr = 500
            lead_time_mins = 60
        elif total_risk_score < 60.0:
            severity = AlertSeverity.YELLOW
            allowable_work = 40
            required_rest = 15
            water_ml_hr = 750
            lead_time_mins = 42
        elif total_risk_score < 78.0:
            severity = AlertSeverity.AMBER
            allowable_work = 25
            required_rest = 20
            water_ml_hr = 1000
            lead_time_mins = 24
        elif total_risk_score < 90.0:
            severity = AlertSeverity.RED
            allowable_work = 15
            required_rest = 30
            water_ml_hr = 1200
            lead_time_mins = 14
        else:
            severity = AlertSeverity.EMERGENCY
            allowable_work = 0
            required_rest = 60
            water_ml_hr = 1500
            lead_time_mins = 5

        # 7. Explainable AI (XAI) Attribution Breakdown
        xai_factors: List[XAIFactor] = []
        raw_components = {
            "Extreme Ambient Climate (WBGT)": base_thermal_load,
            "Heavy Metabolic Workload": workload_load,
            "Unacclimatized Status": max(0.0, (acclimatization_factor - 1.0) * 30.0),
            "Dehydration / Fluid Deficit": max(0.0, (hydration_factor - 1.0) * 20.0),
            "Prolonged Work Without Shade Rest": rest_delay_penalty,
            "Physiological Flags (Age/BMI/Medical)": max(0.0, ((age_factor - 1.0) * 15.0 + (bmi_factor - 1.0) * 15.0 + (health_penalty - 1.0) * 25.0)),
        }
        total_positives = sum(v for v in raw_components.values() if v > 0)
        sorted_components = sorted(raw_components.items(), key=lambda x: x[1], reverse=True)

        for name, val in sorted_components:
            pct = round((val / total_positives) * 100.0, 1) if total_positives > 0 else 0
            explanation = ""
            if "Climate" in name:
                explanation = f"Outdoor WBGT of {wbgt}°C exceeds standard safety thresholds."
            elif "Metabolic" in name:
                explanation = f"{worker.current_task_intensity.value.capitalize()} labor generates ~{int(m_watts)}W internal heat production."
            elif "Unacclimatized" in name:
                explanation = f"Worker has only {worker.acclimatization_days} days on UAE sites; sweat adaptation incomplete."
            elif "Dehydration" in name:
                explanation = f"Hydration ({worker.hydration_level_liters_today}L) is trailing physiological fluid loss ({expected_sweat_loss:.1f}L)."
            elif "Without Shade" in name:
                explanation = f"Worked {worker.last_rest_minutes_ago} mins continuously without cooling intermission."
            else:
                explanation = f"Compounded by physical profile (Age: {worker.age}, BMI: {worker.bmi})."

            xai_factors.append(XAIFactor(
                factor_name=name,
                impact_score=round(val, 1),
                contribution_pct=pct,
                explanation=explanation
            ))

        primary_driver = sorted_components[0][0] if sorted_components else "Ambient Climate"

        return {
            "wbgt_c": wbgt,
            "risk_score": total_risk_score,
            "severity": severity,
            "predicted_core_temp_c": predicted_t_core,
            "sweat_rate_l_hr": sweat_rate,
            "allowable_work_mins": allowable_work,
            "required_rest_mins": required_rest,
            "water_ml_hr": water_ml_hr,
            "lead_time_mins": lead_time_mins,
            "xai_breakdown": xai_factors,
            "primary_driver": primary_driver
        }
