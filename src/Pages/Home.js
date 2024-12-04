import React, { useEffect, useState } from 'react'
import Header from '../Components/Header';
import Banner from '../Components/Banner'
import Rows from '../Components/Rows';
import requests from '../Request';
import { auth } from '../firebase'

const Home = () => {

  return (
    <div>
        <Header/>
        <Banner/>
        {/* <Rows title='NETFLIX ORIGINALS' fetchUrl={requests.fetchNetflixOriginals} isLargeRow/> */}
        <Rows title='For you' fetchUrl={`https://api.themoviedb.org/3/movie/${auth?.currentUser?.email === "eliam@mail.com"? 493529 : 447365 }"/recommendations?api_key=52abd33f37ed4adae2df8ac3891c2bbb`}/>
        <Rows title='Top Rated' fetchUrl={requests.fetchTopRated}/> 
        <Rows title='Trending' fetchUrl={requests.fetchTrending}/>
        <Rows title='Action Movies' fetchUrl={requests.fetchActionMovies}/>
        <Rows title='Horror Movies' fetchUrl={requests.fetchHorrorMovies}/>
        {/* <Rows title='Comedy Movies' fetchUrl={requests.fetchComedyMovies}/> */}
        {/* <Rows title='Romance Movies' fetchUrl={requests.fetchRomanceMovies}/> */}
        {/* <Rows title='Documentaries' fetchUrl={requests.fetchDocumentaries}/> */}
    </div>
  )
}

export default Home;