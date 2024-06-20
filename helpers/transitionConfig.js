import gsap from 'gsap'
import CustomEase from "gsap/CustomEase"

import { useTransitionComposable } from '~/composables/transitionComposable'

const { toggleTransitionComplete } = useTransitionComposable()

const pageTransition = {
  name: 'page-transiton',
  mode: 'out-in',
  onEnter: (el, done) => {
      gsap.timeline({
        paused: true,
        defaults: { ease: CustomEase.create("custom", "M0,0,C0.084,0.6,0.194,0.892,0.548,0.968,0.667,0.993,0.831,1,1,1")},
        onComplete() {
          toggleTransitionComplete(true)
          done()
        },
      })
      .set(el, {opacity: 0})
      .to('.transition-elements', {opacity: 0, duration: .1})
      .to(el, { opacity: 1, duration: .75}, '<.2')
      .play()
  },
  onLeave: (el, done) => {
    toggleTransitionComplete(false)
      gsap
      .timeline({ paused: true, onComplete: done, defaults: { ease: CustomEase.create("custom", "M0,0,C0.084,0.6,0.194,0.892,0.548,0.968,0.667,0.993,0.831,1,1,1")}})
      .set('.transition-elements', {opacity: 1})
      .set('.transition-element-green', {height: 0})
      .set('.transition-element-gray', {height: 0})
      .to('.transition-element-green', {height: '100%', duration: 1.2},)
      .to('.transition-element-gray', {height: '100%', duration: 1.2}, '<0.4')
      .play()
  },
};

export { pageTransition }