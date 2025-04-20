"use client";
import { create } from "zustand";
import type { ResourcesConfig } from "aws-amplify";
export interface ITResourcesConfig {
	resourceConf: ResourcesConfig | null | undefined;
	setConfig: (resourceConfig: ResourcesConfig | null | undefined) => void;
}
export const useAmplifyConfig = create<ITResourcesConfig>((set) => ({
	resourceConf: null,
	setConfig: (resourceConf: ResourcesConfig | null | undefined) => {
		set({ resourceConf });
	},
}));
