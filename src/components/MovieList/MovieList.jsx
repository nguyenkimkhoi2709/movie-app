import PropTypes from 'prop-types';
import './movie-list.scss';

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import dbApi, { category } from "../../api/dbApi";
import MovieCard from '../MovieCard/MovieCard';

MovieList.propTypes = {
  category: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
}

function MovieList(props) {
  const [items, setItems] = useState([])

  useEffect(() => {
    const getList = async () => {
      let res = null;
      const params = {};

      if(props.type !== 'similar') {
        switch(props.category) {
          case category.movie:
            res = await dbApi.getMoviesList(props.type, {params})
            break;
          default:
            res = await dbApi.getTvList(props.type, {params})
        }
      } else {
        res = await dbApi.similar(props.category, props.id);
      }

      setItems(res.results)
    }

    getList()
  }, []);

  return (
    <div className="movie-list">
      <Swiper
        grabCursor={true}
        spaceBetween={10}
        slidesPerView={'auto'}
      >
        {
          items.map((item, index) => (
            <SwiperSlide key={index}>
              <MovieCard item={item} category={props.category}/>
            </SwiperSlide>
          ))
        }
      </Swiper>
    </div>
  )
}

export default MovieList