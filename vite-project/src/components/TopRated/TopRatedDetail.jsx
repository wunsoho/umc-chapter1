import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import * as A from '../Popular/Popular.style.jsx';

function TopRatedDetail() {
    const location = useLocation();
    const { title } = useParams();
    const { poster_path, vote_average, release_date, overview } = location.state || {};
    const domain = "https://image.tmdb.org/t/p/w1280/";

    const STAR_IDX_ARR = ['first', 'second', 'third', 'fourth', 'last'];
    const [ratesResArr, setRatesResArr] = useState([0, 0, 0, 0, 0]);

    const calcStarRates = (vote_average) => {
        let tempStarRatesArr = [0, 0, 0, 0, 0];
        let starVerScore = Math.floor(vote_average);
        let idx = 0;
        while (starVerScore > 2) {
            tempStarRatesArr[idx] = 14;
            idx += 1;
            starVerScore -= 2;
        }
        tempStarRatesArr[idx] = (starVerScore / 2) * 14;
        return tempStarRatesArr;
    };
    useEffect(() => {
      if (typeof vote_average === 'number') {
          setRatesResArr(calcStarRates(vote_average));
      }
  }, [vote_average]);
    return (
      <div>
        <A.detailContainer>
          <A.detailimg>
            <A.img src={domain + poster_path} alt={title}/>
          </A.detailimg>
          <A.detail>
            <div className = "title1">{title}</div>
            <div className = "vote">평점
              {STAR_IDX_ARR.map((item, idx) => {
                    return <span className='star_icon' key={`${item}_${idx}`}>
                        <svg xmlns='http://www.w3.org/2000/svg' width='15' height='15' viewBox='0 0 14 13' fill='#cacaca'>
                            <clipPath id={`${item}StarClip`}>
                                <rect width={`${ratesResArr[idx]}`} height='10' />
                            </clipPath>
                            <path
                                id={`${item}Star`}
                                d='M9,2l2.163,4.279L16,6.969,12.5,10.3l.826,4.7L9,12.779,4.674,15,5.5,10.3,2,6.969l4.837-.69Z'
                                transform='translate(-2 -2)'
                            />
                            <use clipPath={`url(#${item}StarClip)`} href={`#${item}Star`} fill='#FFBE55'
                            />
                        </svg>
                    </span>
                })
                }
            </div>
            <div className = "date">개봉일 {release_date}</div>
            <div className = "viewT">줄거리</div>
            <div className =" viewD">{overview ? overview : "TMDB에서 제공하는 API에 상세 줄거리 정보가 없습니다"}</div>
          </A.detail>
        </A.detailContainer>  
      </div>
  );
}

export default TopRatedDetail;