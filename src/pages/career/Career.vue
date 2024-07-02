<template>
  <div id="career">
    <div class="content-area content-area--tinted">
      <div class="inner">
        <div class="career">
          <h2>WERDE TEIL UNSERES TEAMS</h2>
          <p>Du servierst gerne in einem dynamischen, schnellen und abwechslungsreichen Arbeitsumfeld fantastische
            koreanische Speisen?</p>
          <p>Dann kontaktiere uns! Bei Matjo freuen wir uns immer auf talentiertes, allen voran aber freundliches und
            engagiertes Service-, Bar- und Küchenpersonal</p>
          <p>Wir freuen uns auf Deine Bewerbung mit Lebenslauf und kurzem Anschreiben an <a
              href="info@matjo.de">info@matjo.de</a>
          </p>
          <div class="career__jobs">
            <div class="grid--default grid-2--tablet-portrait-up">
              <div class="grid-item" v-for="job in jobs" :key="job.id">
                <CareerCard :career="job"></CareerCard>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CareerCard from '../../components/card/CareerCard.vue';
export default {
  name: 'Karriere',
  components: {
    CareerCard
  },
  data() {
    return {
      title: 'Karriereseite',
      jobs: [
        { 
          title: 'Servicekraft',
          description: 'Eine Servicekraft ist ein/e Fachmann/-frau in der Gastronomie, der/die sich mit der Betreuung, Beratung und Bewirtung von Gästen in gastronomischen Einrichtungen befasst.',
          workingTime: 'Vollzeit',
        },
        {
          title: 'Servicekraft',
          description: 'Eine Servicekraft ist ein/e Fachmann/-frau in der Gastronomie, der/die sich mit der Betreuung, Beratung und Bewirtung von Gästen in gastronomischen Einrichtungen befasst.',
          workingTime: 'Teilzeit',
        },
        {
          title: 'Koch/Köchin',
          description: 'Ein/e Koch/Köchin ist ein/e Fachmann/-frau in der Küche, der/die sich mit der Zubereitung, Verfeinerung und Präsentation von Speisen in gastronomischen Betrieben befasst',
          workingTime: 'Vollzeit',
        },
        {
          title: 'Koch/Köchin',
          description: 'Ein/e Koch/Köchin ist ein/e Fachmann/-frau in der Küche, der/die sich mit der Zubereitung, Verfeinerung und Präsentation von Speisen in gastronomischen Betrieben befasst',
          workingTime: 'Teilzeit',
        },
        {
          title: 'Content Creator',
          description: 'Ein/e Content Creator ist ein/e Fachmann/-frau im digitalen Bereich, der/die sich mit der Erstellung, Gestaltung und Verbreitung von multimedialen Inhalten für verschiedene Online-Plattformen und soziale Medien befasst.',
          workingTime: 'Teilzeit',
        },
        {
          title: 'Buchhalter/in',
          description: 'Ein/e Buchhalter/in ist ein Fachmann/-frau im Finanzwesen, der/die sich mit der Erfassung, Klassifizierung und Zusammenfassung finanzieller Transaktionen befasst',
          workingTime: 'Vollzeit',
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
a {
  color: $color-primary;
}

.career__jobs {
  margin-block-start: 3rem;
}
</style>
  