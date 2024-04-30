async function fetchUserThumbnails(amount: number) {
  try {
    const response = await fetch("https://randomuser.me/api/?results=".concat(amount.toString(10)));
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

export async function fetchSingleUserThumbnail() {
  try {
    const response = await fetch("https://randomuser.me/api/");
    if (!response.ok) {
      throw new Error(`API call failed: ${response.status}`);
    }
    const data = await response.json();
    return {
      imgurl: data.results[0].picture.thumbnail,
      hasCompleted: Math.random() > 0.4,
    };
  } catch (error) {
    console.error("Failed to fetch user thumbnail:", error);
    return { imgurl: "", hasCompleted: false }; // Returns a default empty state if fetch fails
  }
}

export const profilePicsDataPromise = (amount: number) => fetchUserThumbnails(amount);
