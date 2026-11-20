export type AlertSeverity = 'GREEN' | 'YELLOW' | 'AMBER' | 'RED' | 'EMERGENCY';

export type LanguageCode = 'urdu' | 'hindi' | 'tagalog' | 'bengali' | 'arabic' | 'english';

export type TaskIntensity = 'light' | 'moderate' | 'heavy';

export interface EnvironmentalTelemetry {
  station_id: string;
  location_name: string;
  ambient_temp_c: number;
  relative_humidity_pct: number;
  solar_radiation_w_m2: number;
  wind_speed_m_s: number;
  calculated_wbgt_c?: number;
  recorded_at: string;
}

export interface WorkerProfile {
  worker_id: string;
  name: string;
  age: number;
  preferred_language: LanguageCode;
  acclimatization_days: number;
  bmi: number;
  has_cardiovascular_history: boolean;
  has_prior_heat_exhaustion: boolean;
  is_fasting: boolean;
  current_task_intensity: TaskIntensity;
  hydration_level_liters_today: number;
  last_rest_minutes_ago: number;
  shift_hours_worked: number;
}

export interface XAIFactor {
  factor_name: string;
  impact_score: number;
  contribution_pct: number;
  explanation: string;
}

export interface HeatRiskAssessment {
  assessment_id: string;
  worker_id: string;
  timestamp: string;
  severity: AlertSeverity;
  overall_risk_score: number;
  predicted_core_temp_c: number;
  sweat_rate_liters_per_hr: number;
  max_allowable_continuous_work_mins: number;
  required_rest_in_shade_mins: number;
  recommended_water_intake_ml_hr: number;
  lead_time_minutes_before_heat_strain: number;
  xai_breakdown: XAIFactor[];
  primary_risk_driver: string;
}

export interface MultilingualAlertPayload {
  alert_id: string;
  worker_id: string;
  severity: AlertSeverity;
  language: LanguageCode;
  voice_script_phonetic: string;
  localized_headline: string;
  localized_body_text: string;
  localized_action_instructions: string[];
  english_headline?: string;
  english_body_text?: string;
  english_action_instructions?: string[];
  tts_audio_data_uri?: string;
  created_at: string;
  acknowledged: boolean;
  worker_response?: string;
}

export interface SupervisorCrewSummary {
  site_id: string;
  total_workers_monitored: number;
  green_count: number;
  yellow_count: number;
  amber_count: number;
  red_count: number;
  emergency_count: number;
  ambient_wbgt_c: number;
  ambient_temp_c: number;
  high_risk_workers: Array<{
    worker_id: string;
    name: string;
    severity: AlertSeverity;
    risk_score: number;
    core_temp: number;
    driver: string;
    language: LanguageCode;
    lead_time_mins: number;
  }>;
  active_crew_advisories: string[];
  compliance_score_pct: number;
}
