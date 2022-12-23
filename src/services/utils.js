import userService from "./userService";
export function handleResponse(response) {
      const data = response.data;
      if (!response.status === 200 || !response.status === 201) {
          if (response.status === 401 || response.status === 403) {
              userService.logout();
              location.reload(true);
          }
      }

      return data;
}
