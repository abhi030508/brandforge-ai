# BrandForge AI API Documentation

## Overview

The BrandForge AI API provides endpoints for generating brand extension strategies using AI-powered analysis.

## Base URL

```
http://localhost:3000/api
```

## Endpoints

### 1. Health Check

Check if the API is running.

**Endpoint:** `GET /api/health`

**Response:**
```json
{
  "status": "ok",
  "message": "BrandForge AI API is running",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

---

### 2. Generate Brand Extension Strategy

Generate a comprehensive brand extension strategy using AI.

**Endpoint:** `POST /api/generate`

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "currentBrand": "Horlicks",
  "coreStrength": "Nutrition, trust, health malt",
  "targetCategory": "Energy Bars"
}
```

**Request Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `currentBrand` | string | Yes | The name of the existing brand |
| `coreStrength` | string | Yes | Core strengths and values of the brand |
| `targetCategory` | string | Yes | The target category for brand extension |

**Success Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "brandExtensionName": "Horlicks PowerBars",
    "swotAnalysis": {
      "strengths": [
        "Strong brand equity in nutrition and health",
        "Trusted by families for generations",
        "Established distribution network"
      ],
      "weaknesses": [
        "Limited experience in snack food category",
        "Perception as a traditional beverage brand",
        "Need to compete with established energy bar brands"
      ],
      "opportunities": [
        "Growing health-conscious consumer segment",
        "Increasing demand for convenient nutrition",
        "Cross-selling with existing product line"
      ],
      "threats": [
        "Intense competition from specialized brands",
        "Changing consumer preferences",
        "Price sensitivity in the energy bar market"
      ]
    },
    "aidaFramework": {
      "attention": "Launch with bold packaging featuring the trusted Horlicks logo alongside dynamic imagery of active lifestyles. Use influencer partnerships and social media campaigns highlighting 'Nutrition You Know, Energy You Need.'",
      "interest": "Educate consumers through content marketing about the unique nutritional profile combining Horlicks' heritage ingredients with modern energy bar formulation. Offer free samples at gyms, offices, and health stores.",
      "desire": "Create emotional connection by showcasing real stories of busy professionals and active individuals who rely on Horlicks PowerBars. Emphasize the convenience of trusted nutrition in a portable format.",
      "action": "Drive trial with introductory pricing, subscription models, and strategic placement in high-traffic locations. Implement a loyalty program that rewards repeat purchases and referrals."
    },
    "targetPersona": {
      "demographics": "Age 25-45, urban professionals, middle to upper-middle income, college-educated, health-conscious",
      "psychographics": "Values convenience without compromising health, seeks trusted brands, active lifestyle, time-constrained, quality-focused",
      "painPoints": [
        "Difficulty finding healthy snacks on-the-go",
        "Lack of trust in new energy bar brands",
        "Need for sustained energy without sugar crashes"
      ],
      "goals": [
        "Maintain healthy eating habits despite busy schedule",
        "Find convenient nutrition from trusted sources",
        "Balance work, fitness, and family commitments"
      ]
    }
  },
  "metadata": {
    "brand": "Horlicks",
    "category": "Energy Bars",
    "timestamp": "2024-01-01T00:00:00.000Z"
  }
}
```

**Error Responses:**

**400 Bad Request** - Missing required fields:
```json
{
  "error": "Missing required fields",
  "details": "currentBrand, coreStrength, and targetCategory are required"
}
```

**405 Method Not Allowed** - Wrong HTTP method:
```json
{
  "error": "Method Not Allowed",
  "details": "This endpoint only accepts POST requests"
}
```

**500 Internal Server Error** - Configuration error:
```json
{
  "error": "Configuration Error",
  "details": "LLM API key is not configured. Please set OPENAI_API_KEY in environment variables."
}
```

**500 Internal Server Error** - Parsing error:
```json
{
  "error": "Parsing Error",
  "details": "Failed to parse LLM response as JSON. Please try again."
}
```

**500 Internal Server Error** - Generic error:
```json
{
  "error": "Internal Server Error",
  "details": "An unexpected error occurred"
}
```

## Example Usage

### cURL

```bash
curl -X POST http://localhost:3000/api/generate \
  -H "Content-Type: application/json" \
  -d '{
    "currentBrand": "Horlicks",
    "coreStrength": "Nutrition, trust, health malt",
    "targetCategory": "Energy Bars"
  }'
```

### JavaScript (Fetch API)

```javascript
const response = await fetch('http://localhost:3000/api/generate', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    currentBrand: 'Horlicks',
    coreStrength: 'Nutrition, trust, health malt',
    targetCategory: 'Energy Bars',
  }),
});

const data = await response.json();
console.log(data);
```

### Python (requests)

```python
import requests

url = 'http://localhost:3000/api/generate'
payload = {
    'currentBrand': 'Horlicks',
    'coreStrength': 'Nutrition, trust, health malt',
    'targetCategory': 'Energy Bars'
}

response = requests.post(url, json=payload)
data = response.json()
print(data)
```

## Environment Variables

The following environment variables must be configured:

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `OPENAI_API_KEY` | Yes | OpenAI API key for LangChain | `sk-...` |
| `LLM_BASE_URL` | No | Custom LLM endpoint URL | `https://api.example.com/v1` |
| `MODEL_NAME` | No | Model name to use | `gpt-4` or `ibm/granite-13b-chat-v2` |

## Rate Limiting

Currently, there are no rate limits implemented. Consider implementing rate limiting for production use.

## Authentication

Currently, the API does not require authentication. Consider implementing API key authentication for production use.

## Support

For issues or questions, please refer to the main README.md or create an issue in the repository.