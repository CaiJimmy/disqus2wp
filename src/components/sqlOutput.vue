<template>
    <md-card>
        <prism language="sql">{{ sqlResult }}</prism>
    </md-card>
</template>
<script>
import 'prismjs'
import 'prismjs/themes/prism.css'
import Prism from 'vue-prism-component'
import 'prismjs/components/prism-sql'

export default {
    name: 'Output',
    props: ['sqlResult'],
    components: {
        Prism
    }
}
</script>
<style scoped>
pre[class*="language-"]{
    margin: 0;
}
</style>
