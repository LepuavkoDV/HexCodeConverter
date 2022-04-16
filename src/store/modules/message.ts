import {
  Module, VuexModule, Mutation, Action,
} from 'vuex-module-decorators';

export interface IMessage {
  message: string;
}

@Module({
  name: 'message',
  namespaced: true,
})
export class Message extends VuexModule {
  message = '';

  @Mutation
  SET_MESSAGE(message: string): void {
    this.message = message;
  }

  @Action
  async setMessage(message: string): Promise<any> {
    this.SET_MESSAGE(message);
  }

  get getMessageUpperCase(): string {
    return this.message.toUpperCase();
  }
}
