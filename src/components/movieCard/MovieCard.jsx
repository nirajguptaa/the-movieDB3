// import React, { useState } from "react";
// import dayjs from "dayjs";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { FaCheckCircle } from "react-icons/fa"; // Add this import

// import "./style.css";
// // import "./style.scss";
// import Img from "../lazyLoadImage/img";
// import CircleRating from "../circleRating/CircleRating";
// import Genres from "../genres/Genres";
// import PosterFallback from "../../assets/no-poster.png";

// const MovieCard = ({ data, fromSearch, mediaType, markAsWatched }) => {
//     const { url } = useSelector((state) => state.home);
//     const navigate = useNavigate();
//     const posterUrl = data.poster_path
//         ? url.poster + data.poster_path
//         : PosterFallback;

//     const [isWatched, setIsWatched] = useState(() => {
//         const watched = JSON.parse(localStorage.getItem('watchedMovies')) || [];
//         return watched.some(movie => movie.id === data.id);
//     });

//     // const handleMarkAsWatched = (e) => {
//     //     e.stopPropagation(); // Prevent navigation when clicking the button
//     //     const watched = JSON.parse(localStorage.getItem('watchedMovies')) || [];
        
//     //     if (!isWatched) {
//     //         const updatedWatched = [...watched, data];
//     //         localStorage.setItem('watchedMovies', JSON.stringify(updatedWatched));
//     //         setIsWatched(true);
//     //     }
//     // };

//     const handleMarkAsWatched = (e) => {
//         e.stopPropagation();
//         markAsWatched(); // use function passed as prop
//         setIsWatched(true);
//     };

//     return (
//         <div
//             className="movieCard"
//             onClick={() =>
//                 navigate(`/${data.media_type || mediaType}/${data.id}`)
//             }
//         >
//             <div className="posterBlock">
//                 <Img className="posterImg" src={posterUrl} />
//                 {!fromSearch && (
//                     <React.Fragment>
//                         <CircleRating rating={data.vote_average.toFixed(1)} />
//                         <Genres data={data.genre_ids.slice(0, 2)} />
//                     </React.Fragment>
//                 )}
//                 {isWatched && (
//                     <div className="watchedBadge">
//                         <FaCheckCircle />
//                         <span>Watched</span>
//                     </div>
//                 )}
//             </div>
//             <div className="textBlock">
//                 <span className="title">{data.title || data.name}</span>
//                 <span className="date">
//                     {dayjs(data.release_date).format("MMM D, YYYY")}
//                 </span>
//             </div>
//             {!isWatched && (
//                 <button 
//                     className="watchButton" 
//                     onClick={handleMarkAsWatched}
//                 >
//                     Mark as Watched
//                 </button>
//             )}
//         </div>
//     );
// };

// export default MovieCard;


import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaCheckCircle } from "react-icons/fa";

import "./style.css";
import Img from "../lazyLoadImage/img";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";
import PosterFallback from "../../assets/no-poster.png";

const MovieCard = ({ data, fromSearch, mediaType, markAsWatched }) => {
    const { url } = useSelector((state) => state.home);
    const navigate = useNavigate();
    const posterUrl = data.poster_path
        ? url.poster + data.poster_path
        : PosterFallback;

    const [isWatched, setIsWatched] = useState(false);

    // Check if movie is already marked as watched when component mounts
    useEffect(() => {
        const watched = JSON.parse(localStorage.getItem("watchedMovies")) || [];
        setIsWatched(watched.some((movie) => movie.id === data.id));
    }, [data.id]); // Only rerun when data.id changes

    // Function to handle the marking as watched
    const handleMarkAsWatched = (e) => {
        e.stopPropagation(); // Prevent card navigation

        // Mark the movie as watched
        markAsWatched(data); // Call the passed function from the parent component
        setIsWatched(true); // Update the local state to reflect watched status
    };

    return (
        <div
            className="movieCard"
            onClick={() =>
                navigate(`/${data.media_type || mediaType}/${data.id}`)
            }
        >
            {/* <div className="posterBlock">
                <Img className="posterImg" src={posterUrl} />
                {!fromSearch && (
                    <React.Fragment>
                        <CircleRating rating={data.vote_average.toFixed(1)} />
                        <Genres data={data.genre_ids.slice(0, 2)} />
                    </React.Fragment>
                )}
                {isWatched && (
                    <div className="watchedBadge">
                        <FaCheckCircle />
                        <span>Watched</span>
                    </div>
                )}
            </div> */}

<div className="posterBlock">
    <Img className="posterImg" src={posterUrl} />
    {!fromSearch && (
        <>
            <CircleRating rating={data.vote_average.toFixed(1)} />
            <Genres data={data.genre_ids.slice(0, 2)} />
        </>
    )}
    {isWatched && (
        <div className="watchedBadge">
            <FaCheckCircle />
            <span>Watched</span>
        </div>
    )}
    {!isWatched && (
        <button
            className="watchButton"
            onClick={handleMarkAsWatched}
        >
            Mark as Watched
        </button>
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