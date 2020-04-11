<template>
  <div class="bg-gray-200 min-h-screen -mt-12 pt-16">
    <div class="container mx-auto flex flex-wrap justify-between">
      <div class="w-full md:w-1/2 lg:w-1/3" v-for="app in apps" :key="app.title">
        <div class="m-2 app relative flex items-center cursor-pointer transform hover:-translate-y-2 transition duration-300 ease-in-out">
          <div class="image w-40 rounded-lg shadow-lg overflow-hidden border-4 border-white">
            <img :src="app.image" class="w-40 h-40">
          </div>
          <div class="info flex flex-col justify-between flex-1 bg-white h-32 rounded-r-lg shadow-lg p-2">
            <h2 class="font-bold text-red-700 text-md leading-tight">
              <a :href="app.url" target="_blank">
                {{ app.title }}
              </a>
            </h2>
            <div class="meta">
              <div class="rating">
                {{ app.rating }}
              </div>
              <div class="downloads">
                {{ app.downloads }}
              </div>
              <div class="originalValue text-gray-700 line-through">
                {{ app.originalValue }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      apps: {
        title: "True Skate",
        image: "https://s3.amazonaws.com/yofreesamples/deals/True+Skate.png",
        url: "https://play.google.com/store/apps/details?id=com.trueaxis.trueskate",
        rating: 4.2,
        downloads: 5000000,
        originalValue: "$1.99"
      },
    }
  },
  methods: {
    async fetchSomething() {
      const apps = await this.$axios.$get('https://paidappsforfree.netlify.com/.netlify/functions/scrape')
      this.apps = apps
    }
  },
  mounted: function () {
    this.fetchSomething()
  }
}
</script>

<style>
.app a::after{
  content: "";
 position: absolute;
 top: 0;
 left: 0;
 width: 100%;
 height: 100%;
}
</style>
