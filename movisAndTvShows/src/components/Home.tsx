import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { RootState } from "../store/store"; 

import Header from "./Header";
import ItemCard from "./ItemCard";
import "./Home.css";

interface Movie {
    id: number;
    title: string;
    poster_path: string;
    overview: string;
}

interface SearchResult {
    id: number;
    title: string;
    poster_path: string;
    overview: string;
}

const Home: React.FC = () => {
    const category = useSelector((state: RootState) => state.category.category);

    const [data, setData] = useState<Movie[]>([]);
    const [search, setSearch] = useState<string>('');
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    const [displayedProducts, setDisplayedProducts] = useState<number>(10);

    useEffect(() => {
        fetchData();
    }, [category]);

    const fetchData = () => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZGIxZmRiOGNlODg1ZjJjYmNjZDBjOTkyOWVhMjNiOSIsInN1YiI6IjY1ODg0MmI0NGRhM2Q0NjNhMTQyMjY4MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gbm560t0r-Qeu0ptlY7IxUfxqs5wrBzcw7trPd9VXqU'
            }
        };

        const url = category === 'movie' ? 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1' : 'https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1';

        axios.get(url, options)
            .then(response => {
                const formattedData: Movie[] = response.data.results.map((item: any) => ({
                    id: item.id,
                    title: item.title || item.name,
                    poster_path: item.poster_path,
                    overview: item.overview
                }));
                setData(formattedData);
                setSearchResults([]);
            })
            .catch(err => console.error(err));
    }

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = e.target.value;
        setSearch(searchTerm);
        if (searchTerm.length >= 3) {
            filterData(searchTerm);
        } else {
            fetchData();
        }
    }

    const filterData = (searchTerm: string) => {
        const url = `https://api.themoviedb.org/3/search/${category}?query=${searchTerm}&language=en-US&page=1`;

        axios.get(url, {
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZGIxZmRiOGNlODg1ZjJjYmNjZDBjOTkyOWVhMjNiOSIsInN1YiI6IjY1ODg0MmI0NGRhM2Q0NjNhMTQyMjY4MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gbm560t0r-Qeu0ptlY7IxUfxqs5wrBzcw7trPd9VXqU'
            }
        })
            .then(response => {
                const formattedResults: SearchResult[] = response.data.results.map((item: any) => ({
                    id: item.id,
                    title: item.title,
                    poster_path: item.poster_path,
                    overview: item.overview
                }));
                setSearchResults(formattedResults);
            })
            .catch(err => console.error(err));
    }

    return (
        <div className="home-container">
            <Header />
            <input className="search" type="search" placeholder="&#128269; Search..." value={search} onChange={handleSearch} />

            <div className="home-content">
                {(search.length >= 3 ? searchResults.slice(0, displayedProducts) : data.slice(0, displayedProducts)).map(elem => (
                    <ItemCard key={elem.id} id={elem.id} title={elem.title} poster_path={elem.poster_path} overview={elem.overview} />
                ))}
            </div>
        </div>
    )
}

export default Home;
