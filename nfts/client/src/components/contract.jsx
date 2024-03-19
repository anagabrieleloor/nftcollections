import axios from "axios";
import "../App.css";
import { useState } from "react";
import noimage from '../assets/noimage.jpg'
import ScrollToTop from "react-scroll-to-top";


//Fetch collections by NFT contract number
export default function Contract() {
    const [address, setAddress] = useState("");
    const [chain, setChain] = useState("0x1");
    const [cursor, setCursor] = useState(null);
    const [NFTs, setNFTs] = useState([]);

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


    async function fetchNFTs() {
        let res;
        if (cursor) {
            res = await axios.get(`http://localhost:3001/allNft`, {
                params: { address: address, chain: chain, cursor: cursor },
            });
        } else {
            res = await axios.get(`http://localhost:3001/allNft`, {
                params: { address: address, chain: chain },
            });
        }

        console.log(res);

        let n = NFTs;
        setNFTs(n.concat(res.data.result.result));
        setCursor(res.data.result.cursor);
        console.log(res);
    }

    function addressChange(e) {
        setAddress(e.target.value);
        setCursor(null);
        setNFTs([]);
    }

    function chainChange(e) {
        setChain(e.target.value);
        setCursor(null);
        setNFTs([]);
    }

    return (
        <div className="container">
            <h2>Get NFTs By Contract</h2>

            <div className="inputs">
                <div className="row gy-4 justify-content-center">
                    <div className="col-md-6">
                        <label htmlFor="contractInput" className="form-label">Contract:</label>
                        <input
                            id="contractInput"
                            className="form-control"
                            value={address}
                            onChange={(e) => addressChange(e)}
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="chainSelect" className="form-label">Chain:</label>
                        <select id="chainSelect" className="form-select" onChange={(e) => chainChange(e)}>
                            <option value="0x1">Ethereum</option>
                            <option value="0x38">Bsc</option>
                            <option value="0x89">Polygon</option>
                            <option value="0xa86a">Avalanche</option>
                        </select>
                    </div>
                </div>
                <button className="button" onClick={fetchNFTs}>
                    Get NFT's
                </button>
            </div>
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
}
