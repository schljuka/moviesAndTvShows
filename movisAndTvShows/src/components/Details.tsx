import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Details.css";

interface DetailsProps {
    id: string;
}

interface MovieDetails {
    id: number;
    title: string;
    poster_path: string;
    overview: string;
}

interface TVShowDetails {
    id: number;
    title: string;
    poster_path: string;
    overview: string;
}

type ContentType = "movie" | "tv";

const Details: React.FC<DetailsProps> = ({ id }) => {
    const { id: paramId } = useParams<{ id: string }>();
    const navigate = useNavigate(); 
    const [details, setDetails] = useState<MovieDetails | TVShowDetails | null>(null);
    const [contentType, setContentType] = useState<ContentType | null>(null);

    useEffect(() => {
        fetchData();
    }, [paramId]);

    const fetchData = () => {
        const options = {
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZGIxZmRiOGNlODg1ZjJjYmNjZDBjOTkyOWVhMjNiOSIsInN1YiI6IjY1ODg0MmI0NGRhM2Q0NjNhMTQyMjY4MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gbm560t0r-Qeu0ptlY7IxUfxqs5wrBzcw7trPd9VXqU'
            }
        };

        axios.get<MovieDetails>(`https://api.themoviedb.org/3/movie/${paramId}?language=en-US`, options)
            .then((response: AxiosResponse<MovieDetails>) => {
                if (response.data) {
                    setDetails(response.data);
                    setContentType("movie");
                }
            })
            .catch(() => {
                axios.get<TVShowDetails>(`https://api.themoviedb.org/3/tv/${paramId}?language=en-US`, options)
                    .then((response: AxiosResponse<TVShowDetails>) => {
                        if (response.data) {
                            setDetails(response.data);
                            setContentType("tv");
                        }
                    })
                    .catch(err => console.error(err));
            });
    };
    if (!details) return <div className="loading">Loading...</div>;

    let title: string;
    if (contentType === "movie") {
        title = (details as MovieDetails).title;
    } else {
        title = (details as TVShowDetails).title;
    }

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className="button">
            <button onClick={handleGoBack} className="goBack">&lt; Back</button>
            <div className="details-container">

                <img className="details-poster" src={`https://image.tmdb.org/t/p/w500/${details.poster_path}`} alt={title} />
                <h2 className="details-title">{title}</h2>
             
                <p className="details-overview">{details.overview}</p>
            </div>
        </div>
    );

};

export default Details;
