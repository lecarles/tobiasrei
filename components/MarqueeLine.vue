<template>
    <div class="marquee-line">
      <div ref="wrapper" class="wrapper" aria-hidden="true">
        <div class="marquee-part">
          CONCERTS EN SALES · AIORA · CIRCUIT VIU 2023 · ALACANT · CONCERTS EN SALES · ALBORAIA · CIRCUIT VIU 2023 · ALMÀSSERA · 
          CONCERTS EN SALES · CASTELLÓ · CIRCUIT VIU 2023 · MISLATA · CONCERTS EN SALES · ST. JOAN D'ALACANT · CIRCUIT VIU 2023 · ST. VICENT DEL RASPEIG ·  CONCERTS EN SALES · VALÈNCIA · 
        </div>
        <div class="marquee-part">
          CIRCUIT VIU 2023 · AIORA · CONCERTS EN SALES · ALACANT · CIRCUIT VIU 2023 · ALBORAIA · CONCERTS EN SALES · ALMÀSSERA · 
          CIRCUIT VIU 2023 · CASTELLÓ · CONCERTS EN SALES · MISLATA · CIRCUIT VIU 2023 · ST. JOAN D'ALACANT · CONCERTS EN SALES · ST. VICENT DEL RASPEIG ·  CIRCUIT VIU 2023 · VALÈNCIA · 
        </div>
      </div>
    </div>
</template>

<script setup>
import gsap from 'gsap'
import { onMounted, ref, watch } from 'vue'
import { useTransitionComposable } from '@/composables/transitionComposable'

const { transitionState } = useTransitionComposable()
let wrapper = ref(null)

watch(
  () => transitionState.transitionComplete,
  (newValue) => {
    if (newValue) {
      setupLoop()
    }
  }
)

function setupLoop() {
  const loop = horizontalLoop(wrapper.value.children, {
    paused: false,
    repeat: -1,
    speed: 1.25,  
  })

  gsap.to(wrapper.value, {
    y: 0,
    duration: 0.5,
    ease: 'Power4.Out'
  })
}

function horizontalLoop(items, config) {
	items = gsap.utils.toArray(items);
	config = config || {};
	let tl = gsap.timeline({repeat: config.repeat, paused: config.paused, defaults: {ease: "none"}, onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 142)}),
		length = items.length,
		startX = items[0].offsetLeft,
		times = [],
		widths = [],
		xPercents = [],
		curIndex = 0,
		pixelsPerSecond = (config.speed || 1) * 100,
		snap = config.snap === false ? v => v : gsap.utils.snap(config.snap || 1), // some browsers shift by a pixel to accommodate flex layouts, so for example if width is 20% the first element's width might be 242px, and the next 243px, alternating back and forth. So we snap to 5 percentage points to make things look more natural
		totalWidth, curX, distanceToStart, distanceToLoop, item, i;
	gsap.set(items, { // convert "x" to "xPercent" to make things responsive, and populate the widths/xPercents Arrays to make lookups faster.
		xPercent: (i, el) => {
			let w = widths[i] = parseFloat(gsap.getProperty(el, "width", "px"));
			xPercents[i] = snap(parseFloat(gsap.getProperty(el, "x", "px")) / w * 100 + gsap.getProperty(el, "xPercent"));
			return xPercents[i];
		}
	});
	gsap.set(items, {x: 0});
	totalWidth = items[length-1].offsetLeft + xPercents[length-1] / 100 * widths[length-1] - startX + items[length-1].offsetWidth * gsap.getProperty(items[length-1], "scaleX") + (parseFloat(config.paddingRight) || 0);
	for (i = 0; i < length; i++) {
		item = items[i];
		curX = xPercents[i] / 100 * widths[i];
		distanceToStart = item.offsetLeft + curX - startX;
		distanceToLoop = distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");
		tl.to(item, {xPercent: snap((curX - distanceToLoop) / widths[i] * 100), duration: distanceToLoop / pixelsPerSecond}, 0)
		  .fromTo(item, {xPercent: snap((curX - distanceToLoop + totalWidth) / widths[i] * 100)}, {xPercent: xPercents[i], duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond, immediateRender: false}, distanceToLoop / pixelsPerSecond)
		  .add("label" + i, distanceToStart / pixelsPerSecond);
		times[i] = distanceToStart / pixelsPerSecond;
	}
	function toIndex(index, vars) {
		vars = vars || {};
		(Math.abs(index - curIndex) > length / 2) && (index += index > curIndex ? -length : length); // always go in the shortest direction
		let newIndex = gsap.utils.wrap(0, length, index),
			time = times[newIndex];
		if (time > tl.time() !== index > curIndex) { // if we're wrapping the timeline's playhead, make the proper adjustments
			vars.modifiers = {time: gsap.utils.wrap(0, tl.duration())};
			time += tl.duration() * (index > curIndex ? 1 : -1);
		}
		curIndex = newIndex;
		vars.overwrite = true;
		return tl.tweenTo(time, vars);
	}
	tl.next = vars => toIndex(curIndex+1, vars);
	tl.previous = vars => toIndex(curIndex-1, vars);
	tl.current = () => curIndex;
	tl.toIndex = (index, vars) => toIndex(index, vars);
	tl.times = times;
  tl.progress(1, true).progress(0, true); // pre-render for performance
  if (config.reversed) {
    tl.vars.onReverseComplete();
    tl.reverse();
  }
	return tl;
}
</script>

<style lang="scss" scoped>

.marquee-line {
  overflow: hidden;
}
.marquee-part {
  display: inline;
  flex-shrink: 0;
  font-smooth: always;
  line-height: 1.1;
}

.wrapper {
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;
  z-index: -10;
  color: var(--background);
  background: var(--primary);
  font-size: $font-size-md;
  padding: .45em 0 .22em 0;
  transform: translateY(110%);
}

.marquee-inner {
  -webkit-font-smoothing: antialiased;
  width: fit-content;
  display: flex;
  flex: auto;
  flex-direction: row;
}

@media (max-width: $sm-breakpoint)  {
  .wrapper {
    z-index: 1;
  }
}
</style>
