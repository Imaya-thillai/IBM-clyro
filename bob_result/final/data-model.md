# bob_result/final/data-model.md
# Consolidated Data Model Summary — CYLRO IBM Bob Analysis
# Date: 2026-08-30

---

## Summary
Of 22 DBF schemas, only **reserva.dbf** yielded any VERIFIED field information. All other schemas remain UNKNOWN. The modern CYLRO PoC maps the confirmed schema fragment to IBM Cloudant documents.

---

## Approved Schema — reserva.dbf (partial)

| Field | Inferred Type | Verified Value | Classification |
|-------|--------------|----------------|----------------|
| Expensa | Numeric | 10 (constant) | VERIFIED |
| Ult_Mes | Numeric | 2 (constant) | VERIFIED |
| ult_ano | Numeric/Char | 1999 (constant) | VERIFIED |
| All other fields | UNKNOWN | — | UNKNOWN |

**Candidate key:** UNKNOWN (no index files available)  
**Row count:** UNKNOWN (binary file, not parsed)  
**Relationship to other DBFs:** UNKNOWN

---

## All Other DBFs (21 schemas — UNKNOWN)

| DBF | Inferred Domain | Classification |
|-----|----------------|----------------|
| CTACTE.DBF | Customer accounts | UNKNOWN |
| RECIBO.DBF | Receipts | UNKNOWN |
| SUBNIVEL.DBF | Sub-levels / zones | UNKNOWN |
| SUPLENTE.DBF | Substitutes | UNKNOWN |
| titular.DBF | Account holders | UNKNOWN |
| parquenu.dbf | Parcels / plots | UNKNOWN |
| COCHERIA.DBF | Funeral homes | UNKNOWN |
| ATAUD.DBF | Coffins / packages | UNKNOWN |
| AREAS.DBF | Areas | UNKNOWN |
| BAJA.DBF | Cancellations | UNKNOWN |
| bancos.dbf | Banks | UNKNOWN |
| cobrador.dbf | Collectors | UNKNOWN |
| CONTRAS.DBF | Contracts | UNKNOWN |
| ctaexp.dbf | Account export | UNKNOWN |
| FILTRO.DBF | Filter cache | UNKNOWN |
| MAEASO.DBF | Master association | UNKNOWN |
| mutual.dbf | Cooperative | UNKNOWN |
| PROMOTOR.DBF | Promoters | UNKNOWN |
| PROVINCI.DBF | Provinces | UNKNOWN |
| RENA.DBF | National registry | UNKNOWN |
| VALOREXP.DBF | Value export | UNKNOWN |

---

## Cloudant Modern Equivalent

```json
// cylro-shipping-logs document structure (CYLRO PoC)
{
  "_id": "shipping-<timestamp>-<random>",
  "type": "shipping_manifest",
  "source": "CYLRO-WebPortal",
  "timestamp": "<ISO-8601>",
  "verifiedRules": ["BR-060","BR-061","BR-062","BR-063","BR-064"],
  "legacyConstants": {
    "Expensa": 10,
    "Ult_Mes": 2,
    "ult_ano": 1999
  },
  "data": {
    "orderId": "...",
    "customerName": "...",
    "shippingAddress": "...",
    "productName": "...",
    "weight": 0.0,
    "shippingMode": "EXPRESS|STANDARD|OVERNIGHT",
    "courierService": "...",
    "trackingNumber": "...",
    "shippingFee": 0.0,
    "taxAmount": 0.0,
    "status": "DISPATCHED"
  }
}
```
