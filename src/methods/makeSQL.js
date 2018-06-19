export default function makeSQL(tableName, commentsSQL) {
	return `SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

CREATE TABLE IF NOT EXISTS \`${tableName}\` (
\`comment_ID\` bigint(20) UNSIGNED NOT NULL,
\`comment_post_ID\` bigint(20) UNSIGNED NOT NULL DEFAULT 0,
\`comment_author\` tinytext COLLATE utf8mb4_unicode_ci NOT NULL,
\`comment_author_email\` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
\`comment_author_url\` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
\`comment_author_IP\` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
\`comment_date\` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
\`comment_date_gmt\` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
\`comment_content\` text COLLATE utf8mb4_unicode_ci NOT NULL,
\`comment_karma\` int(11) NOT NULL DEFAULT 0,
\`comment_approved\` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '1',
\`comment_agent\` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
\`comment_type\` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
\`comment_parent\` bigint(20) UNSIGNED NOT NULL DEFAULT 0,
\`user_id\` bigint(20) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO \`${tableName}\` (\`comment_ID\`, \`comment_post_ID\`, \`comment_author\`, \`comment_author_email\`, \`comment_author_url\`, \`comment_author_IP\`, \`comment_date\`, \`comment_date_gmt\`, \`comment_content\`, \`comment_karma\`, \`comment_approved\`, \`comment_agent\`, \`comment_type\`, \`comment_parent\`, \`user_id\`) VALUES
${commentsSQL}`;
}
