<template>
    <div>
      <h3>Some User Details</h3>
      <p>User ID: {{ $route.params.id }}</p>
      <router-link
          tag="button"
          :to="{ name: 'userEdit', params: { id: $route.params.id } }"
          class="btn btn-primary">Edit</router-link>
    </div>
</template>
