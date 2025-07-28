import { defineStore } from "pinia";
import { SetupStoreId } from "../../enum";

interface IAppModule {
  loginStatus: boolean;
}

export const useAppStore = defineStore(SetupStoreId.App, {
  state: (): IAppModule => {
    return {
      loginStatus: false,
    };
  },

  actions: {
    refreshStatus(status: boolean) {
      this.loginStatus = status;
    },
  },
});
