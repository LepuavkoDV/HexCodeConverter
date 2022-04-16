import {
  Module, VuexModule, Mutation, Action,
} from 'vuex-module-decorators';

export interface IApp {
  message: string;
}

@Module({
  name: 'app',
  namespaced: true,
})
export class App extends VuexModule {
  message = '';

  @Mutation
  SET_MESSAGE(message: string): void {
    this.message = message;
  }

  @Action({ rawError: true })
  async setMessage(message: string): Promise<any> {
    setTimeout(() => {
      this.SET_MESSAGE(message);
    }, 1000);
  }

  get getMessageUpperCase(): string {
    return this.message.toUpperCase();
  }
}
