import { defineStore } from 'pinia'
import positions from '@/assets/photoPositions.json'

export const useTobiasStore = defineStore('tobiasStore', {
  state: () => { 
    return {
      windowSize: {x: 0, y: 0},
      positions: positions,
      direction: '',
      currentDiary: 1,
      currentWork: 1,
      diaryLength: null,
      workLength: null,
    } 
  },
  actions: {
    setWindowSize(windowSize) {
      this.windowSize = windowSize
    },
  }
})