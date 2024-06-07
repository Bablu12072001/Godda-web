import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Pagination, Skeleton } from "@mui/material";
import { MdKeyboardArrowRight } from "react-icons/md";
import { apiUrl } from "../constants";

const NewsEventsList = () => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/jmoa_news_events_all_data`);
        setNewsData(response.data["body-json"].body);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching news events data:", error);
      }
    };

    fetchData();
  }, []);

  const pageCount = Math.ceil(newsData.length / itemsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const displayNews = loading
    ? // Display skeleton while loading
      Array.from({ length: itemsPerPage }).map((_, index) => (
        <div
          key={index}
          className="bg-white p-4 rounded shadow-md transition-transform transform hover:scale-105 mt-4"
        >
          <Skeleton variant="rectangular" width="100%" height={200} />
          <Skeleton height={20} width="90%" style={{ marginTop: 10}} />
          <Skeleton height={20} width="80%" style={{ marginTop: 5 }} />
          <Skeleton height={20} width="60%" style={{ marginTop: 5 }} />
        </div>
      ))
    : // Render actual news data
      newsData
        .slice((page - 1) * itemsPerPage, page * itemsPerPage)
        .map((item) => (
          <div
            key={item.id}
            className="bg-white p-4 rounded shadow-md transition-transform transform hover:scale-105 mt-4"
          >
            <img
              src={item.imageUrl[0]}
              alt={item.title}
              className="w-full h-48 object-cover mb-2 rounded"
            />
            <div className="text-left">
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.content}</p>
              <Link
                to={{ pathname: `/news-and-event/${item.id}` }}
                className="text-red-600 hover:underline block mt-2 "
              >
                <span className="flex items-center">
                  Read More <MdKeyboardArrowRight size={20} />
                </span>
              </Link>
            </div>
          </div>
        ));

  return (
    <div className="text-center mt-10">
      <h1 className="text-3xl font-bold mb-4 border-b-2 border-gray-500 pb-2 inline-block text-black">
        News Events
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        {displayNews}
      </div>
      <Pagination
        count={pageCount}
        page={page}
        onChange={handleChangePage}
        color="primary"
        size="medium"
        className="mb-4"
      />
    </div>
  );
};

export default NewsEventsList;
