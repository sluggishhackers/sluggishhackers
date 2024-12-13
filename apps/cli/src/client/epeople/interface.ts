export type CivilComplaint = {
  id?: string;
  title?: string;
  date?: string;
  status?: string;
  agency?: string;
  agencyItemId?: string;
  agencyDate?: string;
  agencyPerson?: string;
  agencySupposedDate?: string;
  url?: string;

  pttnRqstNo?: string;
  instRcptSn?: string;
  pttnRcptPrcsSttsCd?: string;
  stsfdYn?: string;
  pttnCnfmMthYn?: string;
  pttnTypeNm?: string;

  registerName?: string;

  answer?: string;
  answerDate?: string;
};

/**
 * <div class="mw_Input" id="slideBtnDiv1">
					<div class="h_InputType">
						<dl>
							<dt>신청번호</dt>
							<dd>1AA-2412-0152653</dd>
						</dl>
						<dl>
							<dt>신청일시</dt>
							<dd>2024-12-05 13:23:50</dd>
						</dl>
						<dl>
							<dt>신청인</dt>
							<dd>김채윤</dd>
						</dl>
						<dl>
							<dt>신청인 구분</dt>
							<dd>
								
									
										
											단체[서울특별시립 다시함께상담센터]
										
										
									
									
									
								
								
							</dd>
						</dl>
						<dl>
							<dt>연락처</dt>
							<dd>02-814-3660</dd>
						</dl>
						 <!--  국민지원금 이의신청 제외 -->
						<dl>
							<dt>주소</dt>
							<dd>
								
									[06939] 
								
								
								
								
								
								
								
									
									
									
									
										서울특별시 동작구 여의대방로54길 18, 4층 다시함께상담센터&#x28;대방동&#x29;
									
								
							</dd>
						</dl>
						<dl>
							<dt>성별/생년</dt>
							<dd>
							
								
								
								
							
							/
							
							</dd>
						</dl>
						
						<dl>
							<dt>진행상황 통지방식</dt>
							<dd>
								
									
										
										
										
										
											누리집(홈페이지)
										
									
								
									
								
							</dd>
						</dl>
						<dl>
							<dt>휴대전화</dt>
							<dd></dd>
						</dl>
						<dl>
							<dt>진행결과 통지방식</dt>
							<dd>
								
									
								
									
										
										
										
											누리집(홈페이지)
										
									
								
							</dd>
						</dl>
						<dl>
							<dt>전자우편</dt>
							<dd></dd>
						</dl>
				 <!--  국민지원금 이의신청 제외 -->
						
							<dl id="cnfmDl">
								<dt>보안 설정</dt>
								<dd>
									<span id="cnfmMthSp">미설정</span>
									<button type="button" class="btn black ml_10" id="cnfmMthCdBtn" onclick="javaScript:fn_cnfmMthToggle();">보안설정</button>
								</dd>
							</dl>
						
						<dl id="oldStmtCnfm" style="display:none;">
							<dt>신고 확인 방식</dt>
							<dd>
								<p class="lh23">※ 추후 공익신고의 처리현황을 조회하려면 <span class="blue">신청번호 또는 본인인증수단(공공 I-Pin, 공인인증서, 휴대폰)을 통한 인증</span>이 필요합니다. </p>
							</dd>
						</dl>
						<dl id="rvsnScpsopAgreYnDl" style="display:none;">
							<dt>신분공개 동의여부</dt>
							<dd>
								<input type="radio" title="신분공개 동의여부 동의" disabled>동의
								<input type="radio" title="신분공개 동의여부 비동의" checked disabled>동의하지 않음
								<p class="blue lh23 mt5">※ 앞으로 귀하의 공익신고사건에 대하여 소관기관에서 조사·확인하는 절차를 거치게 됩니다. 이 과정에서 귀하의 신분을 밝히거나 암시하는 것에 동의 하시겠습니까? </p>
							</dd>
						</dl>
						
						
							<dl>
								<dt>민원 공개 여부</dt>
								<dd>
									<span id="oppbYnSp">비공개</span>
									<!-- 2023.02.09 민원 공개 여부 버튼 수정 -->
									<button type="button" class="btn black ml_10" id="oppbYnBtn" onclick="javaScript:fn_oppbYnToggle();">공개로 전환</button>
									<!-- <button type="button" class="btn black ml_10" id="oppbYnBtn" onclick="javaScript:fn_oppbYnToggle();">비공개로 전환</button> -->
								</dd>
							</dl>
						
				
						
							<dl>
								<dt>민원 발생 지역</dt>
								<dd>
									<span id="oppbYnSp">충청남도 천안시</span>
								</dd>
							</dl>
						
						
						
					</div>
				</div>
			</div>
	
			<div class="titBox slideTit titBoxTitle">
				<h4>민원 신청 내용</h4>
			</div>
	
			<div class="slideBox slideBoxDetail">
				<!-- 아래 버튼 클래스에 on이 들어가져 있으면 아래 박스가 열린 상태로 보여집니다. -->
				<a href="#" class="slideBtn on" id="slideBtn2">열기</a>
				<div class="mw_Input" id="slideBtnDiv2">
					<div class="h_InputType">
						<dl>
							<dt>민원종류</dt>
							<dd>  
							
								
								
								
								일반민원
							
							</dd>
						</dl>
						<dl>
							<dt>제목</dt>
							<dd>천안 마사지 업소 성매매 신고</dd>
						</dl>
						<dl>
							<dt>내용</dt>
							<dd id="pttnCntnClDd" style="white-space:pre-wrap;">익명 시민 제보가 있어 내용을 전달합니다.

1. 업소명: 하루테라피/준테라피
2. 주소: 충남 천안시 서북구 한들1로 126-5, 2층/충남 천안시 서북구 불당33길 15 401호
3. 전화번호: 010-5955-6682

제보자에 의하면 두 개 업소는 동일한 운영자의 소유로, 마사지 업소로 위장하여 성매매 영업을 하고 있다고 합니다. 도어락 비밀번호는 두 업소 동일하게 1919라고 하오니, 불법 성매매 영업에 대해 불법 성매매 영업 확인 및 단속 부탁드립니다. </dd>
						</dl>
						<dl>
							<dt>첨부 파일</dt>
							<dd>
								<ul class="file_down">
									
								</ul>
							</dd>
						</dl>
						
						
						<dl id="wdrwRsnClDl" style="display:none;">
							<dt>취하사유</dt>
							<dd></dd>
						</dl>
						
					</div>
				</div>
			</div>
 */

