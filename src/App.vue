<template>
	<div>
		<header>
			<div class="container">
				<h1>disqus2wp</h1>
				<h2>🛴 A webpage that helps you migrating comments from Disqus to WordPress</h2>
			</div>
		</header>
		<div class="container" id="main">
			<div class="md-layout md-gutter">
				<div class="md-layout-item md-size-30 md-medium-size-30 md-small-size-100">

					<xml-loader :callback="jsonLoaded"></xml-loader>
					<settings :parentConfig="config"
					    :disqusJSON="disqusJSON"></settings>

					<md-button class="md-raised md-primary"
					    id="transform"
					    @click="transform"
					    v-if="status.jsonLoaded">Transform</md-button>

				</div>

				<div class="md-layout-item md-size-70 md-medium-size-70 md-small-size-100">

					<sql-output :sqlResult="sqlResult"></sql-output>

				</div>
			</div>
		</div>
	</div>
</template>

<script>
import disqus2wp from './methods/disqus2wp';

import xmlLoader from './components/xmlLoader.vue';
import settings from './components/settings.vue';
import sqlOutput from './components/sqlOutput.vue';

export default {
	name: 'App',
	components: {
		xmlLoader,
		settings,
		sqlOutput
	},
	data: () => ({
		disqusJSON: {},

		sqlResult: '/// RESULTS WILL BE DISPLAYED HERE',

		config: {
			posts: [],
			tableName: 'wp_comments',
			autoIncrement: 1,
			HTMLtoMarkdown: false,
			adminEmail: '',
			postIds: {}
		},

		status: {
			jsonLoaded: false
		}
	}),
	methods: {
		transform () {
			disqus2wp(this.disqusJSON, this.config).then((result) => {
				this.sqlResult = (result);
			});
		},

		jsonLoaded (disqusJSON) {
			this.status.jsonLoaded = true;
			this.disqusJSON = disqusJSON;
		}
	}
}
</script>
<style lang="scss">
@import "~vue-material/dist/theme/engine"; // Import the theme engine

@include md-register-theme("default", (primary: #16a085, accent: #f39c12));

@import "~vue-material/dist/theme/all"; // Apply the theme

.container {
  max-width: 1200px;
  margin: 2em auto;
  padding: 0 10px;
}
.md-textarea {
  min-height: 500px !important;
}

#postsList {
  overflow-y: auto;
  max-height: 300px;
}

.md-card {
  margin-bottom: 16px;
}

#transform {
  width: 100%;
  margin-left: 0;
  margin-right: 0;
}

header {
  background: #16a085;
  padding: 80px 0 30px 0px;
  h1{
	  color: #fff;
	  font-weight: lighter;
  }
  h2{
	  color: #eeeeee;
	  font-weight: lighter;
  }
}

#main{
	margin-top: -20px;
}
</style>