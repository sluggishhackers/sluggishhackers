# epp (Commmand Line Interface)

## 지원 서비스

### 국민신문고

1. 데이터 가져오기

```bash
epp epeople fetch --username=<username> --password=<password> --query=<검색어> --dateFrom=<YYYY=MM-DD> --dateTo=<YYYY-MM-DD>
```

2. 데이터 백업하기 (supabase)

```bash
epp epeople sync --username=<username> --password=<password> --dateFrom=<YYYY=MM-DD> --dateTo=<YYYY-MM-DD>
```
