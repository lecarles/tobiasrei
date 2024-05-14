import { defineStore } from 'pinia'
import positions from '@/assets/photoPositions.json'
import positionsMb from '@/assets/photoPositionsMb.json'

export const useTobiasStore = defineStore('tobiasStore', {
  state: () => { 
    return {
      windowSize: {x: 0, y: 0},
      positions: positions,
      positionsMb: positionsMb,
      direction: '',
      currentDiary: 1,
      currentWork: 1,
      diaryLength: null,
      workLength: null,
      isMb: false,
    } 
  },
  actions: {
    setWindowSize(windowSize) {
      this.windowSize = windowSize
    },
  }
})