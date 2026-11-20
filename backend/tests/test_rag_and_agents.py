import pytest
from fastapi.testclient import TestClient
from backend.app.main import app
from backend.app.rag.knowledge_engine import regulatory_rag

client = TestClient(app)

def test_rag_semantic_query():
    result = regulatory_rag.query("What are the mandatory hydration requirements when WBGT exceeds 32C under OSHAD CoP 11.0?")
    assert "synthesized_answer" in result
    assert len(result["citations"]) > 0
    assert "CoP 11.0" in result["citations"][0]["title"] or "OSHAD" in result["citations"][0]["authority"]

def test_api_rag_endpoint():
    response = client.post("/api/rag/query", json={"query": "MOHRE Midday Work Ban penalties"})
    assert response.status_code == 200
    data = response.json()
    assert "synthesized_answer" in data
    assert "citations" in data
    assert len(data["citations"]) > 0

def test_api_agents_status():
    response = client.get("/api/agents/status")
    assert response.status_code == 200
    data = response.json()
    assert data["swarm_status"] == "ACTIVE_RUNNING"
    assert len(data["agents"]) == 4
    agent_names = [a["name"] for a in data["agents"]]
    assert "Ambient IoT Assimilator" in agent_names
    assert "5-Dialect Voice Synthesizer" in agent_names

def test_api_audit_trail():
    response = client.get("/api/compliance/audit-trail")
    assert response.status_code == 200
    logs = response.json()
    assert isinstance(logs, list)
    assert len(logs) > 0
    assert "crypto_hash" in logs[0]
