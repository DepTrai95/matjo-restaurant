<template>
  <div>
    <Content :content="aboutUsText"></Content>
    <Card :card="cardContent"></Card>
  </div>
</template>

<script>
import Content from '../../components/content/Content.vue';
import Card from '../../components/card/Card.vue';

export default {
  name: 'Home',
  components: {
    Content,
    Card,
  },
  data() {
    return {
      title: 'Homepage',
      aboutUsText: {
        id: 'about-us',
        heading: 'Über uns',
        headingDescription: 'Discover',
        content: [
            { id: '1', text: 'Anamit ist ein rein vietnamesisches Restaurant, welches sich im Herzen von Dresden- Neustadt befindet. Bei uns tauchen Sie in eine komplett andere Welt.'},
            { id: '2', text: 'In einer historischen Atmosphäre aus den 70er und 80er von Vietnam bieten wir Ihnen die Möglichkeit die bekanntesten Street-Food-Gerichte des Landes zu erkunden und genießen.'},
            { id: '3', text: 'Die vietnamesische Küche ist bekannt für ihre Vielfältigkeit und die Anzahl der möglichen Zutaten. Sie gilt auch als eine gesunde Alternative zu anderen Küchen.'},
            { id: '4', text: 'Hier im Anamit Restaurant bereiten wir die Gerichte ganz nach originalen Rezepten frisch und mit viel Liebe zu. Lassen Sie sich durch eine kulinarische Reise verführen, um eine andere Seite Vietnams zu entdecken'},
        ]
      },
      cardContent: {
        id: 'test-card',
        imgSrc: '../../assets/img/bbq/bbq.webp',
        imgUrl: 'https://google.de',
        body: 'Das ist ein Test-Body',
        footer: 'Link'
      },
      imgGallery: []
    }
  }
}
</script>
