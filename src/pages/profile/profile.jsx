import React, { useState, useEffect } from 'react';
import ContentWrapper from '../../components/contentWrapper/ContentWrapper';
import MovieCard from '../../components/movieCard/MovieCard';
import './style.css';
import Spinner from '../../components/spinner/Spinner';
import { fetchDataFromApi } from '../../utils/api';

const Profile = () => {
    const [watchedMovies, setWatchedMovies] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(false);
    const username = localStorage.getItem('username');

    useEffect(() => {
        // Load watched movies from localStorage
        const watched = JSON.parse(localStorage.getItem('watchedMovies')) || [];
        setWatchedMovies(watched);
        
        // Get recommendations based on watched movies
        if (watched.length > 0) {
            getRecommendations(watched[watched.length - 1].id);
        }
    }, []);

    const getRecommendations = async (movieId) => {
        setLoading(true);
        try {
            const data = await fetchDataFromApi(`/movie/${movieId}/recommendations`);
            setRecommendations(data.results?.slice(0, 10) || []);
        } catch (error) {
            console.error("Error fetching recommendations:", error);
        }
        setLoading(false);
    };

    const addToWatched = (movie) => {
        const updatedWatchedMovies = [...watchedMovies, movie];
        setWatchedMovies(updatedWatchedMovies);
        localStorage.setItem('watchedMovies', JSON.stringify(updatedWatchedMovies));
    };

    return (
        <div className="profilePage">
            <ContentWrapper>
                <div className="profileHeader">
                    <h1>Welcome, {username}!</h1>
                </div>
                
                <div className="watchedMovies">
                    <h2>Movies You've Watched</h2>
                    <div className="movieGrid">
                        {watchedMovies.map((movie) => (
                            <MovieCard 
                                key={movie.id} 
                                data={movie} 
                                fromSearch={false}
                                mediaType="movie"
                            />
                        ))}
                        {watchedMovies.length === 0 && (
                            <p className="noMovies">You haven't watched any movies yet!</p>
                        )}
                    </div>
                </div>

                <div className="recommendedMovies">
                    <h2>Recommended For You</h2>
                    {loading ? (
                        <Spinner />
                    ) : (
                        <div className="movieGrid">
                            {recommendations.map((movie) => (
                                <MovieCard 
                                    key={movie.id} 
                                    data={movie} 
                                    fromSearch={false}
                                    mediaType="movie"
                                />
                            ))}
                        </div>
                    )}
                </div>
            </ContentWrapper>
        </div>
    );
};

export default Profile;