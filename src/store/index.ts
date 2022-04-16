import { InjectionKey } from 'vue';
import { createStore, Store, useStore as baseUseStore } from 'vuex';
import { IStoreState, modules } from '@/store/modules';

export const key: InjectionKey<Store<IStoreState>> = Symbol('store');

export const store = createStore({ modules });

export function useStore() {
  return baseUseStore(key);
}

export { Store } from 'vuex';
export { getModule } from 'vuex-module-decorators';
export * from '@/store/modules';
