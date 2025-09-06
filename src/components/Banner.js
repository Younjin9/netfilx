import React, { useEffect, useState } from 'react'
import axios from '../api/axios'; // TMDB API 요청을 위한 axios 인스턴스 import
import requests from '../api/requests'; // API endpoint 모음 import

import './Banner.css' // 배너 스타일 import

export default function Banner() {

    // 영화 정보 상태
    const [movie, setMovie] = useState({});
    // Play 버튼 클릭 여부 상태
    const [isClicked, setIsClicked] = useState(false);

    // 컴포넌트 마운트 시 영화 데이터 fetch
    useEffect(() => {
        fetchData();
    }, []);    

    // 영화 데이터 불러오는 함수
    const fetchData = async () => {
        // 현재 상영 중인 영화 목록 요청
        const request = await axios.get(requests.fetchNowPlaying);

        // 랜덤으로 영화 하나 선택
        const movieId =
            request.data.results[
                Math.floor(Math.random() * request.data.results.length)
            ].id;

        // 선택한 영화의 상세 정보 요청 (비디오 정보 포함)
        const { data: movieDetail } = await axios.get(
            `movie/${movieId}`,
            {
                params: { append_to_response: "videos" },
            }
        );
        // 상태에 영화 정보 저장
        setMovie(movieDetail);
    };

    // 긴 텍스트를 n글자까지만 보여주고 ... 처리하는 함수
    const truncate = (str, n) => {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    };

    // 배너 UI 렌더링
    return (
        <header
            className="banner"
            style={{
                backgroundImage: movie.backdrop_path
                    ? `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`
                    : "none",
                backgroundPosition: "top center",
                backgroundSize: "cover"
            }}>
            <div className="banner__contents">
                {/* 영화 제목 */}
                <h1 className='banner__title'>{movie.title || movie.name || movie.original_name} </h1>
                <div className="banner__buttons">
                    {/* Play 버튼 */}
                    <button className="banner__button play" onClick={() => setIsClicked(true)}>Play</button>
                    {/* More Information 버튼 */}
                    <button className="banner__info">
                        <div className='space'></div>More Information</button>
                </div>
                {/* 영화 설명 */}
                <h1 className="banner__description">{truncate(movie.overview, 100)}</h1>
            </div>
            {/* 아래쪽 그라데이션 효과 */}
            <div className="banner--fadeBottom" />
        </header>
    );
}
