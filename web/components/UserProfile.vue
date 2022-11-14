<template>
  <v-card
    class="mx-auto"
    max-width="544"
  >
    <v-card-text>
      <p v-if="user.length == 1" class="text-h4 text--primary">
        {{user[0].firstName}} {{user[0].lastName}}
      </p>
      <p>E-mail: {{user[0].eMail}}</p>
      <div class="text--primary">
        Age: {{user[0].age}}
      </div>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  props: {
    userId: Number,
  },
  data() {
    return {
      user: {},
    };
  },
  watch: {
      userId: {
          handler() {
              this.loadUser(this.userId)
          }
      }
  },
  methods: {
    async loadUser(userId) {
      try {
        await this.$axios.get(`api/users/${userId}`).then((response) => {
          this.user = response.data;
        });
      } catch (err) {
        console.log(err);
      }
    },
  },
  created() {
    this.loadUser(this.userId);
  },
};
</script>
