import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { Order } from "src/lib/constants";
import { IsClassField } from "src/lib/decorators/field.decorator";


export class PageOptionsDto {
  @IsEnum({entity: Order})
  readonly order: Order = Order.ASC;

  @IsNumber()
  readonly page: number = 1;

  @IsNumber()
  readonly take: number = 10;

  get skip(): number {
    return (this.page - 1) * this.take;
  }

  @IsString()
  @IsOptional()
  readonly q?: string;
}

interface IPageMetaDtoParameters {
  pageOptionsDto: PageOptionsDto;
  itemCount: number;
}
  
export class PageMetaDto {
  @IsNumber()
  readonly page: number;

  @IsNumber()
  readonly take: number;

  @IsNumber()
  readonly itemCount: number;

  @IsNumber()
  readonly pageCount: number;

  @IsBoolean()
  readonly hasPreviousPage: boolean;

  @IsBoolean()
  readonly hasNextPage: boolean;

  constructor({ pageOptionsDto, itemCount }: IPageMetaDtoParameters) {
      this.page = pageOptionsDto.page;
      this.take = pageOptionsDto.take;
      this.itemCount = itemCount;
      this.pageCount = Math.ceil(this.itemCount / this.take);
      this.hasPreviousPage = this.page > 1;
      this.hasNextPage = this.page < this.pageCount;
  }
}

export class PageDto<T> {
  @ApiProperty({ isArray: true })
  readonly data: T[];

  @IsClassField(() => PageMetaDto)
  readonly meta: PageMetaDto;

  constructor(data: T[], meta: PageMetaDto) {
    this.data = data;
    this.meta = meta;
  }
}