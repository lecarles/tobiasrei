<template>
  <div class="footer font-size-sm p-md mt-row">
    <div class="footer-links mt-row">
      <link-wrapper class="mr-auto"><a target="_blank" href="https://www.instagram.com/imcarl.es/">Instagram</a></link-wrapper>
      <link-wrapper><a href="mailto:hola@imcarl.es">hola@imcarl.es</a></link-wrapper>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.footer {
  &-links {
    display: flex;
    gap: 1rem;
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
  }
}
</style>