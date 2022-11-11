import axios from 'axios'
const apiBaseURL = process.env.VUE_APP_BASE_URL ;
const TOKEN = localStorage.getItem('TOKEN') || null;
import useToast from '@/composables/useToast.js'

class API {
  async request( route, payload = null,  method = "GET", contentType = "application/json") {
    let options = {
      method: method,
      headers: {
        "Accept": 'application/json',
        "x-access-token": `${TOKEN}`,
        "Device-Type": 'web'
      },
    };

    if (contentType == 'application/json') {
      options.headers['Content-Type'] = contentType;
    }

    //payload will be sent as form data if content type is multipart/form-data
    if (options.method !== "GET") {
      if (contentType.toLowerCase() == "multipart/form-data") {
        options.data = convertToFormData(payload);
      } else if (payload && typeof payload === "object") {
        options.data = JSON.stringify(payload);
      }
    } else if (payload) {
      // payload will be appended to the url  if method is GET
      route = this.appendParams(route, payload);
    }
    options.url = this.url(route);

    try {
      let response = await axios(options);
      return {...(await response)}       
    } catch (error) {
      if(error.response.data.message === "Failed to authenticate token.")
      {
        useToast(error.response.data.message)
        localStorage.clear()
        window.open('/login', '_self');
      }
      else{
        return error.response.data
      }
    }
  }

  

  async get(route, payload = null) {
    return await this.request(route, payload, "GET");
  }

  async post(route, payload = null) {
    return await this.request(route, payload, "POST");
  }

  async put(route, payload = null) {
    return await this.request(route, payload, "PUT");
  }

  async delete(route, payload = null) {
    return await this.request(route, payload, "DELETE");
  }

  async patch(route, payload = null) {
    return await this.request(route, payload, "PATCH");
  }

  async upload(route, payload = null) {
    return await this.request(route, payload, "POST", "multipart/form-data");
  }

  async formData(route, payload = null) {
    return await this.request(route, payload, "POST", "multipart/form-data");
  }

  appendParams(route, payload) {
    let url = new URL(this.url(route));
    let params = new URLSearchParams(url.search.slice(1));

    if (payload && typeof payload === "object") {
      for (let key in payload) {
        params.append(key, payload[key]);
      }
    }
    route = route.split("?")[0] + "?" + params.toString();
    return route;
  }

  url(route) {
    return `${apiBaseURL}${apiBaseURL && apiBaseURL.slice(apiBaseURL.length - 1) == "/" ? "" : "/"
      }${route}`;
  }
}


function convertToFormData(payload) {
  const formData = new FormData();
  for (const key in payload) {
    if (Array.isArray(payload[key])) {
      for (let i = 0; i < payload[key].length; i++) {
        formData.append(key + "[]", payload[key][i]);
      }
    }
    else
      formData.append(key, payload[key]);
  }
  return formData;
}

export default new API();