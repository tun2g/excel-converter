import { InjectDataSource } from '@nestjs/typeorm';
import {
  registerDecorator,
  type ValidationArguments,
  type ValidationOptions,
  ValidatorConstraint,
  type ValidatorConstraintInterface,
} from 'class-validator';
import {
  DataSource,
  type EntitySchema,
  type FindOptionsWhere,
  type ObjectType,
} from 'typeorm';


@ValidatorConstraint({ name: 'unique', async: true })
export class UniqueValidator implements ValidatorConstraintInterface {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  public async validate<E>(
    _value: string,
    args: IUniqueValidationArguments<E>,
  ): Promise<boolean> {
    const [entityClass, findCondition] = args.constraints;

    return (
      (await this.dataSource.getRepository(entityClass).count({
        where: findCondition(args),
      })) <= 0
    );
  }

  defaultMessage(args: ValidationArguments): string {

    return `${args.property} with value ${args.value} already exists`;
  }
}

type UniqueValidationConstraints<E> = [
  ObjectType<E> | EntitySchema<E> | string,
  (validationArguments: ValidationArguments) => FindOptionsWhere<E>,
];
interface IUniqueValidationArguments<E> extends ValidationArguments {
  constraints: UniqueValidationConstraints<E>;
}

export function UniqueField<E>(
  constraints: Partial<UniqueValidationConstraints<E>>,
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return function (object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints,
      validator: UniqueValidator,
    });
  };
}
