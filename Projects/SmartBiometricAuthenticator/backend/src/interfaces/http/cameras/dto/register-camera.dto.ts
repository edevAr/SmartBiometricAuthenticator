import {
  IsIP,
  IsNotEmpty,
  IsOptional,
  IsPort,
  IsString,
} from 'class-validator';

export class RegisterCameraDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsIP()
  ipAddress!: string;

  @IsPort()
  port!: string;

  @IsString()
  @IsNotEmpty()
  username!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;

  @IsString()
  @IsNotEmpty()
  rtspPath!: string;

  @IsString()
  @IsOptional()
  location?: string;
}

