import { StormGlass } from "@src/clients/stormGlass";
import axios from "axios";
import stormGlassWeather3HoursFixture from "@test/fixtures/stormglass_weather_3_hours.json";
import stormGlassNormalizedFixture from "@test/fixtures/stormglass_normalized_response_3_hours.json";

jest.mock("axios");

describe("StormGlass client", () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  //---------------------------------------
  it("should return the normalized forecast from the StormGlass service||deve retornar a previsão normalizada do serviço StormGlass", async () => {
    const lat = -33.792726;
    const lng = 151.289824;

    mockedAxios.get.mockResolvedValue({ data: stormGlassWeather3HoursFixture });

    const stormGlass = new StormGlass(mockedAxios);
    const response = await stormGlass.fetchPoints(lat, lng);
    expect(response).toEqual(stormGlassNormalizedFixture);
  });

  //---------------------------------------
  it("should exclude incomplete data points || deve retirar pontos incompletos ", async () => {
    const lat = -33.792729;
    const lng = 121.289824;

    const incompleteResponse = {
      hours: [
        {
          windDirection: {
            noaa: 300,
          },
          time: "2020-04-26T00:00+00:00",
        },
      ],
    };

    mockedAxios.get.mockResolvedValue({ data: incompleteResponse });

    const stormGlass = new StormGlass(mockedAxios);
    const response = await stormGlass.fetchPoints(lat, lng);

    expect(response).toEqual([]);
  });

  //---------------------------------------
  it("should get a generic error from StormGlass service when the request fail before reaching the service || deve receber um erro genérico do serviço StormGlass quando a solicitação falhar antes de chegar ao serviço", async () => {
    const lat = -33.792729;
    const lng = 121.289824;

    mockedAxios.get.mockRejectedValue({ message: "Network Error" });

    const stormGlass = new StormGlass(mockedAxios);

    await expect(stormGlass.fetchPoints(lat, lng)).rejects.toThrow(
      "Unexpected error when trying to communicate to StormGlass: Network Error"
    );
  });

  //---------------------------------------
  it("should get an StormGlassResponseError when the StormGlass service responds with error || deve receber um StormGlassResponseError quando o serviço StormGlass responder com erro", async () => {
    const lat = -33.792729;
    const lng = 121.289824;

    mockedAxios.get.mockRejectedValue({
      response: {
        status: 429,
        data: {
          errors: ["Rate Limit reached"],
        },
      },
    });

    const stormGlass = new StormGlass(mockedAxios);

    expect(stormGlass.fetchPoints(lat, lng)).rejects.toThrow(
      `Unexpected error returned by the StormGlass service: Error: {"errors":["Rate Limit reached"]} Code: 429`
    );
  });
});
