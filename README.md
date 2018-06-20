# Disqus2WP

🛴 A webpage that helps you migrating comments from Disqus to WordPress. Built with Vue.

## Idea 

1. Transform Disqus Exported Comments from XML format to JSON, using nashwaan/xml-js
2. Render page
3. From JSON to SQL command.

## Requirements

* Disqus Exported Comments (Community -> Export) 
* Be able to execute SQL command on your database (Using tools like PHPMyAdmin or Adminer)

## Usage

When you get Disqus Exported Comments head to [disqus2wp](https://disqus2wp.jimmycai.com/) and select it. **(The file won't be uploaded to anywhere, everything is done locally.)**

Once the page finished processing XML, it will append a "Config" card, which has two sections:

### Posts

This option lets you choose **which post's comment you'd like to import.** 

It's necessary to know respective post ID from your WordPress blog.

### Other stuffs

* **Table Name**: Where you have your WordPress comments stored. By default, it's `wp_comments`. 
* **Auto Increment**: Same as `AUTO_INCREMENT` in MySQL. By default, it's `1`. If you have more comments on your database already, find the latest one, and introduce it's **ID + 1** 
* **Admin Email**: This function is aimed to single-user WordPress site. If the script find comment made by a user with admin email, it will be imported as a comment created by user `1`, which should be the admin of site.
* **Transform comment content from HTML to Markdown**: Personally, I don't like those HTML tags from comment. Disabled by default.

-----------

Then click the button, and on the right side should appear a bunch of codes. **Copy and run them on your database.** 

## Fix Comment Count

You will notice that comment count of each post after import is not updated. Well, this tool doesn't handle that (yet). 

You can fix it by following this post from WPBeginner:  [How to Fix Category and Comment Count After WordPress Import](http://www.wpbeginner.com/wp-tutorials/how-to-fix-category-and-comment-count-after-wordpress-import/)

## Huge Thanks to

* [vuejs/vue](https://github.com/vuejs/vue)
* [nashwaan/xml-js](https://github.com/nashwaan/xml-js)
* [vuematerial/vue-material](https://github.com/vuematerial/vue-material)
* [domchristie/turndown](https://github.com/domchristie/turndown)
* [egoist/vue-prism-component](https://github.com/egoist/vue-prism-component) 
