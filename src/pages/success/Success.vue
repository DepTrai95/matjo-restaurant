<template>
  <section>
    <div class="inner">
      <div class="text-center">
        <p>
          Ihre Reservierung/Anfrage wurde erfolgreich abgeschickt.
          Wir melden uns bei Ihnen so schnell es geht!
        </p>
        <router-link to="/" class="btn--primary">← Zurück zur Homepage</router-link>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
section {
  margin-block: 7rem;
}

p {
  @include responsive-font-size(1.8rem, 2rem);
  margin-bottom: 3rem;
}
</style>
