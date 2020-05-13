import React, { useEffect, useState, useRef } from 'react';
import jikan from 'jikanjs';
import * as d3 from 'd3';

import '../styles/home.css';

function Home() {
  const inputRef = useRef();
  const svgRef = useRef();
  const [user, setUser] = useState({});
  const [mangalist, setMangalist] = useState([])
  const [input, setInput] = useState('');

  useEffect(() => {
    if (svgRef.current && user.username) {
      debugger
      let svg = d3.select(svgRef.current),
        width = 300, 
        height = 300,
        radius = Math.min(width, height) / 2,
        g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

      svg.attr("width", 300);
      svg.attr("height", 300);

      const color = d3.scaleOrdinal(["red", "steelblue"]);
      const pie = d3.pie();

      const arc = d3.arc()
        .innerRadius(radius / 3)
        .outerRadius(radius)

      const arcs = g.selectAll("arc")
        .data(pie([user.anime_stats.days_watched, user.manga_stats.days_read]))
        .enter()
        .append("g")
        .attr("class", "arc")

      arcs.append("path")
        .attr("fill", (d, i) => color(i))
        .attr("d", arc);
    }
  });

  async function handleUsername(e) {
    jikan.loadUser(input).then(res => setUser(res));
    // jikan.loadUser(input, 'mangalist', 'all').then(res => setMangalist(res.manga));
    inputRef.current.value = '';
  };

  function handleInput(e) {
    setInput(e.target.value)
  };

  function welcome() {
    console.log(user)
    console.log(mangalist)
    if (user.username) return <h2>Welcome {user.username}</h2>;
    // console.log(user)
    return <h2>Welcome to MyAnimeStats</h2>;
  };

  function showUserStats() {
    if (!user.username) return;
    const animeStats = user.anime_stats;
    const mangaStats = user.manga_stats;
    const animeDays = animeStats.days_watched, mangaDays = mangaStats.days_read;
    const totalDays = animeDays + mangaDays;
    const totalYears = (totalDays / 365).toFixed(2);

    return (
      <div>
        You've spent {animeDays} days watching anime <br/>
        and {mangaDays} reading manga <br/>
        for a total of {totalDays} days or {totalYears} years
      </div>
    );
  };

  function showMangaStats() {
    if (!mangalist.length) return;

    return (
      <div>
        <p>You have {mangalist.length} manga in your list</p>
        <div>
          <h3>Top 5 genre in your list</h3>

        </div>
      </div>
    );
  };

  return (
    <div>
      {welcome()}
      <svg ref={svgRef} width={0} height={0}></svg>
      <form onSubmit={handleUsername}>
        <input 
          ref={inputRef}
          type="text" 
          placeholder="your mal username"
          onChange={handleInput} 
        />  
        <button>Search</button>
      </form>
      {showUserStats()}
      
      {/* {showMangaStats()} */}
      {/* {mangalist.map(manga => {
        return <li>{manga.title}</li>
      })} */}
      
    </div>
  );
};

export default Home;