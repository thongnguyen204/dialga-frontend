<template>
    <div id="paginate">
        <span v-for="(link,index) in links" :key="index">
            <button 
                type="button" 
                class="btn"
                :disabled='!link.url'
                v-bind:class="{
                    'btn-primary': link.active,
                    'btn-light': !link.active,
                    }" 
                v-html="link.label"
                v-on:click="$emit('paginate', link.url)"
            ></button>
        </span>
    </div>
</template>

<script>
export default {
    name: 'Paginate',
    props: {
        links: Array,
    },
}
</script>

<style scoped>
.btn {
    margin: 5px
}
</style>