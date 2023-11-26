<template>
  <div class="footer font-size-sm p-md mt-row-2">
    <footer-logos />
    <div class="footer-links grid-2 mt-row-2">
      <div class="social-links left">
        <a target="_blank" href="https://enviu.es">Enviu.es</a>
        <a target="_blank" href="https://www.instagram.com/enviuassociacio/">Instagram</a>
        <a target="_blank" href="https://www.facebook.com/people/En-Viu/100063577120821/">Facebook</a>
      </div>
      <div class="social-links">
        <p class="text-right">L'Associació de sales privades de música en directe, En Viu! rep una subvenció de 25.291,48€ de l'Institut Valencià de Cultura per a la realització del Cicle Viu, de la convocatòria d'ajudes al Foment Musical 2023. </p>
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
    text-transform: uppercase;
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