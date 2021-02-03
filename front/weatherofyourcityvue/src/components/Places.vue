<template>
  <div>
    <input type="text" v-model="location" />
    <ul>
      <li v-for="(result, i) in searchResults" :key="i">
        {{ result }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Searcher',

  data: () => ({
    location: '',
    searchResults: [],
    service: null
  }),
  metaInfo() {
    return {
      script: [
        {
          src: `https://maps.googleapis.com/maps/api/js?key=AIzaSyB_hPtyQPLyJEyqtaMBg5oPnEgfHQ2N3zY&libraries=places`,
          async: true,
          defer: true,
          callback: () => this.MapsInit()
        }
      ]
    }
  },
  methods: {
    MapsInit() {
      this.service = new window.google.maps.places.AutocompleteService()
    },
    displaySuggestions(predictions, status) {
      if (status !== window.google.maps.places.PlacesServiceStatus.OK) {
        this.searchResults = []
        return
      }
      this.searchResults = predictions.map(prediction => prediction.description)
    }
  },
  watch: {
    location(newValue) {
      if (newValue) {
        this.service.getPlacePredictions(
          {
            input: this.location,
            types: ['(cities)']
          },
          this.displaySuggestions
        )
      }
    }
  }
}
</script>
