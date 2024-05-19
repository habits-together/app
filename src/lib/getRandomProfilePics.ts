export function getLocalRandomProfilePics(indexes: number[]) {
  // get pfp from assets/images/mock-pfps 
  return Array.from(indexes, (index) => {
    return {
      imgurl: localMockPfps[index % localMockPfps.length],
      hasCompleted: Math.random() > 0.4 ? true : false,
    };
  })
}

async function fetchUserThumbnails(amount: number) {
  try {
    const response = await fetch(
      "https://randomuser.me/api/?results=".concat(amount.toString(10)),
    );
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

export const profilePicsDataPromise = (amount: number) =>
  fetchUserThumbnails(amount);


export const localMockPfps = [
  require("../../assets/images/mock-pfps/image-1.png"),
  require("../../assets/images/mock-pfps/image-2.png"),
  require("../../assets/images/mock-pfps/image-3.png"),
  require("../../assets/images/mock-pfps/image-4.png"),
  require("../../assets/images/mock-pfps/image-5.png"),
  require("../../assets/images/mock-pfps/image-6.png"),
  require("../../assets/images/mock-pfps/image-7.png"),
  require("../../assets/images/mock-pfps/image-8.png"),
  require("../../assets/images/mock-pfps/image-9.png"),
  require("../../assets/images/mock-pfps/image-10.png"),
  require("../../assets/images/mock-pfps/image-11.png"),
  require("../../assets/images/mock-pfps/image-12.png"),
  require("../../assets/images/mock-pfps/image-13.png"),
  require("../../assets/images/mock-pfps/image-14.png"),
  require("../../assets/images/mock-pfps/image-15.png"),
  require("../../assets/images/mock-pfps/image-16.png"),
  require("../../assets/images/mock-pfps/image-17.png"),
  require("../../assets/images/mock-pfps/image-18.png"),
  require("../../assets/images/mock-pfps/image-19.png"),
  require("../../assets/images/mock-pfps/image-20.png"),
  require("../../assets/images/mock-pfps/image-21.png"),
  require("../../assets/images/mock-pfps/image-22.png"),
  require("../../assets/images/mock-pfps/image-23.png"),
  require("../../assets/images/mock-pfps/image-24.png"),
  require("../../assets/images/mock-pfps/image-25.png"),
  require("../../assets/images/mock-pfps/image-26.png"),
  require("../../assets/images/mock-pfps/image-27.png"),
  require("../../assets/images/mock-pfps/image-28.png"),
  require("../../assets/images/mock-pfps/image-29.png"),
  require("../../assets/images/mock-pfps/image-30.png"),
  require("../../assets/images/mock-pfps/image-31.png"),
  require("../../assets/images/mock-pfps/image-32.png"),
  require("../../assets/images/mock-pfps/image-33.png"),
  require("../../assets/images/mock-pfps/image-34.png"),
  require("../../assets/images/mock-pfps/image-35.png"),
  require("../../assets/images/mock-pfps/image-36.png"),
  require("../../assets/images/mock-pfps/image-37.png"),
  require("../../assets/images/mock-pfps/image-38.png"),
  require("../../assets/images/mock-pfps/image-39.png"),
  require("../../assets/images/mock-pfps/image-40.png"),
]