import gsap from 'gsap'
import CustomEase from "gsap/CustomEase"

import { useTransitionComposable } from '~/composables/transitionComposable'

let mm = gsap.matchMedia()
const { toggleTransitionComplete } = useTransitionComposable()

const pageTransition = {
  name: 'page-transiton',
  mode: 'out-in',
  onEnter: (el, done) => {
    mm.add("(min-width: 950px)", () => {
      gsap.set(el, {opacity: 0})
      gsap.set('.concert-item-name, .concert-item-data-left, .concert-item-data-right', { y: '-300%' })
      gsap
      .timeline({
        paused: true,
        defaults: { ease: CustomEase.create("custom", "M0,0,C0.084,0.6,0.194,0.892,0.548,0.968,0.667,0.993,0.831,1,1,1")},
        onComplete() {
          toggleTransitionComplete(true)
          done()
        },
      })
      .to(el, { opacity: 1, duration: .25})
      .to('.concert-item-name, .concert-item-data-left, .concert-item-data-right', { y: 0, duration: 0.6, stagger: 0.004})
      .play()
    })
    mm.add("(max-width: 949px)", () => {
      gsap.set(el, {opacity: 0})
      gsap
      .timeline({
        paused: true,
        onComplete() {
          toggleTransitionComplete(true)
          done()
        },
      })
      .to(el, { opacity: 1, duration: .3})
      .play()
    })
  },
  onLeave: (el, done) => {
    toggleTransitionComplete(false)
    mm.add("(min-width: 950px)", () => {
      gsap
      .timeline({ paused: true, onComplete: done, defaults: { ease: 'Power4.InOut'}})
      .to('.concert-item-data-left, .concert-item-data-right', { y: '-300%', duration: 0.65, stagger: 0.008})
      .to('.concert-item-name', { y: '-270%', duration: 0.7, stagger: 0.008}, '<0.02')
      .to('.active-concert-image', { y: '-120%', duration: 0.6, stagger: 0.008}, '<0.1')
      .to(el, { opacity: 0, duration: .2}, '>')
      .play()
    })
    mm.add("(max-width: 949px)", () => {
      gsap
      .timeline({ paused: true, onComplete: done })
      .to(el, { opacity: 0, duration: .2}, '<0.1')
      .play()
    })
  },
};

const concertTransition = {
  name: 'concert-transiton',
  mode: 'out-in',
  onEnter: (el, done) => {
    mm.add("(min-width: 950px)", () => {
      gsap.set(el, {opacity: 0})
      gsap.set('.concert-artist, .marquee-viu', { y: '150%' })
      gsap.set('.concert-date, .concert-time, .button-container, .concert-venue, .concert-city, .img-artista, .image-switcher', { y: '200%' })
      gsap
        .timeline({
          paused: true,
          defaults: { ease: CustomEase.create("custom", "M0,0,C0.084,0.6,0.194,0.892,0.548,0.968,0.667,0.993,0.831,1,1,1")},
          onComplete() {
            toggleTransitionComplete(true)
            done()
          },
        })
        .to(el, { opacity: 1, duration: .2})
        .to('.concert-artist', { y: 0, duration: 0.5, stagger: 0.1 }, '<0.2')
        .to('.concert-date, .concert-time, .button-container, .concert-venue, .concert-city', { y: 0, duration: 0.5, stagger: 0.05 }, '<0.15')
        .to('.img-artista, .image-switcher', { y: 0, duration: 0.75, stagger: 0.05 }, '<0.1')
        .play()
    })
    mm.add("(max-width: 949px)", () => {
      gsap.set(el, {opacity: 0})
      gsap
      .timeline({
        paused: true,
        onComplete() {
          toggleTransitionComplete(true)
          done()
        },
      })
      .to(el, { opacity: 1, duration: .3})
      .play()
    })
  },
  onLeave: (el, done) => {
    toggleTransitionComplete(false)
    mm.add("(min-width: 950px)", () => {
    gsap
      .timeline({ paused: true, defaults: { ease: 'Power4.InOut'}, onComplete: done })
      .to('.concert-artist', { y: '160%', duration: 0.65, stagger: 0.1 })
      .to('.concert-date, .concert-time, .button-container, .concert-venue, .concert-city', { y: '200%', duration: 0.5, stagger: 0.05 }, '<0.1')
      .to('.img-artista, .image-switcher', { y: '200%', duration: 0.65 }, '<0.1')
      .to('.marquee-viu', { y: '150%', duration: 0.4 }, '<')
      .to(el, { opacity: 0, duration: .2}, '<0.1')
      .play()
    })
    mm.add("(max-width: 949px)", () => {
      gsap
      .timeline({ paused: true, onComplete: done })
      .to(el, { opacity: 0, duration: .2}, '<0.1')
      .play()
    })
  },
};

export { pageTransition, concertTransition }