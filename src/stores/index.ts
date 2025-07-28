import type { App } from 'vue'
import { createPinia } from 'pinia'
import { cloneDeep } from 'lodash-es'
import type { PiniaPluginContext } from 'pinia'
import { SetupStoreId } from './enum'

function resetSetupStore(context: PiniaPluginContext) {
  const setupSyntaxIds = Object.values(SetupStoreId) as string[]

  if (setupSyntaxIds.includes(context.store.$id)) {
    const { $state } = context.store

    const defaultStore = cloneDeep($state)

    context.store.$reset = () => {
      context.store.$patch(defaultStore)
    }
  }
}

export function setupStore(app: App) {
  const store = createPinia()

  store.use(resetSetupStore)

  app.use(store)
}
