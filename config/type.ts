import { AppType } from './enums/AppType.enum';
import { Env } from './enums/Env.enum';

export interface CommandParams {
  env: Env;
  type: AppType;
  blended?: boolean;
  all?: boolean;
  moveDir?: string;
}
