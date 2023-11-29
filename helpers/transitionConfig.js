import gsap from 'gsap'
import CustomEase from "gsap/CustomEase"

import { useTransitionComposable } from '~/composables/transitionComposable'

let mm = gsap.matchMedia()
const { toggleTransitionComplete } = useTransitionComposable()

const pageTransition = {
  name: 'page-transiton',
  mode: 'out-in',
  onEnter: (el, done) => {
      gsap.set(el, {opacity: 0})
      gsap.timeline({
        paused: true,
        defaults: { ease: CustomEase.create("custom", "M0,0,C0.084,0.6,0.194,0.892,0.548,0.968,0.667,0.993,0.831,1,1,1")},
        onComplete() {
          toggleTransitionComplete(true)
          done()
        },
      })
      .to(el, { opacity: 1, duration: .25})
      .play()
  },
  onLeave: (el, done) => {
    toggleTransitionComplete(false)
      gsap
      .timeline({ paused: true, onComplete: done, defaults: { ease: 'Power4.InOut'}})
      .to(el, { opacity: 0, duration: .2}, '>')
      .play()
  },
};

export { pageTransition }