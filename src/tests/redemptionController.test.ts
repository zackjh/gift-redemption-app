import { Request, Response } from "express";
import { redeemGift } from "../controllers/redemptionController";
import * as redemptionModel from "../models/redemptionModel";
import { dataStore } from "../dataStore";

// Mock the dataStore module
jest.mock("../dataStore", () => ({
  dataStore: {
    load: jest.fn(),
    getTeamNameByStaffPassId: jest.fn(),
  },
}));

// Mock the redemptionModel module
jest.mock("../models/redemptionModel", () => ({
  addRedemption: jest.fn(),
  checkIfTeamHasRedeemedGift: jest.fn(),
}));

describe("redeemGift", () => {
  // Define mock request and response objects to be used in each test
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;

  beforeEach(() => {
    jest.clearAllMocks(); // Clear all mock implementations before each test

    // Set up mock request and response objects
    mockReq = {
      body: {},
    };

    mockRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
  });

  it("should respond with 400 if staffPassId is not provided", async () => {
    await redeemGift(mockReq as Request, mockRes as Response);
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.send).toHaveBeenCalledWith({
      message: "staffPassId was not provided.",
    });
  });

  it("should respond with 400 if staff member is not part of a team", async () => {
    mockReq.body.staffPassId = "staffPassId1";

    // Assume that staffPassId1 is not associated with a team
    (dataStore.getTeamNameByStaffPassId as jest.Mock).mockReturnValueOnce(
      undefined
    );

    await redeemGift(mockReq as Request, mockRes as Response);
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.send).toHaveBeenCalledWith({
      message: `The staff member ${mockReq.body.staffPassId} is not part of a team.`,
    });
  });

  it("should respond with 400 if the gift has already been redeemed", async () => {
    mockReq.body.staffPassId = "staffPassId2";

    // Assume that staffPassId2 is part of Team A
    (dataStore.getTeamNameByStaffPassId as jest.Mock).mockReturnValueOnce(
      "Team A"
    );

    // Assume that Team A has already redeemed their gift
    (
      redemptionModel.checkIfTeamHasRedeemedGift as jest.Mock
    ).mockResolvedValueOnce(true);

    await redeemGift(mockReq as Request, mockRes as Response);
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.send).toHaveBeenCalledWith({
      message: "The gift for team Team A has already been redeemed.",
    });
  });

  it("should successfully redeem a gift", async () => {
    mockReq.body.staffPassId = "staffPassId3";

    // Assume that staffPassId3 is part of Team B
    (dataStore.getTeamNameByStaffPassId as jest.Mock).mockReturnValueOnce(
      "Team B"
    );

    // Assume that Team B has yet to redeem their gift
    (
      redemptionModel.checkIfTeamHasRedeemedGift as jest.Mock
    ).mockResolvedValueOnce(false);

    await redeemGift(mockReq as Request, mockRes as Response);
    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.send).toHaveBeenCalledWith({
      message: "The gift for team Team B has been redeemed successfully.",
    });
  });
});
