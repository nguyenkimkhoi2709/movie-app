import React from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import dbApi, { category, movieType, tvType } from "../../api/dbApi";
import Button, { OutlineButton } from "../Button/Button";
import Input from "../Input/Input";
import MovieCard from "../MovieCard/MovieCard";
import './movie-grid.scss'

function MovieGrid(props) {
  const [items, setItems] = useState([])

  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(0)

  const { keyword } = useParams()

  useEffect(() => {
    const getList = async () => {
      let res = null;

      if(keyword === undefined) {
        const params = {}
        switch(props.category) {
          case category.movie:
            res = await dbApi.getMoviesList(movieType.upcoming, {params});
            break;
          default:
            res = await dbApi.getTvList(tvType.popular, {params});
        }
      } else {
        const params = {
          query: keyword
        }
        res = await dbApi.search(props.category, {params})
      }
      setItems(res.results)
      setTotalPage(res.total_pages)
    }

    getList()
  }, [props.category, keyword])

  const loadMore = async () => {
    let res = null;

    if(keyword === undefined) {
      const params = {
        page: page + 1
      }
      switch(props.category) {
        case category.movie:
          res = await dbApi.getMoviesList(movieType.upcoming, {params});
          break;
        default:
          res = await dbApi.getTvList(tvType.popular, {params});
      }
    } else {
      const params = {
        page: page + 1,
        query: keyword
      }
      res = await dbApi.search(props.category, {params})
    }
      setItems([...items, ...res.results])
      setPage(page + 1)
    }

  return (
    <>
      <div className="section mb-3">
        <MovieSearch category={props.category} keyword={keyword}/>
      </div>
      <div className="movie-grid">
        {
          items.map((item, index) => (
            <MovieCard category={props.category} item={item} key={index}/>
          ))
        }
      </div>
      {
        page < totalPage ? (
          <dir className="movie-grid__loadmore">
            <OutlineButton className="small" onClick={loadMore}>Load more</OutlineButton>
          </dir>
        ) : null
      }
    </>
  )
}

const MovieSearch = (props) => {

  const [keyword, setKeyword] = useState(props.keyword ? props.keyword : '')

  const history = useHistory()

  const gotoSearch = useCallback(() => {
    if(keyword.trim().length > 0) {
      history.push(`${category[props.category]}/search/${keyword}`);
    }
  }, [keyword, props.category, history])

  useEffect(() => {
    const enterEvent = (e) => {
      e.preventDefault();
      if(e.keyCode === 13) {
        gotoSearch()
      }
    }
    document.addEventListener('keyup', enterEvent)

    return () => {
      document.removeEventListener('keyup', enterEvent)
    }
  }, [keyword, gotoSearch])

  return (
    <div className="movie-search">
      <Input 
        type="text"
        placeholder="Enter keyword"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <Button className="small" onClick={gotoSearch}>Search</Button>
    </div>
  )
}

export default MovieGrid