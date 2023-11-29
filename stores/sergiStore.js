import { defineStore } from 'pinia'

export const useSergiStore = defineStore('sergiStore', {
  state: () => { 
    return {
      windowSize: {x: 0, y: 0},
      colors: {
        white: '#ecefe5',
        black: '#2b2b2b',
        fadedblack: '#2b2b2b35',
        red: '#dc4931',
        green: '#2c664b',
        orange: '#ff9d3a',
        purple: '#474184',
      }
    } 
  },
  actions: {
    setWindowSize(windowSize) {
      this.windowSize = windowSize
    },
  }
})