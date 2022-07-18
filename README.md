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

---
## 통계 사이트 최적화
### 렌더링 성능 최적화
- 애니메이션 최적화

#### 애니메이션 최적화 검사 (Reflow, Repaint)
- Chrome 개발자 도구 -> Performance 탭 -> CPU 옵션에서 성능을 하향시켜 애니메이션 동작이 저사양에서도 일정하게 동작되는지 체크

#### 애니메이션 원리
- 연속되는 이미지가 1초에 한번씩 변경되면서 연속되는 화면으로 나타나는 원리
- 기본적으로 초당 60 Frame(60FPS)로 표현
- 성능 이슈로 초당 60 프레임이 아닌 30 또는 20 프레임으로 동작시 쟁크 발생(애니메이션이 버벅이는 현상)

#### 브라우저 렌더링 과정
- DOM + CSSOM -> Render Tree -> Layout -> Paint -> Composite
- DOM + CSSOM
  - HTML -> DOM, CSS -> CSSOM 로 가공하여 두 가지 형태의 트리 구조를 생성
- Render Tree
  - DOM, CSSOM 을 조합하여 Render Tree 를 생성
- Layout
  - 생성된 Render Tree 를 이용하여 화면에 그려질 요소들의 위치와 크기를 계산
- Paint
  - Layout 에 의해 위치와 크기가 결정된 요소에 색상을 계산
- Composite
  - Layout, Paint 등 각각의 레이어로 생성된 결과물을 하나로 합성하여 최종적인 화면을 생성
- 위 일련의 과정을 Critical Rendering Path 또는 Pixel Pipeline 이라고 한다.

#### Reflow
- width, height(위치나 크기) 변경
- 위치나 크기가 변경되어 모든 렌더링 과정을 재실행
#### Repaint
- color, background-color(색상) 변경
- 위치나 크기가 변경되지않아 렌더링 과정중 Layout 과정을 생략

#### Reflow, Repaint 피하기(GPU 도움받기)
- transform, opacity(GPU가 관여할 수 있는 속성) 변경
- GPU 가 직접적으로 데이터를 가공함으로써 Layout, Paint 과정을 생략

#### 애니메이션 구현시 주의사항
- Reflow 을 발생시키는 속성의 사용을 피한다.
- 가능하다면 Reflow, Repaint 과정을 모두 생략할 수 있는 transform 또는 opacity 속성같은 GPU 을 활용할 수 있는 속성을 사용하여 애니메이션을 구현한다.

#### 애니메이션 최적화
- width
  - 최대 60프레임 기준 프레임이 일정하지 않음
  - 메인 스레드에서 동작하게 되어 스레드에 부하를 일으켜 프레임 드랍이 발생
- transform
  - 최대 60프레임 기준 프레임이 일정함
  - GPU 의 도움을 받아 스레드가 하는 역할이 적어 부하가 일어나지 않아 프레임이 일정하게 유지

### 로딩 성능 최적화
- 컴포넌트 Lazy Loading
- 컴포넌트 Preloading
- 이미지 Preloading

#### 컴포넌트 Lazy Loading
```jsx
import React, { useState, Suspense, lazy } from 'react'
import styled from 'styled-components'
import Header from './components/Header'
import InfoTable from './components/InfoTable'
import SurveyChart from './components/SurveyChart'
import Footer from './components/Footer'

const LazyImageModal = lazy(() => import('./components/ImageModal'));

function App() {
    const [showModal, setShowModal] = useState(false)

    return (
        <div className="App">
            <Header />
            <InfoTable />
            <ButtonModal onClick={() => { setShowModal(true) }}>올림픽 사진 보기</ButtonModal>
            <SurveyChart />
            <Footer />
            <Suspense fallback={null}>
                {showModal ? <LazyImageModal closeModal={() => { setShowModal(false) }} /> : null}
            </Suspense>
        </div>
    )
}
```
블로그 사이트 최적화와 동일하게 리액트의 Suspense, lazy 를 이용하여 컴포넌트 Lazy Loading 및 Code Splitting을 구현한다.

#### Lazy Loading의 단점
- 사용자가 버튼을 클릭한 후, 모달 파일을 불러와야하기 때문에 실제 화면이 보이기까지 네트워크 및 스크립트 실행 등의 딜레이가 발생 

#### 컴포넌트 Preloading
- Preloading 을 이용하여 실제 코드가 필요하기전에 미리 코드를 다운로드 받는다.
- Preload Timing
  1. 버튼 위에 마우스를 올려 놨을 때(onMouseEnter)
  2. 최초 페이지 로드가 되고, 모든 컴포넌트의 마운트가 끝났을 때(useEffect)