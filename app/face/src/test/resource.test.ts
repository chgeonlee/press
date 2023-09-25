
import _ from "lodash";
import resource from "../resources";

const sampleData = {
    id: "1",
    title: "Sample Room",
    rating: 4.5,
    description: "A sample room for testing.",
    price: 100,
    pricePerUnit: "per night",
    imgset: ["sample1.jpg", "sample2.jpg"]
  };
  
  describe("Room Resource", () => {
    beforeAll(() => {
        process.env.USE_MOCK_DATA = 'true';

      jest.mock('../api.ts', () => ({
        getRooms: jest.fn().mockResolvedValue({ rooms: [sampleData] }),
        getRoomDetail: jest.fn().mockResolvedValue({ reviews: [], position: [0, 0], capacity: 3 })
      }));
    });
  
    test("fetch rooms", async () => {
      await resource.room.fetch("practice");
      expect(resource.room.getRooms("practice")).toHaveLength(15);
    });
  
    test("check loaded rooms", () => {
      expect(resource.room.loaded("practice")).toBeTruthy();
    });
  });
  