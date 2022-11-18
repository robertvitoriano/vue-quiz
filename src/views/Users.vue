<template>
  <AuthLayout #content>
    <div class="users-container">
      <div class="users-content">
        <div class="users-control-panel">
          <router-link to="/user-creation">
            <Button title="Create user"></Button>
          </router-link>
        </div>
        <div class="users-table-container">
          <template>
            <div>
              <label>Show:</label>
              <v-select
                :options="[2, 10, 20, 30, 40, 50, 60, 70, 80, 100, 200, 300]"
                v-model="usersPerPage"
                @option:selected="handleSelectUsersPerPage"
              ></v-select>
              <b-table
                hover
                striped
                dark
                responsive
                :items="users"
                :fields="tableFields"
                id="users-table"
                show-empty
                label-sort-asc=""
                label-sort-desc=""
                label-sort-clear=""
              >
                <template #cell(createdAt)="user">
                  {{ getFormattedDate(user.item.createdAt) }}
                </template>
                <template #cell(updatedAt)="user">
                  {{ getFormattedDate(user.item.updatedAt) }}
                </template>
                <template #head(config)>
                  {{""}}
                </template>
                <template #cell(config)="user">
                  <div class="table-config-items-container">
                    <b-icon
                      icon="pencil-square"
                      class="edit-user-icon table-icon"
                      @click="navigateToUserUpdate(user.item.id)"
                    ></b-icon>
                    <b-icon
                      icon="trash-fill"
                      class="delete-user-icon table-icon"
                      @click="handleUserDeletion(user.item.id)"
                    ></b-icon>
                  </div>
                </template>
              </b-table>
              <b-pagination
                v-model="currentPage"
                :total-rows="usersTotal"
                :per-page="usersPerPage"
                aria-controls="users-table"
                dark
                @change="getusers($event)"
              ></b-pagination>
            </div>
          </template>
        </div>
      </div>
    </div>
  </AuthLayout>
</template>

<script>
import AuthLayout from "./../Layout/AuthLayout.vue";
import axios from "axios";
import { mapActions } from "vuex";
import Button from "../components/Button.vue";
import { format } from "date-fns-tz";

export default {
  name: "Users",
  components: {
    AuthLayout,
    Button,
  },
  mounted() {
    this.getUsers();
  },
  data() {
    return {
      users: [
        {
          user_type_id: null,
          cover: null,
          created_at: "",
          goal: 0,
          id: null,
          title: "",
        },
      ],
      usersPerPage: 10,
      currentPage: 1,
      usersTotal: 0,
      usersOrder: "desc",
      tableFields: [
        { key: "id" },
        { key: "name", sortable: true, tdClass: "user-row" },
        { key: "username", sortable: true, tdClass: "user-row" },
        { key: "email", sortable: true, tdClass: "user-row" },
        { key: "level", sortable: true, tdClass: "user-row" },
        { key: "createdAt", sortable: true, tdClass: "user-row" },
        { key: "updatedAt", sortable: true, tdClass: "user-row" },
        {
          key: "config",
          tdClass: "config-user-row user-row",
        },
      ]
    };
  },
  methods: {
    ...mapActions(["changeLoadingState"]),
    async getUsers(paginationPage) {
      if (paginationPage) this.currentPage = paginationPage;
      try {
        this.changeLoadingState();
        const response = await axios.get(
          `${process.env.VUE_APP_API_URL}/api/v1/users?page=${this.currentPage}&limit=${this.usersPerPage}&order=${this.usersOrder}`,
          {
            headers: {
              authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        console.log(response.data.data)
        this.users = response.data.data.users;
        this.usersTotal = response.data.data.total;
        this.changeLoadingState();
      } catch (error) {
        this.changeLoadingState();
        this.$swal.fire("unable to  load users!", "", "error");
        console.error(error);
      }
    },
    getFormattedDate(timeStamp) {
      if(!timeStamp) return
      const date = new Date(String(timeStamp));
      const timeZone = "Brazil/Sao_Paulo";
      const pattern = "d/M/yyyy - HH:mm:ss";
      const output = format(date, pattern, { timeZone });
      return output;
    },
    async handleSelectUsersPerPage() {
      this.currentPage = 1;
      await this.getUsers();
    },
    navigateToUserUpdate(id) {
      this.$router.push(`/user-update/${id}`);
    },
    async handleUserDeletion(userId) {
      try {
        this.changeLoadingState();

        const swalResult = await this.$swal.fire({
          title: "Do you really want to delete this user ?",
          showDenyButton:true,
          confirmButtonText: "Delete!",
          denyButtonText:"Cancel"
        });

        if (swalResult.isConfirmed) {
          await axios.delete(
            `${process.env.VUE_APP_API_URL}/api/v1/users/${userId}`,
            {
              headers: {
                authorization: "Bearer " + localStorage.getItem("token"),
              },
            }
          );
          await this.getusers();

          this.$swal.fire("user successfully deleted!", "", "success");
        }

        this.changeLoadingState();
      } catch (error) {
        console.error(error);
        this.$swal.fire("There was an error!", "", "error");
      }
    },
  },
};
</script>

<style scoped>
.users-control-panel {
  width: 100%;
  padding: 1rem;
  display: flex;
  justify-content: center;
}
.users-table-container {
  padding: 2rem;
}
.delete-user-icon {
  color: red;
}

.edit-user-icon {
  color: white;
}

.table-icon {
  font-size: 2rem;
  cursor: pointer;
}
.table-config-items-container {
  display: flex;
  width: 5rem;
  align-items: center;
  justify-content: center;
  height: 2.5rem;
}
</style>
