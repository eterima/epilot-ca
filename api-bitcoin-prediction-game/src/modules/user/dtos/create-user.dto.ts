import {
  IsNotEmpty,
  IsString,
  MinLength,
  IsAlpha,
  IsEmail,
} from 'class-validator';

export class CreateUserDTO {
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
}
