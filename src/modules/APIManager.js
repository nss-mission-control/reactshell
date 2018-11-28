const URL = "http://localhost:8088/"

export default Object.create(null, {

  getAllCategory: {
    value: function (category) {
      return fetch(`${URL}${category}`)
        .then(entries => entries.json())
    }
  },

  getOneFromCategory: {
    value: function (category, id) {
      return fetch(`${URL}${category}/${id}`)
        .then(inputs => inputs.json())
    }
  },

  saveItem: {
    value: function (category, item) {
      return fetch(`${URL}${category}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(item)
      }
      ).then(jsonData => jsonData.json())
    }
  },

  deleteItem: {
    value: function (category, id) {
      return fetch(`${URL}${category}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      })
    }
  },

  updateItem: {
    value: function (category, id, item) {
      console.log(item)
    return fetch(`${URL}${category}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(item)
    })
  }
  }
})