import { create } from "zustand";
import { TASKS, TABS } from "../lib/constants";

export const useAppStore = create((set) => ({
  // Current task and tab
  currentTask: TASKS.DASHBOARD,
  currentTab: TABS.DEMO,

  // Model state
  modelLoaded: false,
  modelLoading: false,
  modelLoadTime: null,

  // Image state
  originalImage: null,
  processedImage: null,

  // Processing state
  processing: false,
  processingTime: null,
  progress: 0,
  loadProgress: 0,
  processingProgress: 0,

  // Diagnostics
  logs: [],
  systemInfo: null,
  performanceMetrics: {
    modelLoadTime: null,
    inferenceTime: null,
    memoryUsage: null,
  },

  // Actions
  setCurrentTask: (task) => set({ currentTask: task, currentTab: TABS.DEMO }),
  setCurrentTab: (tab) => set({ currentTab: tab }),

  setModelLoaded: (loaded) => set({ modelLoaded: loaded }),
  setModelLoading: (loading) => set({ modelLoading: loading }),
  setModelLoadTime: (time) => set({ modelLoadTime: time }),

  setOriginalImage: (image) =>
    set({ originalImage: image, processedImage: null }),
  setProcessedImage: (image) => set({ processedImage: image }),

  setProcessing: (processing) => set({ processing }),
  setProcessingTime: (time) => set({ processingTime: time }),
  setProgress: (progress) => set({ progress }),
  setLoadProgress: (loadProgress) => set({ loadProgress }),
  setProcessingProgress: (processingProgress) => set({ processingProgress }),

  addLog: (message, type = "info") =>
    set((state) => ({
      logs: [
        ...state.logs,
        { message, type, timestamp: new Date().toISOString() },
      ],
    })),

  clearLogs: () => set({ logs: [] }),

  setSystemInfo: (info) => set({ systemInfo: info }),

  updatePerformanceMetrics: (metrics) =>
    set((state) => ({
      performanceMetrics: { ...state.performanceMetrics, ...metrics },
    })),

  resetImageState: () =>
    set({
      originalImage: null,
      processedImage: null,
      processing: false,
      processingTime: null,
      progress: 0,
      loadProgress: 0,
      processingProgress: 0,
    }),
}));
