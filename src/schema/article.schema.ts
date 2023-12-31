import { Field, InputType, ObjectType } from 'type-graphql'
import { BaseModel } from './model.schema'
import { getModelForClass, prop as Prop, Ref } from '@typegoose/typegoose'
import PaginatedResponse from './pagination.schema'
import { IsDate, MinLength, IsString, IsNumber, ArrayMinSize } from 'class-validator'
import { User } from './user.schema'
import { Types } from 'mongoose'
import { Review, ReviewInput } from './review.schema'

@ObjectType()
export class Article extends BaseModel {

  @Field()
  @Prop({ required: true })
  name: string

  // @Field(() => [String])
  // @Prop({ required: true, type: [String] }) 
  @Field(() => [String])
  @Prop({ nullable: true, type: [String] })
  images?: string[]

  @Field()
  @Prop({ required: true })
  description: string

  @Field(() => Date)
  @Prop({ required: true })
  dateOfEntry: Date

  // @Field()
  // @Prop({ required: true})
  @Field(() => Number)
  @Prop({ required: true, type: Number })
  timeRead: number

  @Field(() => [String])
  @Prop({ nullable: true, type: [String] })
  tags?: string[]

  @Field(() => User)
  @Prop({ ref: User, required: true })
  user: Ref<User, Types.ObjectId>

  // @Field(() => [Review])
  // @Prop({ nullable: true, type: [{ ref: Review }] })
  // reviews?: Ref<Review, Types.ObjectId>
  @Field(() => [Review])
  @Prop({ nullable: true, type: [Review] })
  reviews?: Review[]

}

export const ArticleModel = getModelForClass(Article,
  {
    schemaOptions: { timestamps: true },
  })

@InputType()
export class ArticleInput {
  @Field()
  @MinLength(3)
  name: string
  @Field()
  @MinLength(3)
  description: string
  @Field(() => [String], { nullable: true })
  @IsString({ each: true })
  images?: string[]
  @IsDate()
  @Field(() => Date)
  dateOfEntry: Date
  @Field()
  @IsNumber()
  timeRead: number
  @Field(() => [String], { nullable: true })
  @IsString({ each: true })
  tags?: string[]
}

@InputType()
export class ArticleInputReview {
  @Field(() => [ReviewInput])
  @ArrayMinSize(1)
  reviews?: Review[]
}

@ObjectType()
export class PaginatedArticleResponse extends PaginatedResponse(Article) { }
