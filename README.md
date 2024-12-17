# Sluggish Hackers

[Sluggish Hackers](https://sluggish.at) 에서 제작한 도구 및 공공의 목적으로 제작하는 모든 도구와 라이브러리를 모아놓은 모노레포지토리입니다.

Sluggish Hackers는 비영리 활동가 및 단체들을 대상으로 업무자동화 도구를 제작하여 제공하거나 관련한 기술 자문을 나누는 비영리 커뮤니티입니다. 활동하면서 제작한 크롤러와 외부 API를 위한 코드베이스 및 이 코드베이스를 활용한 간단한 도구들을 한 곳에 모아 공유합니다.

## Packages

```markdown
🌤️ 이미 완료된 코드가 있고 옮기는 중
🌥️ 계획만 있음
```

### 크롤러

#### 전국

- [x] 국민신문고
- [ ] 🌤️ [열린국회정보](https://open.assembly.go.kr/portal/openapi/main.do)
- [ ] 🌤️ [복지로](https://www.bokjiro.go.kr)
- [ ] 🌤️ [선거관리위원회 후보자 명부](http://info.nec.go.kr/main/showDocument.xhtml?electionId=0020240410&topMenuId=PC&secondMenuId=PCRI03) (링크는 깨졌으나 구조는 동일함)
- [ ] 🌤️ [의약품안전나라 - 생산/수입/공급중단 보고 의약품](https://nedrug.mfds.go.kr/pbp/CCBAF01)

#### 지역

- [ ] 🌤️ [서울시 영상회의록](https://ms.smc.seoul.kr/kr/cast/vod2.do)
- [ ] 🌤️ [대전광역시 지역위원회 목록](https://www.daejeon.go.kr/drh/acm/drhAcmBoardList.do?menuSeq=6412)
- [ ] 🌤️ [경상남도 의안 목록](https://council.gyeongnam.go.kr)
- [ ] 🌤️ [대전광역시 의안 목록](https://council.daejeon.go.kr)
- [ ] 🌤️ [부산광역시 의안 목록](https://council.busan.go.kr)
- [ ] 🌤️ [인천광역시 의안 목록](https://www.icouncil.go.kr/)
- [ ] 🌤️ [전라남도 의안 목록](https://bill.jnassembly.go.kr)
- [ ] 🌤️ [제주도 의안 목록](https://www.council.jeju.kr)

### API

#### [solapi](https://solapi.com/)

- [x] SMS 발송하기
- [x] 알림톡 발송하기

#### [stibee](https://stibee.com/)

- 자동이메일 API
  - [x] 발송하기
- 주소록
  - [x] 구독자 추가
  - [x] 구독자 삭제

#### 구글

- [x] [Custom Search](https://developers.google.com/custom-search/v1/overview)

## Apps

### [epp (CLI)](apps/cli/README.md)

- [국민신문고](https://www.epeople.go.kr/)
  - [x] 데이터 가져오기
  - [x] 데이터 디비 업로드하기(supabase)

## Credit

- [후니](https://hoony.land)

## License

[MIT License](LICENSE)