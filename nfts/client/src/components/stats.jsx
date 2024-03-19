import React, { useState, useEffect } from "react";
import axios from "axios";
import noimage from "../assets/noimage.jpg";
import ScrollToTop from "react-scroll-to-top";

//Fetch Collection Stats from ME API
const CollectionStats = () => {
  const [collectionStats, setCollectionStats] = useState([]);

  useEffect(() => {
    fetchCollectionStats();
  }, []);

  const fetchCollectionStats = async () => {
    try {
      const response = await axios.get("http://localhost:3001/collectionStats");
      console.log("Collection stats:", response.data);
      setCollectionStats(response.data);
    } catch (error) {
      console.error("Error fetching collection statistics:", error);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-6 text-center">
          <h2>Collection Stats</h2>
        </div>
      </div>
      <div className="row gy-4 justify-content-center">
        {collectionStats.map((collection, index) => (
          <div key={index} className="col-xl-3 col-lg-4 col-md-6">
            <div className="gallery-item h-100">
              {/* Placeholder image */}
              <img src={noimage} alt="No Image" className="img-fluid placeholder" />
              {/* Actual image */}
              <img
                src={collection.image}
                alt={collection.name}
                className="img-fluid actual-image"
              />
              <div className="gallery-links d-flex align-items-center justify-content-center">
                <a href={collection.image} title={collection.name} className="glightbox preview-link">
                  <i className="bi bi-arrows-angle-expand"></i>
                </a>
                <a href="gallery-single.html" className="details-link">
                  <i className="bi bi-link-45deg"></i>
                </a>
              </div>
              <div className="collection-stats">
                <p><strong>Name:</strong> {collection.name}</p>
                <p><strong>Currency Rate:</strong> {collection.currencyUsdRate} {collection.currency}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <ScrollToTop />
    </div>
  );
};

export default CollectionStats;
