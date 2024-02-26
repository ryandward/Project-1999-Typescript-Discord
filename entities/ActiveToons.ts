import { ViewEntity } from 'typeorm';
import { Census } from './Census.js';

@ViewEntity({
	expression: `
    SELECT *
    FROM census
    WHERE status != 'Dropped'
  `,
})

export class ActiveToons extends Census {}

