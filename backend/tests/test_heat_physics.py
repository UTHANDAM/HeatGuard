import pytest
from backend.app.ml.heat_physics import HeatPhysicsEngine
from backend.app.simulator.abu_dhabi_iot import AbuDhabiIoTSimulator
from backend.app.agents.guardian_swarm import GuardianAgentSwarm
from backend.app.models.schemas import AlertSeverity, LanguageEnum

def test_stull_wet_bulb_accuracy():
    # At 40°C and 50% RH, wet bulb temperature is ~30.0°C to 30.5°C
    tw = HeatPhysicsEngine.calculate_stull_wet_bulb_c(40.0, 50.0)
    assert 29.5 <= tw <= 31.0, f"Expected Wet Bulb ~30°C, got {tw}°C"

def test_outdoor_wbgt_calculation():
    # 44°C ambient, 40% RH, high solar radiation
    wbgt = HeatPhysicsEngine.calculate_outdoor_wbgt_c(44.0, 40.0, solar_radiation_w_m2=900.0, wind_speed_m_s=2.0)
    assert wbgt > 32.0, f"Expected high WBGT > 32°C in desert sun, got {wbgt}°C"

def test_unacclimatized_vs_acclimatized_disparity():
    telemetry = AbuDhabiIoTSimulator.generate_telemetry("mussafah", heat_wave_intensity=1.1)
    cohort = AbuDhabiIoTSimulator.get_synthetic_worker_cohort()
    
    tariq = next(w for w in cohort if w.name == "Tariq Khan")  # Unacclimatized, age 52
    rajesh = next(w for w in cohort if w.name == "Rajesh Kumar") # Acclimatized, age 27
    
    assess_tariq, alert_tariq = GuardianAgentSwarm.process_and_synthesize(telemetry, tariq)
    assess_rajesh, alert_rajesh = GuardianAgentSwarm.process_and_synthesize(telemetry, rajesh)
    
    # Tariq MUST have a higher risk score than Rajesh under identical environmental conditions!
    assert assess_tariq.overall_risk_score > assess_rajesh.overall_risk_score, (
        f"Tariq risk ({assess_tariq.overall_risk_score}) should exceed Rajesh ({assess_rajesh.overall_risk_score})"
    )
    assert assess_tariq.severity in [AlertSeverity.AMBER, AlertSeverity.RED, AlertSeverity.EMERGENCY]
    assert alert_tariq.language == LanguageEnum.URDU
    assert any(keyword in alert_tariq.localized_headline for keyword in ["ایمرجنسی", "خطر", "وارننگ"])

def test_multilingual_voice_synthesis():
    telemetry = AbuDhabiIoTSimulator.generate_telemetry("mussafah", heat_wave_intensity=1.2)
    cohort = AbuDhabiIoTSimulator.get_synthetic_worker_cohort()
    
    for worker in cohort:
        _, alert = GuardianAgentSwarm.process_and_synthesize(telemetry, worker)
        assert alert.language == worker.preferred_language
        assert len(alert.voice_script_phonetic) > 10
        assert len(alert.localized_action_instructions) >= 2
