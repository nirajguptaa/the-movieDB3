import React, { useState } from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import "./style.css";
// import "./style.scss";
import Img from "../lazyLoadImage/img";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";
import PosterFallback from "../../assets/no-poster.png";

const MovieCard = ({ data, fromSearch, mediaType }) => {
    const { url } = useSelector((state) => state.home);
    const navigate = useNavigate();
    const posterUrl = data.poster_path
        ? url.poster + data.poster_path
        : PosterFallback;

    const [isWatched, setIsWatched] = useState(() => {
        const watched = JSON.parse(localStorage.getItem('watchedMovies')) || [];
        return watched.some(movie => movie.id === data.id);
    });

    const handleMarkAsWatched = (e) => {
        e.stopPropagation(); // Prevent navigation when clicking the button
        const watched = JSON.parse(localStorage.getItem('watchedMovies')) || [];
        
        if (!isWatched) {
            const updatedWatched = [...watched, data];
            localStorage.setItem('watchedMovies', JSON.stringify(updatedWatched));
            setIsWatched(true);
        }
    };

    return (
        <div
            className="movieCard"
            onClick={() =>
                navigate(`/${data.media_type || mediaType}/${data.id}`)
            }
        >
            <div className="posterBlock">
                <Img className="posterImg" src={posterUrl} />
                {!fromSearch && (
                    <React.Fragment>
                        <CircleRating rating={data.vote_average.toFixed(1)} />
                        <Genres data={data.genre_ids.slice(0, 2)} />
                    </React.Fragment>
                )}
            </div>
            <div className="textBlock">
                <span className="title">{data.title || data.name}</span>
                <span className="date">
                    {dayjs(data.release_date).format("MMM D, YYYY")}
                </span>
            </div>
            {!isWatched && (
                <button 
                    className="watchButton" 
                    onClick={handleMarkAsWatched}
                >
                    Mark as Watched
                </button>
            )}
        </div>
    );
};

export default MovieCard;