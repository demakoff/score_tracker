import './Game/server-entities';
import './Team/server-entities';
import './Stats/server-entities';
import { builder } from './builder';

export const schema = builder.toSchema();