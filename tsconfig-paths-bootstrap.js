import 'tsconfig-paths/register';
import { register } from 'ts-node';

register({
  project: './tsconfig.json',
  compilerOptions: {
    module: 'ESNext'
  }
});
