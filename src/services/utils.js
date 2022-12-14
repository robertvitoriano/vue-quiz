import userService from "./userService";
export function handleResponse(response) {
      console.log(response)
      const data = response.data;
      if (!response.ok) {
          if (response.status === 401) {
              userService.logout();
              location.reload(true);
          }
      }

      return data;
}
