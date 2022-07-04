# 웹-성능-최적화
## 웹 성능 최적화의 주요 포인트
1. 로딩 성능
2. 렌더링 성능

### 로딩 성능 최적화(Opportunities)
- 이미지 사이즈 최적화
- Code Split
- 텍스트 압축

#### 이미지 사이즈 최적화
- 이미지 사이즈 최적화 시, 이미지 크기는 실제 렌더링되는 이미지 크기의 2배 사이즈로 지정(레티나 디스플레이 대응)
- 이미지 CDN 사용

##### CDN(Contents Delivery Network)
물리적 거리의 한계를 극복하기 위해 소비자(사용자)와 가까운 곳에 컨텐츠 서버를 두는 기술

##### Image CDN(image processing CDN)
기본적인 CDN 의 개념과 이미지를 사용자에게 보내기 전, 이미지 사이즈 및 포맷 변환을 통해 사용자에게 보내도록 하는 기술
/> http://cdn.image.com?src=[img src]&width=200&height=100/

### 렌더링 성능 최적화(Diagnostics)
- Bottleneck 코드 최적화

#### Bottleneck 해결방안
* 특수 문자를 효율적으로 제거하기
    * replace 함수와 정규식 사용
    * 마크다운의 특수문자를 지워주는 라이브러리 사용(remove-markdown)
* 작업하는 양 줄이기