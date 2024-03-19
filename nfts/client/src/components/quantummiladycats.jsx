import React, { useState, useEffect } from "react";
import axios from "axios";
import noimage from '../assets/noimage.jpg'
import ScrollToTop from "react-scroll-to-top";

//Fetch QMC Collection
export default function QMC() {
    const [NFTs, setNFTs] = useState([]);
    const [cursor, setCursor] = useState(null);
    const contractNumber = "0xa39b7fc5470782abf26d92db81d3215b6f6b79dd";
    const chainType = "0x1"; // Ethereum chain

    useEffect(() => {
        fetchNFTs();
    }, []);

    async function fetchNFTs() {
        try {
            let res = await axios.get("http://localhost:3001/allNft", {
                params: { address: contractNumber, chain: chainType, cursor: cursor },
            });
            console.log("QMC Collection:", res);
            setNFTs((prevNFTs) => [...prevNFTs, ...res.data.result.result]);
            setCursor(res.data.result.cursor);
        } catch (error) {
            console.error("Error fetching NFTs:", error);
        }
    }

    //Replace unretrieved images
    function getImgUrl(metadata) {
        if (!metadata) return noimage;

        let meta = JSON.parse(metadata);

        if (!meta.image) return noimage;

        if (!meta.image.includes("ipfs://")) {
            return meta.image;
        } else {
            return "https://ipfs.io/ipfs/" + meta.image.substring(7);
        }
    }

    // Format timestamp
    function formatTimestamp(timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleString();
    }

    return (
        <div className="container">
            <h2>Quantum Milady Cats Collection</h2>
            <div className="row gy-4 justify-content-center">
                {NFTs?.map((e, i) => (
                    <div key={i} className="col-xl-3 col-lg-4 col-md-6">
                        <div className="gallery-item h-100">
                            <img
                                loading="lazy"
                                className="img-fluid"
                                src={getImgUrl(e.metadata)}
                                alt={`${i}image`}
                                style={{ borderRadius: "5px", marginTop: "10px" }}
                            />
                            <div className="collection-stats">
                                <p><strong>Name:</strong> {e.name}</p>
                                <p><strong>Token ID:</strong> {e.token_id}</p>
                                <p><strong>Last Metadata Sync:</strong> {formatTimestamp(e.last_metadata_sync)}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {cursor && (
                <div className="row justify-content-center">
                    <div className="col-lg-6 text-center">
                        <button className="button" onClick={fetchNFTs}>
                            Load More
                        </button>
                    </div>

                </div>
            )}
            <ScrollToTop />
        </div>
    );
};
