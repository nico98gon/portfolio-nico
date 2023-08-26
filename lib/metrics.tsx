// import 'server-only';

import { Octokit } from '@octokit/rest';
// import { queryBuilder } from 'lib/planetscale';
import { cache } from 'react';

// export const getBlogViews = cache(async () => {
//     if (!process.env.TWITTER_API_TOKEN_BEARER) {
//         return 0;
//     }

//     const data = await queryBuilder
//         .selectFrom('views')
//         .select(['count'])
//         .execute();

//     return data.reduce((acc, curr) => acc + Number(curr.count), 0);
// });

// export async function getTweetCount() {
//     console.log('bearer', process.env.TWITTER_API_TOKEN_BEARER)
//     if (!process.env.TWITTER_API_TOKEN_BEARER) {
//         return 183;
//     }

//     // const user_id = '1622841225446301697';

//     try {
//         const response = await fetch(
//             `https://api.twitter.com/2/users/by/username/Nicommit_?user.fields=public_metrics`,
//             // `https://thingproxy.freeboard.io/fetch/https://api.twitter.com/2/users/${user_id}?user.fields=public_metrics`,
//             {
//             headers: {
//                 Authorization: `Bearer ${process.env.TWITTER_API_TOKEN_BEARER}`,
//             },
//             }
//         );
    
//         const { data } = await response.json();
//         console.log('data', data)
//         return Number(data.public_metrics.tweet_count);
//     } catch (error) {
//         console.error(error);
//         return 0;
//     }
// }

export const getStarCount = cache(async () => {
    const octokit = new Octokit({
        auth: process.env.GITHUB_TOKEN,
    });

    const req = await octokit.request('GET /repos/{owner}/{repo}', {
        owner: 'nico98gon',
        repo: 'portfolio-nico',
    });

    return req.data.stargazers_count;
});
