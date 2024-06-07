import React, { useState, useEffect } from "react";
import DateRangeIcon from "@mui/icons-material/DateRange";
import axios from "axios";
import { apiUrl } from "../constants";
export default function NoticeBoard() {
  const [loading, setLoading] = useState(true);
  const [notices, setNotices] = useState([]);
  // setNotices([
  //         {
  //           content:
  //             "Notice 1 content kdjf dfj dkljfd fdk fdjf dfj d fkdj fkd kdf d k",
  //           date: "2024-02-17",
  //         },
  //         { content: "Notice 2 content", date: "2024-02-16" },
  //         {
  //           content:
  //             "Notice 1 content kdjf dfj dkljfd fdk fdjf dfj d fkdj fkd kdf d k",
  //           date: "2024-02-17",
  //         },
  //         { content: "Notice 2 content", date: "2024-02-16" },
  //         {
  //           content:
  //             "Notice 1 content kdjf dfj dkljfd fdk fdjf dfj d fkdj fkd kdf d k",
  //           date: "2024-02-17",
  //         },
  //         { content: "Notice 2 content", date: "2024-02-16" },
  //       ]);
  //       setLoading(false);
  //     }, 2000); // Simulating a 2 seconds delay to fetch data
  //   }
  useEffect(() => {
    // Simulating fetching data from an API
    const fetchData = async () => {
      try {
        const res = await axios.get(`${apiUrl}/jmoa_weekly_notice_all_data`);
        if (res.data["body-json"]["statusCode"] === 200) {
          setNotices(res.data["body-json"]["body"]);
        } else {
          console.log("Error fetching notice", res.data["body-json"]["body"]);
        }
      } catch (e) {
        console.log("Error fetching notice", e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex items-center justify-center h-full bg-gradient-to-br from-white-200 to-gray-300">
      <div className="bg-white rounded-lg shadow-xl overflow-hidden w-full max-w-screen-lg lg:max-w-screen-xl">
        <div className="p-6">
          <center>
            <h1 className="text-3xl font-bold mb-4 border-b-2 border-gray-600 pb-2 inline-block text-blue-900">
              Notice Board
            </h1>
          </center>
          <div className="max-h-64 overflow-y-auto">
            {loading ? (
              // Display skeleton while loading
              <ul className="flex flex-col">
                {[...Array(5)].map((_, index) => (
                  <li
                    key={index}
                    className="py-4 pr-6 border-b border-gray-200 last:border-b-0 animate-pulse"
                  >
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 h-4 rounded"></div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              // Render actual notices
              <ul className="flex flex-col">
                {notices.map((notice, index) => (
                  <li
                    key={index}
                    className="py-4 pr-6 border-b  last:border-b-0"
                    style={{ color: "#652b7c" }}
                  >
                    <div className="flex items-center">
                      <p className="text-lg pr-2" style={{ color: "#652b7c" }}>
                        {notice.title}
                      </p>
                      <p
                        className="text-sm  ml-auto"
                        style={{ color: "#652b7c" }}
                      >
                        <DateRangeIcon className="text-grey-500 ml-auto" />
                        {notice.date}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
