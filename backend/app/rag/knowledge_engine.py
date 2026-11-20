import math
from typing import List, Dict, Any
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

class StatutoryKnowledgeDoc:
    def __init__(self, doc_id: str, title: str, authority: str, clause: str, content: str, penalty_or_mandate: str):
        self.doc_id = doc_id
        self.title = title
        self.authority = authority
        self.clause = clause
        self.content = content
        self.penalty_or_mandate = penalty_or_mandate

class RegulatoryRAGEngine:
    """
    RAG Retrieval-Augmented Generation Engine indexing official UAE & International
    statutory standards: OSHAD CoP 11.0, UAE MOHRE Ministerial Resolution 44, and ISO 7933/7243.
    """
    
    _corpus: List[StatutoryKnowledgeDoc] = [
        StatutoryKnowledgeDoc(
            doc_id="OSHAD-COP11-01",
            title="Abu Dhabi Occupational Safety and Health System — CoP 11.0: Safety in the Heat",
            authority="Abu Dhabi Public Health Centre (ADPHC) / OSHAD",
            clause="Section 3.2 — Mandatory Hydration & Rest Cycles",
            content=(
                "Employers and principal contractors must provide potable water cooled to 15-20°C within 100 meters "
                "of all outdoor work locations. Workers must be allotted 1 glass (250ml) of water or electrolyte solution "
                "every 15 to 20 minutes under high thermal stress. When WBGT exceeds 32°C, work-rest cycles must be "
                "adjusted to a minimum 50% rest ratio in actively air-conditioned shaded shelters maintaining temperatures below 25°C."
            ),
            penalty_or_mandate="Mandatory compliance requirement. Violation triggers immediate site stop-work notice and ADPHC administrative penalties."
        ),
        StatutoryKnowledgeDoc(
            doc_id="MOHRE-RES44-01",
            title="UAE Ministry of Human Resources and Emiratisation — Ministerial Resolution No. 44",
            authority="UAE Federal Government / MOHRE",
            clause="Article 1 — Annual Mandatory Midday Work Ban",
            content=(
                "Prohibits outdoor work under direct sunlight between 12:30 PM and 3:00 PM annually from June 15 to September 15. "
                "Employers are legally obligated to provide shaded areas during break hours, operational cooling devices, "
                "first aid kits, and electrolyte hydration stations. Daily working hours must not exceed 8 hours total."
            ),
            penalty_or_mandate="Fines of AED 5,000 per worker found working during the ban, up to a maximum penalty of AED 50,000 per site, plus potential reduction of contractor licensing tier."
        ),
        StatutoryKnowledgeDoc(
            doc_id="ISO-7933-PHS",
            title="ISO 7933:2004 Ergonomics of the Thermal Environment — Predicted Heat Strain (PHS)",
            authority="International Organization for Standardization (ISO)",
            clause="Section 6.1 — Core Temperature Limits & Heat Storage Equations",
            content=(
                "Establishes analytical calculation of sweat rate and core body temperature (Tcore). For unacclimatized workers, "
                "maximum allowable core body temperature is strictly limited to 38.0°C to prevent central nervous system impairment. "
                "For physiologically acclimatized workers (>21 consecutive days of heat exposure), the maximum allowable limit is 38.5°C. "
                "When heat storage rate exceeds 50 W/m², the maximum continuous work duration must be limited to prevent hyperthermia."
            ),
            penalty_or_mandate="International clinical safety threshold. Exceeding 38.5°C triggers immediate clinical heat stroke triage."
        ),
        StatutoryKnowledgeDoc(
            doc_id="ISO-7243-WBGT",
            title="ISO 7243:2017 Estimation of Heat Stress on Working Man Based on WBGT-Index",
            authority="International Organization for Standardization (ISO)",
            clause="Annex B — Reference WBGT Action Values by Metabolic Rate",
            content=(
                "Calculates outdoor WBGT = 0.7*Twb + 0.2*Tg + 0.1*Tdb. Reference limit values for acclimatized workers: "
                "Rest (115W): 33°C; Light Work (180W): 30°C; Moderate Work (300W): 28°C; Heavy Work (415W): 26°C; "
                "Very Heavy Rebar Work (520W): 25°C. For unacclimatized workers, reference values are reduced by 2°C to 3°C across all tiers."
            ),
            penalty_or_mandate="Universal baseline index adopted by Abu Dhabi OSHAD for mandatory engineering controls."
        ),
        StatutoryKnowledgeDoc(
            doc_id="CLINICAL-HEATSTROKE",
            title="Abu Dhabi Health Services (SEHA) / ADPHC Exertional Heat Illness Protocol",
            authority="Department of Health – Abu Dhabi (DoH) / SEHA",
            clause="Clinical Guideline — Heat Exhaustion vs. Exertional Heatstroke (EHS)",
            content=(
                "Exertional Heatstroke is a true medical emergency defined by hyperthermia (Tcore > 40.0°C) with central nervous "
                "system dysfunction (confusion, ataxia, delirium, collapse). Immediate treatment: rapid whole-body cooling via cold "
                "water immersion or continuous cool mist spray with high-velocity air movement. Do not wait for transport: begin active "
                "cooling within 10 minutes ('Cool First, Transport Second'). Call 998 immediately."
            ),
            penalty_or_mandate="Critical life-safety guideline. Delayed cooling beyond 30 minutes increases mortality to over 50%."
        ),
        StatutoryKnowledgeDoc(
            doc_id="OSHAD-ACCLIMATIZATION",
            title="Abu Dhabi OSHAD CoP 11.0 — Acclimatization Protocol for New Recruits",
            authority="Abu Dhabi Public Health Centre (ADPHC)",
            clause="Section 4.3 — Progressive Acclimatization Schedules",
            content=(
                "Newly arrived migrant workers or workers returning from absence of 14+ days must undergo a structured 5-to-14 day "
                "progressive exposure: Day 1: 20% normal duration; Day 2: 40%; Day 3: 60%; Day 4: 80%; Day 5: 100%. "
                "Unacclimatized workers produce less sweat, have higher heart rates, and experience up to 3x faster core temperature elevation."
            ),
            penalty_or_mandate="Mandatory under OSHAD CoP 11.0 contractor onboarding audits."
        )
    ]

    def __init__(self):
        self.vectorizer = TfidfVectorizer(stop_words='english')
        corpus_texts = [f"{doc.title} {doc.clause} {doc.content} {doc.penalty_or_mandate}" for doc in self._corpus]
        self.tfidf_matrix = self.vectorizer.fit_transform(corpus_texts)

    def query(self, query_text: str, top_k: int = 2) -> Dict[str, Any]:
        """
        Executes semantic vector retrieval over official statutory corpora and synthesizes an authoritative answer.
        """
        query_vec = self.vectorizer.transform([query_text])
        similarities = cosine_similarity(query_vec, self.tfidf_matrix).flatten()
        top_indices = similarities.argsort()[::-1][:top_k]

        retrieved_docs = []
        for idx in top_indices:
            score = float(similarities[idx])
            doc = self._corpus[idx]
            retrieved_docs.append({
                "doc_id": doc.doc_id,
                "title": doc.title,
                "authority": doc.authority,
                "clause": doc.clause,
                "content": doc.content,
                "penalty_or_mandate": doc.penalty_or_mandate,
                "relevance_score": round(score, 3)
            })

        # Synthesize expert recommendation based on primary match
        primary = retrieved_docs[0] if retrieved_docs else None
        
        synthesized_answer = (
            f"According to {primary['authority']} ({primary['clause']}):\n\n"
            f"{primary['content']}\n\n"
            f"Regulatory Mandate: {primary['penalty_or_mandate']}"
        ) if primary else "No statutory reference matched the inquiry."

        return {
            "query": query_text,
            "synthesized_answer": synthesized_answer,
            "citations": retrieved_docs,
            "primary_authority": primary["authority"] if primary else "Unknown",
            "regulatory_framework": "Abu Dhabi OSHAD / UAE MOHRE / ISO 7933"
        }

# Global singleton
regulatory_rag = RegulatoryRAGEngine()
