# 웹-성능-최적화
## 웹 성능 최적화의 주요 포인트
1. 로딩 성능
2. 렌더링 성능

## 블로그 사이트 최적화
### 로딩 성능 최적화(Opportunities)
- 이미지 사이즈 최적화
- Code Split
- 텍스트 압축

#### 이미지 사이즈 최적화http://localhost:59727/
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

### bundle 파일 분석(bundle-analyzer)
- create-react-app(이하 cra)로 만들어진 프로젝트에서 bundle-analyzer 설정 시, eject 또는 cra custom config 가 가능한 툴을 사용하여 별도의 설정 과정이 필요.
- cra-bundle-analyzer 를 사용하면 위 설정 과정 없이도 bundle-analyzer 를 사용할 수 있다.

### Code Splitting & Lazy Loading
- https://ko.reactjs.org/docs/code-splitting.html#route-based-code-splitting
- https://webpack.js.org/guides/code-splitting/

```jsx
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// lazy(): 코드를 동적으로 불러오기 위한 함수
const Home = lazy(() => import('./routes/Home'));
const About = lazy(() => import('./routes/About'));

const App = () => (
  <Router>
    {/* 코드를 동적으로 불러오는 동안, 화면에 표시할 fallback 을 표시하는 컴포넌트 */}
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Suspense>
  </Router>
);
```

### 텍스트 압축(Content-Encoding)
- 서버에서 보내는 리소스를 압축하여 사용자의 다운로드 리소스를 줄이고 리소스가 줄어든 만큼 서비스 제공 속도가 향상된다.

#### 웹상에서 사용되는 주요 압축방식
- [Effective compression technique for web applications using Brotli](https://blogs.halodoc.io/effective-compression-technique-for-web-applications-using-brotli/)
- GZIP
    * 내부적으로 Deflate 를 사용하며 블럭화, 휴리스틱 필터링, 헤더, 체크섬과 함께 사용
    * 여러가지 기법이 추가되어 Deflate만 사용하는 것보다 더 좋은 압축률 제공
- Deflate
    * [LZ77](https://en.wikipedia.org/wiki/LZ77_and_LZ78)
    * [허프만 코딩](https://velog.io/@junhok82/%ED%97%88%ED%94%84%EB%A7%8C-%EC%BD%94%EB%94%A9Huffman-coding)

#### 텍스트 압축시 알아두어야 할 사항
- 서버에서 압축을 하면 클라이언트에서는 압축을 해제해야한다. 그러므로, 모든 파일을 압축하면 오히려 성능에 악영향을 준다.
- 2kb 이상인 파일만 압축 하는것이 좋다.