import React from "react";
import { Link } from "react-router-dom";
import { OutlineButton } from "../components/Button/Button";
import HeroSlide from "../components/HeroSlide/HeroSlide";
import MovieList from "../components/MovieList/MovieList";
import { category, movieType, tvType } from '../api/dbApi'

function Home() {
  return (
    <>
      <HeroSlide />
      <div className="container">
        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Trending Movies</h2>
            <Link to="/movie">
              <OutlineButton className="small">View More</OutlineButton>
            </Link>
          </div>

          <MovieList category={category.movie} type={movieType.popular} />
        </div>

        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Top Rated Movies</h2>
            <Link to="/movie">
              <OutlineButton className="small">View More</OutlineButton>
            </Link>
          </div>

          <MovieList category={category.movie} type={movieType.top_rated} />
        </div>

        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Trending TV</h2>
            <Link to="/tv">
              <OutlineButton className="small">View More</OutlineButton>
            </Link>
          </div>

          <MovieList category={category.tv} type={tvType.popular} />
        </div>

        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Top Rated TV</h2>
            <Link to="/tv">
              <OutlineButton className="small">View More</OutlineButton>
            </Link>
          </div>

          <MovieList category={category.movie} type={movieType.top_rated} />
        </div>
      </div>
    </>
  )
}

export default Home

// function CourseItem({ title, desc }) {

//   return (
//     <div>
//       <title>{title}</title>
//       <p>{desc}</p>
//     </div>
//   )
// }