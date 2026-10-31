from fastapi import FastAPI
from pydantic import BaseModel
from typing import Optional

app = FastAPI(title="Sahayak AI Service", version="1.0.0")

class IncidentRequest(BaseModel):
    description: str
    incidentType: Optional[str] = None

class IncidentClassification(BaseModel):
    category: str
    severity: str
    confidence: float
    explanation: Optional[str] = None

def classify_incident(description: str, incident_type: Optional[str] = None) -> IncidentClassification:
    """
    Rule-based incident classification system.
    In production, this would use ML models or external AI services.
    """
    description_lower = description.lower()
    
    # Keywords for different incident types
    flood_keywords = ['flood', 'water', 'overflow', 'inundation', 'rain', 'drainage']
    fire_keywords = ['fire', 'burn', 'flame', 'smoke', 'blaze', 'inferno']
    earthquake_keywords = ['earthquake', 'tremor', 'shake', 'collapse', 'crack', 'aftershock']
    landslide_keywords = ['landslide', 'mudslide', 'rockfall', 'debris', 'slope']
    medical_keywords = ['medical', 'injury', 'hospital', 'ambulance', 'health', 'emergency', 'doctor']
    accident_keywords = ['accident', 'crash', 'collision', 'vehicle', 'car', 'truck', 'road']
    
    # Keywords for severity
    critical_keywords = ['death', 'fatal', 'critical', 'life-threatening', 'collapsed', 'trapped']
    high_keywords = ['severe', 'major', 'large', 'urgent', 'immediate', 'heavy']
    low_keywords = ['minor', 'small', 'light', 'low', 'stable']
    
    # Determine category
    category = 'other'
    max_matches = 0
    
    if incident_type:
        category = incident_type
    
    for keyword in flood_keywords:
        if keyword in description_lower:
            category = 'flood'
            max_matches += 1
    
    for keyword in fire_keywords:
        if keyword in description_lower:
            if category != 'flood' or max_matches < description_lower.count(keyword):
                category = 'fire'
                max_matches = description_lower.count(keyword)
    
    for keyword in earthquake_keywords:
        if keyword in description_lower:
            if max_matches < description_lower.count(keyword):
                category = 'earthquake'
                max_matches = description_lower.count(keyword)
    
    for keyword in landslide_keywords:
        if keyword in description_lower:
            if max_matches < description_lower.count(keyword):
                category = 'landslide'
                max_matches = description_lower.count(keyword)
    
    for keyword in medical_keywords:
        if keyword in description_lower:
            if max_matches < description_lower.count(keyword):
                category = 'medical'
                max_matches = description_lower.count(keyword)
    
    for keyword in accident_keywords:
        if keyword in description_lower:
            if max_matches < description_lower.count(keyword):
                category = 'accident'
                max_matches = description_lower.count(keyword)
    
    # Determine severity
    severity = 'medium'
    confidence = 0.7
    
    for keyword in critical_keywords:
        if keyword in description_lower:
            severity = 'critical'
            confidence = 0.85
            break
    
    if severity == 'medium':
        for keyword in high_keywords:
            if keyword in description_lower:
                severity = 'high'
                confidence = 0.8
                break
    
    if severity == 'medium':
        for keyword in low_keywords:
            if keyword in description_lower:
                severity = 'low'
                confidence = 0.75
                break
    
    return IncidentClassification(
        category=category,
        severity=severity,
        confidence=confidence,
        explanation=f"Classified as {category} with {severity} severity based on keyword analysis"
    )

@app.get("/")
async def root():
    return {
        "message": "Sahayak AI Classification Service",
        "version": "1.0.0",
        "endpoints": {
            "classify": "/api/classify",
            "health": "/health"
        }
    }

@app.get("/health")
async def health():
    return {"status": "healthy"}

@app.post("/api/classify", response_model=IncidentClassification)
async def classify(request: IncidentRequest):
    """
    Classify an incident based on description and optional type.
    Returns category, severity, and confidence score.
    """
    result = classify_incident(request.description, request.incidentType)
    return result

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
