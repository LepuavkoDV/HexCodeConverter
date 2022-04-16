import { App, IApp } from './app';
import { Message, IMessage } from './message';

export interface IStoreState {
  app: IApp;
  message: IMessage,
}

export const modules = {
  app: App,
  message: Message,
};

export * from './app';
export * from './message';
