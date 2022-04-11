import { Loaded } from "@mikro-orm/core";
import { Body, Controller, Delete, Get, Params, Post, Put, Query } from "amala";
import Container from "typedi";
import { CreateReviewInput, UpdateReviewInput } from "../dtos/reviews.dto";
import { DeleteManyInput, ListQuery } from "../dtos/common.dto";
import { Review } from "../entities/Review";
import ReviewService from "../services/ReviewService";
import DTOService from "../lib/services/DTOService";

@Controller("/reviews")
export default class ReviewController {
  private reviewService = Container.get(ReviewService);

  private dtoService = Container.get(DTOService);

  @Get("/")
  async getList(
    @Query() query: ListQuery
  ): Promise<{ data: Loaded<Review, never>[]; total: number }> {
    const listQueryObject = this.dtoService.parseListQuery(query);
    const [reviews, total] = await this.reviewService.getList(listQueryObject);
    return {
      data: reviews,
      total,
    };
  }

  @Get("/:id")
  getOne(@Params("id") id: string): Promise<Loaded<Review, never>> {
    return this.reviewService.getOne(+id);
  }

  @Post("/")
  async createOne(
    @Body() createReviewInput: CreateReviewInput
  ): Promise<Review> {
    return this.reviewService.createOne(createReviewInput);
  }

  @Put("/:id")
  async updateOne(
    @Params("id") id: string,
    @Body() updateReviewInput: UpdateReviewInput
  ): Promise<Review> {
    return this.reviewService.updateOne(+id, updateReviewInput);
  }

  @Delete("/")
  async deleteMany(@Query() deleteInput: DeleteManyInput): Promise<Review[]> {
    const ids = JSON.parse(deleteInput.ids);
    return this.reviewService.deleteMany(ids);
  }

  @Delete("/:id")
  async deleteOne(@Params("id") id: string): Promise<Review> {
    return this.reviewService.deleteOne(+id);
  }
}
