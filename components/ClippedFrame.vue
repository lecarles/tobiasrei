<template>
  <div class="clipped-image-wrapper">
    <svg class="svg">
      <clipPath id="my-clip-path" clipPathUnits="objectBoundingBox">
        <path class="clip-path" d="M1,0.03 c-0.5,0,-1,0,-1,0 V0.97 s0.485,0,1,0" />
      </clipPath>
    </svg>
    <div class="clipped-frame">
        <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.clipped-image-wrapper {
  width: 100%;
}

.svg {
  position: absolute;
  width: 0;
  height: 0;
}

.clipped-frame {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  aspect-ratio: 0.94;
  box-sizing: border-box;
  -webkit-clip-path: url(#my-clip-path);
  clip-path: url(#my-clip-path);

  * {
    width: 100%;
  }

  img {
    width: 100%;
    object-fit: cover;
    background-size: cover;
  }
}

</style>
