import React, {useState, useEffect} from 'react';
// import "./style.scss";
import "./style.css"
import { useNavigate } from 'react-router-dom';
import useFetch from '../../../hooks/useFetch';
import { useSelector } from 'react-redux';
import Img from '../../../components/lazyLoadImage/img';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
// import { PlayIcon } from '../../../components/playIcon/PlayIcon';

const HeroBanner = () => {
  const [background, setBackground] = useState("");
  const [currentMovie, setCurrentMovie] = useState(null);
  const navigate = useNavigate();
  const {url} = useSelector((state)=> state.home)

  const {data, loading} = useFetch("/movie/upcoming");

  useEffect(() => {
    if (data?.results?.length > 0) {
      const randomIndex = Math.floor(Math.random() * 20);
      const movie = data.results[randomIndex];
      setCurrentMovie(movie);
      setBackground(url.backdrop + movie.backdrop_path);
    }
  }, [data]);

  const handleWatchClick = () => {
    // You'll need to implement the video player functionality
    navigate(`/movie/${currentMovie.id}/videos`);
  };

  const handleSeeMoreClick = () => {
    navigate(`/movie/${currentMovie.id}`);
  };

  return (
    <div className="heroBanner">
      {!loading && (
        <div className="backdrop-img">
          <Img src={background}/>
        </div>
      )}

      <div className="opacity-layer"></div>

      <ContentWrapper>
        <div className="wrapper">
          <div className="heroBannerContent">
            {currentMovie && (
              <>
                <h1 className="title">{currentMovie.title}</h1>
                <p className="overview">{currentMovie.overview}</p>
                <div className="buttons">
                  {/* <button className="watchButton" onClick={handleWatchClick}>
                   Watch Trailer
                  </button> */}
                  <button className="moreButton" onClick={handleSeeMoreClick}>
                    See More
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default HeroBanner;