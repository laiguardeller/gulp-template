import del from 'del';
import { dist } from '../config';

const clean = async cb => {
  await del(`${dist}/`);
  cb();
};

export { clean };
