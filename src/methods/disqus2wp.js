import TurndownService from 'turndown';
import makeSQL from './makeSQL';

export default function disqus2wp(disqusJSON, config) {
	let AUTO_INCREMENT = config.autoIncrement,
		postIds = config.postIds,
		turndownService = new TurndownService();

	return new Promise((resolve, reject) => {
		let commentList = [],
			idPair = {},
			commentsSQL = [];

		config.posts.forEach(postID => {
			commentList = commentList.concat(disqusJSON.post.filter(item => {
				return item['thread']['_attributes']['dsq:id'] == postID
			}));
		});
		console.log(commentList);
		commentList.forEach((item) => {

			let disqusComment = {
				id: item['_attributes']['dsq:id'],
				parent: 0,
				name: item.author.name['_text'],
				email: item.author.email['_text'],
				postID: item.thread['_attributes']['dsq:id'],
				ip: item.ipAddress['_text'],
				date: item.createdAt['_text'],
				content: item.message['_cdata']
			};

			let wordPressComment = {
				id: AUTO_INCREMENT,
				parent: 0,
				userID: 0,
				postID: postIds[disqusComment.postID]
			};

			idPair[disqusComment.id] = wordPressComment.id;

			if (item.hasOwnProperty('parent')) {
				disqusComment.parent = item['parent']['_attributes']['dsq:id'];
				wordPressComment.parent = idPair[disqusComment.parent];

				if (!parent) {
					console.warning(`Comment ${disqusComment.id} has a parent comment, but I can not found it :(`);
				}
			};

			if (disqusComment.email == config.adminEmail) {
				wordPressComment.userID = 1;
			};

			let sql = {
				"comment_ID": wordPressComment.id,
				"comment_post_ID": wordPressComment.postID,
				"comment_author": `'${disqusComment.name}'`,
				"comment_author_email": `'${disqusComment.email}'`,
				"comment_author_url": `""`, /// Disqus's export does not include website url
				"comment_author_IP": disqusComment.ip,
				"comment_date": `'${new Date(disqusComment.date).toISOString().replace('T', ' ').replace('.000Z', '')}'`,
				"comment_date_gmt": `'${new Date(disqusComment.date).toISOString().replace('T', ' ').replace('.000Z', '')}'`,
				"comment_content": config.HTMLtoMarkdown ? JSON.stringify(turndownService.turndown(disqusComment.content)) : JSON.stringify(disqusComment.content),
				"comment_karma": 0,
				"comment_approved": 1,
				"comment_agent": `""`,
				"comment_type": `""`,
				"comment_parent": wordPressComment.parent,
				"user_id": wordPressComment.userID
			}

			commentsSQL.push(`(${Object.values(sql).join(',')})`);

			AUTO_INCREMENT++;
		});

		resolve(makeSQL(config.tableName, commentsSQL.join(', \n')));
	})
}
