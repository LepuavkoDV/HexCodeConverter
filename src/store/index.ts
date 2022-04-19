import { InjectionKey } from 'vue';
import { createStore, Store, useStore as baseUseStore } from 'vuex';
import { IStoreState, modules } from '@/store/modules';

export type IStore = Store<IStoreState>;
export const key: InjectionKey<IStore> = Symbol('store');

export const store = createStore({ modules });

export function useStore() {
  return baseUseStore(key);
}

export { getModule } from 'vuex-module-decorators';
export * from '@/store/modules';
