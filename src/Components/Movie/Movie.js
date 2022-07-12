import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addORremoveFavourit,changeCount} from "../../redux/actions/Favourit";

export default function Movie(props) {
  const { movie } = props;
  const fav = useSelector((state) => state.Favourit.favourits);
  let cnt = useSelector((state) => state.Favourit.count);
  // let color = useSelector((state) => state.Favourit.color);
  const dispatch = useDispatch();
  const addFavourit = (ev, movie) => {
    const newData = [...fav];
    if (!newData.includes(movie)) {
      newData.push(movie);
      // dispatch(changeColor("white"));
      // console.log("inside",color);
      // console.log(color,"push");
      ev.target.style.color = "yellow";
      dispatch(changeCount(++cnt));
      dispatch(addORremoveFavourit(newData));
      return;
    }
    const editData = newData.filter((data) => data !== movie);
    // dispatch(changeColor("yellow"));
    dispatch(changeCount(--cnt));
    // console.log("outside",color);
    ev.target.style.color ="white";
    dispatch(addORremoveFavourit(editData));
  };
  return (
    <div className="card">
      <button
        onClick={(event) => addFavourit(event, movie)}
        className="btn btn-dark"
      >
        {/* ${color==="yellow"?"text-light":"text-warning"} */}
        <i className={`fs-3 fa-solid fa-star`}></i>
      </button>
      <img
        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        style={{ maxHeight: 500 }}
        className="card-img-top img-fluid"
        alt="..."
      />
      <div className="card-body text-center">
        <p className="card-text">{movie.title}</p>
        <p className="card-text text-danger">{movie.vote_average}</p>
        <Link to={`/movie-details/${movie.id}`} className="btn btn-primary">
          Movie Details
        </Link>
      </div>
    </div>
  );
}
