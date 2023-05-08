import { createInstance } from "./axios";

export const getCurrentUserData = async (access_token: string) => {
  try {
    const instance = createInstance(access_token);
    const response = await instance.get("/me");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getTopAlbumes = async (access_token: string) => {
  try {
    const instance = createInstance(access_token);
    return await instance.get("/me/top/tracks", {
      params: {
        limit: "30"
      }
    });
  } catch (error) {
    console.error(error);
  }
};

export const getSearchedAlbumes = async (
  access_token: string,
  query: string
) => {
  try {
    const instance = createInstance(access_token);
    const params = {
      type: "album",
      q: query,
      limit: "30"
    };
    return await instance.get("/search", { params: params });
  } catch (error) {
    console.error(error);
  }
};
