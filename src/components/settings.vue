<template>
    <md-card v-if="$parent.status.jsonLoaded">
        <md-card-header>
            <div class="md-title">Config</div>
        </md-card-header>

        <md-card-content>
            <md-subheader>Posts</md-subheader>
            <md-list id="postsList">
                <div v-for="post in disqusJSON.thread"
                    v-bind:key="post['_attributes']['dsq:id']">
                    <md-list-item>
                        <md-checkbox v-model="config.posts"
                            :value="post['_attributes']['dsq:id']" />
                        <span class="md-list-item-text">{{ post.title['_text'] }} ({{ getCommentCount(post['_attributes']['dsq:id']) }})</span>
                    </md-list-item>

                    <md-list-item class="md-inset"
                        v-if="config.posts.includes(post['_attributes']['dsq:id'])">
                        <md-field>
                            <label>WordPress Post ID</label>
                            <md-input v-model="config.postIds[post['_attributes']['dsq:id']]"
                                type="number"
                                required></md-input>
                        </md-field>
                    </md-list-item>
                </div>
            </md-list>

            <md-divider></md-divider>

            <md-field>
                <label>Table Name</label>
                <md-input v-model="config.tableName"></md-input>
            </md-field>
            <md-field>
                <label>Auto Increment</label>
                <md-input v-model="config.autoIncrement"></md-input>
            </md-field>
            <md-field>
                <label>Admin Email</label>
                <md-input v-model="config.adminEmail"></md-input>
            </md-field>
            <md-switch v-model="config.HTMLtoMarkdown">Transform comment content from HTML to Markdown</md-switch>
        </md-card-content>
    </md-card>
</template>
<script>
export default {
    name: 'Settings',
    props: ['disqusJSON', 'parentConfig'],
    data: () => ({
        config: {
            posts: [],
            tableName: 'wp_comments',
            autoIncrement: 1,
            HTMLtoMarkdown: false,
            adminEmail: '',
            postIds: {}
        }
    }),
    created () {
        this.config = this.parentConfig;
    },
    watch: {
        config () {
            this.$emit('parentConfig', this.config);
        }
    },
    methods: {
        getCommentCount (postID) {
            return this.disqusJSON.post.filter(item => {
                return item['thread']['_attributes']['dsq:id'] == postID
            }).length;
        }
    }
}
</script>
