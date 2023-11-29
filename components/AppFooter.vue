<template>
  <div class="footer font-size-sm p-md mt-row">
    <div class="footer-links mt-row">
      <div class="social-links left">
        <a target="_blank" href="https://www.instagram.com/imcarl.es/">Instagram</a>
      </div>
      <div class="social-links">
        <a href="mailto:hola@imcarl.es">hola@imcarl.es</a>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.footer {
  display: grid;
  column-gap: $col-gap;
  line-height: 1.1;

  .social-links {
    display: flex;
    align-self: flex-end;
    justify-self: flex-end;
    gap: 1rem;

    p {
      font-size: 0.7em;
    }

    &.left {
      justify-self: flex-start;
    }
  }

  a {
    display: block;
  }
}

@media (max-width: $sm-breakpoint) {
  .footer {

    &-links {
      gap: 1rem;
    }

    .left {
      grid-row: 2;
      width: 100%;
    }
    .social-links {
      justify-self: center;

      p {
        text-align: left;
      }
    }
  }
}
</style>