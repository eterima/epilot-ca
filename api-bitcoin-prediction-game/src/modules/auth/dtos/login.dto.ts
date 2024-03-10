import {
  IsNotEmpty,
  IsString,
  IsAlpha,
  MinLength,
  IsEmail,
} from 'class-validator';

export class LoginDTO {
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
}
