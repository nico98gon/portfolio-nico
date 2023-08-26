import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
        req: NextApiRequest,
        res: NextApiResponse
    ) {
    const token = process.env.TWITTER_API_TOKEN_BEARER

    if (!token) {
        return res.status(500).json({ error: 'Twitter token not found' })
    }

    try {
        const response = await fetch(
        `https://api.twitter.com/2/users/by/username/Nicommit_?user.fields=public_metrics`,
        {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        }
        )

        if (!response.ok) {
        return res.status(response.status).json({ error: response.statusText })
        }

        const { data } = await response.json()

        return res.status(200).json({ tweetCount: data.public_metrics.tweet_count })
    } catch (error) {
        console.error(error)
        if (error instanceof Error) {
            return res.status(500).json({ error: error.message })
        } else {
            return res.status(500).json({ error: 'Unknown error happened' })
        }
    }
}