import { Loaded } from "@mikro-orm/core";
import { Body, Controller, Delete, Get, Params, Post, Put, Query } from "amala";
import Container from "typedi";
import { CreateInvoiceInput, UpdateInvoiceInput } from "../dtos/invoices.dto";
import { DeleteManyInput, ListQuery } from "../dtos/common.dto";
import { Invoice } from "../entities/Invoice";
import InvoiceService from "../services/InvoiceService";
import DTOService from "../lib/services/DTOService";

@Controller("/invoices")
export default class InvoiceController {
  private invoiceService = Container.get(InvoiceService);

  private dtoService = Container.get(DTOService);

  @Get("/")
  async getList(
    @Query() query: ListQuery
  ): Promise<{ data: Loaded<Invoice, never>[]; total: number }> {
    const listQueryObject = this.dtoService.parseListQuery(query);
    const [invoices, total] = await this.invoiceService.getList(
      listQueryObject
    );
    return {
      data: invoices,
      total,
    };
  }

  @Get("/:id")
  getOne(@Params("id") id: string): Promise<Loaded<Invoice, never>> {
    return this.invoiceService.getOne(+id);
  }

  @Post("/")
  async createOne(
    @Body() createInvoiceInput: CreateInvoiceInput
  ): Promise<Invoice> {
    return this.invoiceService.createOne(createInvoiceInput);
  }

  @Put("/:id")
  async updateOne(
    @Params("id") id: string,
    @Body() updateInvoiceInput: UpdateInvoiceInput
  ): Promise<Invoice> {
    return this.invoiceService.updateOne(+id, updateInvoiceInput);
  }

  @Delete("/")
  async deleteMany(@Query() deleteInput: DeleteManyInput): Promise<Invoice[]> {
    const ids = JSON.parse(deleteInput.ids);
    return this.invoiceService.deleteMany(ids);
  }

  @Delete("/:id")
  async deleteOne(@Params("id") id: string): Promise<Invoice> {
    return this.invoiceService.deleteOne(+id);
  }
}
