<template>
  <v-card
    class="mx-auto"
    max-width="544"
  >
    <v-card-text>
      <p v-if="charity.length == 1" class="text-h4 text--primary">
        {{charity[0].name}}
      </p>
      <p>Created by: {{charity[0].createdByUser}}</p>
      <div class="text--primary">
        {{charity[0].description}}
      </div>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  props: {
    charityId: Number,
  },
  data() {
    return {
      charity: {},
    };
  },
   watch: {
      charityId: {
          handler() {
              this.loadCharity(this.charityId)
          }
      }
  },
  methods: {
    async loadCharity(charityId) {
      try {
        await this.$axios.get(`api/charities/${charityId}`).then((response) => {
          this.charity = response.data;
        });
      } catch (err) {
        console.log(err);
      }
    },
  },
  created() {
    this.loadCharity(this.charityId);
  },
};
</script>