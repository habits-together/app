async function fetchUserThumbnails() {
  try {
    // Request 10 results from the API
    const response = await fetch("https://randomuser.me/api/?results=10");
    if (!response.ok) {
      throw new Error(`API call failed: ${response.status}`);
    }
    const data = await response.json();
    // Map through the results to extract thumbnail URLs
    // const thumbnailUrls = data.results.map((user: { picture: { thumbnail: string } }) => user.picture.thumbnail);
    const profilePicData = data.results.map(
      (user: { picture: { thumbnail: string } }) => {
        return {
          imgurl: user.picture.thumbnail,
          hasCompleted: Math.random() > 0.4 ? true : false,
        };
      },
    );
    return profilePicData;
  } catch (error) {
    console.error("Failed to fetch user thumbnails:", error);
    return []; // Return an empty array in case of an error
  }
}

export const profilePicsDataPromise = fetchUserThumbnails();
