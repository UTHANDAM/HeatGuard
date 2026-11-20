from fastapi.testclient import TestClient
from backend.app.main import app

client = TestClient(app)

def test_api_health_endpoint():
    response = client.get("/api/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "online"
    assert "urdu" in data["supported_languages"]

def test_api_telemetry_live():
    response = client.get("/api/telemetry/live?site=mussafah")
    assert response.status_code == 200
    data = response.json()
    assert "ambient_temp_c" in data
    assert data["ambient_temp_c"] > 35.0

def test_api_workers_list():
    response = client.get("/api/workers")
    assert response.status_code == 200
    data = response.json()
    assert len(data) >= 5

def test_api_supervisor_crew_summary():
    response = client.get("/api/supervisor/crew-summary?site=mussafah")
    assert response.status_code == 200
    data = response.json()
    assert "total_workers_monitored" in data
    assert "ambient_wbgt_c" in data
    assert data["compliance_score_pct"] > 0
