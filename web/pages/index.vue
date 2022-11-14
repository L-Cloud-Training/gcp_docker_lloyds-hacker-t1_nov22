<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-card v-for="n in 10" :key="n" class="ma-3" max-width="344">
        <v-img
          src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
          height="200px"
        ></v-img>

        <v-card-title> Campaign name </v-card-title>

        <v-card-subtitle> Charity name </v-card-subtitle>

        <v-card-actions>
          <v-btn color="blue darken-4" text> Funds: 5000$ </v-btn>

          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-row>
  </v-container>
</template>