/**
       * 	<div class="slideBox slideBoxDetail">
				<!-- 아래 버튼 클래스에 on이 들어가져 있으면 아래 박스가 열린 상태로 보여집니다. -->
				<a href="javascript:void(0);" class="slideBtn on">열기</a>
				<div class="mw_Input">
					<div class="h_InputType">
						<dl>
							<dt>처리기관</dt>
							<dd>
								
									
									
										경찰청 
									
								
								
									
										
										
											(경찰청 충청남도경찰청 천안서북경찰서 범죄예방대응과)
										
										
										
									
								
							</dd>
						</dl>
						<dl id="prcsDl1">
							<dt>처리기관 접수번호</dt>
							<dd>2AA-2412-0203606</dd>
						</dl>
						<dl id="prcsDl2">
							<dt>접수일시</dt>
							<dd>2024-12-06 10:06:58</dd>
						</dl>
						<dl id="prcsDl4">
							<dt>담당자(연락처)</dt>
							<dd>
								
								
								
								
									
									
									
 									
									
										
											김유리 (041-536-1347)
										
									
								
							</dd>
						</dl>
						<dl id="prcsDl3">
							<dt>처리예정일</dt>
							<dd>
								2024-12-16 23:59:59
								<div class="slideBoxIn">
									<div class="sl_wrap">
										
										
									</div>
									<div class="mw_wrap" tabindex="0">
										
										
									</div>
								</div>
								<p class="addition_txt">※ 민원처리기간은 최종 민원 처리기관의 접수일로부터
									
										보통 7일 또는 14
									
									
									일입니다. (해당 민원을 처리하는 소관 법령에 따라 달라질 수 있습니다.)
								</p>
							</dd>
						</dl>
						
					</div>
				</div>
			</div>
	
			<div class="titBox type_1 icon icon_1" id="ansrDiv1" style="display:none;">
				
					<h4>답변 내용</h4>
				
				
			</div>
	
			<div class="answerWrap" id="ansrDiv2" style="display:none;">
				<div class="answerBox">
					<div class="h_InputType">
						<dl>
							<dt>답변일시</dt>
							<dd></dd>
						</dl>
						<dl>
							<dt>처리결과<br>(답변내용)</dt>
							<dd>
								
								
								
							</dd>
						</dl>
						
							
						
						
						<dl>
							<dt>첨부 파일</dt>
							<dd>
								<ul class="file_down">
									
								</ul>
							</dd>
						</dl>
						
<!-- 						<dl> -->
<!-- 							<dt>공식문서</dt> -->
<!-- 							<dd> -->
<!-- 								<ul class="file_down"> -->
<!-- 									<li><a href="#">공식문서명.pdf</a></li> -->
<!-- 								</ul> -->
<!-- 							</dd> -->
<!-- 						</dl> -->
					</div>
				</div>
       */
