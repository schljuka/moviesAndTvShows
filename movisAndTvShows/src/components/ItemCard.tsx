import React from "react";
import { Link } from "react-router-dom";
import "./ItemCard.css";

interface ItemCardProps {
    id: number;
    title: string;
    poster_path: string;
    overview?: string; 
}

const ItemCard: React.FC<ItemCardProps> = ({ id, title, poster_path }) => {
    return (
        <Link to={`/details/${id}`} className="item-card">
            <img src={`https://image.tmdb.org/t/p/w300${poster_path}`} alt={title} />
            <div className="item-info">
                <h3>{title}</h3>
            </div>
        </Link>
    );
}

export default ItemCard;
