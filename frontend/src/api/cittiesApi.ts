import axios, { isAxiosError } from "axios";

const getCitiesURL = "https://countriesnow.space/api/v0.1/countries/cities";

export const getCitties = async (country: string): Promise<string[]> => {
  try {
    const res = await axios.post(getCitiesURL, { country: country });

    if (!res.data.error) {
      return res.data.data;
    } else {
      return [];
    }
  } catch (err: any) {
    if (isAxiosError(err)) {
      if (err.response) {
        console.error(err.response.data?.msg || "Error fetching city from API");
      }
    } else {
      console.error(err.message);
    }
    throw err;
  }
};
