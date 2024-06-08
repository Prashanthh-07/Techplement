import React, { useState, useEffect } from "react";
import "./RandomQuote.css";
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';

export const RandomQuote = () => {
  const [quote, setQuote] = useState({
    content: "The ballot is stronger than the bullet",
    author: "Abraham Lincoln",
  });
  const [searchAuthor, setSearchAuthor] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRandomQuote = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("https://api.quotable.io/random");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setQuote(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const fetchQuoteByAuthor = async (author) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://api.quotable.io/quotes?author=${author}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      if (data.results.length > 0) {
        const randomIndex = Math.floor(Math.random() * data.results.length);
        setQuote(data.results[randomIndex]);
      } else {
        alert("No quotes found for the given author.");
      }
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomQuote();
  }, []);

  const handleSearch = () => {
    if (searchAuthor.trim() === "") {
      alert("Kindly Enter Author Name.");
      return;
    }
    fetchQuoteByAuthor(searchAuthor);
  };

  if (loading) {
    return <div className="container">Loading...</div>;
  }

  if (error) {
    return <div className="container">Error: {error}</div>;
  }

  return (
    <div className="container">
      <div className="title">Quotiverse</div>
      <div className="quote">{quote.content}</div>
      <div className="author">- <i>{quote.author}</i></div>
      <div>
         <Button 
                    variant="contained" 
                    type="submit" 
                    endIcon={<RefreshIcon />}
                    onClick={fetchRandomQuote}
                    style={{ backgroundColor: "#38b2ac",color: "#030101", textTransform: "none"}}
                >
                    Fetch Quote
          </Button>
      </div>
      <div>
      <div className="line"></div>
      
        <input
          type="text"
          placeholder="Enter Author Name ex. A.P.J Abdul Kalam"
          value={searchAuthor}
          onChange={(evt) => setSearchAuthor(evt.target.value)}
        />
        <Button className="Button"
                    variant="contained" 
                    type="submit" 
                    startIcon={<SearchIcon />}
                    onClick={handleSearch}
                    style={{ backgroundColor: "#38b2ac",color: "#030101", textTransform: "none"}}
                >
                    Search By Author
          </Button>
      </div>
      {/* <div><marquee style={{border:"2px dashed black", color: "blue"}}>Designed By Prashanth</marquee></div> */}
    </div>
  );
};

export default RandomQuote;
