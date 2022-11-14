<template>
  <v-app id="inspire">
    <v-app-bar centered app color="indigo darken-3" class="app-bar" flat>
      <div @click="resetIndexes()" class="title-wrapper">
        <v-icon class="white--text mr-3 text-h4">mdi-hand-heart-outline</v-icon>
        <h2 class="white--text">Share&Care</h2>
      </div>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <v-container>
        <v-row>
          <v-col cols="12" sm="2">
            <v-card rounded="lg" min-height="268" outlined>
              <v-list permanent>
                <v-subheader class="font-weight-black">CHARITIES</v-subheader>
                <v-list-item-group color="indigo darken-3">
                  <v-list-item
                    v-for="(charity, i) in charities"
                    :key="i"
                    :input-value="selectedCharityId"
                  >
                    <v-list-item-content
                      v-model="selectedCharityId"
                      @click="openCharityProfile(charity)"
                    >
                      <v-list-item-title
                        v-text="charity.name"
                        class="font-weight-medium"
                      ></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-card>
          </v-col>

          <v-col cols="12" sm="8">
            <template v-if="selectedUserId !== 0">
              <user-profile :userId="selectedUserId"></user-profile>
            </template>
            <template v-if="selectedCharityId !== 0">
              <charity-profile :charityId="selectedCharityId"></charity-profile>
            </template>
            <template v-if="selectedUserId == 0 && selectedCharityId == 0">
              <posts-list></posts-list>
            </template>
          </v-col>

          <v-col cols="12" sm="2">
            <v-card rounded="lg" min-height="268" outlined>
              <v-list permanent>
                <v-subheader class="font-weight-black">USERS</v-subheader>
                <v-list-item-group color="indigo darken-3">
                  <v-list-item
                    v-for="(user, i) in users"
                    :key="i"
                    :input-value="selectedUserId"
                  >
                    <v-list-item-content>
                      <v-list-item-title
                        v-model="selectedUserId"
                        class="font-weight-medium"
                        @click="openUserProfile(user)"
                      >
                        <v-avatar
                          color="indigo darken-3"
                          class="mr-2"
                          size="35"
                        >
                          <span class="white--text text-h8"
                            >{{ user.firstName.charAt(0)
                            }}{{ user.lastName.charAt(0) }}</span
                          >
                        </v-avatar>
                        {{ user.firstName }}
                        {{ user.lastName }}</v-list-item-title
                      >
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <v-footer :fixed="fixed" app color="indigo darken-3">
      <v-spacer></v-spacer>
      <span class="white--text">&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      users: [],
      charities: [],
      selectedUserId: 0,
      selectedCharityId: 0,
      charityActive: false,
      userActive: false,
    };
  },
  methods: {
    async loadUsers() {
      try {
        await this.$axios.get("api/users").then((response) => {
          this.users = response.data;
        });
      } catch (err) {
        console.log(err);
      }
    },
    async loadCharities() {
      try {
        await this.$axios.get("api/charities").then((response) => {
          this.charities = response.data;
        });
      } catch (err) {
        console.log(err);
      }
    },
    openCharityProfile(charity) {
      this.selectedUserId = 0;
      this.selectedCharityId = charity.id;
    },
    openUserProfile(user) {
      this.selectedCharityId = 0;
      this.selectedUserId = user.id;
    },
    resetIndexes() {
      this.selectedUserId = 0;
      this.selectedCharityId = 0;
    },
  },
  created() {
    this.loadUsers();
    this.loadCharities();
  },
};
</script>

<style lang="scss">
.title-wrapper {
  display: flex;
  align-items: center;
  cursor: pointer;
}
</style>