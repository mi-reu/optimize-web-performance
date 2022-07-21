// import React, { useState } from 'react'
import React, { useState, Suspense, lazy, useEffect } from 'react'
import styled from 'styled-components'
import Header from './components/Header'
import InfoTable from './components/InfoTable'
import SurveyChart from './components/SurveyChart'
import Footer from './components/Footer'

const lazyWithPreload = (importFunction) => {
    const LazyComponent = lazy(importFunction);
    LazyComponent.preload = importFunction;
    return LazyComponent;
}

const LazyImageModal = lazyWithPreload(() => import('./components/ImageModal'));

function App() {
    const [showModal, setShowModal] = useState(false);

    // 페이지 로드가 완료되었을 때
    useEffect(() => {
        LazyImageModal.preload();

        const img = new Image();

        img.src = 'https://stillmed.olympic.org/media/Photos/2016/08/20/part-1/20-08-2016-Football-Men-01.jpg?interpolation=lanczos-none&resize=*:800';
    }, []);

    // 사용자가 버튼에 마우스를 올려놨을 때,
    // const handleMouseEnter = () => {
    //     LazyImageModal.preload();
    // }

    return (
        <div className="App">
            <Header />
            <InfoTable />
            {/* <ButtonModal onClick={() => { setShowModal(true) }}>올림픽 사진 보기</ButtonModal> */}
            <ButtonModal 
                onClick={() => { setShowModal(true) }}
                // onMouseEnter={handleMouseEnter}
            >
                올림픽 사진 보기
            </ButtonModal>
            <SurveyChart />
            <Footer />
            {/* {showModal ? <ImageModal closeModal={() => { setShowModal(false) }} /> : null} */}
            <Suspense fallback={null}>
                {showModal ? <LazyImageModal closeModal={() => { setShowModal(false) }} /> : null}
            </Suspense>
        </div>
    )
}

const ButtonModal = styled.button`
    border-radius: 30px;
    border: 1px solid #999;
    padding: 12px 30px;
    background: none;
    font-size: 1.1em;
    color: #555;
    outline: none;
    cursor: pointer;
`

export default App
