import { InjectDataSource } from '@nestjs/typeorm';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import {
  DataSource,
  EntitySchema,
  FindOptionsWhere,
  ObjectType,
} from 'typeorm';

@ValidatorConstraint({ name: 'isExist', async: true })
export class IsExistValidator implements ValidatorConstraintInterface {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  public async validate<E>(
    _value: string,
    args: IIsNotExistValidationArguments<E>,
  ): Promise<boolean> {
    const [entityClass, findCondition] = args.constraints;

    return (
      (await this.dataSource.getRepository(entityClass).count({
        where: findCondition(args),
      })) > 0
    );
  }

  defaultMessage(args: ValidationArguments): string {
    return `The selected ${args.property} is not exists`;
  }
}

type IsNotExistValidationConstraints<E> = [
  ObjectType<E> | EntitySchema<E> | string,
  (validationArguments: ValidationArguments) => FindOptionsWhere<E>,
];
interface IIsNotExistValidationArguments<E> extends ValidationArguments {
  constraints: IsNotExistValidationConstraints<E>;
}

export function IsExistField<E>(
  constraints: Partial<IsNotExistValidationConstraints<E>>,
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return (object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints,
      validator: IsExistValidator,
    });
  };
}
