const BASE_URL = 'https://api-mainnet.magiceden.dev/rpc/getListedNFTsByQuery';

export async function fetchNFTsByCollection(collectionSymbol) {
    try {
        const query = {
            $match: {
                collectionSymbol: collectionSymbol
            },
            $sort: {
                createdAt: -1
            },
            $skip: 0,
            $limit: 20
        };
        const url = `${BASE_URL}?q=${encodeURIComponent(JSON.stringify(query))}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error fetching NFTs:', error);
        return error;
    }
}
