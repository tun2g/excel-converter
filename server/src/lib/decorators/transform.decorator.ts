import { Transform } from 'class-transformer';
import { castArray, isNil, trim, map, isArray } from 'lodash';

export function ToArray(): PropertyDecorator {
    return Transform(
      (params) => {
        const value = params.value;
  
        if (isNil(value)) {
          return [];
        }
  
        return castArray(value);
      },
      { toClassOnly: true },
    );
}

export function Trim(): PropertyDecorator {
    return Transform((params) => {
      const value = params.value as string[] | string;
  
      if (isArray(value)) {
        return map(value, (v) => trim(v).replaceAll(/\s\s+/g, ' '));
      }
  
      return trim(value).replaceAll(/\s\s+/g, ' ');
    });
}

export function ToLowerCase(): PropertyDecorator {
  return Transform(
    (params) => {
      const value = params.value;

      if (!value) {
        return;
      }

      if (!Array.isArray(value)) {
        return value.toLowerCase();
      }

      return value.map((v) => v.toLowerCase());
    },
    {
      toClassOnly: true,
    },
  );
}
  
export function ToUpperCase(): PropertyDecorator {
  return Transform(
    (params) => {
      const value = params.value;

      if (!value) {
        return;
      }

      if (!Array.isArray(value)) {
        return value.toUpperCase();
      }

      return value.map((v) => v.toUpperCase());
    },
    {
      toClassOnly: true,
    },
  );
}